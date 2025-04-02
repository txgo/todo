<template>
  <div class="todo-form">
    <el-form :model="form" @submit.prevent="handleSubmit" :inline="false">
      <el-form-item>
        <el-input 
          v-model="form.title" 
          placeholder="What needs to be done?" 
          clearable
          @keyup.enter="handleSubmit"
        >
          <template #append>
            <el-button type="primary" @click="handleSubmit" :loading="loading">
              Add
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item>
        <el-input 
          v-model="form.description" 
          type="textarea" 
          placeholder="Description (optional)" 
          :rows="2"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add-todo'])

const form = reactive({
  title: '',
  description: ''
})

const handleSubmit = () => {
  if (!form.title.trim()) return
  
  emit('add-todo', {
    title: form.title.trim(),
    description: form.description.trim()
  })
  
  // Reset form
  form.title = ''
  form.description = ''
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 20px;
}
</style>