<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        placeholder="请输入密码"
        autocomplete="off"
        show-password="true"
      ></el-input>
    </el-form-item>

    <el-form-item class="center">
      <el-button
        class="submitButton"
        type="primary"
        @click="submitForm('ruleForm')"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
      },
      //trigger: "blur" ： 表失焦的时候做判断
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 正常入口
        this.$axios
            .post("/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
            })
            .then((result) => {
              //成功后
              // console.log("res:",result);
              if (result.data.code == "0") {
                // 保存token到localstage
                localStorage.setItem("token", "Bearer " + result.data.data.token);

                //路由页面跳转
                this.$router.push("/index");
              } else {
                alert(result.data.msg);
                this.$refs[formName].resetFields(); //弹出错误然后清除表单数据
              }
            })
            .catch((err) => {
              //失败后
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
.submitButton {
  margin-right: 100px;
}
</style>