<template>
  <div class="app">
    <navbar class="header">
      <h1>Welcome!</h1>
      <button>+ Add Task</button>
    </navbar>
    <section class="todo-list">
      <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TodoState } from "./types/interface";
import TodoCard from "./components/todocard.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    TodoCard,
  },
  data(): TodoState {
    return {
      todos: [],
      server:
        process.env.SERVER ||
        "https://ca4bb038-ee44-49a8-bcdb-2e48a341652e.mock.pstmn.io",
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch(`${this.server}/task`);
        this.todos = await response.json();
      } catch (error) {
        console.log("Error occured at App.vue for fetchTodos", error);
      }
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
  background-color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1{
  font-weight: 600;
}
</style>
