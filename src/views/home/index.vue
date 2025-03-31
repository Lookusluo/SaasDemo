<template>
  <div class="home-container">
    <!-- 水波纹背景 -->
    <div class="ripple-background">
      <div class="ripple" v-for="i in 6" :key="i" 
           :style="{ 
             left: `${Math.random() * 100}%`, 
             top: `${Math.random() * 100}%`, 
             width: `${50 + Math.random() * 100}px`, 
             height: `${50 + Math.random() * 100}px`, 
             animationDelay: `${i * 0.5}s`,
             opacity: `${0.1 + Math.random() * 0.2}`
           }"></div>
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
  position: relative;
  overflow: hidden;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}

.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  max-width: 800px;
  margin: 0 auto;
}

.services-section {
  margin-top: 4rem;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  max-width: 1440px;
}

.service-card {
  @extend .glass-card;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  color: white;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.service-card :deep(.el-card__body) {
  width: 100%;
  background: transparent;
}

.service-card h3 {
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.service-card p {
  color: #333333;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.service-card .el-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
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

.ripple-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #409eff, #a0cfff);
  animation: ripple 8s infinite;
  opacity: 0.1;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.1;
  }
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