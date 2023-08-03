<template >
  <div class="tutu">
    <el-row>
      <!-- 第一个卡片（科目，标签，日期） -->
      <el-card class="box-cardmini">
        <span class="titles" style="float: left; color: rgba(8, 28, 88, 0.397)"
          >学科:{{ subject(question.classifyid) }}</span
        >
        <span
          class="titles"
          style="margin-left: 200px; color: rgba(8, 28, 88, 0.397)"
          >标签:{{ question.notes }}</span
        >
        <span class="titles" style="float: right; color: rgba(8, 28, 88, 0.397)"
          >日期:{{ brief2(question.questiontime) }}</span
        >
      </el-card>

      <!-- 第二个卡片（错题题目） -->
      <el-card class="box-card">
        <div class="clearfix">
          <span class="titles">错题题目:</span>
          <span class="titles" style="margin-left: 480px">熟练度：</span>
          <el-progress
            :text-inside="true"
            :stroke-width="22"
            :percentage="parecentage"
            status="success"
            style="width: 200px; float: right; margin-top: 8px"
            >{{ proficiencypro(question.proficiency) }}</el-progress
          >
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 题目 -->
        <div style="float: left; margin-top: -25px; width: 60%">
          <P style="font-size: 25px">{{ question.title1 }}</P>
          <ul class="sty">
            <li
              v-for="item in question.title2"
              :key="item"
              style="text-indent: -37px"
            >
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
        <!-- 图片图例 -->
        <div style="float: right; width: 35%" v-show="imgdata">
          <img
            :src="imgdata"
            style="height: 100%; width: 100%"
            alt="域名下线或者冻结"
          />
        </div>
      </el-card>

      <!-- 第三个卡片（错题解析） -->
      <el-card class="box-cardpro">
        <div class="clearfix">
          <span class="titles">错题解析:</span>
        </div>
        <el-divider></el-divider>
        <div class="text item">
          <p>{{ question.answer }}</p>
        </div>
      </el-card>

      <!-- 第四个卡片（个人理解） -->
      <el-card class="box-cardfour">
        <div class="clearfix">
          <span class="titles">个人理解:</span>
          <span style="float: right">
            <el-button
              class="button-shanchu"
              type="danger"
              round
              @click="deleting"
              >删除题目</el-button
            ></span
          >
          <span style="float: right">
            <el-button
              type="success"
              class="button-xiugai"
              round
              @click="dialogFormVisible = true"
            >
              修改题目</el-button
            ></span
          >
          <el-dialog title="修改错题" :visible.sync="dialogFormVisible">
            <ModifyQuestionVue :question="this.question"></ModifyQuestionVue>
          </el-dialog>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <div class="text item">
          <p>{{ question.analysis }}</p>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
  
<script>
import ModifyQuestionVue from "./ModifyQuestion.vue";

export default {
  components: {
    ModifyQuestionVue,
  },
  data() {
    return {
      dialogFormVisible: false,
      question: [],
      parecentage: "",
      imgdata: "",
      recycleid: "",
    };
  },

  created() {
    this.$axios
      .get("/question/show" + "/" + this.$route.query.id)
      .then((res) => {
        this.question = res.data.data;
        this.imgdata = res.data.data.imagesrc;
        this.recycleid = res.data.data.inrecycle;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
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
    brief2(time) {
      if (time.length > 10) {
        return time.substr(0, 10);
      }
      return time;
    },

    proficiencypro(match) {
      if (match == 1) {
        return (this.parecentage = 20);
      } else if (match == 2) {
        return (this.parecentage = 40);
      } else if (match == 3) {
        return (this.parecentage = 60);
      } else if (match == 4) {
        return (this.parecentage = 80);
      } else if (match == 5) {
        return (this.parecentage = 100);
      }
    },
    imgshow() {
      if (this.imgdata == null) {
        this.imgdata = true;
      } else {
        this.imgdata = false;
      }
    },
    deleting() {
      if (this.question.inrecycle == 1) {
        this.$axios
          .get("/question/recycle" + "/" + this.question.questionid)
          .then((res) => {
            console.log(res);
            alert("彻底删除成功");
            this.$router.push({ path: "/index/removeQuestions" });
            // window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            alert("彻底删除失败");
          });
      } else {
        this.$axios
          .get("/question/deleteQuestion" + "/" + this.question.questionid)
          .then((res) => {
            console.log(res);
            alert("删除成功");
            this.$router.push({ path: "/index/viewQuestions" });
          })
          .catch((err) => {
            console.log(err);
            alert("删除失败");
          });
      }
    },
  },
};
</script>
  
<style scoped>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

.sty {
  list-style: none;
  margin-top: 0;
}

.box-cardmini {
  width: 980px;
  height: 63px;
  /* background: url("./imag1.jpg") no-repeat; */
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
}

.tutu {
  min-height: 100vh;

  margin: 0px;
  background: url("../../assets/img/ima4.png") no-repeat;
  /* background-color:#C7EDCC; */
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
}

.titles {
  font-family: STXingkai;
  font-size: 30px;
  color: rgb(42, 41, 41);
}

.text {
  font-size: 20px;
  color: black;
}

.item {
  margin-bottom: 5px;
  margin: 2px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 980px;
  /* height: 310px; */
  /* background: url("./imag1.jpg") no-repeat; */
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
}

.box-cardpro {
  width: 980px;
  /* height: 340px; */
  /* background: url("./imag1.jpg") no-repeat; */
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
}

.box-cardfour {
  width: 980px;
  /* height: 240px; */
  /* background: url("./imag1.jpg") no-repeat; */
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
}

.button-xiugai {
  margin-right: 10px;
  background-color: rgba(103, 194, 58, 0.3);
}
.button-xiugai:hover {
  background-color: rgba(103, 194, 58, 0.7);
}

.button-shanchu {
  background-color: rgba(245, 108, 108, 0.3);
}
.button-shanchu:hover {
  background-color: rgba(245, 108, 108, 0.7);
}
</style>
  