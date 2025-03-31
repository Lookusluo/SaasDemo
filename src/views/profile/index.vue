<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <el-button type="primary" link @click="handleEdit">{{ isEditing ? '保存' : '编辑' }}</el-button>
        </div>
      </template>
      
      <el-form :model="userForm" label-width="100px" :disabled="!isEditing">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userForm.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="userForm.role" disabled />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isEditing = ref(false)
const userForm = ref({
  username: 'Admin',
  email: 'admin@example.com',
  phone: '13800138000',
  role: '管理员'
})

const handleEdit = () => {
  if (isEditing.value) {
    // TODO: 调用接口保存用户信息
    ElMessage.success('保存成功')
  }
  isEditing.value = !isEditing.value
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>