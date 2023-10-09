<template>
  <div class="container">
    <!-- 最外层大盒子 -->
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box" ref="preBox">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img src="../assets/smile.jpg" alt="" ref="stateImg">
        </div>
      </div>
      <!-- 注册 -->
      <div class="register-form">
        <h1>注册</h1>
        <!-- 注册表单 -->
        <a-form :model="registerFormState" ref="registerFormRef" @finish="registerOnFinish"
          @finishFailed="registerOnFinishFailed" :rules="rules">
          <!-- 用户名 -->
          <a-form-item name="username" :rules="[{ required: true, message: '请输入您的用户名!' }]">
            <a-input v-model:value="registerFormState.username" placeholder="用户名">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <!-- 密码 -->
          <a-form-item name="pass">
            <a-input-password v-model:value="registerFormState.pass" placeholder="密码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 确认密码 -->
          <a-form-item name="checkPass">
            <a-input-password v-model:value="registerFormState.checkPass" placeholder="确认密码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 注册按钮和去登录 -->
          <a-form-item>
            <a-button :disabled="registerDisabled" type="primary" html-type="submit" class="login-form-button">
              注册
            </a-button>
            <a @click="switchPage">已有账户？去登录！</a>
          </a-form-item>
        </a-form>
      </div>
      <!-- 登录 -->
      <div class="login-form">
        <h1>登录</h1>
        <!-- 登录表单 -->
        <a-form :model="loginFormState" @finish="loginOnFinish" @finishFailed="loginOnFinishFailed">
          <!-- 用户名 -->
          <a-form-item name="username" :rules="[{ required: true, message: '请输入您的用户名!' }]">
            <a-input v-model:value="loginFormState.username" placeholder="用户名">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <!-- 密码 -->
          <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码!' }]">
            <a-input-password v-model:value="loginFormState.password" placeholder="密码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <!-- 登录按钮和去注册 -->
          <a-form-item>
            <a-button :disabled="loginDisabled" type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
            <a @click="switchPage">还没有账户？去注册！</a>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
  <context-holder />
</template>
<script setup>
import smileImage from '@/assets/smile.jpg';
import cryImage from '@/assets/cry.jpg';
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const [messageApi, contextHolder] = message.useMessage();
const router = useRouter();
// 登录模块
const loginFormState = reactive({
  username: '',
  password: '',
});
const loginOnFinish = values => {
  // console.log('Success:', values);
  // 获取token
  const token = 'thisIsToken';
  messageApi.info('登录成功');
  sessionStorage.setItem('token', token);
  localStorage.setItem('username', values.username);
  router.push('/introduction');
};
const loginOnFinishFailed = errorInfo => {
  // console.log('Failed:', errorInfo);
  messageApi.info('数据验证失败！');
};
const loginDisabled = computed(() => {
  return !(loginFormState.username && loginFormState.password);
});

// 注册模块
const registerFormRef = ref();
const registerFormState = reactive({
  username: '',
  pass: '',
  checkPass: '',
});
const registerOnFinish = values => {
  // console.log('Success:', values);
  messageApi.info('注册成功！');
};
const registerOnFinishFailed = errorInfo => {
  // console.log('Failed:', errorInfo);
  messageApi.info('注册失败！');
};
const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入密码');
  } else {
    if (registerFormState.checkPass !== '') {
      registerFormRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请再次输入密码');
  } else if (value !== registerFormState.pass) {
    return Promise.reject("两次输入的密码不一致！");
  } else {
    return Promise.resolve();
  }
};
const registerDisabled = computed(() => {
  return !(registerFormState.username && registerFormState.pass && registerFormState.checkPass);
});
const rules = {
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validatePass2,
      trigger: 'change',
    },
  ],
};

// 切换页面
const preBox = ref(null);
const stateImg = ref(null);
let flag = true;
const switchPage = () => {
  if (flag) {
    preBox.value.style.transform = 'translatex(100%)';
    preBox.value.style.backgroundColor = '#c9e0ed';
    stateImg.value.setAttribute('src', cryImage);
  } else {
    preBox.value.style.transform = 'translatex(0%)';
    preBox.value.style.backgroundColor = '#edd4dc';
    stateImg.value.setAttribute('src', smileImage);
  }
  flag = !flag;
};
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #f7d1d7, #bfe3f1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  width: 1050px;
  height: 600px;
  display: flex;
  position: relative;
  margin: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

.pre-box {
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  transition: 0.5s ease-in-out;
}

.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

.img-box img {
  width: 100%;
  transition: 0.5s ease-in-out;
}

.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

.login-form h1 {
  text-align: center;
  margin-top: 200px;
}

.register-form h1 {
  text-align: center;
  margin-top: 200px;
}

.ant-form {
  margin: 20px 80px 100px 80px;
}
</style>