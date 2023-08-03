<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bigest_box">
    <el-card class="card_box">
      <el-container>
        <el-header>
          <h1>欢迎登录</h1>
        </el-header>
        <el-main>
          <LoginForm></LoginForm>
        </el-main>
        <el-footer>
          <el-button @click="$router.push('/register')"
            >没有账号？立刻注册</el-button
          >
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
/* * {
  margin: 0;
  padding: 0;
} */
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

.bigest_box {
  min-height: 100vh;
  width: 100%;
  height: 100%;
  display: flex;
  /* align-items: center; */
  align-items: baseline;
  justify-content: center;
  background: url("/src/assets/img/login_background.jpg") no-repeat;
  background-size: cover;
}

.el-header h1 {
  text-align: center;
}
.card_box {
  width: 600px;
  margin-top: 320px;
  /* 半透明 */
  background-color: rgba(255, 255, 255, 0.7);
}

.el-footer {
  text-align: center;
}
</style>