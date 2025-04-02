<template>
  <div class="signup-container">
    <el-card class="signup-card">
      <h1>Sign Up</h1>
      
      <signup-form @signup-success="onSignupSuccess" @signup-error="onSignupError" />
      
      <div class="signup-footer">
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import SignupForm from '../components/auth/SignupForm.vue'

const onSignupSuccess = (user) => {
  ElMessage.success('Account created successfully!')
}

const onSignupError = (error) => {
  console.error('Signup error:', error)
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.signup-card {
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 20px;
}

.signup-footer {
  margin-top: 20px;
  text-align: center;
}

.signup-footer a {
  color: #409eff;
  text-decoration: none;
}

.signup-footer a:hover {
  text-decoration: underline;
}
</style>