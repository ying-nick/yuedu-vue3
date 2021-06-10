<template>
  <div class="container">
    <div class="form">
      <el-row>
        <el-col :span="14">
          <div class="formleft">
            <h1>注册账号</h1>
            <el-form
              :model="Form"
              :rules="rules"
              label-width="150px"
              class="demo-ruleForm"
            >
              <el-form-item label="请输入手机号码" prop="name">
                <el-input v-model="Form.name"></el-input>
              </el-form-item>
              <el-form-item label="请输入密码" prop="password">
                <el-input
                  v-model="Form.password"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入验证码" prop="ctcode">
                <el-input v-model="Form.ctcode"></el-input>
                 <el-button type="warning">发送验证码</el-button>
              </el-form-item>
               <el-form-item label="请输入昵称" prop="nickname">
                <el-input v-model="Form.nickname"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register()"
                  >立即注册</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10"> </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    let Form = reactive({
      name: "",
      password: "",
      ctcode:'',
      nickname:''
    });
    let rules = {
      name: [{ min: 11, max: 11, message: "手机号码格式有误", trigger: "blur" }]
    };
    function register() {
      let formobj = {
        name: Form.name,
        password: Form.password
      };
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      let reg_pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (reg_tel.test(formobj.name)&&reg_pass.test(formobj.password)) {
          
      }
    }
    return { Form, rules, register };
  }
});
</script>
<style lang="less" scoped>
.form {
  width: 50%;
  height: 500px;
  background-color: #fff;
  margin: 100px auto;
  // display: flex;
  .formleft {
    height: 500px;
    h1 {
      margin-left: 30%;
      height: 50px;
      line-height: 50px;
    }
    .el-form {
      .el-input {
        width: 50%;
      }
    }
  }
  .formright {
    height: 500px;
  }
}
</style>
