<template>
  <el-form :model="form" @submit.prevent="handleLogin" label-position="top">
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" type="email" placeholder="Your email" />
    </el-form-item>
    
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password" type="password" placeholder="Your password" show-password />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" class="submit-button">
        Login
      </el-button>
    </el-form-item>
    
    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      @close="errorMessage = ''"
    />
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../services/supabase'

const props = defineProps({
  redirectTo: {
    type: String,
    default: '/dashboard'
  }
})

const emit = defineEmits(['login-success', 'login-error'])

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    // Validate form
    if (!form.email || !form.password) {
      errorMessage.value = 'Please fill in all fields'
      return
    }
    
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    
    if (error) throw error
    
    emit('login-success', data.user)
    
    // Redirect to dashboard on success
    router.push(props.redirectTo)
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during login'
    emit('login-error', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.submit-button {
  width: 100%;
}
</style>