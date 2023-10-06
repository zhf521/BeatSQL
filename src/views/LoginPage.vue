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
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
        </div>
        <div class="btn-box">
          <button>注册</button>
          <p @click="switchPage">已有账户？去登录</p>
        </div>
      </div>
      <!-- 登录 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="密码">
        </div>
        <div class="btn-box">
          <button>登录</button>
          <p @click="switchPage">没有账户？去注册</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import smileImage from '@/assets/smile.jpg';
import cryImage from '@/assets/cry.jpg';
import { ref } from 'vue';

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

.title-box {
  height: 300px;
  line-height: 500px;
}

.title-box h1 {
  text-align: center;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
}

.btn-box {
  display: flex;
  justify-content: center;
}

button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  border-radius: 4px;
  border: none;
  background-color: #69b3f0;
  color: white;
}

button:hover {
  cursor: pointer;
  opacity: 0.8;
}

.btn-box p {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}

.btn-box p:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>