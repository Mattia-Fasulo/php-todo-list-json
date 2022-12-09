"use strict";



const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            message: 'To Do List',
            todoList: [],
            apiUrl: './server/server.php',
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

            const data = {
                newTodoText: this.newTodoText
            }

            axios.post(
                this.apiUrl,
                data,
                { headers: { 'Content-type': 'multipart/form-data' } }
            ).then((response) => {
                // console.log(response.data)
                this.getTodo()
            });
        }
    },
    mounted() {
        this.getTodo()
    }

}).mount('#app')



