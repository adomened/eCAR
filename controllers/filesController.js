const User = require('../models/User');
const format = require('util').format;
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
// Instantiate a storage client
const storage = new Storage();

/**
* Configuramos Multer
* Multer is required to process file uploads and make them available via req.files.
*/
var memoryStorage = multer.memoryStorage()
var upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
    /*
    no larger than 5mb, you can change as needed.
    Lanza el metodo next con el siguiente error:  "MulterError: File too large" (Error interno en multer)
    Podria trabajar en una solucion mas "elegante" y mas "leible" por el cliente pero esta ya existe en el
    lado del cliente aunque obviamente no a nivel de seguridad apropiada. Si, llega a este fallo el cliente
    asumo que esta haciendo algo que no debe y no se merece una salida de error legible.
    */
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      return cb(null, false);
      /*
      esta validacion de la extension del archivo hace continuar el codigo pero req.file es undefined
      opto por una solucion como la anterior. El codigo presente en el lado del cliente filtra los archivos
      posibles a subir, por lo tanto, el cliente no debe llegar aqui y obtener este error "feo" http 500
      */
    }
  }
});

/**
* A bucket is a container for objects (files).
*/
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

/**
* Obtenemos la URL publica
*/
const getPublicUrl = function (filename) {
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

exports.uploadMulter = upload

/**
 * POST /api/files/add
 * Sube el archivo a Google Cloud Storage
 */
exports.sendUploadToGCS = function (req, res, next) {
  if (!req.file) {
    return next(new Error('El archivo no ha podido ser capturado o el formato facilitado no es el adecuado.'));
  }
  const gcsname = Date.now() + '-' + req.file.originalname;
  const file = bucket.file(gcsname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });
  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });
  stream.end(req.file.buffer);
}

/**
 * POST /api/files/add
 * Comprueba si se esta en el proceso de validacion del usuario
 */
exports.enProcesoDeValidacion = (req, res, next) => {
  User.findById({_id: req.user._id}, function (err, user) {
    if (user.enProcesoDeValidacion === true) {
      return res.status(200).json({ success: true, msg: 'Estamos en proceso de valición de sus datos, en breve podrá reservar un vehiculo.' });
    } else {
      next();
    }
  });
}

/**
 * POST /api/files/upload
 * Procesa el archivo subido y lo sube a Google Cloud Storage
 */
exports.upload = function(req, res, next){
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    res.json({ success: true, userPicture: publicUrl });
  });

  blobStream.end(req.file.buffer);
}

/**
 * POST /api/files/add
 * Procesa el archivo subido y lo sube a Google Cloud Storage
 */
exports.add = (req, res, next) => {
    let data = req.body;
    // Was an image uploaded? If so, we'll use its public URL in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl)
      data.imageUrl = req.file.cloudStoragePublicUrl;

    // Save the data to the database.
    User.findById({_id: req.user._id}, function (err, user) {
      if (err)
        return res.status(500).send('Mensaje de error: ' + err.message);
      user.carnet.push(data.imageUrl);
      if (user.carnet.length > 1)
        user.enProcesoDeValidacion = true;
      user.save(function (err, user) {
        if(err) {
          return res.status(500).send(err.message);
        } else {
          res.status(200).json({ success: true, userPicture: data.imageUrl, step: user.carnet.length, msg: "El archivo ha sido sido subido satisfactoriamente" });
        }
      });
    });
}
