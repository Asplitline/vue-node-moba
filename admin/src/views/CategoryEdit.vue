<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-form-item label="上级分类" prop="parent">
        <el-select v-model="model.parent">
          <el-option v-for="option in parentOptions" :key="option._id" :value="option._id"
            :label="option.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      rule: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
        // parent: [{ required: true, message: '请选择上级分类', trigger: 'blur' }]
      },
      parentOptions: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('/categories', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`/categories/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/categories/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`/categories/${this.id}`)
      this.model = data
    },
    async fetchParentOptions() {
      const { data } = await this.$http.get('/categories')
      this.parentOptions = data
    }
  },
  created() {
    this.id && this.fetchData()
    this.fetchParentOptions()
  }
}
</script>

<style>
</style>