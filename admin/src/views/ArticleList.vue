<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="ID" min-width="100px">
      </el-table-column>
      <el-table-column prop="title" label="文章名称" min-width="200px">
      </el-table-column>
      <el-table-column label="操作" min-width="100px">
        <template v-slot="{row}">
          <el-button type="text" size="small"
            @click="$router.push(`/article/edit/${row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('reset/article')
      this.tableData = data
    },
    remove(row) {
      this.$confirm(`是否确认删除文章 ${row.title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {
          data: { message }
        } = await this.$http.delete(`reset/article/${row._id}`)
        this.$message.success(message)
        this.fetchData()
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style>
</style>