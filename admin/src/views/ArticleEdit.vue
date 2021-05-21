<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="category in categories" :key="category._id"
            :label="category.name" :value="category._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content" class="editor">
        <VueEditor v-model="model.content" :useCustomImageHandler="true"
          @image-added="handleImageAdded" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      rule: {
        name: [{ required: true, message: '请输入文章名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择文章头像', trigger: 'blur' }]
      },
      categories: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('reset/article', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`reset/article/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/article/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`reset/article/${this.id}`)
      this.model = data
    },
    async fetchCategory() {
      const { data } = await this.$http.get('reset/categories')
      this.categories = data
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const {
        data: { url }
      } = await this.$http.post('/upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    }
  },
  created() {
    this.fetchCategory()
    this.id && this.fetchData()
  }
}
</script>

<style lang="scss">
.editor {
  .el-form-item__content {
    line-height: 1;
    .ql-container.ql-snow {
      height: 400px;
    }
  }
}
</style>