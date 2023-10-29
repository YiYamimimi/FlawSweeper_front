<template>
  <el-container style="background-color: #f8f8f8ff; height: 100%">
    <el-header class="header">
      <div class="headerleft">
        <el-button
          class="headerleft-button"
          icon="el-icon-arrow-left"
          style="border-color: rgb(255, 255, 255)"
          @click="Exit"
          >退出错题</el-button
        >
      </div>
      <div class="headercenter">请在框内输入你的答案</div>
      <div class="headerright">
        <el-statistic
          class="headerright-text"
          ref="statistic"
          @finish="hilarity"
          format="HH:mm:ss"
          :value="Date.now() + this.time * 60000"
          time-indices
        >
        </el-statistic>
      </div>
    </el-header>
    <el-main class="main">
      <el-tabs type="card">
        <el-tab-pane
          v-for="(index,item) in itemlist"
          :label="item+1"
          :key="index + 1"
        >
          <div class="main-top">
            <el-button type="primary">标签</el-button>
            <el-button type="primary">类型</el-button>
            <el-rate class="rate"
          :value="4"
          show-text
          :texts="texts1"
          disabled
        >
        </el-rate>
          </div>
          <div class="main-title">
            <div>
              <div class="main-title-title">题目：</div>
              <el-divider></el-divider>
              <div></div>
            </div>
            <div>选择题</div>
            <div>图片</div>
          </div>
          

          <div class="main-writing">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 16 }"
              placeholder="请输入内容"
              v-model="textarea2"
            >
            </el-input>
          </div>
          <div class="main-answer">
            <el-switch
              v-model="value"
              style="padding-bottom: 20px; /* neutral-300 */"
            >
            </el-switch>
            <div
              class="main-answer-item"
              v-show="!value"
              style="background: #dee1e6ff"
            >
              <div class="text1">答案显示</div>
            </div>
            <div
              class="main-answer-item"
              v-show="value"
              style="border-width: 1px; border: 0.1px solid"
            ></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      time: 0,
      itemlist: [3, 2],
      value: false,
      position: "bottom",
      texts1: ["不理解", "理解", "较熟悉", "很熟悉", "完全掌握"],
    };
  },
  //TODO:
  created() {
    let params = {};
    params.classify = this.$route.query.classify;
    params.types = this.$route.query.types;
    this.time = this.$route.query.time;
    console.log(this.$route.query.time);

    // this.$axios
    //   .get("/question/show" + "/" + params)
    //   .then((res) => {
    // this.itemlist

    //   })
  }, //初始化渲染请求
  watch: {}, //监听数据的变化，接受父组件的参数为对象时，需要深拷贝
  methods: {
    Exit() {
      this.$router.push({ path: "/homepage" });
    },
  }, //方法
  computed: {}, //计算
  mounted() {},
};
</script>
<style scoped>
body,
html {
  height: 0;
  margin: 0;
}
.el-main {
  height: 100%;
}
.header {
  background-color: #fff;
  height: 40px;
}
.headerleft {
  position: absolute;
  top: 13px;
  left: 64px;
  width: 98px;
  height: 28px;
}
.headerleft-button {
  font-size: 20px;
}
.headercenter {
  position: absolute;
  top: 16px;
  left: 40%;
  font-family: Lexend; /* Heading */
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: #565d6dff;
}
.headerright {
  float: right;
  display: flex;
  margin-top: 10px;
  margin-right: 50px;
  width: 124px;
  height: 39px;
  background: #f8f8f8ff;
  border-radius: 20px;
  box-shadow: 0px 0px 1px;
}
.headerright-text {
  height: 100%;
  display: flex;
  font-family: Manrope; /* Body */
  font-size: 16px;
  font-weight: 400;

  align-content: center;
  justify-content: center;
  color: #565d6dff;
}
.main {
  background-color: #fff;
  margin-top: 25px;
  margin-left: 55px;
  margin-right: 55px;
  margin-bottom: 40px;
  height: 100%;
  padding: 50px;
}
.main-top {
  padding-top: 20px; 
}
.main-top>button{
    margin-left: 10px;
}
.rate{
   float: right;
   margin-right: 20px;
}
.main-title {
  margin-top: 20px;
  padding: 15px;
  font-size: 16px;
  
  border-radius: 22px; /* border-xs */
 
}
.main-title-title {
  font-family: STXingkai;
  font-size: 30px;
  color: rgb(42, 41, 41);
}
.main-title > div:nth-child(2) {
}
.main-writing {
  padding-top: 20px;
}
.main-answer {
  padding-top: 20px;
}
.main-answer-item {
  padding-top: 20px;
  /* width: 100%; */
  height: 147px;
  border-color: #fffafa99;
  border-radius: 5px;
  margin-bottom: 20px;
}
.text1 {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;

  font-family: Manrope; /* Body */
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  color: #171a1fff;
}
</style>
