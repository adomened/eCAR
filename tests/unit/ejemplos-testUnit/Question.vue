<template>
    <div>
        <!-- Viewing the question. -->
        <div v-if="! editing">
            <h1 v-text="question.title"></h1>
            <div class="body" v-text="question.body"></div>

            <button id="edit" @click="editing = true">Edit</button>
        </div>

        <!-- Editing the question. -->
        <div v-if="editing">
            <input type="text" name="title" v-model="form.title">
            <textarea name="body" v-model="form.body"></textarea>

            <button id="cancel" @click="cancel">Cancel</button>
            <button id="update" @click="update">Update</button>
            <button id="update2" @click="update2">Update2</button>
        </div>

        <p v-if="feedback">{{feedbackMessage}}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        props: ['dataQuestion'],
        data () {
            return {
                question: this.dataQuestion,
                form: {
                    title: this.dataQuestion.title,
                    body: this.dataQuestion.body,
                },
                editing: false,
                feedback: false,
                feedbackMessage: undefined,
                test: {
                  primero: 'primero',
                  segundo: 'segundo'
                }
            };
        },
        methods: {
            cancel () {
                this.editing = false;
            },
            update () {
                this.question.title = this.form.title;
                this.question.body = this.form.body;
                axios.post('/questions/1', this.form)
                    .then(({data}) => {
                        this.feedback = true;
                        console.log(data);
                        this.feedbackMessage = 'Your question has been updated.'
                    })
                    .catch(({data}) => {
                        this.feedback = true;
                        console.log('Esto sucede en el catch');
                        this.feedbackMessage = 'A error was produced.'
                    });
                this.editing = false;
            },
            update2 () {
                this.question.title = this.form.title;
                this.question.body = this.form.body;
                console.log('form data: ' + JSON.stringify(this.question));
                axios.post('/questions/1', this.form)
                    .then(({data}) => {
                        this.feedback = true;
                        this.feedbackMessage = 'Your question has been updated.'
                        // console.log('data: ' + JSON.stringify(data));
                        try {
                          this.$set(this.test, 'primero', data.title) // El segundo argumento debe ser un String
                          this.$set(this.test, 'segundo', data.body)
                        } catch (e) {
                          console.log(e);
                        } finally {
                          console.log(JSON.stringify(this.test));
                        }

                        // console.log('form data: ' + JSON.stringify(this.question));

                    })
                    .catch(({data}) => {
                        this.feedback = true;
                        this.feedbackMessage = 'A error was produced.'
                    });
                this.editing = false;
            }
        }
    }
</script>
