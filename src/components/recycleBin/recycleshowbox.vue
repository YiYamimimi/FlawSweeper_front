<template >
  <el-card class="box-card">
    <div class="contentShow">
      <router-link
        :to="{
          name: 'viewquestion',
          query: { id: question.questionid },
        }"
      >
        <!-- 学科类型和题目 -->
        <p>
          <el-tag class="subjectTag" :type="subjectStyle(classifyidToShow)">
            {{ classifyidToShow }}
          </el-tag>
          {{ brief(question.title1) }}
        </p>
      </router-link>
    </div>
    <!-- 题型分类和时间 -->
    <div class="centerShow">
      <div class="centerItem">
        {{ typeShow }}
      </div>
      <div class="centerItem">
        <div class="el-icon-time">{{ TimeShow }}</div>
      </div>
      <div>
        <el-rate
          class="centerItem"
          style="margin-left: 10px"
          :value="question.proficiency"
          show-text
          :texts="this.texts"
          disabled
        >
        </el-rate>
      </div>
    </div>

    <!-- 标签和其他入口 -->
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
      <div class="otherEnter">
        <!-- 恢复按钮 -->
        <el-button
          type="warning"
          plain
          icon="el-icon-refresh"
          circle
          @click="recover"
        ></el-button>
        <!-- 彻底删除按钮 -->
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          circle
          @click="deleted"
        ></el-button>
      </div>
    </el-row>

    <div class="concer">
      <span v-if="question.imagesrc.length > 1" @click="showPho()">pics</span>
    </div>

    <imageViewer
      v-if="showPic === 'open'"
      :onClose="closePic"
      :urlList="[this.pictureUrl]"
    >
      a
    </imageViewer>
  </el-card>
</template>
    
  <script>
export default {
  props: {
    question: {
      questionid: Number,
      classifyid: Number,
      titletype: Number,
      questiontime: String,
      notes: Array,
      title1: String,
      proficiency: Number,
      imagesrc: String,
    },
  },
  components: {
    imageViewer: () => import("element-ui/packages/image/src/image-viewer.vue"),
  },
  data() {
    return {
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
    brief(content) {
      if (content.length > 80) {
        return content.substr(0, 80) + "...";
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
    //点击按钮实现从回收站恢复错题
    recover() {
      this.$axios
        .get("/question/recoverQuestion" + "/" + this.question.questionid)
        .then((res) => {
          console.log(res);
          alert("恢复成功");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert("恢复失败");
        });
    },

    deleted() {
      this.$axios
        .get("/question/recycle" + "/" + this.question.questionid)
        .then((res) => {
          console.log(res);
          alert("彻底删除成功");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert("彻底删除失败");
        });
    },
  },
};
</script>
    
  <style scoped>
a {
  text-decoration: none;
  color: #000;
}

.box-card {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 13px;
  position: relative;
  overflow: hidden;
}

.tagShow {
  width: 50px;
  display: flex;
}

.subjectTag {
  margin-right: 10px;
  margin-bottom: 3px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.centerItem + .centerItem {
  margin-left: 10px;
}

.contentShow {
  font-size: 21px;
}

.centerItem {
  margin: 10px 0;
  color: #c5c5c5;
}

.centerShow {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.otherEnter {
  width: 150px;
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
</style>