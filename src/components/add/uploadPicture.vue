<template>
  <el-upload
    action="http://localhost:8082/question/image"
    :on-success="handleSuccess"
    :show-file-list="false"
  >
    <div class="upload_picture">
      <i v-if="!pictureUrl" class="el-icon-plus"></i>
      <img width="100%" :src="pictureUrl" alt="" />
    </div>
  </el-upload>
</template>

<script>
export default {
  props: {
    picturl: {
      type: String,
    },
  },
  data() {
    return {
      pictureUrl: "",
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.pictureUrl = response;
    },
  },
  created() {
    if (this.picturl != null) {
      this.pictureUrl = this.picturl;
    }
  },
};
</script>

<style scoped>
.upload_picture {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 4px;
  border: 1px solid;
}
.el-icon-plus {
  position: absolute;
  top: 67px;
  left: 67px;
}
</style>

