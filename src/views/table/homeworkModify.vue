<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" prop="id" width="100" />
      <el-table-column align="center" label="作业名" prop="assignmentName" width="100" />
      <el-table-column align="center" label="作业描述" prop="assignmentDescription" />
      <el-table-column align="center" prop="deadline" label="截止时间" width="200" />
      <el-table-column align="center" label="修改">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="modify(scope.row)">修 改</el-button>
          <el-button type="primary" plain @click="deleteAssign(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog title="修改作业" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="作业ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="作业名" :label-width="formLabelWidth">
          <el-input v-model="form.assignmentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="作业描述" :label-width="formLabelWidth">
          <el-input v-model="form.assignmentDescription" autocomplete="off" />
        </el-form-item>
        <el-form-item label="截至时间" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-date-picker
              v-model="form.deadline"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="uploadAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">修改评分文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getHomeworkForModify, modifyHomework, deleteHomework } from '@/api/table'

export default {
  data() {
    return {
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      form: {
        assignmentName: '',
        id: '',
        assignmentDescription: '',
        deadline: ''
      },
      formLabelWidth: '120px',
      uploadAction: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHomeworkForModify().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    modify(param) {
      this.dialogFormVisible = true
      this.form.assignmentName = param.assignmentName
      this.form.assignmentDescription = param.assignmentDescription
      this.form.deadline = param.deadline
      this.form.id = param.id
    },
    onSubmit() {
      modifyHomework(this.form).then((response) => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        window.location.reload()
        this.dialogFormVisible = false
      })
    },
    submitUpload() {
      this.uploadAction = 'http://192.168.59.129:8080/FileUpload-0.0.1-SNAPSHOT/addRatingFile?Id=' + this.form.id
      this.$nextTick(() =>
        this.$refs.upload.submit())
    },
    deleteAssign(assignId) {
      deleteHomework(assignId).then((response) => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    }
  }
}
</script>
