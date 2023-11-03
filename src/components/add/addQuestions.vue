<template>
  <div class="mainDiv">
    <el-card style="margin-top: 20px" class="mainDiv">
      <el-form
        class="form"
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="题型" prop="typeOfquestion">
          <el-select
            class="item1"
            v-model="form.typeOfquestion"
            placeholder="选择题型"
          >
            <el-option label="选择题" value="选择题"></el-option>
            <el-option label="大题" value="大题"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学科" prop="classify">
          <el-select class="item1" v-model="form.classify" placeholder="请选择标签">
            <el-option label="英语" value="英语"></el-option>
            <el-option label="数学" value="数学"></el-option>
            <el-option label="政治" value="政治"></el-option>
            <el-option label="专业课" value="专业课"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item class="tagItem" label="标签">
            <el-tag
              :key="tag"
              v-for="tag in form.notes"
              closable
              :disable-transition="flase"
              @close="handleClose(tag)"
              >{{ tag }}</el-tag
            >
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputTagValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="$event.target.blur()"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >添加标签+</el-button
            >
          </el-form-item>
        </div>

        <el-form-item label="熟练度" class="flex-center">
          <div class="flex-center">
            <el-rate v-model="form.proficiency" show-text :texts="this.texts">
            </el-rate>
          </div>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 40px"
          label="题目描述"
          prop="title1"
        >
          <el-input
            class="inputItem1"
            type="textarea"
            :autosize="{ minRows: 6.8, maxRows: 6.8 }"
            v-model="form.title1"
          ></el-input>
        </el-form-item>
        <!-- 查看图片 -->
        <el-form-item class="upLoadPic">
          <uploadPic :picturl="form.imagesrc" ref="uploadPicRef"></uploadPic>
        </el-form-item>
        <!-- 选项 -->
        <el-form-item
          class="chooseItem"
          v-if="form.typeOfquestion === '选择题'"
          label="题目选项"
        >
          <el-radio-group v-model="choice">
            <el-radio :label="1">选项A</el-radio>
            <el-radio :label="2">选项B</el-radio>
            <el-radio :label="3">选项C</el-radio>
            <el-radio :label="4">选项D</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="choiceItem"
          v-if="form.typeOfquestion === '选择题'"
          label="选项内容"
        >
          <el-input
            class="choiceInput"
            v-if="choice === 1"
            type="textarea"
            :autosize="{ maxRows: 1 }"
            v-model="choiceA"
          ></el-input>
          <el-input
            class="choiceInput"
            v-if="choice === 2"
            type="textarea"
            :autosize="{ maxRows: 1 }"
            v-model="choiceB"
          ></el-input>
          <el-input
            class="choiceInput"
            v-if="choice === 3"
            type="textarea"
            :autosize="{ maxRows: 1 }"
            v-model="choiceC"
          ></el-input>
          <el-input
            class="choiceInput"
            v-if="choice === 4"
            type="textarea"
            :autosize="{ maxRows: 1 }"
            v-model="choiceD"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目解析" style="margin-bottom: 40px">
          <el-input
            class="inputItem2"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="form.answer"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人理解" style="margin-bottom: 40px">
          <el-input
            class="inputItem2"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="form.analysis"
          ></el-input>
        </el-form-item>
        <div class="buttonItem">
          <el-button
            type="primary"
            @click="handleInputChoice(), onSubmit('form')"
            >添加错题</el-button
          >
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form>
      <div class="picture">
        <imageViewer
          v-if="showPic === 'open'"
          :onClose="closePic"
          :urlList="[this.form.imagesrc]"
        ></imageViewer>
      </div>
    </el-card>
  </div>
</template> 

