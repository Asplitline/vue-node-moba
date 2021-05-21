<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" size="small" style="margin-bottom:1rem"
          @click="model.items.push({})">添加广告
        </el-button>
      </el-form-item>
      <el-row type="flex" style="flex-wrap:wrap;">
        <el-col :span="12" v-for="(item,index) in model.items" :key="index">
          <el-form-item label="封面">
            <el-upload class="avatar-uploader" :action="uploadURL" :show-file-list="false"
              :on-success="res=>$set(item,'cover',res.url)" :headers="getAuthHeaders()">
              <img v-if="item.cover" :src="item.cover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="model.items.splice(index,1)">
              删除广告
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="success" native-type="submit" size="small">保存</el-button>
      </el-form-item>
      </el-tabs>
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
      model: {
        items: []
      },
      rule: {
        name: [{ required: true, message: '请输入广告名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择广告头像', trigger: 'blur' }]
      }
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('reset/ads', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`reset/ads/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/ads/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`reset/ads/${this.id}`)
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
