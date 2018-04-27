<template>
  <div class="spec-list prop-box">
    <!--添加规格-->
    <div class="add-spec prop">
      <el-form :model="ruleForm" ref="ruleForm" label-width="160px">
        <el-form-item label="售前客服">
          <table>
            <tr>
              <th>客服名称</th>
              <th>客服工具</th>
              <th>客服账号</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in ruleForm.before">
              <td class="sele-s">
                <el-input v-model="item.name"></el-input>
              </td>
              <td class="sele-s">
                <el-select v-model.number="item.type" placeholder="请选择">
                  <el-option label="QQ" :value="0"></el-option>
                </el-select>
              </td>
              <td class="sele-s">
                <el-input v-model="item.account"></el-input>
              </td>
              <td class="sele-s">
                <el-button type="danger" size="small" icon="delete"
                           @click="del_spec_value(item.key,0)">删除
                </el-button>
              </td>
            </tr>
          </table>
          <el-button @click="add_spec_value(0)">新增客服</el-button>
        </el-form-item>
        <el-form-item label="售后客服">
          <table>
            <tr>
              <th>客服名称</th>
              <th>客服工具</th>
              <th>客服账号</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in ruleForm.after">
              <td class="sele-s">
                <el-input v-model="item.name"></el-input>
              </td>
              <td class="sele-s">
                <el-select v-model.number="item.type" placeholder="请选择">
                  <el-option label="QQ" :value="0"></el-option>
                </el-select>
              </td>
              <td class="sele-s">
                <el-input v-model="item.account"></el-input>
              </td>
              <td class="sele-s">
                <el-button type="danger" size="small" icon="delete"
                           @click="del_spec_value(item.key,1)">删除
                </el-button>
              </td>
            </tr>
          </table>
          <el-button @click="add_spec_value(1)">新增客服</el-button>
        </el-form-item>
        <el-form-item label="工作时间">
          <p class="c-danger">例：工作时间 AM 10:00 - PM 18:00</p>
          <el-input class="ser-time" v-model="ruleForm.work_time" placeholder="请按格式输入工作时间"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `客服设置有售前售后两部分，客服工具默认为QQ。`
        }, // 提示模块参数
        ruleForm: {
          before: [],
          after: [],
          work_time: '', // 工作时间描述    例： 工作时间 AM 10:00 - PM 18:00
        }, // 编辑页面表单数据
        id: null, // 所编辑规格id
        loading: false
      }
    },
    created() {
      this.get_spec()
    },
    methods: {
      // 获取列表
      get_spec() {
        this.axios.post(this.getApi('seller/auth/shop_service')
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.ruleForm.before = res.data.before || [];
            this.ruleForm.after = res.data.after || [];
            this.ruleForm.work_time = res.data.work_time;
          } else {
            this.$message(res.data.msg)
          }
        }).catch(() => {
          this.loading = false;
        })
      },
      // 添加规格值
      add_spec_value(val) {
        if (val == 0) {
          this.ruleForm.before.push({
            name: '',
            account: '',
            type: 0,
            key: Date.now()
          })
        } else {
          this.ruleForm.after.push({
            name: '',
            account: '',
            type: 0,
            key: Date.now()
          })
        }
      },
      // 删除规格值
      del_spec_value(key, val) {
        let arr = [];
        if (val == 0) {
          this.ruleForm.before.forEach(item => {
            if (item.key != key) {
              arr.push(item);
            }
          });
          this.ruleForm.before = arr;
        } else {
          this.ruleForm.after.forEach(item => {
            if (item.key != key) {
              arr.push(item);
            }
          });
          this.ruleForm.after = arr;
        }
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/shop_service_save'),
                this.dafa({
                  before: this.ruleForm.before,
                  after: this.ruleForm.after,
                  work_time: this.ruleForm.work_time
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.add_show = false;
                }
              }).catch(err => {
                reject(err);
                console.log(err);
                // this.$message('对不起！请稍后再试 错误信息已在控制台打印')
              })
            })
          } else {
            this.$message('请检查填写信息是否有误');
            return false
          }
        })
      }
    },
    computed: {},
    components: {
      hint
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sele-s .el-button {
    width: 120px;
    height: 36px;
    margin: 0;
  }

</style>
