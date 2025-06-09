<template>
  <div class="forgot-password-container">
    <div class="header">
      <LanguageSwitcher />
    </div>
    
    <el-card class="forgot-password-card">
      <h1>{{ $t('auth.resetPassword') }}</h1>
      <p class="description">{{ $t('auth.resetLinkSent').split('.')[0] }}.</p>
      
      <el-form :model="form" @submit.prevent="handleForgotPassword" label-position="top">
        <el-form-item :label="$t('auth.email')" prop="email">
          <el-input 
            v-model="form.email" 
            type="email" 
            :placeholder="$t('auth.email')" 
            :disabled="loading"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            :loading="loading" 
            class="submit-button"
          >
            {{ $t('auth.sendResetLink') }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <el-alert
        v-if="successMessage"
        :title="successMessage"
        type="success"
        show-icon
        @close="successMessage = ''"
      />
      
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        @close="errorMessage = ''"
      />
      
      <div class="forgot-password-footer">
        <p>{{ $t('auth.hasAccount') }} <router-link to="/login">{{ $t('auth.backToLogin') }}</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '../services/supabase'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const { t } = useI18n()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  email: ''
})

const handleForgotPassword = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // 验证表单
    if (!form.email) {
      errorMessage.value = t('auth.emailRequired')
      return
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errorMessage.value = t('auth.invalidEmail')
      return
    }
    
    // 发送重置密码邮件
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/auth/callback`
    })
    
    if (error) throw error
    
    successMessage.value = t('auth.resetLinkSent')
    form.email = '' // 清空表单
    
  } catch (error) {
    errorMessage.value = error.message || t('errors.general')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password-container {
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

.forgot-password-card {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  align-self: center;
}

h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.5;
}

.submit-button {
  width: 100%;
}

.forgot-password-footer {
  margin-top: 20px;
  text-align: center;
}

.forgot-password-footer a {
  color: #409eff;
  text-decoration: none;
}

.forgot-password-footer a:hover {
  text-decoration: underline;
}
</style> 