<template>
  <div class="fa-bg">
    <!-- 搜索框 -->
    <div id="wrap">
      <div class="search-box1">
        <!--        题目搜索-->
        <el-select
            filterable
            v-model="value"
            placeholder="请选择搜索类型"
            @change="getValue($event)"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
        <el-form>
          <el-input
              placeholder="请输入关键字"
              v-model="searchText"
              @keyup.enter.native="handleSearch"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleSearch"
            ></el-button>
          </el-input>
        </el-form>
      </div>
    </div>
    <!-- 题目列表 -->
    <showboxVue v-for="question in questionList" :key="question.questionid" :question="question"></showboxVue>

    <!-- 分页组件 -->
    <div class="footer">
      <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[6, 10, 15, 20]"
          :page-size="limit"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import showboxVue from "@/components/view/showbox.vue";

export default {
  components: {
    showboxVue,
  },
  name: "questionIndex",
  data() {
    return {
      questionList: [],
      subjectname: "",
      page: 1,
      limit: 6,
      total: 0,
      searchText: "",
      selectValue: "",
      options: [
        {
          value: "选项1",
          label: "题目",
        },
        {
          value: "选项2",
          label: "标签",
        },
      ],
      value: "题目",
    };
  },
  created() {
    this.fetchData();

  },
  methods: {
    getValue(val) {
      let obj = {};
      obj = this.options.find((item) => {
        return item.value === val;
      });
      this.value = obj.label;
    },
    //学科标签对应的标签颜色
    subjectStyle(subjectname) {
      if (subjectname === "数学") {
        return "";
      } else if (subjectname === "英语") {
        return "success";
      } else if (subjectname === "专业课") {
        return "warning";
      } else if (subjectname === "政治") {
        return "danger";
      }
    },
    fetchData() {
      this.$axios
          .get("/question/pagebycollect" + this.addPath)
          .then((res) => {
            this.questionList = res.data.data.row;
            this.total = res.data.data.totalCount;
            console.log(res);
            console.log(this.questionList);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    titleDate() {
      this.$axios
          .get("/search/selectcollectbytitle" + this.addPath2)
          .then((res) => {
            // console.log("titleDate",res);
            this.questionList = res.data.data.row;
            this.total = res.data.data.totalCount;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    noteDate() {
      this.$axios
          .get("/search/selectcollectbynote" + this.addPath2)
          .then((res) => {
            console.log(res);
            this.questionList = res.data.data.row;
            this.total = res.data.data.totalCount;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.page = 1;
      if (this.searchText) {
        this.handleSearch();
      } else {
        this.fetchData();
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      if (this.searchText) {
        this.handleSearch();
      } else {
        this.fetchData();
      }
    },
    handleSearch() {
      if (this.value == "题目" && this.searchText) {
        this.titleDate();
      } else {
        this.fetchData();
      }
      if (this.value == "标签" && this.searchText) {
        this.noteDate();
      } else {
        this.fetchData();
      }
    },
  },
  mounted() {
    if (this.$route.query.id == 1) {
      this.subjectname = "数学";
    }
    if (this.$route.query.id == 2) {
      this.subjectname = "英语";
    }
    if (this.$route.query.id == 3) {
      this.subjectname = "政治";
    }
    if (this.$route.query.id == 4) {
      this.subjectname = "专业课";
    }
  },
  computed: {
    addPath() {
      return "/" + this.page + "/" + this.limit;
    },
    addPath2() {
      return (

          "/" +
          this.searchText +
          "/" +
          this.page +
          "/" +
          this.limit
      );
    },
  },
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0;
}
#wrap {
  width: 100%;
  height: 80px;
  background-color: white;
  border: solid 1px white;
  position: sticky;
  top: 0px;
  z-index: 1000;
  margin-bottom: 20px;
}
#back {
  display: flex;
  float: left;
  justify-content: center;
  margin-top: 20px;
  margin-left: 20px;
}
input {
  width: 400px;
}
a {
  text-decoration: none;
  color: #000;
}

/* .router-link-active {
  text-decoration: none;
} */
.fa-bg{
  background: url(../../assets/img/background2.png) ;
}
.box-card {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 13px;
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
  /* width: 700px; */
  font-size: 21px;
  /* color: darkseagreen; */
}

.centerItem {
  margin: 10px 0;
  color: #c5c5c5;
}

.centerShow {
  display: flex;
  margin-bottom: 5px;
}

.otherEnter {
  width: 200px;
}
.footer {
  width: 100%;
  background-color: white;
  border: solid 1px white;
  position: sticky;
  bottom: 2px;
  z-index: 0;
  margin-bottom: 70px;
}
.search-box1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
}

button:hover {
  background-color: #0062cc;
  cursor: pointer;
}
</style>
