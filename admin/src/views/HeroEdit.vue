<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form :model="model" label-width="120px" :rules="rule"
      @submit.native.prevent="save('model')" ref="model">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息" :lazy="true">
          <el-form-item label="名称" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号" prop="title">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select v-model="model.category" multiple>
              <el-option v-for="category in categories" :key="category._id"
                :label="category.name" :value="category._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <!-- tag get baseURL -->
            <el-upload class="avatar-uploader" :action="uploadURL" :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- ques validate -->
          <el-form-item label="难度" prop="scores.difficult">
            <el-rate :max="9" v-model="model.scores.difficult" show-score
              style="margin-top:0.7rem;">
            </el-rate>
          </el-form-item>
          <el-form-item label="技巧" prop="scores.skills">
            <el-rate :max="9" v-model="model.scores.skills" show-score
              style="margin-top:0.7rem;">
            </el-rate>
          </el-form-item>
          <el-form-item label="攻击" prop="scores.attack">
            <el-rate :max="9" v-model="model.scores.attack" show-score
              style="margin-top:0.7rem;">
            </el-rate>
          </el-form-item>
          <el-form-item label="生存" prop="scores.survive">
            <el-rate :max="9" v-model="model.scores.survive" show-score
              style="margin-top:0.7rem;">
            </el-rate>
          </el-form-item>
          <el-form-item label="顺风出装" prop="items1">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" prop="items2">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name"
                :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" prop="usageTips">
            <el-input v-model="model.usageTips" type="textarea" resize="none"
              :autosize="{minRows:3,maxRows:6}">
            </el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" prop="battleTips">
            <el-input v-model="model.battleTips" type="textarea" resize="none"
              :autosize="{minRows:3,maxRows:6}">
            </el-input>
          </el-form-item>
          <el-form-item label="团战思路" prop="teamTips">
            <el-input v-model="model.teamTips" type="textarea" resize="none"
              :autosize="{minRows:3,maxRows:6}">
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="英雄关系" prop="partners">
            <el-input v-model="model.partners" type="textarea" resize="none"
              :autosize="{minRows:3,maxRows:6}">
            </el-input>
          </el-form-item> -->
        </el-tab-pane>
        <el-tab-pane label="技能详情" :lazy="true">
          <el-button type="primary" size="small" style="margin-bottom:1rem"
            @click="model.skills.push({})">添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :span="12" v-for="(skill,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="uploadURL"
                  :show-file-list="false" :on-success="res=>$set(skill,'icon',res.url)">
                  <img v-if="skill.icon" :src="skill.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="skill.description" type="textarea"
                  :autosize="{minRows:3,maxRows:4}" resize="none"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="skill.tips" type="textarea"
                  :autosize="{minRows:3,maxRows:4}" resize="none"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small"
                  @click="model.skills.splice(index,1)">删除技能
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
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
        name: '',
        title: '',
        avatar: '',
        scores: {},
        skills: []
      },
      rule: {
        name: [{ required: true, message: '请输入英雄名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入英雄称号', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择英雄分类', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请选择英雄头像', trigger: 'blur' }
        ],
        'scores.difficult': [
          { required: true, message: '请选择英雄难度', trigger: 'blur' }
        ],
        'scores.skills': [
          { required: true, message: '请选择英雄技巧', trigger: 'blur' }
        ],
        'scores.attack': [
          { required: true, message: '请选择英雄攻击', trigger: 'blur' }
        ],
        'scores.survive': [
          { required: true, message: '请选择英雄生存', trigger: 'blur' }
        ],
        items1: [
          { required: true, message: '请选择顺风出装', trigger: 'blur' }
        ],
        items2: [{ required: true, message: '请选择逆风出装', trigger: 'blur' }]
      },
      categories: [],
      items: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (!this.id) {
          await this.$http.post('reset/heroes', this[formName])
          this.$message.success('保存成功')
        } else {
          await this.$http.put(`reset/heroes/${this.id}`, this[formName])
          this.$message.success('更新成功')
        }
        this.$router.push('/heroes/list')
      })
    },
    async fetchData() {
      const { data } = await this.$http.get(`reset/heroes/${this.id}`)
      console.log(data)
      this.model = data
    },
    async fetchCategory() {
      const { data } = await this.$http.get('reset/categories')
      this.categories = data
    },
    async fetchItem() {
      const { data } = await this.$http.get('reset/items')
      this.items = data
    },
    afterUpload(res) {
      this.$set(this.model, 'avatar', res.url)
    }
  },
  created() {
    this.fetchCategory()
    this.fetchItem()
    this.id && this.fetchData()
  }
}
</script>
