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
                <el-input v-model="Form.ctcode" @input="checkcode"></el-input>
                <el-button type="warning" @click="sendcode">
                  发送验证码</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button
                  type="warning"
                  @click="register"
                  :disabled="state.flag"
                  >立即注册</el-button
                >
                <el-button type="warning" @click="returntologin"
                  >返回登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10"> </el-col>
      </el-row>
    </div>
  </div>
  <el-button :plain="true" @click="open4"></el-button>
  <el-button :plain="true" @click="open5"></el-button>
  <el-button :plain="true" @click="open6"></el-button>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import zgaxios from "@/tools/zgaxios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const router = useRouter();
    let rules = reactive({
      name: [
        { min: 11, max: 11, message: "手机号码格式有误", trigger: "blur" }
      ],
      ctcode: [{ min: 4, max: 4, message: "验证码格式有误", trigger: "blur" }]
    });
    function open4() {
      ElMessage.error("您已经注册过了哦");
    }
    function open5(data) {
      ElMessage.error(data);
    }
    function open6(data) {
      ElMessage(data);
    }
    let Form = reactive({
      name: "",
      password: "",
      ctcode: ""
    });
    let state = reactive({
      nickname: "",
      exist: "",
      flag: true,
      message: ""
    });

    //发送验证码
    function sendcode() {
      if (!Form.name || !Form.password) {
        state.message = "请正确填写";
        open5(state.message);
        return;
      }
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      let reg_pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (reg_tel.test(Form.name) == false) {
        state.message = "手机号码格式不正确";
        open5(state.message);
        return;
      }
      if (reg_pass.test(Form.password) == false) {
        state.message = "密码格式不正确";
        open5(state.message);
        return;
      }
      let checknumber = async () => {
        let { data } = await zgaxios(
          "POST",
          `lgn/cellphone/existence/check?phone=${Form.name}`
        );
        if (data.code == 200) {
          state.exist = data.exist;
        }
      };
      checknumber().then(() => {
        if (state.exist == "1") {
          state.message = "此号码已经注册过了，请直接登陆";
          open5(state.message);
        } else {
          let getcode = async () => {
            let { data } = await zgaxios(
              "POST",
              `lgn/captcha/sent?phone=${Form.name}`
            );
            if (data.code == 200) {
              state.message = "验证码发送成功，请查收";
              open6(state.message);
            }
          };
          getcode();
        }
      });
    }
    function checkcode() {
      if (!Form.name || !Form.password) return;
      if (Form.ctcode.length == 4) {
        let checkcode2 = async () => {
          let { data } = await zgaxios(
            "POST",
            `lgn/captcha/verify?phone=${Form.name}&captcha=${Form.ctcode}`
          );
          if (data.code == 200) {
            state.flag = false;
          }
        };
        checkcode2();
      } else {
        state.flag = true;
      }
    }
    //注册
    function register() {
      let { nickname }: any = state;
      nickname = parseInt(Form.name + Math.random() * 100);
      let toregister = async () => {
        let result = await zgaxios(
          "POST",
          `lgn/register/cellphone?phone=${Form.name}&password=${Form.password}&captcha=${Form.ctcode}&nickname=${nickname}`
        );
        if ((result.data.code = 200)) {
          state.message = "恭喜你注册成功！";
          open6(state.message);
          router.push("/login");
        }
      };
      toregister();
    }
    function returntologin() {
      router.push("/login");
    }
    return {
      checkcode,
      rules,
      state,
      Form,
      sendcode,
      register,
      open4,
      open5,
      open6,
      returntologin
    };
  }
});
</script>
<style lang="less" scoped>
.form {
  width: 50%;
  height: 500px;
  background-color: #fff;
  margin: 100px auto;
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
