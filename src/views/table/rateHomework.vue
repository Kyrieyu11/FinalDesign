<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column v-if="false" label="作业Id" prop="id" align="center" />
      <el-table-column label="作业名" prop="assignmentName" width="150" align="center" />
      <el-table-column label="作业描述" prop="assignmentDescription" align="center" />
      <el-table-column label="自动评分" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="useRequest(scope.row.id)">请求评分</el-button>
        </template>
      </el-table-column>
      <el-table-column label="中间文件评分" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="useRateFiles(scope.row.id)">中间文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发送请求" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="请求地址" :label-width="formLabelWidth">
          <el-input v-model="form.addr" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="请求方式" :label-width="formLabelWidth">
          <el-radio v-model="form.method" label="Get">Get</el-radio>
          <el-radio v-model="form.method" label="Post">Post</el-radio>
        </el-form-item>
        <el-form-item v-if="form.method === 'Get'" label="请求头内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.message"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item v-if="form.method === 'Post'" label="请求体内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.message"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="期望返回内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.result"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" style="margin-left: 100px;">
          <el-button type="primary" @click="SendRequest()">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, userRateFile, sendRequest } from '@/api/rate'
export default {
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      form: {
        addr: '',
        message: '',
        method: '',
        result: '',
        assignId: '',
        path:''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList().then((response) => {
        this.list = response.data
      })
    },
    useRateFiles(assignId) {
      userRateFile(assignId).then((response) => {
        this.$message.success('测评成功')
      })
    },
    useRequest(assignId) {
      this.dialogFormVisible = true
      this.form.assignId = assignId
      this.form.addr = 'http://192.168.59.129:8080/homework/' + assignId
    },
    SendRequest() {
      sendRequest(this.form).then((response) => {
        this.$message.success('测评成功')
      })
    }
  }
}
</script>
