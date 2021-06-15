<template>
  <div class="container">
    <div class="content">
      <el-row>
        <el-col :span="18">
          <div class="head">
            <div class="title">镇魂街</div>
          </div>
          <div class="introduce">
            <el-row>
              <el-col :span="6" class="bookpicture">
                <img
                  src="https://cover-oss.u17i.com/2010/11/2786_1290484999_44z22704KDLT.sbig.jpg"
                  alt=""
                />
              </el-col>
              <el-col :span="18" class="bookintroduce">
                <div class="tag">
                  <el-button type="success" round plain size="small"
                    >少年</el-button
                  >
                  <el-button type="success" round plain size="small"
                    >三国</el-button
                  >
                  <el-button type="success" round plain size="small"
                    >热血</el-button
                  >
                  <el-button type="success" round plain size="small"
                    >杀必死</el-button
                  >
                  <el-button type="success" round plain size="small"
                    >古风</el-button
                  >
                  <el-button type="success" round plain size="small"
                    >格斗</el-button
                  >
                </div>
                <div class="status">
                  <el-row>
                    <el-col :span="6"><div>状态：连载中</div></el-col>
                    <el-col :span="6"><div>总点击：50.94亿</div></el-col>
                    <el-col :span="6"><div>总月票：2758114</div></el-col>
                    <el-col :span="6"><div>最后更新： 一周内</div></el-col>
                  </el-row>
                </div>
                <div class="introducecontent">
                  镇魂街乃吸纳亡灵镇压恶灵之地。这是一个人灵共存的世界，但不是每个人都能进入镇魂街，只有拥有守护灵的寄灵人才可进入。夏铃原本是一名普通的大学实习生，但一次偶然导致她的人生从此...
                </div>
                <div class="button">
                  <el-row>
                    <el-col :span="8"
                      ><div class="startread">开始阅读</div></el-col
                    >
                    <el-col :span="8"
                      ><div class="addtobookshelf">加入书架</div></el-col
                    >
                    <el-col :span="8"><div class="vote">投月票</div></el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="author">
            <div class="info">
              <el-row>
                <el-col :span="8" class="avatar">
                  <img
                    src="http://avatar.u17i.com/2010/0816/2786_882d854b637b5a15158a443afe73cebb_1281889937.big.jpg"
                    alt=""
                  />
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    许辰
                  </div>
                  <div class="count">
                    作品：5部
                  </div>
                </el-col>
              </el-row>
              <div class="tip">
                每月1号,11号,21号上传新章节，或于隔日早晨更新。谢谢大家支持!!
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="middle">
        <el-row>
          <el-col :span="5">
            <div class="leftsheet"></div>
          </el-col>
          <el-col :span="19"><div class="rightcontent"></div> </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  background: url("https://static.u17i.com/v4/www/images/comicinfo/zhenhunjie_bg_donghua.jpg")
    no-repeat;
}
.content {
  width: 60%;
  height: 3000px;
  min-width: 1050px;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  top: 500px;
}
.head {
  border-bottom: 1px solid red;
  .title {
    font-size: 30px;
    font-weight: bolder;
    margin-left: 30px;
  }
}
.introduce {
  width: 90%;
  margin: 10px auto;
  height: 300px;
  .bookpicture {
    img {
      width: 160px;
      height: 210px;
    }
  }
  .bookintroduce {
  }
}
.status {
  margin-top: 10px;
}
.introducecontent {
  margin-top: 20px;
  color: #999;
}
.button {
  height: 100px;
  line-height: 100px;
  text-align: center;

  .startread {
    background-color: #ff444f;
    color: white;
    font-size: 20px;
    width: 163px;
    height: 49px;
    line-height: 49px;
    margin-top: 45px;
    border-bottom: 4px solid #e76971;
    border-radius: 5px;
    cursor: pointer;
  }
  .startread:hover {
    background-color: rgb(224, 125, 125);
  }
  .addtobookshelf {
    cursor: pointer;
    width: 163px;
    color: white;
    font-size: 20px;
    height: 49px;
    line-height: 49px;
    background-color: #6ed8db;
    margin-top: 45px;
    border-radius: 5px;
    border-bottom: 4px solid #2eb0a2;
  }
  .addtobookshelf:hover {
    background-color: #5ad0d4;
  }
  .vote {
    cursor: pointer;
    width: 163px;
    height: 49px;
    color: white;
    font-size: 20px;
    line-height: 49px;
    background-color: #c150e6;
    margin-top: 45px;
    border-radius: 5px;
    border-bottom: 4px solid #ac2a90;
  }
  .vote:hover {
    background-color: #c770e4;
  }
}
.info {
  margin-top: 50px;
  .avatar {
    img {
      width: 94px;
      height: 94px;
    }
  }
  .name {
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .count {
    margin-left: 20px;
  }
  .tip {
    margin-top: 40px;
    padding-top: 30px;
    padding-left: 10px;
    height: 100px;
    border: 1px dashed #999;
  }
}
.middle {
 
  .leftsheet{
      height: 1000px;
      border: 1px solid #e3e3e3 ;
  }
  .rightcontent{
       width: 95%;
       margin-left: 25px;
       height: 1000px;
       border: 10px solid #e3e3e3;
       
  }
}
</style>
