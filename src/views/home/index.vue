<template>
  <div class="home-container">
    <!-- 水波纹背景 -->
    <div class="ripple-background">
      <div class="ripple" v-for="i in 3" :key="i" :style="{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${i * 0.5}s` }"></div>
    </div>
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <div class="logo">
        <img src="../../assets/vue.svg" alt="logo" />
        <span>SaaS Admin</span>
      </div>
      <div class="nav-links">
        <router-link to="/login" class="login-btn">
          <el-button type="primary">登录/注册</el-button>
        </router-link>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <div class="hero-section">
        <h1>企业级SaaS解决方案</h1>
        <p>为您的业务提供全方位的云服务支持</p>
      </div>

      <!-- 服务卡片区域 -->
      <div class="services-section">
        <h2>我们的服务</h2>
        <div class="service-cards">
          <el-card v-for="(service, index) in services" :key="index" class="service-card">
            <el-icon size="32px" :class="service.icon"></el-icon>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <el-button type="primary" text>了解更多</el-button>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 在线客服 -->
    <div class="customer-service" @click="showChat = true">
      <el-badge :value="unreadCount" :hidden="!unreadCount">
        <el-button type="primary" circle>
          <el-icon><Service /></el-icon>
        </el-button>
      </el-badge>
    </div>

    <!-- 客服对话框 -->
    <el-dialog
      v-model="showChat"
      title="在线客服"
      width="300px"
      custom-class="chat-dialog"
    >
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.type]"
          >
            {{ message.content }}
          </div>
        </div>
        <div class="chat-input">
          <el-input
            v-model="newMessage"
            placeholder="请输入消息"
            @keyup.enter="sendMessage"
          >
            <template #append>
              <el-button @click="sendMessage">发送</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Service } from '@element-plus/icons-vue'

const services = [
  {
    icon: 'Monitor',
    title: '云服务器',
    description: '高性能、可扩展的云计算服务器'
  },
  {
    icon: 'DataLine',
    title: '数据存储',
    description: '安全可靠的云存储解决方案'
  },
  {
    icon: 'Connection',
    title: '网络服务',
    description: '快速稳定的网络连接服务'
  },
  {
    icon: 'Shield',
    title: '安全防护',
    description: '全方位的安全防护体系'
  }
]

const showChat = ref(false)
const unreadCount = ref(0)
const newMessage = ref('')
const messages = reactive([
  { type: 'received', content: '您好！我是客服小助手，很高兴为您服务。' }
])

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.push({
    type: 'sent',
    content: newMessage.value
  })

  // 模拟客服回复
  setTimeout(() => {
    messages.push({
      type: 'received',
      content: '感谢您的咨询，我们的工作人员会尽快处理您的问题。'
    })
  }, 1000)

  newMessage.value = ''
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo img {
  width: 32px;
}

.logo span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #409eff;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #303133;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #606266;
}

.services-section {
  margin-top: 4rem;
}

.services-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #303133;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  text-align: center;
  padding: 1.5rem;
}

.service-card :deep(.el-icon) {
  color: #409eff;
  margin-bottom: 1rem;
}

.service-card h3 {
  margin: 1rem 0;
  color: #303133;
}

.service-card p {
  color: #606266;
  margin-bottom: 1rem;
}

.customer-service {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;
}

.chat-dialog {
  .chat-container {
    height: 400px;
    display: flex;
    flex-direction: column;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .message {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    max-width: 80%;
  }

  .sent {
    background-color: #409eff;
    color: white;
    margin-left: auto;
  }

  .received {
    background-color: #f4f4f5;
    color: #303133;
  }

  .chat-input {
    padding: 1rem;
    border-top: 1px solid #dcdfe6;
  }
}
</style>