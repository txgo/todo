<template>
  <div class="login-container">
    <div class="header">
      <LanguageSwitcher />
    </div>
    
    <el-card class="login-card">
      <h1>{{ $t('auth.login') }}</h1>
      
      <login-form @login-success="onLoginSuccess" @login-error="onLoginError" />
      
      <div class="login-footer">
        <p>{{ $t('auth.noAccount') }} <router-link to="/signup">{{ $t('nav.signup') }}</router-link></p>
        <p><router-link to="/forgot-password">{{ $t('auth.forgotPassword') }}</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import LoginForm from '../components/auth/LoginForm.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const { t } = useI18n()

const onLoginSuccess = (user) => {
  ElMessage.success(t('auth.loginSuccess'))
}

const onLoginError = (error) => {
  console.error('Login error:', error)
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.login-card {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  align-self: center;
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