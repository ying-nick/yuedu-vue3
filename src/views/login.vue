<template>
  <div class="container">
    <div class="form">
      <el-row>
        <el-col :span="14">
          <div class="formleft">
            <h1>登录悦读</h1>
            <el-form
              :model="Form"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="" prop="name">
                <el-input v-model="Form.name"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  v-model="Form.password"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="submitForm()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="formright">
            <h1>还没有注册账号？</h1>
            <el-button type="warning" @click="toregister">立即注册</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const { state, getters, dispatch, commit } = useStore();
    const router = useRouter();
    let Form = reactive({
      name: "",
      password: ""
    });
    let rules = {
      name: [{ min: 11, max: 11, message: "手机号码格式有误", trigger: "blur" }]
    };
    function submitForm() {
      let formobj = {
        name: Form.name,
        password: Form.password
      };
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg_tel.test(formobj.name)) {
        let login = async () => {
          let { data } = await zgaxios(
            "POST",
            `lgn/login/cellphone?phone=${Form.name}&password=${Form.password}`
          );
          if (data.code == 200) {
            let userinfo = {
              user: ""
            };
            let getuserinfo = async () => {
              let { data } = await zgaxios("POST", "lgn/user/account");
              userinfo.user = data.profile.nickname;
              let doAdd = () => {
                commit("adduserinfo");
              };
              doAdd()
            };
            getuserinfo();
            router.push("/home");
          } else {
            alert("密码或账号错误");
          }
        };
        login();
      }
    }
    function toregister() {
      router.push("/register");
    }
    return { Form, rules, submitForm, toregister,commit };
  }
});
</script>
<style lang="less" scoped>
.form {
  width: 50%;
  height: 300px;
  background-color: #fff;
  margin: 100px auto;
  // display: flex;
  .formleft {
    height: 500px;
    display: flex;
    flex-direction: column;
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
  .el-button {
    background-color: #f80;
    width: 50%;
    border-radius: 20px;
  }
}
</style>
