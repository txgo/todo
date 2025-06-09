<template>
  <el-form :model="form" @submit.prevent="handleLogin" label-position="top">
    <el-form-item :label="$t('auth.email')" prop="email">
      <el-input v-model="form.email" type="email" :placeholder="$t('auth.email')" />
    </el-form-item>
    
    <el-form-item :label="$t('auth.password')" prop="password">
      <el-input v-model="form.password" type="password" :placeholder="$t('auth.password')" show-password />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" class="submit-button">
        {{ $t('auth.login') }}
      </el-button>
    </el-form-item>
    
    <div class="forgot-password-link">
      <router-link to="/forgot-password">{{ $t('auth.forgotPassword') }}</router-link>
    </div>
    
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
import { useI18n } from 'vue-i18n'
import { supabase } from '../../services/supabase'

const props = defineProps({
  redirectTo: {
    type: String,
    default: '/dashboard'
  }
})

const emit = defineEmits(['login-success', 'login-error'])

const router = useRouter()
const { t } = useI18n()
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
    
    // 验证表单
    if (!form.email || !form.password) {
      errorMessage.value = t('auth.fillAllFields')
      return
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errorMessage.value = t('auth.invalidEmail')
      return
    }
    
    // 使用 Supabase 登录
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    
    if (error) throw error
    
    emit('login-success', data.user)
    
    // 登录成功后重定向到仪表板
    router.push(props.redirectTo)
  } catch (error) {
    errorMessage.value = error.message || t('auth.invalidCredentials')
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

.forgot-password-link {
  text-align: center;
  margin-top: 10px;
}

.forgot-password-link a {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password-link a:hover {
  text-decoration: underline;
}
</style>