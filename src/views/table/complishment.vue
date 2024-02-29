<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" prop="id" width="100" />
      <el-table-column align="center" label="作业名" prop="assignmentName" width="100" />
      <el-table-column align="center" label="完成情况" prop="complished" :formatter="showNumber" />
      <el-table-column align="center" label="查看分数">
        <template slot-scope="scope">
          <el-button type="primary" @click="getScore(scope.row.id)">查看成绩</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="未完成人员名单" prop="uncomplishedStudent" :formatter="showUncomplishedStudent" />
    </el-table>
    <el-dialog title="得分情况" :visible.sync="dialogTableVisible">
      <el-table :data="ScoreList" style="width: 100%" border>
        <el-table-column property="name" label="姓名" />
        <el-table-column property="Score" label="请求得分" />
        <el-table-column property="white_box_score" label="中间文件得分" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getAllAssignments, getAllScore } from '@/api/table'
export default {
  data() {
    return {
      list: null, dialogTableVisible: false,
      ScoreList: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAllAssignments().then((response) => {
        this.list = response.data
      })
    },
    getScore(id) {
      this.dialogTableVisible = true
      getAllScore(id).then((response) => {
        this.ScoreList = response.data
      })
    },
    showNumber(cellValue) {
      return cellValue.complished + '/' + this.list[0].allStudent
    },
    showUncomplishedStudent(cellValue) {
      return cellValue.uncomplishedStudent + ' '
    }
  }
}
</script>
<style>
.el-table .cell {
  display: flex;
  justify-content: center;
}

.el-dialog__title {
  display: flex;
  justify-content: center;
}

.el-table th>.cell {
  display: flex;
}
</style>
