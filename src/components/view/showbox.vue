<!--  -->
<template>
  <el-card class="box-card1">
  
      <div >
        <!-- 学科类型和题目 -->
  
         
        <div class="centerShow"> 
          <el-tag class="tagShow" :type="subjectStyle(classifyidToShow)">
            {{ classifyidToShow }}
          </el-tag>
          <div class="centerItem ">
            {{ typeShow }}
          </div>
          <div class="centerItem">
            
  
            <div class="el-icon-time">{{ TimeShow }}</div>  
          </div>
          <div class="centerItem"><el-tooltip class="item" effect="dark" content="点击查看图片" placement="top">
            <i v-if="question.imagesrc.length > 1" @click="showPho()" class="el-icon-zoom-in"></i></el-tooltip>
          </div>
          <div  class="centerItemright">
            <el-rate
            
              style="margin-left: 10px; display: block;"
              :value="question.proficiency"
              show-text
              :texts="this.texts"
              disabled
            >
            </el-rate>
          </div>
        </div>
        <router-link
      :to="{
        name: 'viewquestion',
        query: { id: question.questionid },
      }"
    >  
        <div class="contentShow" style="height: 70px;line-height: 70px;font-size: 25px; "> {{ brief(question.title1) }}</div>
      </router-link>  
      </div>
      <!-- 题型分类和时间 -->

      <!-- 标签 -->
      <el-row type="flex" class="row-bg" justify="space-between">
        <div class="tagShow">
          <el-tag
            effect="plain"
            size="small"
            class="tagItem"
            v-for="tag in question.notes"
            :key="tag"
          >
            {{ tag }}
          </el-tag>
        </div>
        <!-- 其他按钮 -->
        <div class="otherEnter">
          <!-- 编辑 -->
          <el-button
            class="first-button"
            type="primary"
            plain
            icon="el-icon-edit"
            circle
            @click="dialogFormVisible = true"
          ></el-button>
          <el-dialog title="修改错题" :visible.sync="dialogFormVisible">
            <ModifyQuestionVue :question="this.question"></ModifyQuestionVue>
          </el-dialog>

          <!-- 收藏 -->
          <el-button
            v-if="this.question.incollect == 0"
            type="warning"
            plain
            icon="el-icon-star-off"
            @click="like()"
            circle
          ></el-button>
          <el-button
            v-else
            type="warning"
            plain
            icon="el-icon-star-on"
            @click="like()"
            circle
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            circle
            @click="deletedata()"
          ></el-button>
        </div>
      </el-row>

      <!-- 放大图片 -->
     
    <imageViewer
      v-if="showPic === 'open'"
      :onClose="closePic"
      :urlList="[this.pictureUrl]"
    >
      
    </imageViewer>
  </el-card>
</template>
  
<script>
import ModifyQuestionVue from "./ModifyQuestion.vue";

export default {
  props: {
    question: {
      type: Object,
      // questionid: Number,
      // classifyid: Number,
      // titletype: Number,
      // questiontime: String,
      // notes: Array,
      // title1: String,
      // proficiency: Number,
      // imagesrc: String,
    },
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ModifyQuestionVue,
    imageViewer: () => import("element-ui/packages/image/src/image-viewer.vue"),
  },
  data() {
    return {
      // 是否展示对话框
      dialogFormVisible: false,
      texts: ["不理解", "理解", "较熟悉", "很熟悉", "完全掌握"],
      showPic: "close",
      pictureUrl: "",
    };
  },
  computed: {
    typeShow() {
      if (this.question.titletype == 0) {
        return "大题";
      } else return "选择题";
    },
    TimeShow() {
      return this.question.questiontime.substr(0, 10);
    },
    classifyidToShow() {
      if (this.question.classifyid == 1) {
        return "数学";
      }
      if (this.question.classifyid == 2) {
        return "英语";
      }
      if (this.question.classifyid == 3) {
        return "政治";
      }
      if (this.question.classifyid == 4) {
        return "专业课";
      } else return "";
    },
  },
  methods: {
    like() {
      var ids = this.question.questionid;
      var inner = this.question.incollect;

      if (inner == 0) {
        this.$axios.get("/question/IntoCollect/" + ids).then((res) => {
          if (res) {
            this.incollect = 1;
            this.$router.go(0);

            this.$message({
              message: "收藏成功",
              type: "success",
            });
            // console.log("收藏成功");
          } else {
            console.log("err");
          }
        });
      } else {
        this.$axios.get("/question/deleteCollect/" + ids).then((res) => {
          if (res) {
            this.incollect = 0;
            this.$router.go(0);

            this.$message({
              message: "取消收藏成功",
              type: "success",
            });
            // console.log("取消收藏成功");
          } else {
            console.log("err");
          }
        });
      }
    },
    //删除数据到回收站中
    deletedata() {
      this.$axios
        .get("/question/deleteQuestion" + "/" + this.question.questionid)
        .then((res) => {
          console.log(res);
          alert("删除成功");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert("删除失败");
        });
    },
    // 修改前的数据修改
    beforeModify() {},
    // 截断题目显示
    brief(content) {
      if (content.length > 20) {
        return content.substr(0, 20) + "...";
      }
      return content;
    },

    //点击pic展示图片
    showPho() {
      this.pictureUrl = this.question.imagesrc;
      this.$data.showPic = "open";
    },
    closePic() {
      this.$data.showPic = "close";
    },

    //学科标签对应的标签颜色
    subjectStyle(classifyidToShow) {
      if (classifyidToShow === "数学") {
        return "";
      } else if (classifyidToShow === "英语") {
        return "success";
      } else if (classifyidToShow === "专业课") {
        return "warning";
      } else if (classifyidToShow === "政治") {
        return "danger";
      }
    },
  },
};
</script>
  
<style scoped>
a {
  text-decoration: none;
  color: #000;
}

.box-card1 {
  border-radius: 20px;
  width: 50%;
  margin: 0 auto; 
  margin-bottom: 13px;
  position: relative;
  overflow: hidden;
}

.tagShow {
  width: 50px;
  display: flex;
  float: left;
}

.subjectTag {
  /* margin-right: 10px;
  margin-bottom: 3px; */
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.centerItem + .centerItem {
  margin-left: 10px;
}

.contentShow {
  font-size: 2px;
}
.centerItemright{
  float: right;
  left: 300px;
}
.centerItem {
  float: left;
  padding:8px;
  color: #c5c5c5;
  /* margin-right: 25px; */
}

.centerShow {
  /* display: flex; */
  align-items: center;
  margin-bottom: 5px;
  overflow: hidden;
}

.otherEnter {
  /* width: 200px; */
  float: right;
  left: 300px;
}

.concer {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  right: -50px;
  transform: rotate(45deg);
}

.concer span {
  position: absolute;
  bottom: 0;
  display: block;
  font-size: 16px;
  color: #fff;
  background: #36a8ff;
  width: 100px;
  text-align: center;
  cursor: pointer;
  cursor: hand;
}

.first-button {
  margin-right: 10px;
}

.tixing {
  width: 80px;
}
</style>