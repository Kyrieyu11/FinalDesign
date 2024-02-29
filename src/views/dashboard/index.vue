
<template>
  <el-container>
    <el-main>
      <div class="all-grid-content bg-purple-dark">
        <div class="div-center" style="margin:15%">
          <el-row :gutter="10">
            <el-col :span="6" :pull="1">
              <div class="grid-content bg-purple">姓名:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ name }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :pull="1">
              <div class="grid-content bg-purple">年龄:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ age }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :pull="1">
              <div id="Id" class="grid-content bg-purple">学号:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ stuendId }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :pull="1">
              <div id="course" class="grid-content bg-purple">课程:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ major }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :pull="1">
              <div class="grid-content bg-purple">学院:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ college }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="lottieBox" class="div-image" />
    </el-main>
  </el-container>
</template>
<script>
import * as studentanimationData from '@/assets/male.json'
import * as teacheranimationData from '@/assets/teacher.json'
import lottie from 'lottie-web'
export default {
  data() {
    return {
      name: null,
      age: null,
      stuendId: null,
      major: null,
      college: null,
      url: ''
    }
  },
  mounted() {
    this.name = this.$store.getters.name
    this.age = this.$store.getters.age
    this.stuendId = this.$store.getters.studentId
    this.major = this.$store.getters.major
    this.college = this.$store.getters.college
    if (this.$store.getters.studentId.startsWith('S')) {
      this.lottieInitStudent()
    } else {
      this.lottieInitTeacher()
      document.getElementById('Id').innerText = '工号:'
      document.getElementById('course').innerText = '授课'
    }
  },
  methods: {
    lottieInitStudent() {
      this.lottie = lottie.loadAnimation({
        container: document.getElementById('lottieBox'),
        renderer: 'svg',
        loop: true,
        animationData: studentanimationData.default, // 如果是本地的json,使用animationData，并且注意后面需要加.default
        // path:`https//www.baidu.com/lottie/data.json`, // 加载远端路径则使用path
        autoplay: true

      })
    },
    lottieInitTeacher() {
      this.lottie = lottie.loadAnimation({
        container: document.getElementById('lottieBox'),
        renderer: 'svg',
        loop: true,
        animationData: teacheranimationData.default, // 如果是本地的json,使用animationData，并且注意后面需要加.default
        // path:`https//www.baidu.com/lottie/data.json`, // 加载远端路径则使用path
        autoplay: true

      })
    }
  }
}
</script>
<style>
.div-image{
  height: 60vh;
  width: 50vh;
  margin-left: 160px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.el-col {
  font-family: "PingFang SC";
  font-size: larger;
}

.bg-purple-dark {
  background: #99a9ab;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  display: flex;
  border-radius: 0px;
  min-height: 36px;
  justify-content: left;
  align-items: center;
  min-width: 100px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.demo-image{
  display: flex;
}

.el-main {
  height: 83vh;
  margin: 25px;
  border:1.5px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  display: flex;
}

.all-grid-content{
  display: flex;
  align-content: center;
  justify-content: center;
  border:0px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  height: 70vh;
  width: 60vh;
  margin-left: 50px;
  margin-top: 20px;
}

</style>
