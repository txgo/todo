<template>
  <div class="reset-password-container">
    <div class="header">
      <LanguageSwitcher />
    </div>
    
    <el-card class="reset-password-card">
      <h1>{{ $t('auth.resetPassword') }}</h1>
      <p class="description">{{ $t('auth.newPassword') }}</p>
      
      <el-form :model="form" @submit.prevent="handleResetPassword" label-position="top">
        <el-form-item :label="$t('auth.newPassword')" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            :placeholder="$t('auth.newPassword')" 
            show-password
            :disabled="loading"
          />
        </el-form-item>
        
        <el-form-item :label="$t('auth.confirmNewPassword')" prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password" 
            :placeholder="$t('auth.confirmNewPassword')" 
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
            {{ $t('auth.updatePassword') }}
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
        <p>{{ $t('common.back') }} <router-link to="/login">{{ $t('nav.login') }}</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supabase } from '../services/supabase'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
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
      errorMessage.value = t('auth.fillAllFields')
      return
    }
    
    // 验证密码长度
    if (form.password.length < 6) {
      errorMessage.value = t('auth.passwordTooShort')
      return
    }
    
    // 验证密码确认
    if (form.password !== form.confirmPassword) {
      errorMessage.value = t('auth.passwordsNotMatch')
      return
    }
    
    // 更新密码
    const { error } = await supabase.auth.updateUser({
      password: form.password
    })
    
    if (error) throw error
    
    successMessage.value = t('auth.passwordUpdateSuccess')
    
    // 3秒后跳转到登录页面
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    
  } catch (error) {
    errorMessage.value = error.message || t('errors.general')
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
      errorMessage.value = t('auth.sessionError')
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
      return
    }
    
    // 如果没有有效会话，重定向到忘记密码页面
    if (!data.session) {
      errorMessage.value = t('auth.pleaseUseEmailLink')
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
    }
  } catch (error) {
    console.error('Mount error:', error)
    errorMessage.value = t('errors.general')
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  }
})
</script>

<style scoped>
.reset-password-container {
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

.reset-password-card {
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