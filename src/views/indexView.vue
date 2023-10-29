<template>
  <el-container>
    <el-header height="82px">
      <div class="header-left">
        <img src="../assets/img/log.png" alt="" />
        <div class="text">错题系统</div>
      </div>
      <div class="header-right">
        <div class="header-menu">
          <el-tooltip  effect="dark" content="添加错题" placement="bottom">
            <el-button
              style=" background-color: rgba(109, 49, 237, 0.896);color: #fff;"
              size="small"
              icon="el-icon-plus"
              circle
              plain
              @click="dialogFormVisible = true"
            ></el-button>
          </el-tooltip>
            <div style="font-size: 15px;color: rgba(109, 49, 237, 0.907);padding-top: 6px ;font-weight: 550;">添加错题</div>
            <el-dialog title="添加错题" :visible.sync="dialogFormVisible">
            <addQuestionVue></addQuestionVue>
          </el-dialog>
        </div>
        <div class="header-menu">
          <el-tooltip  effect="dark" content="重做错题" placement="bottom">
          <el-button
            style="line-height: 20px; top: 5px; padding-right: 20px;border-radius: 25px;background-color: rgba(109, 49, 237, 0.907);color: #fff;"
            icon="el-icon-edit"
            plain
            @click="RepeatOptionVisible = true"
            >重做错题</el-button
          ></el-tooltip>
         
           <el-dialog :visible.sync="RepeatOptionVisible">
            <RepeatOptionVue :RepeatOptionVisible.sync="RepeatOptionVisible"></RepeatOptionVue>
          </el-dialog>
        </div>
        <!-- <el-avatar src="../assets/img/user.jpg"></el-avatar> -->
        <img src="../assets/img/user.jpg" alt="" />
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 210px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              router
              default-active="/homepage/"
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
                <span slot="title">个人页面</span>
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
import RepeatOptionVue from '@/components/Repeat/RepeatOption.vue';
import addQuestionVue from "../components/add/addQuestions.vue";

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
  /* line-height: 62px; */
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
  top: 18px;
}
.text {
  position: absolute;
  top: 22px;
  left: 75px;
  font-family: Poppins;
  font-size: 28px;
  font-weight: 900;
  line-height: 28px;
  color: #323743ff; /* neutral-700 */
}
.header-menu {
  padding-top: 10px;  
  padding-right: 25px;
}
.header-menu > button {
  font-size: 16px;
  font-weight: 500;
  position:relative;
  font-family: Poppins;
  left: 9px;
}
.header-right {
  float: right;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 2px;
}
.header-right > img {
  margin-left: 13px;
  margin-top: 18px;
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