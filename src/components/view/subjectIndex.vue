<template>
  <div class="subjectIndex">
    <el-card
      class="box-card"
      v-for="item in subjectList"
      :key="item.classifyid"
    >
      <div class="contentShow">
        <router-link
          :to="{ path: '/questionIndex', query: { id: item.classifyid } }"
        >
          <div class="big_box">
            <div class="left_box">
              <p>
                <el-tag
                  class="subjectTag"
                  :type="subjectStyle(item.classifyname)"
                >
                  <span class="fontSize">
                    {{ item.classifyname }}
                  </span>
                </el-tag>
              </p>
              总计题目：{{ item.datacount }}
            </div>
            <div class="right_box"><img :src="picture" /></div>
          </div>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "subjectIndex",
  data() {
    return {
      subjectList: [],
      picture: "https://pic36.photophoto.cn/20150709/0005018723474601_b.jpg",
    };
  },
  created() {
    this.$axios
      .get("/question/selectbyclassify")
      .then((res) => {
        console.log(res);
        this.subjectList = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    brief1(total) {
      return total;
    },
    //学科标签对应的标签颜色
    subjectStyle(classifyname) {
      if (classifyname === "数学") {
        return "";
      } else if (classifyname === "英语") {
        return "success";
      } else if (classifyname === "专业课") {
        return "warning";
      } else if (classifyname === "政治") {
        return "danger";
      }
    },
  },
};
</script>

<style scoped>
.big_box {
  width: 60%;
  height: 270px;
}
.left_box {
  float: left;
}
.right_box {
  float: right;
  width: 200px;
}
</style>
<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.box-card {
  width: 60%;
  height: 250px;
  margin: 0 auto;
  margin-bottom: 13px;
}
.contentShow {
  font-size: 25px;
}

.fontSize {
  font-size: 25px;
}
</style>
