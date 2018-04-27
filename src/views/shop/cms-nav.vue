<template>
  <div class="type-list prop-box">
    <!--广告位-->
    <div class="m-type-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>导航管理
        <el-button type="text" icon="plus" size="small" class="add-role-btn add-btn" @click="edit_cms('')">添加导航
        </el-button>
      </h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
           type="selection"
           width="55">
         </el-table-column>-->
        <el-table-column
          prop="name"
          label="导航名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="open"
          label="打开方式"
          min-width="100">
          <template slot-scope="scope">
            <span v-if=" scope.row.open == 0 ">本窗口</span>
            <span v-else>新窗口</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="show"
          label="是否显示"
          min-width="100">
          <template slot-scope="scope">
            <span v-if=" scope.row.show == 0 ">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          min-width="70">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="edit" @click="edit_cms(scope.row.id)">编辑
            </el-button>
            <el-button type="danger" size="small" icon="delete" @click="del_cms(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="select-all" v-if="tableData">
        <el-button :plain="true" type="primary" @click="toggleSelection()">取消</el-button>
        <el-button :plain="true" :disabled="multipleSelection.length==0" type="danger"
                   @click="del_cms('all')">删除
        </el-button>
      </div>-->
    </div>
    <!--添加-->
    <div class="add-type prop" v-if="add_show">
      <crumb :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px">
        <el-form-item label="导航名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="导航链接地址">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="打开方式 ">
          <el-select v-model="ruleForm.open" placeholder="请选择">
            <el-option label="本窗口" :value="0"></el-option>
            <el-option label="新窗口" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select v-model="ruleForm.show" placeholder="请选择">
            <el-option label="否" :value="0"></el-option>
            <el-option label="是" :value="1"></el-option>
          </el-select>
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
          content: `导航管理，有商家设置管理。`
        }, // 提示模块参数
        tableData: [], // 表格数据
        multipleSelection: [], // 选中列
        add_show: false, // 是否弹出分类编辑页面
        crumb: {
          from: '导航管理',
          now: '导航编辑'
        }, // 面包屑模块参数
        ruleForm: {
          name: '',
          url: '',
          type: '',
          show: 1,
          sort: 1,
          open: 0
        }, // 编辑页面表单数据
        rules: {
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '不能为空'}
          ]
        }, // 验证规则
        id: '', // 所编辑id
        del_id: [], // 删除储存数组
        loading: true
      }
    },
    created() {
      this.get_cms()
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false
      },
      // 获取列表
      get_cms() {
        this.axios.post(this.getApi('seller/auth/shop_nav_list')
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableData = res.data.list;
          } else {
            this.$message(res.data.msg)
          }
        }).catch(() => {
          this.loading = false;
          this.$message('对不起！请稍后再试')
        })
      },
      // 编辑
      edit_cms(id) {
        this.id = id;
        this.antiShake.antiShake((resolve, reject) => {
          this.axios.post(this.getApi('seller/auth/shop_nav_edit'),
            `id=${id}`
          ).then(res => {
            resolve(res);
            if (res.data.code === 0) {
              this.add_show = true;
              this.ruleForm = res.data.info;
            }
          }).catch((err) => {
            reject(err);
            // this.$message('对不起！请稍后再试')
          })
        });
      },
      // 取消选择
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      // 收集选中列
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 删除
      del_cms(id) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /* if (id === 'all') {
             this.multipleSelection.forEach(item => {
               this.del_id.push(item.id)
             })
           } else {
             this.del_id.push(id)
           }*/
          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/shop_nav_del'),
              this.dafa({
                id: id
              })
            ).then(res => {
              resolve(res);
              this.del_id = [];
              if (res.data.code === 0) {
                this.get_cms();
              } else {
                this.toggleSelection();
              }
            }).catch((err) => {
              console.log(err);
              this.$message('对不起！请稍后再试');
              this.toggleSelection();
              this.del_id = []
            })
          })
        }).catch(() => {
          this.toggleSelection();
          this.del_id = [];
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 提交表单
      submitForm(formName) {
        // 处理提交所需规格数据格式
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/shop_nav_save'),
                this.dafa({
                  id: this.id,
                  name: this.ruleForm.name,
                  url: this.ruleForm.url,
                  open: this.ruleForm.open,
                  sort: this.ruleForm.sort,
                  show: this.ruleForm.show
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.add_show = false;
                  this.get_cms()
                }
              }).catch(err => {
                reject(err);
                console.log(err);
                // this.$message('对不起！请稍后再试。具体错误已打印在控制台')
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
      /* index () {
       return this.$store.state.index
       }*/
    },
    components: {
      hint, crumb
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table img {
    width: 35px;
    height: 35px;
    background-color: #1cadf1;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    background-color: #ededed;
  }
</style>

