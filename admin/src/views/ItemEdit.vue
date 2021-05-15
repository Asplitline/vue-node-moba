<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <!-- tag get baseURL -->
        <el-upload class="avatar-uploader" :action="uploadURL" :show-file-list="false"
          :on-success="afterSuccess">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        name: [{ required: true, message: '请输入物品名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择物品头像', trigger: 'blur' }]
      },
      parentOptions: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('reset/items', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`reset/items/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/items/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`reset/items/${this.id}`)
      this.model = data
    },
    afterSuccess(res) {
      this.$set(this.model, 'icon', res.url)
    }
  },
  created() {
    this.id && this.fetchData()
  }
}
</script>
