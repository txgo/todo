<template>
  <el-card class="todo-item" :class="{ 'is-complete': todo.is_complete }">
    <div class="todo-content">
      <div class="todo-header">
        <el-checkbox 
          :model-value="todo.is_complete" 
          @change="toggleComplete"
          :disabled="loading"
        />
        
        <h3 class="todo-title">{{ todo.title }}</h3>
        
        <div class="todo-actions">
          <el-button 
            type="primary" 
            size="small" 
            icon="Edit" 
            circle 
            @click="isEditing = true"
            :disabled="loading"
          />
          
          <el-button 
            type="danger" 
            size="small" 
            icon="Delete" 
            circle 
            @click="confirmDelete"
            :disabled="loading"
          />
        </div>
      </div>
      
      <p v-if="todo.description" class="todo-description">
        {{ todo.description }}
      </p>
      
      <p class="todo-date">
        Created: {{ formatDate(todo.created_at) }}
      </p>
    </div>
    
    <!-- Edit Mode -->
    <el-dialog
      v-model="isEditing"
      title="Edit Todo"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" @submit.prevent="handleUpdate">
        <el-form-item label="Title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        
        <el-form-item label="Description">
          <el-input 
            v-model="editForm.description" 
            type="textarea" 
            :rows="3" 
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isEditing = false">Cancel</el-button>
          <el-button type="primary" @click="handleUpdate" :loading="loading">
            Update
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update-todo', 'delete-todo'])

const isEditing = ref(false)

const editForm = reactive({
  title: props.todo.title,
  description: props.todo.description || ''
})

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const toggleComplete = (value) => {
  emit('update-todo', {
    ...props.todo,
    is_complete: value
  })
}

const handleUpdate = () => {
  if (!editForm.title.trim()) return
  
  emit('update-todo', {
    ...props.todo,
    title: editForm.title.trim(),
    description: editForm.description.trim()
  })
  
  isEditing.value = false
}

const confirmDelete = () => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this todo?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(() => {
      emit('delete-todo', props.todo.id)
    })
    .catch(() => {
      // User cancelled the deletion
    })
}
</script>

<style scoped>
.todo-item {
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.todo-item.is-complete {
  opacity: 0.7;
}

.todo-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.todo-title {
  margin: 0 0 0 10px;
  flex-grow: 1;
  font-size: 16px;
}

.is-complete .todo-title {
  text-decoration: line-through;
  color: #909399;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.todo-description {
  margin: 0 0 10px 30px;
  color: #606266;
  white-space: pre-line;
}

.todo-date {
  margin: 0 0 0 30px;
  font-size: 12px;
  color: #909399;
}
</style>