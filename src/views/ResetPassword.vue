<template>
  <div class="reset-password-container">
    <el-card class="reset-password-card">
      <h1>重置密码</h1>
      <p class="description">请输入您的新密码。</p>
      
      <el-form :model="form" @submit.prevent="handleResetPassword" label-position="top">
        <el-form-item label="新密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入新密码" 
            show-password
            :disabled="loading"
          />
        </el-form-item>
        
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="请再次输入新密码" 
            show-password
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
            更新密码
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
      
      <div class="reset-password-footer">
        <p>返回 <router-link to="/login">登录页面</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  password: '',
  confirmPassword: ''
})

const handleResetPassword = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // 验证表单
    if (!form.password || !form.confirmPassword) {
      errorMessage.value = '请填写所有字段'
      return
    }
    
    // 验证密码长度
    if (form.password.length < 6) {
      errorMessage.value = '密码长度至少为6位'
      return
    }
    
    // 验证密码确认
    if (form.password !== form.confirmPassword) {
      errorMessage.value = '两次输入的密码不一致'
      return
    }
    
    // 更新密码
    const { error } = await supabase.auth.updateUser({
      password: form.password
    })
    
    if (error) throw error
    
    successMessage.value = '密码更新成功！正在跳转到登录页面...'
    
    // 3秒后跳转到登录页面
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    
  } catch (error) {
    errorMessage.value = error.message || '更新密码时出现错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 检查用户是否通过有效的重置链接访问此页面
onMounted(async () => {
  try {
    // 检查是否有有效的认证会话
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session error:', error)
      errorMessage.value = '认证会话出现问题，请重新申请重置密码'
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
      return
    }
    
    // 如果没有有效会话，重定向到忘记密码页面
    if (!data.session) {
      errorMessage.value = '请先通过邮件中的重置链接进行认证'
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
    }
  } catch (error) {
    console.error('Mount error:', error)
    errorMessage.value = '页面初始化出现错误，请重新申请重置密码'
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  }
})
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.reset-password-card {
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

.reset-password-footer {
  margin-top: 20px;
  text-align: center;
}

.reset-password-footer a {
  color: #409eff;
  text-decoration: none;
}

.reset-password-footer a:hover {
  text-decoration: underline;
}
</style> 