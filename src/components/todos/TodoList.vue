<template>
  <div class="todo-list">
    <div v-if="loading" class="loading-state">
      <el-skeleton :rows="3" animated />
    </div>
    
    <div v-else-if="todos.length === 0" class="empty-state">
      <el-empty description="No todos yet. Add your first todo above!" />
    </div>
    
    <div v-else>
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :loading="loadingItems[todo.id]"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingItems: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update-todo', 'delete-todo'])

const updateTodo = (todo) => {
  emit('update-todo', todo)
}

const deleteTodo = (todoId) => {
  emit('delete-todo', todoId)
}
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
}

.loading-state, .empty-state {
  margin: 30px 0;
}
</style>