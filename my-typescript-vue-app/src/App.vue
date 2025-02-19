<template>
  <div class="app">
    <navbar class="header">
      <h1>Welcome!</h1>
      <button class="primary-button">+ Add Task</button>
    </navbar>
    <section class="todo-list">
      <h2>Daily Task</h2>
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :updateTask="updateTask"
      />
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

    async updateTask(id: number, body: TodoState["todos"][0]) {
      try {
        const response = await fetch(`${this.server}/task`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) this.fetchTodos();
      } catch (error) {
        console.log("Error occured at App.vue for updateTask", error);
      }
    },
  },
  async mounted() {
    await this.fetchTodos();
  },
});
</script>

<style>
:root {
  --box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  --primary: #0f63bc;
}
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
.todo-list h2 {
  text-align: start;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
}
h1,
h2 {
  font-weight: 600;
}
.primary-button {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  box-shadow: var(--box-shadow);
}
</style>
