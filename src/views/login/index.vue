<template>
  <div class="login-container">
    <div class="ripple-background">
      <div class="ripple" v-for="n in 3" :key="n" :style="{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${n * 0.5}s` }"></div>
    </div>
    <el-card class="login-card">
      <div class="login-header">
        <img src="../../assets/vue.svg" alt="logo" class="logo" />
        <h2>欢迎使用</h2>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item class="remember-me">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <a href="#" class="forget-password">忘记密码？</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" size="large" :loading="loading" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: 'admin',
  password: 'admin123',
  remember: true
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  if (loading.value) return
  
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // 模拟登录请求
      setTimeout(() => {
        loading.value = false
        ElMessage.success('登录成功')
        // 根据用户名判断跳转路径
        if (loginForm.username === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      }, 1500)
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.login-card {
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease;

  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 60px;
  margin-bottom: 16px;
}

.login-header h2 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.login-form {
  padding: 0 20px;
}

.remember-me {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forget-password {
  color: #409eff;
  text-decoration: none;
}

.forget-password:hover {
  color: #66b1ff;
}

.login-button {
  width: 100%;
  transition: transform 0.2s ease;
}

.login-button:hover {
  transform: translateY(-2px);
}

@media screen and (max-width: 480px) {
  .login-card {
    width: 90%;
    margin: 0 10px;
  }
}

@media screen and (orientation: landscape) and (max-height: 600px) {
  .login-card {
    width: 60%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .login-header {
    margin-bottom: 15px;
  }
  
  .logo {
    width: 40px;
    margin-bottom: 8px;
  }
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}
</style>