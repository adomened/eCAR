<template lang="html">
  <div class="container-fluid px-0">
    <div class="row" v-for="item, index in paginate()" :key="index">
      <div class="col-12 pb-2">
      <!-- <div v-show="filter(item)" class="col-12 py-2"> -->
        <card shadow>
          <div class="row align-items-center">
            <div class="col-auto px-0">
              <slot name="cabecera-img" :item="item"></slot>
            </div>
            <div class="col text-muted text-truncate px-2" :class="{'col-lg-2': !(showCardArray[caculateIndex(index)] === caculateIndex(index)) && show[1] }">
              <slot name="cabecera-a" :item="item"></slot>
            </div>
            <div class="col-auto px-0">
              <slot name="cabecera-b" :item="item"></slot>
            </div>
            <div v-if="!(showCardArray[caculateIndex(index)] === caculateIndex(index)) && show[0]" class="col text-truncate d-none d-md-block">
              <slot name="cabecera-c" :item="item"></slot>
            </div>
            <div v-if="!(showCardArray[caculateIndex(index)] === caculateIndex(index)) && show[1]" class="col text-truncate d-none d-lg-block">
              <slot name="cabecera-d" :item="item"></slot>
            </div>
            <div class="col-auto text-right flex-grow-0 px-2">
              <base-button iconOnly v-if="edit" class="btn-no-shadow no-translate-y border-0" style="background-color:#fff" size="sm" type="secondary" nativeType="submit" @click.prevent="emitEvent('edit', item)">
                <i class="fa fa-pencil-square-o pt-1" aria-hidden="true"></i>
              </base-button>
              <base-dropdown position="right">
                <base-button slot="title" type="secondary" style="background-color:#fff" class="dropdown-toggle btn-no-shadow no-translate-y border-0 no-caret py-0 pl-2 pr-1 mr-0">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </base-button>
                <base-button @click.prevent="emitEvent('first', item)" v-if="menuTitles[0]" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0 text-capitalize">
                  <i :class="menuIcons[0]" aria-hidden="true"></i>{{menuTitles[0]}}
                </base-button>
                <base-button @click.prevent="emitEvent('second', item)" v-if="menuTitles[1]" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0 text-capitalize">
                  <i :class="menuIcons[1]" aria-hidden="true"></i>{{menuTitles[1]}}
                </base-button>
                <base-button @click.prevent="emitEvent('third', item)" v-if="menuTitles[2]" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0 text-capitalize">
                  <i :class="menuIcons[2]" aria-hidden="true"></i>{{menuTitles[2]}}
                </base-button>
                <div class="dropdown-divider"></div>
                <base-button v-if="showCardArray[caculateIndex(index)] === undefined" @click.prevent="showMore(caculateIndex(index))" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0 text-capitalize">Mostrar mas</base-button>
                <base-button v-else @click.prevent="showLess(caculateIndex(index))" type="secondary" class="d-flex align-items-center dropdown-item btn-no-shadow no-translate-y border-0 rounded-0 text-capitalize">Mostrar menos</base-button>
              </base-dropdown>
            </div>
          </div>
          <div v-if="showCardArray[caculateIndex(index)] === caculateIndex(index)" class="row border-top pt-2 mt-3">
            <div class="col-12">
              <slot name="cuerpo" :item="item"></slot>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div v-if="pagination.totalPages > 1" class="mt-2">
      <base-pagination color="blue" v-show="pagination.totalPages > 1" :value="currentPage" @input="currentPage = $event" :page-count="pagination.totalPages" :per-page="perPage" align="center" size="lg"></base-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminList',
  data () {
    return {
      currentPage: 1,
      showCardArray: []
    }
  },
  props: {
    payload: {
      type: Array,
      description: 'contenido util del listado'
    },
    query: {
      type: String,
      description: 'campo para filtrar elementos presentes en la lista'
    },
    menuTitles: {
      type: Array,
      description: 'titulos en el menu desplegable'
    },
    menuIcons: {
      type: Array,
      description: 'iconos en el menu desplegable'
    },
    filter: {
      type: Function,
      description: 'Funcion que se usa para filtrar la lista'
    },
    perPage: {
      type: Number,
      description: 'Numero de elementos presentes en una pagina',
      default: 3
    },
    show: {
      type: Array,
      description: 'Elementos que se muestran en la version no extendida de la lista',
      default: () => {
        return [true, true]
      }
    },
    edit: {
      type: Boolean,
      description: 'Boton editar registro'
    }
  },
  created() {
    if(this.$route.query.page <= this.pagination.totalPages) {
      this.currentPage = parseInt(this.$route.query.page);
    } else {
      this.currentPage = 1;
    }
  },
  watch: {
    '$route'(to) {
      this.currentPage = parseInt(to.query.page) || 1;
    },
    perPage() {
      if(this.currentPage > this.pagination.totalPages) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            page: this.pagination.totalPages
          })
        })
      }
    }
  },
  computed: {
    pagination() {
      if(this.payload) {
        this.showCardArray = []
        let _payload = this.filter().length,
          pageFrom = (this.currentPage * this.perPage) - this.perPage,
          totalPages = Math.ceil(_payload / this.perPage);

        return {
          pagPayload: _payload,
          totalPages: Math.ceil(_payload / this.perPage),
          range: {
            from: pageFrom,
            to: pageFrom + this.perPage
          }
        }
      }
    }
  },
  methods: {
    emitEvent (evt, value) {
      this.$emit(evt, value)
    },
    caculateIndex (index) {
      return index + ((this.currentPage * this.perPage) - this.perPage)
    },
    paginate () {
      return this.filter().slice(
        this.pagination.range.from,
        this.pagination.range.to
      );
    },
    showMore (index) {
      this.$set(this.showCardArray, index, index)
    },
    showLess (index) {
      this.$set(this.showCardArray, index, undefined)
    }
  }
}
</script>

<style lang="css" scoped>
.dropdown-toggle::after {
  content: none !important;
}
</style>