<script>
import uploadPic from '@/components/add/uploadPicture.vue';
export default {
  
  components: {
    uploadPic,
  },
  data() {
    var validatetypes = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择题型"));
      } else {
        callback();
      }
    };
    var validatesubject = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择科目"));
      } else {
        callback();
      }
    };
    var validatedescription = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写题目描述"));
      } else {
        console.log('value',value);
        callback();
      }
    };
    return {
     
      form: {
        titletype: "", //题型
        classifyid: "", //学科
        classify: "",
        notes: [], //标签
        title1: "", //题目
        title2: [], //选项
        analysis: "", //个人理解
        answer: "", //答案
        questiontime: "",
        imagesrc: "",
        proficiency: 1,
        typeOfquestion: "",
      },
      choice: 1,
      choiceContent: "",
      choiceA: "A.",
      choiceB: "B.",
      choiceC: "C.",
      choiceD: "D.",
      inputVisible: false,
      inputTagValue: "",
      showPic: "close",
      typeOfquestion: "",
      classify: "",
      texts: ["不理解", "理解", "较熟悉", "很熟悉", "完全掌握"],

      rules: {
          
          typeOfquestion: [
              {validator:validatetypes, trigger: 'change' }
            ],
          classify: [
            { validator: validatesubject,trigger: 'change' }
          ],
          title1: [
            { validator:validatedescription, trigger: 'blur' }
          ]
        }
    };
    
  },
  methods: {
    onSubmit(Form) {
      this.$refs[Form].validate((valid) => {
   
          if (valid) {   console.log('5555555');
      console.log("提交题目...");
      if (this.form.typeOfquestion === "选择题") {
        this.form.titletype = 1;
      } else {
        this.form.titletype = 0;
      }
      if (this.form.classify === "数学") {
        this.form.classifyid = 1;
      }
      if (this.form.classify === "英语") {
        this.form.classifyid = 2;
      }
      if (this.form.classify === "政治") {
        this.form.classifyid = 3;
      }
      if (this.form.classify === "专业课") {
        this.form.classifyid = 4;
      } 
      this.form.imagesrc = this.$refs.uploadPicRef.pictureUrl;
      this.form.questiontime = new Date();
    
      this.$axios({
        method: "post",
        url: "/question/addQuestion",
        data: this.$data.form,
      })
        .then((respon) => {
          //请求成功
          console.log(respon.data);
          // alert(respon.data)
          this.successMsg();
          // 跳转到详细页面
          this.$router.push({
            name: "viewquestion",
            query: { id: respon.data.data },
          });
        })
        .catch((error) => {
          //请求失败
          console.log(error.msg);
          this.errorMsg();
        });
      }})
    },
    successMsg() {
      this.$message("添加成功。");
    },
    errorMsg() {
      this.$message("添加失败。");
    },
    resetForm() {
      this.form.title1 = "";
      this.form.classify = "";
      this.form.typeOfquestion = "";
      this.form.notes = [];
      this.form.title2 = [];
      this.form.analysis = "";
      this.form.answer = "";
      this.$refs.uploadPicRef.resetForm1()
      this.form.imagesrc = "";
      this.form.proficiency = 1;
      this.$message.success("重置成功");
    },
    handleClose(tag) {
      this.form.notes.splice(this.form.notes.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputTagValue) {
        this.form.notes.push(this.inputTagValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleInputChoice() {
      this.form.title2 = [];
      if (this.form.typeOfquestion === "选择题") {
        this.form.title2.push(this.choiceA);
        this.form.title2.push(this.choiceB);
        this.form.title2.push(this.choiceC);
        this.form.title2.push(this.choiceD);
      }
    },
    showPcitrure() {
   
      this.form.imagesrc = this.$refs.uploadPicRef.pictureUrl;
         console.log("2222223",this.form.imagesrc);
         this.$data.showPic = "open";
    },
    closePic() {
      this.$data.showPic = "close";
    },
   
  },
};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
}
.picture {
  z-index: 200;
}
.mainDiv {
  /* width: 1500px; */
  display: flex;
  justify-content: center;
}
.inputItem1 {
  width: 435px;
  height: 170px;
  /* border: solid 1px */
}
.inputItem2 {
  width: 600px;
  height: 125px;
}
.choiceItem {
  width: 700px;
  height: 40px;
}
.choiceInput {
  width: 600px;
}
.form {
  width: 700px;
  float: left;
}
.buttonItem {
  margin: 0 auto;
  margin-left: 300px;
}
.item1 {
  width: 250px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.tagItem {
  height: 30px;
}
.chooseItem {
  height: 30px;
}
.upLoadPic {
  text-align: center;
  height: 170px;
}
</style>