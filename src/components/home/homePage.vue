
<template>
  <div class="whole">
    <div class="background">
      <div class="intro">
        <!-- <img style="display: flex;" src="../../assets/img/background2.png" alt=""> -->
        <h1>错题本系统</h1>
        <h3 style="line-height: 50px">
          一个致力于为学生提供一个可以记录错题和复习错题的平台
        </h3>
        <button class="addBtn" @click="dialogFormVisible = true">
          添加错题
        </button>
      </div>
    </div>

    <div class="chart">
      <!-- <div class="chartcontent"> -->
      <div class="left">
        <img
          src="https://pic.imgdb.cn/item/653c8a14c458853aef85d99a.jpg"
          alt=""
        />
      </div>
      <div class="right">
        <h2>图表统计功能</h2>
        <h3>Chart statistics function</h3>
        <router-link :to="{ name: 'home' }">
          <button class="homeBtn">个人主页</button>
        </router-link>

        <!-- </div> -->
      </div>
    </div>
    <div class="show">
      <div class="left">
        <h2>分类展示错题功能</h2>
        <h3>Classification display error function</h3>

        <router-link :to="{ name: 'viewQuestions' }">
          <button class="showBtn">错题分类</button></router-link
        >
      </div>
      <div class="right">
        <img
          src="https://pic.imgdb.cn/item/653c7ed7c458853aef5e0d5b.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="redo">
      <div class="left">
        <img
          src="https://pic.imgdb.cn/item/653c7e9bc458853aef5d3b0a.jpg"
          alt=""
        />
      </div>
      <div class="right">
        <h2>重做错题功能</h2>
        <h3>Redo error function</h3>
        <button class="redoBtn" @click="RepeatOptionVisible = true">
          重做错题
        </button>
      </div>
      <el-dialog :visible.sync="RepeatOptionVisible">
        <RepeatOptionVue
          :RepeatOptionVisible.sync="RepeatOptionVisible"
        ></RepeatOptionVue>
      </el-dialog>
      <el-dialog title="添加错题" :visible.sync="dialogFormVisible">
        <addQuestionVue></addQuestionVue>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import RepeatOptionVue from "@/components/Repeat/RepeatOption.vue";
import addQuestionVue from "@/components/add/addQuestions.vue";

export default {
  components: {
    addQuestionVue,
    RepeatOptionVue,
  },
  data() {
    return {
      RepeatOptionVisible: false,
      dialogFormVisible: false,
    };
  },
  created() {}, //初始化渲染请求
  watch: {}, //监听数据的变化，接受父组件的参数为对象时，需要深拷贝
  methods: {}, //方法
  computed: {}, //计算
  mounted() {},
};
</script>
<style scoped>
.whole * {
  margin: 0;
  padding: 0;
  /* background: url(../../assets/img/background2.png) repeat-y; */
}

.whole button {
  border-radius: 15px;
  height: 30px;
  border: none;
  background-color: rgb(109, 49, 237);
  color: white;
}
.whole .left {
  float: left;
}

.whole .right {
  float: left;
}

.right > img {
  width: 300px;
  padding-left: 150px;
}
.background {
  /* background: url(../../assets/img/background2.png)repeat-y ; */
}
.intro {
  height: 332px;
  background: url(../../assets/img/background2.png) repeat-y;
  background-color: rgb(245, 245, 245) !important;

  text-align: center;
}

.intro h1 {
  font-size: 50px;
  padding-top: 50px;
  padding-bottom: 15px;
}

.intro button {
  margin-top: 30px;
  width: 150px;
  height: 50px;
  font-size: 20px;
}

.chart {
  height: 230px;
  background: url(../../assets/img/background2.png) repeat-y;
  background-position-x: 700px;
  background-color: rgb(255, 255, 255);
  padding-top: 70px;
  box-shadow: 0px 0.51pxrgba (23, 26, 31, 0.178) f;
}

img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.chart .left {
  padding-left: 90px;
  width: 400px;
  height: 200px;
}

.chart .right {
  padding-left: 100px;
  width: 300px;
}

.whole h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.chart .right button {
  margin-top: 40px;
  width: 150px;
  height: 50px;
  font-size: 20px;
}

.show {
  margin-top: 50px;
  height: 280px;
  background-color: rgb(245, 245, 245) !important;
  padding-top: 90px;
  padding-left: 50px;
  background: url(../../assets/img/background2.png) no-repeat;
  background-position: 50px 60px;
}

.show .left {
  width: 460px;
  margin-left: 60px;
}

.show .left button {
  width: 150px;
  height: 50px;
  font-size: 20px;
  margin-top: 50px;
}

.redo {
  height: 300px;
  background-color: rgb(255, 255, 255);
  padding-top: 40px;
  background: url(../../assets/img/background2.png) repeat-y;
  background-position-x: 700px;
  background-position-y: 10px;
}

.redo .left {
  margin-left: 30px;
}

.redo .right {
  padding-left: 110px;
}

.redo .right button {
  width: 150px;
  height: 50px;
  font-size: 20px;
  margin-top: 30px;
}
</style>
