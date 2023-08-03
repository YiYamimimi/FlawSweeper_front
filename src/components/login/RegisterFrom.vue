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
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
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
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        placeholder="请确认密码"
        show-password="true"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <div class="buttons">
      <el-button
        class="submitButton"
        type="primary"
        @click="submitForm('ruleForm')"
        >注册</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        nickname: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatecheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/user/register", {
              username: this.ruleForm.username,
              nickname: this.ruleForm.nickname,
              password: this.ruleForm.pass,
            })
            .then((result) => {
              //成功后
              console.log(result);
              if (result.data.code == "0") {
                // console.log(result.data);
                alert("注册成功")
                this.$router.replace("/login");
              } else {
                alert(result.data.msg);
                this.$refs[formName].resetFields(); //弹出错误然后清楚表单数据
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>