<template>
  <div class="auth-callback-container">
    <el-card class="auth-callback-card">
      <div class="loading-content">
        <el-icon class="loading-icon" size="48">
          <Loading />
        </el-icon>
        <h2>{{ $t('auth.authProcessing') }}</h2>
        <p>{{ $t('auth.pleaseWait') }}</p>
      </div>
      
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        @close="errorMessage = ''"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supabase } from '../services/supabase'
import { Loading } from '@element-plus/icons-vue'

const router = useRouter()
const { t } = useI18n()
const errorMessage = ref('')

onMounted(async () => {
  try {
    // 检查 URL hash 中是否有错误信息
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    const errorCode = hashParams.get('error_code')
    const errorDescription = hashParams.get('error_description')
    
    if (error) {
      console.error('Auth callback error:', { error, errorCode, errorDescription })
      
      if (errorCode === 'otp_expired') {
        errorMessage.value = t('auth.resetLinkExpired')
      } else if (error === 'access_denied') {
        errorMessage.value = t('auth.accessDenied')
      } else {
        errorMessage.value = `${t('auth.authFailed')}：${errorDescription || error}`
      }
      
      setTimeout(() => {
        router.push('/forgot-password')
      }, 5000)
      return
    }
    
    // 处理成功的认证回调
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')
    const type = hashParams.get('type')
    
    if (accessToken && refreshToken && type === 'recovery') {
      // 设置会话
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
      
      if (sessionError) {
        console.error('Set session error:', sessionError)
        errorMessage.value = t('auth.sessionError')
        setTimeout(() => {
          router.push('/forgot-password')
        }, 3000)
      } else {
        // 认证成功，跳转到重置密码页面
        console.log('Auth successful, redirecting to reset password')
        router.push('/reset-password')
      }
    } else {
      errorMessage.value = t('auth.resetLinkInvalid')
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
    }
  } catch (error) {
    console.error('Auth callback mount error:', error)
    errorMessage.value = t('errors.general')
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  }
})
</script>

<style scoped>
.auth-callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.auth-callback-card {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.loading-content {
  padding: 20px;
}

.loading-icon {
  color: #409eff;
  margin-bottom: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

h2 {
  color: #409eff;
  margin-bottom: 10px;
}

p {
  color: #606266;
  margin-bottom: 20px;
}
</style> 