<style scoped></style>
<template>
  <div class="todo-card">
    <h4>{{ todo.title }}</h4>
    <input type="checkbox" :checked="todo.finished" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Todo } from "../types/interface";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TodoCard",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  methods: {},
  data() {
    return {};
  },
});
</script>
