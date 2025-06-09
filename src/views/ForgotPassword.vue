<template>
  <div class="forgot-password-container">
    <el-card class="forgot-password-card">
      <h1>忘记密码</h1>
      <p class="description">输入您的邮箱地址，我们将向您发送重置密码的链接。</p>
      
      <el-form :model="form" @submit.prevent="handleForgotPassword" label-position="top">
        <el-form-item label="邮箱地址" prop="email">
          <el-input 
            v-model="form.email" 
            type="email" 
            placeholder="请输入您的邮箱地址" 
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
            发送重置链接
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
        <p>记起密码了？ <router-link to="/login">返回登录</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { supabase } from '../services/supabase'

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
      errorMessage.value = '请输入邮箱地址'
      return
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errorMessage.value = '请输入有效的邮箱地址'
      return
    }
    
    // 发送重置密码邮件
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    
    if (error) throw error
    
    successMessage.value = '重置密码链接已发送到您的邮箱，请查收邮件并按照指示重置密码。'
    form.email = '' // 清空表单
    
  } catch (error) {
    errorMessage.value = error.message || '发送重置链接时出现错误，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.forgot-password-card {
  max-width: 400px;
  width: 100%;
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