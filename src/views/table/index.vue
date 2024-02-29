<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column v-if="false" label="作业Id" prop="id" />
      <el-table-column label="作业名" prop="assignmenttable.assignmentName" width="100" />
      <el-table-column label="作业描述" prop="assignmenttable.assignmentDescription" />
      <el-table-column id="submissionStatus" label="提交状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.submissionStatus | statusFilter">{{ scope.row.submissionStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="批阅状态" prop="gradingStatus" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gradingStatus | statusFilter">{{ scope.row.gradingStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="得分" width="110" align="center">
        <template slot-scope="scope">
          {{ getMaxValue(scope.row.score, scope.row.whiteBoxScore) }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="提交" width="110" align="center">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            action="http://192.168.59.129:8080/FileUpload-0.0.1-SNAPSHOT/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="2"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :data="uploadData"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary" @click="changeId(scope.row)">点击上传</el-button>
          </el-upload>
        </template>
        </el-upload>
      </el-table-column>
      <el-table-column align="center" prop="assignmenttable.deadline" label="截止时间" width="200" />
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { modifyHomework } from '@/api/homework'
import axios from 'axios'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Submitted: 'success',
        'Not Submitted': 'danger',
        Graded: 'success',
        'Not Graded': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      uploadData: {
        'id': null
      },
      rowData: null,
      files: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getMaxValue(value1, value2) {
      return Math.max(value1, value2)
    },
    fetchData() {
      this.listLoading = true
      getList(this.$store.getters.studentId).then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    beforeUpload(file) {
      // 限制只能上传 .war 文件
      if (!file.name.toLowerCase().endsWith('.war') && !file.name.toLowerCase().endsWith('.zip')) {
        this.$message.error('只能上传 .war 文件或者.zip文件')
        return false // 取消上传
      }
      return true // 允许上传
    },
    handleRemove(file, fileList) {
      axios.get('http://192.168.59.129:8080/FileUpload-0.0.1-SNAPSHOT/remove', {
        params: {
          file: file.name,
          id: this.rowData.id,
          StudentId: this.$store.getters.studentId
        }
      }).then(response => {
        if (response.data.code === 20000) {
          const requestBody = {
            'studentId': this.$store.getters.studentId,
            'assignmentId': this.rowData.id,
            'submissionStatus': 'Not Submitted',
            'gradingStatus': 'Not Graded',
            'score': 0
          }
          modifyHomework(requestBody)
          this.$message.success('删除成功')
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response) {
      if (response.code === 20000) {
        const requestBody = {
          'studentId': this.$store.getters.studentId,
          'assignmentId': this.rowData.id,
          'submissionStatus': 'Submitted',
          'gradingStatus': 'Not Graded',
          'score': 0
        }
        modifyHomework(requestBody)
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    changeId(row) {
      this.uploadData.id = row.id
      this.uploadData.StudentId = this.$store.getters.studentId
      this.rowData = row
    }
  }
}
</script>
<style>
.el-table td, .el-table th {
    text-align: center;
}
</style>
