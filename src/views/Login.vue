<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1>Login</h1>
      
      <login-form @login-success="onLoginSuccess" @login-error="onLoginError" />
      
      <div class="login-footer">
        <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import LoginForm from '../components/auth/LoginForm.vue'

const onLoginSuccess = (user) => {
  ElMessage.success('Login successful!')
}

const onLoginError = (error) => {
  console.error('Login error:', error)
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.login-card {
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 20px;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
}

.login-footer a {
  color: #409eff;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>