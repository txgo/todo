<template>
  <el-form :model="form" @submit.prevent="handleSignup" label-position="top">
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" type="email" placeholder="Your email" />
    </el-form-item>
    
    <el-form-item label="Password" prop="password">
      <el-input 
        v-model="form.password" 
        type="password" 
        placeholder="Choose a password (min 6 characters)" 
        show-password 
      />
    </el-form-item>
    
    <el-form-item label="Confirm Password" prop="confirmPassword">
      <el-input 
        v-model="form.confirmPassword" 
        type="password" 
        placeholder="Confirm your password" 
        show-password 
      />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" class="submit-button">
        Create Account
      </el-button>
    </el-form-item>
    
    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      @close="errorMessage = ''"
    />
    
    <el-alert
      v-if="successMessage"
      :title="successMessage"
      type="success"
      show-icon
      @close="successMessage = ''"
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
    default: '/login'
  }
})

const emit = defineEmits(['signup-success', 'signup-error'])

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignup = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // Validate form
    if (!form.email || !form.password || !form.confirmPassword) {
      errorMessage.value = 'Please fill in all fields'
      return
    }
    
    if (form.password.length < 6) {
      errorMessage.value = 'Password must be at least 6 characters'
      return
    }
    
    if (form.password !== form.confirmPassword) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    
    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })
    
    if (error) throw error
    
    // Show success message
    successMessage.value = 'Account created successfully! You can now login.'
    emit('signup-success', data.user)
    
    // Reset form
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push(props.redirectTo)
    }, 2000)
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during signup'
    emit('signup-error', error)
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