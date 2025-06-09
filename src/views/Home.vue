<template>
  <div class="home-container">
    <div class="header">
      <LanguageSwitcher />
    </div>
    
    <el-card class="welcome-card">
      <h1>{{ $t('home.title') }}</h1>
      <p>{{ $t('home.subtitle') }}</p>
      
      <div class="action-buttons">
        <el-button type="primary" @click="$router.push('/login')">
          {{ $t('nav.login') }}
        </el-button>
        <el-button @click="$router.push('/signup')">
          {{ $t('nav.signup') }}
        </el-button>
      </div>
      
      <div class="features">
        <h2>{{ $t('home.features') }}</h2>
        <ul>
          <li>{{ $t('home.featureList.simple') }}</li>
          <li>{{ $t('home.featureList.secure') }}</li>
          <li>{{ $t('home.featureList.crud') }}</li>
          <li>{{ $t('home.featureList.complete') }}</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
</script>

<style scoped>
.home-container {
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

.welcome-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.action-buttons {
  margin: 30px 0;
}

.features {
  text-align: left;
  margin-top: 30px;
}

h1 {
  color: #409eff;
  margin-bottom: 10px;
}

h2 {
  color: #606266;
  margin-bottom: 15px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #606266;
}
</style>