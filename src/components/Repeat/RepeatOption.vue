<template>
  <div style="padding: 29px">
    <div class="title">请选择你想要做的题目</div>
    <div class="title2">随机抽取5道题</div>
    <div class="option">
      <div class="optionittle">指定错题分类</div>
      <!-- TODO: -->
      <el-select
        class="optionitem"
        v-model="Option.classify"
        placeholder="请选择"
      >
        <el-option label="随机" value="随机"></el-option>
        <el-option label="英语" value="英语"></el-option>
        <el-option label="数学" value="数学"></el-option>
        <el-option label="政治" value="政治"></el-option>
        <el-option label="专业课" value="专业课"></el-option>
      </el-select>
      <div style="font-family: KaiTi; padding-left: 5px">
        默认为随机，随机即为不指定
      </div>
    </div>
    <div class="option">
      <div class="optionittle">指定错题类型（选择、非选择、随机）</div>
      <el-select class="optionitem" v-model="Option.types" placeholder="请选择">
        <el-option label="随机" value="2"></el-option>
        <el-option label="选择" value="1"></el-option>
        <el-option label="非选择" value="0"></el-option>
      </el-select>
      <div style="font-family: KaiTi; padding-left: 5px">
        默认为随机，随机即为不指定
      </div>
    </div>
    <div class="option">
      <div class="optionittle">请输入做题时长(单位：分钟)</div>
      <el-input v-model="Option.time" placeholder="请输入内容"></el-input>
      <div style="font-family: KaiTi; padding-left: 5px">
        默认为60分钟
      </div>
    </div>
    <div class="floorbox">
      <div class="floor">
        <el-button @click="cancel">取消</el-button>
        <el-button
          style="background-color: rgba(109, 49, 237, 0.907); color: #fff"
          @click="Enter"
          >进入答题</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    RepeatOptionVisible: {
      typeof: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Option: {
        classify: "随机",
        types: "2",
        time: 60,
      },
    };
  },
  created() {}, //初始化渲染请求
  watch: {}, //监听数据的变化，接受父组件的参数为对象时，需要深拷贝
  methods: {
    cancel() {
      this.$emit("update:RepeatOptionVisible", false);
    },
    Enter() {
      let params = this.Option;
      this.$router.push({ path: "/repeating", query: params });
    },
  }, //方法
  computed: {}, //计算
  mounted() {},
};
</script>
<style scoped>
.title {
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 7px;
}
.title2 {
  padding-left: 8px;
  padding-bottom: 30px;
}
.option {
  padding-bottom: 36px;
}
.optionittle {
  font-size: 16px;
  font-weight: 550;
  padding-bottom: 5px;
}
.optionitem {
  padding-bottom: 5px;
  width: 100%;
}
.floorbox {
  float: right;
}
.floor {
  position: relative;
  bottom: 3px;
}
</style>
