<template>
  <div class="app">
    <section class="todo-list">
      <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoCard from "./components/todocard";
import { TodoState } from "./types/interface";
import env from "./env";
export default Vue.extend({
  name: "App",
  components: {
    TodoCard,
  },
  data(): TodoState {
    return {
      todos: [],
      server: env.process.SERVER,
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch(`${this.server}/task`);
        console.log(response);
      } catch (error) {
        console.log("Error occured at App.vue for fetchTodos", error);
      }

      // fetch todos from the api
      // set the todos to the data
    },
  },
  async mounted() {
    await this.fetchTodos();
  },
});
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
