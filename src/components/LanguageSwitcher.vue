<template>
  <el-dropdown @command="handleLanguageChange" class="language-switcher">
    <el-button type="text" class="language-button">
      <el-icon><Compass /></el-icon>
      <span class="language-text">{{ currentLanguageLabel }}</span>
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item 
          command="en" 
          :class="{ 'is-active': currentLocale === 'en' }"
        >
          🇺🇸 English
        </el-dropdown-item>
        <el-dropdown-item 
          command="zh" 
          :class="{ 'is-active': currentLocale === 'zh' }"
        >
          🇨🇳 中文
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Compass, ArrowDown } from '@element-plus/icons-vue'
import { setLocale } from '../i18n'

const { locale, t } = useI18n()

const currentLocale = computed(() => locale.value)

const currentLanguageLabel = computed(() => {
  const labels = {
    en: 'English',
    zh: '中文'
  }
  return labels[currentLocale.value] || 'English'
})

const handleLanguageChange = (command) => {
  if (command !== currentLocale.value) {
    setLocale(command)
    // 可以添加切换成功的提示
    console.log(`Language switched to: ${command}`)
  }
}
</script>

<style scoped>
.language-switcher {
  margin-left: 10px;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #606266;
  font-size: 14px;
}

.language-button:hover {
  color: #409eff;
}

.language-text {
  margin: 0 4px;
}

.el-dropdown-menu .el-dropdown-item.is-active {
  color: #409eff;
  font-weight: bold;
}

.el-dropdown-menu .el-dropdown-item.is-active::before {
  content: '✓ ';
  margin-right: 4px;
}
</style> 