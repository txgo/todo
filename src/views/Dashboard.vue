<template>
  <div class="dashboard-container">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>Todo Dashboard</h1>
          <div class="user-actions">
            <span class="user-email" v-if="user">{{ user.email }}</span>
            <el-button type="danger" @click="handleLogout" size="small">
              Logout
            </el-button>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <el-card class="todo-card">
          <todo-form 
            @add-todo="addTodo" 
            :loading="loadingAdd"
          />
          
          <el-divider />
          
          <todo-list 
            :todos="todos" 
            :loading="loadingTodos"
            :loading-items="loadingItems"
            @update-todo="updateTodo"
            @delete-todo="deleteTodo"
          />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { supabase } from '../services/supabase'
import TodoForm from '../components/todos/TodoForm.vue'
import TodoList from '../components/todos/TodoList.vue'

const router = useRouter()
const user = ref(null)
const todos = ref([])
const loadingTodos = ref(true)
const loadingAdd = ref(false)
const loadingItems = reactive({})

// Fetch current user
onMounted(async () => {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    user.value = session.user
  } else {
    router.push('/login')
    return
  }
  
  // Set up auth state change listener
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null
    if (event === 'SIGNED_OUT') {
      router.push('/login')
    }
  })
  
  // Fetch todos
  fetchTodos()
})

// Fetch todos from Supabase
const fetchTodos = async () => {
  try {
    loadingTodos.value = true
    
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    todos.value = data || []
  } catch (error) {
    ElMessage.error('Error loading todos: ' + error.message)
  } finally {
    loadingTodos.value = false
  }
}

// Add a new todo
const addTodo = async (todo) => {
  try {
    loadingAdd.value = true
    
    // Format timestamp for PostgreSQL
    const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '+00')
    
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          title: todo.title,
          description: todo.description,
          is_complete: false,
          user_id: user.value.id,
          created_at: timestamp,
          updated_at: timestamp
        }
      ])
      .select()
    
    if (error) throw error
    
    // Add the new todo to the list
    if (data && data.length > 0) {
      todos.value = [data[0], ...todos.value]
      ElMessage.success('Todo added successfully')
    }
  } catch (error) {
    ElMessage.error('Error adding todo: ' + error.message)
  } finally {
    loadingAdd.value = false
  }
}

// Update a todo
const updateTodo = async (todo) => {
  try {
    loadingItems[todo.id] = true
    
    // Format timestamp for PostgreSQL
    const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '+00')
    
    const { error } = await supabase
      .from('todos')
      .update({
        title: todo.title,
        description: todo.description,
        is_complete: todo.is_complete,
        updated_at: timestamp
      })
      .eq('id', todo.id)
    
    if (error) throw error
    
    // Update the todo in the list
    const index = todos.value.findIndex(t => t.id === todo.id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...todo, updated_at: timestamp }
      ElMessage.success('Todo updated successfully')
    }
  } catch (error) {
    ElMessage.error('Error updating todo: ' + error.message)
  } finally {
    loadingItems[todo.id] = false
  }
}

// Delete a todo
const deleteTodo = async (todoId) => {
  try {
    loadingItems[todoId] = true
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId)
    
    if (error) throw error
    
    // Remove the todo from the list
    todos.value = todos.value.filter(todo => todo.id !== todoId)
    ElMessage.success('Todo deleted successfully')
  } catch (error) {
    ElMessage.error('Error deleting todo: ' + error.message)
  } finally {
    loadingItems[todoId] = false
  }
}

// Logout
const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    router.push('/login')
  } catch (error) {
    ElMessage.error('Error during logout: ' + error.message)
  }
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #409eff;
  color: white;
  line-height: 60px;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-email {
  font-size: 14px;
}

.el-main {
  padding: 20px;
}

.todo-card {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 20px;
}
</style>