import axios from "axios";
import QS from "qs";

//设置超时时间
axios.defaults.timeout = 20000;
// post请求头
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers.post["Content-Type"] = "application/json";
//请求携带cookie
//axios.defaults.withCredentials = true;

//对外接口
export default function zgaxios(method, url, params) {
  if (method == "GET") {
    return get(url, params);
  } else if (method == "POST") {
    return post(url, params);
  }
}

// 封装get方法
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

// 封装post方法  {name:"xiaoming",age:123}  --->  name=xiaoming&age=123
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

//请求的拦截器
axios.interceptors.request.use(
  function(response) {
    //console.log("请求执行之前",response)
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应的拦截器
axios.interceptors.response.use(
  response => {
    // console.log("响应处理之前",response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
