<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <h1>Minimalist Todo App</h1>
      <p>A simple, efficient way to manage your tasks</p>
      
      <div class="action-buttons">
        <el-button type="primary" @click="$router.push('/login')">Login</el-button>
        <el-button @click="$router.push('/signup')">Sign Up</el-button>
      </div>
      
      <div class="features">
        <h2>Features</h2>
        <ul>
          <li>Simple and intuitive interface</li>
          <li>Secure user authentication</li>
          <li>Create, edit, and delete tasks</li>
          <li>Mark tasks as complete</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// No additional logic needed for the home page
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.welcome-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
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