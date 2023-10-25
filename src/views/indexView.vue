<template>
  <el-container>
    <el-header height="68px">
      <div class="header-left">
        <img src="../assets/img/log.png" alt="" />
        <div class="text">错题系统</div>
      </div>
      <div class="header-right">
        <div class="header-menu">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
          ></el-button>
        </div>
        <div class="header-menu">
          <router-link to="/index/addquestions">
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              @click="dialogFormVisible = true"
              >添加错题</el-button
            >
            <el-dialog title="添加错题" :visible.sync="dialogFormVisible">
              <addQuestionVue></addQuestionVue>
            </el-dialog>
          </router-link>
        </div>
        <img src="../assets/img/user.jpg" alt="" />
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 210px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              router
              default-active="/index/"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#FAFAFBFF"
              text-color="#000000"
              active-text-color=" #565D6DFF"
            >
            <el-menu-item index="/homepage/">
                <i
                  class="el-icon-house"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/index/">
                <i
                  class="el-icon-house"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title">个人</span>
              </el-menu-item>
              <el-menu-item index="/index/addquestions">
                <i
                  class="el-icon-circle-plus-outline"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title"> 添加错题</span>
              </el-menu-item>
              <el-menu-item index="/index/viewQuestions">
                <i
                  class="el-icon-reading"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title"> 查看错题 </span>
              </el-menu-item>
              <el-menu-item index="/index/loveQuestions">
                <i
                  class="el-icon-star-off"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title">收藏夹</span>
              </el-menu-item>

              <el-menu-item index="/index/removeQuestions">
                <i
                  class="el-icon-delete"
                  style="font-size: 23px; width: 25px; padding-top: 4px"
                ></i>
                <span slot="title">回收站</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="elmain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import addQuestionVue from "../components/add/addQuestions.vue";
export default {
  components: {
    addQuestionVue,
  },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.elmain {
  padding-top: 0;
  margin-top: 20px;
}
body,
html {
  height: 100%;
  margin: 0;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #fafafbff;
  height: 100%;
}

/* header */
.el-header {
  background-color: #ffffff;
  line-height: 62px;
  color: #6d31edff;
  box-shadow: 0px 0px 1px #171a1f;
  /* color:#88b1da */
}
/* .header-menu{
  position: absolute; 
  top: 11px; 
  left: 1100px; 
  height: 44px; 
  padding: 0 16px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-family: Manrope; 
  font-size: 16px; 
  font-weight: 400; 
  line-height: 26px; 
  color: #6D31EDFF; 
  background: #00000000;
  opacity: 1; 
  border-radius: 4px; 
  border-width: 1px; 
  border-color: #6D31EDFF;
  border-style: solid; 
  gap: 6px; 
} */
.header-left {
  font-weight: bold;
  float: left;
  font-size: 30px;
  height: 100%;
  box-shadow: 1px #171a1f;
}
.header-left > img {
  position: absolute;
  top: 15px;
}
.text {
  position: absolute;
  top: 18px;
  left: 75px;
  font-family: Poppins;
  font-size: 28px;
  font-weight: 700;
  line-height: 28px;
  color: #323743ff; /* neutral-700 */
}
.header-menu {
  /* padding-top: 10px; */
  padding-right: 25px;
}
.header-menu > button {
  color: #fff;
  font-size: 12px;
  font-weight: 100;
}
.header-right {
  float: right;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 2px;
}
.header-right > img {
  /* margin-left: 15px; */
  margin-top: 12px;
  width: 40px;
  height: 40px;
  border-radius: 45px;
}

.el-menu {
  padding: 17px;
}
.el-menu-item {
  font-size: 21px;
  height: 70px;
}

.el-menu-item > span {
  width: 100px;
  display: inline-block;
  /* text-align: center; */
}
.el-menu-item:hover {
  color: #409eff !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #6d31edff !important;
  font-weight: 400 !important;
  border-radius: 8px !important;
}
</style>