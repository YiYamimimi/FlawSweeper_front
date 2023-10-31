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
          v-for="(item, index) in itemlist"
          :label="index + 1"
          :key="item + 1"
        >
          <div class="main-top">
           

            <el-button type="primary">{{ subject(item.classifyid) }}</el-button>
            <el-rate
              class="rate"
              :value="item.proficiency"
              show-text
              :texts="texts1"
              disabled
            >
            </el-rate>
          </div>
          <div class="main-title">
            <div>
              <div class="main-title-title">
                题目：<span style="font-family: serif; font-size: 20px">{{
                  item.title1
                }}</span>
              </div>
              <!-- <el-divider></el-divider> -->
              <div></div>
            </div>
            <div class="option">
              <div v-for="e in item.title2" :key="e" style="text-indent: 0px;">
               <p>{{ e }}</p>
              </div>
            </div>
            <div v-show="item.imagesrc" class="img-right">
              <img
                :src="item.imagesrc"
                style="height: 20%; width: 20%"
                alt="域名下线或者冻结"
              />
            </div>
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
              style="
                border-width: 1px;
                border: 0.1px solid;
                border-color: rgba(220, 219, 219, 0.652); 
padding: 22px;
              "
            >
              <div class="clearfix">
                <span class="main-title-title">错题解析:</span>
              </div>
              <el-divider></el-divider>
              <div class="text2">
                <p>{{ item.answer }}</p>
              </div>
            </div>
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
      itemlist: [],
      // list:["A.物理层与数据链路层的功能", "B.数据链路层与网络层的功能", "C.网络层与传输层的功能", "D.传输层与应用层的功能"],
      imgdata: "",
      value: false,
      position: "bottom",
      texts1: ["不理解", "理解", "较熟悉", "很熟悉", "完全掌握"],
    };
  },
  //TODO:
  created() {
    let params = {};
    params.classifyname = this.$route.query.classify;
    params.titletype = +this.$route.query.types;
    console.log("params.titletype", typeof params.titletype);
    this.time = this.$route.query.time;
    console.log(this.$route.query.time);
    this.$axios({
        method: "post",
        url: "/question/getRedoQuestion",
        data:params,
      })
    // this.$axios
    //   .post("/question/getRedoQuestion", {
    //     params,
    //   })
      .then((res) => {
        this.itemlist = res.data.data;
        console.log("this.itemlist", this.itemlist);
        // this.itemlist.title2=["A.物理层与数据链路层的功能", "B.数据链路层与网络层的功能", "C.网络层与传输层的功能", "D.传输层与应用层的功能"]
        // this.imgdata = res.data.data.imagesrc;
      });
  }, //初始化渲染请求
  watch: {}, //监听数据的变化，接受父组件的参数为对象时，需要深拷贝
  methods: {
    Exit() {
      this.$router.push({ path: "/homepage" });
    },
    subject(subjectname) {
      if (subjectname == "1") {
        return "数学";
      } else if (subjectname == "2") {
        return "英语";
      } else if (subjectname == "3") {
        return "政治";
      } else if (subjectname == "4") {
        return "专业";
      }
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
.option{
  /* display: flex; */
}
.img-right{
  display: flex;
  flex: right;
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
.tagItem {
  margin-left: 10px;
}
.rate {
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
.text2{
  font-size: 15px;
}
</style>
