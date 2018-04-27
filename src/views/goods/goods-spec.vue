<template>
  <div class="spec-list prop-box">
    <!--商品规格-->
    <div class="m-spec-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>商品规格
        <div class="u-right">
          <el-select clearable @change="getFL($event,1)"
                     v-model="cly.id1" placeholder="一级分类">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cly.list1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable v-model="cly.id2" placeholder="二级分类" @change="getFL($event,2)">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cly.list2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable v-model="cly.id3" placeholder="三级分类" @change="get_spec">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cly.list3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </h2>
      <el-table
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        ref="multipleTable">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="规格名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit_spec(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加规格-->
    <div class="add-spec prop" v-if="add_show">
      <crumb :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px">
        <el-form-item label="规格值">
          <table>
            <tr>
              <th>规格值</th>
              <th>排序</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in ruleForm.value">
              <td class="sele-s">
                <el-input v-model="item.name" placeholder="请输入规格值名称"></el-input>
              </td>
              <td class="sele-s">
                <el-input v-model="item.sort" placeholder="请输入排序数值"></el-input>
              </td>
              <td class="sele-s">
                <el-button type="danger" size="small" icon="delete"
                           @click="del_spec_value(item.id,item.key)">删除
                </el-button>
              </td>
            </tr>
          </table>
          <el-button @click="add_spec_value">新增属性</el-button>
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
  import crumb from '@/components/crumb.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `商品的属性为商品说明参数，仅供展示。商品的规格为商品购买时必须选择的参数，商品规格是购买商品时用户可以选择的, 如衣服颜色, 尺寸等。需要选定一个三级分类才会出现相关规格。`
        }, // 提示模块参数
        cly: {
          id1: '',
          list1: [],
          id2: '',
          list2: [],
          id3: '',
          list3: []
        }, // 三级分类信息
        tableData: [], // 表格数据
        add_show: false, // 是否弹出分类编辑页面
        crumb: {
          from: '商品规格',
          now: '编辑规格'
        }, // 面包屑模块参数
        ruleForm: {
          name: '',
          note: '',
          sort: '',
          value: []
        }, // 编辑页面表单数据
        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '请输入规格备注', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '不能为空'},
            {type: 'number', message: '必须为数字值'}
          ]
        }, // 验证规则
        id: '', // 所编辑规格id
        loading: false
      }
    },
    created() {
      this.getFL(0, 0)
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false
      },
      /**
       *options
       *val 所传id
       * lv 区分分类级别 0 1 2
       */
      getFL(val, lv) {
        this.loading = true;
        this.axios.post(this.getApi('coms/get_cate'),
          `id=${val}`
        ).then(res => {
          if (res.data.code === 0) {
            switch (lv) {
              case 0:
                this.cly.list1 = res.data.list;
                break;
              case 1:
                this.cly.list2 = res.data.list;
                this.cly.list3 = [];
                this.cly.id2 = '';
                this.cly.id3 = '';
                break;
              case 2:
                this.cly.list3 = res.data.list;
                this.cly.id3 = '';
            }
          } else {
            this.$message(res.data.msg)
          }
        })
      },
      // 获取商品规格列表
      get_spec(id) {
        this.axios.post(this.getApi('seller/auth/specs_list'),
          `cate_id=${id}`
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableData = res.data.specs;
          } else {
            this.$message(res.data.msg)
          }
        }).catch(() => {
          this.loading = false;
        })
      },
      // 编辑规格
      edit_spec(item) {
        this.add_show = true;
        this.id = item.id;
        this.ruleForm.value = item.value;
      },
      // 添加规格值
      add_spec_value() {
        this.ruleForm.value.push({
          name: '',
          img: '',
          sort: '',
          key: Date.now()
        })
      },
      // 删除规格值
      del_spec_value(id, key) {
        let arr = [];
        if (id) {
          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/specs_value_del'),
              `id=${id}`
            ).then(res => {
              resolve(res);
              if (res.data.code === 0) {
                // this.$message(res.data.msg);
                this.ruleForm.value.forEach(item => {
                  if (item.id != id) {
                    arr.push(item);
                  }
                });
                this.ruleForm.value = arr;
              }
            }).catch(err => {
              reject(err);
              // this.$message('对不起！请稍后再试')
            })
          })
        } else {
          this.ruleForm.value.forEach(item => {
            if (item.key != key) {
              arr.push(item);
            }
          });
          this.ruleForm.value = arr;
        }
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 处理数据
            this.tableData.forEach(item => {
              if (item.id == this.id) {
                item.value = this.ruleForm.value
              }
            });

            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/specs_value_save'),
                this.dafa({
                  specs: this.tableData
                })
              ).then(res => {
                resolve(res);
                if (res.data.code === 0) {
                  this.add_show = false;
                }
              }).catch(err => {
                reject(err);
              })
            })
          } else {
            this.$message('请检查填写信息是否有误');
            return false
          }
        })
      }
    },
    computed: {
      index() {
        return this.$store.state.index
      }
    },
    components: {
      hint, crumb
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
