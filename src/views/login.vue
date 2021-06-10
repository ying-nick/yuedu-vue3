<template>
  <div class="container">
    <div class="form">
      <el-row>
        <el-col :span="14">
          <div class="formleft">
            <h1>登录悦读</h1>
            <el-form
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input v-model="ruleForm.password" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >登录</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="formright">
            还没有注册账号？ 立即注册
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    let ruleForm = reactive({
      name: "",
      password:''
    
    });
    let rules = {
      name: [
        { min: 13, max: 13, message: "手机号码格式有误", trigger: "blur" }
      ],
       password: [
        { min: 6, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
      ],
    
    };
    function submitForm(formName: any) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    }
    function resetForm(formName: any) {
      // this.$refs[formName].resetFields();
    }
    return { ruleForm, rules, submitForm, resetForm };
  }
});
</script>
<style lang="less" scoped>

  .form {
    width: 50%;
    height: 500px;
    background-color: #fff;
    margin: 50px auto;
    // display: flex;
    .formleft {
      height: 500px;
      h1{
        margin-left: 30%;
        height: 50px;
        line-height: 50px;
      }
      .el-form{
        .el-input{
          width: 50%;
        }
      }
    }
    .formright {
      height: 500px;

    }
  }

</style>
