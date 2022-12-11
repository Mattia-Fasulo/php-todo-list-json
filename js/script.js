"use strict";



const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            message: 'To Do List',
            todoList: [],
            apiUrl: './server.php',
            newTodoText: ''
        }
    },
    methods: {
        getTodo() {
            axios.get(this.apiUrl).then((response) => {
                // console.log(res);
                this.todoList = response.data;
                // console.log(this.todoList);
            });
        },
        addTodo() {
            // console.log(this.newTodoText)

            const todoFormData = {
                newTodoText: this.newTodoText
            }

            axios.post(
                this.apiUrl,
                todoFormData,
                { headers: { 'Content-type': 'multipart/form-data' } }
            ).then((response) => {
                // console.log(response.data)

                this.newTodoText = '';

                this.getTodo()
            });
        },
        toggleTodo(index) {
            // console.log(index)

            const todoFormData = {
                toggleTodoIndex: index
            }

            axios.post(
                this.apiUrl,
                todoFormData,
                { headers: { 'Content-type': 'multipart/form-data' } }
            ).then((response) => {
                console.log(response.data),
                this.getTodo()
            })
        },
        deleteTodo(index) {
            // console.log(index)

            const todoFormData = {
                deleteTodoIndex: index
            }

            axios.post(
                this.apiUrl,
                todoFormData,
                { headers: { 'Content-type': 'multipart/form-data' } }
            ).then((response) => {
                // console.log(response.data)
                this.getTodo()
            })
        }
    },
    mounted() {
        this.getTodo()
    }

}).mount('#app')



