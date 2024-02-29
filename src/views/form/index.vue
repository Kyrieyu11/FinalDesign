<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="作业名">
        <el-input v-model="form.assignmentName" />
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="12"> <el-date-picker
          v-model="form.deadline"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
        /></el-col>

      </el-form-item>

      <el-form-item label="作业描述">
        <el-input v-model="form.assignmentDescription" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item label="评分文件">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :action="uploadAction"
          multiple
          :auto-upload="false"
          title="点击上传文件"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将RatingFile.txt拖到此处，或<em>点击上传</em></div>
        </el-upload></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { addHomework } from '@/api/table'

export default {
  data() {
    return {
      uploadAction: '',
      form: {
        assignmentName: '',
        deadline: '',
        assignmentDescription: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick: function(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      addHomework(this.form).then((response) => {
        const id = response.data
        this.uploadAction = 'http://192.168.59.129:8080/FileUpload-0.0.1-SNAPSHOT/addRatingFile?Id=' + id
        this.$nextTick(() =>
          this.$refs.upload.submit())
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.app-container{
  overflow:hidden ;
}
</style>

