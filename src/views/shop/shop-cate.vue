<template>
  <div class="admin prop-box">
    <!--店铺分类列表-->
    <div class="m-admin m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>店铺分类列表
        <el-button type="text" icon="plus" size="small" class="add-admin-btn add-btn" @click="editData('')">添加分类
        </el-button>
      </h2>
      <h3 class="fl-tit"><span class="fl-name">分类名称</span><span
        class="fl-item">排序</span><span class="fl-item">显示</span><span class="fl-item">操作</span></h3>
      <div class="fl-con">
        <div class="fl-dd" v-for="item in tableData">
          <p class="clear-fl">
            <span class="fl-name"><i class="iconfont icon-shanchu4 fl-i" @click="item._open_ = !item._open_"></i>
            <em class="fl-name-box">{{item.name}}</em>
              <el-button size="mini" type="info" @click="editData('')">新增下级</el-button></span>
            <span class="fl-item">{{item.sort}}</span>
            <template v-if="item.show == 0">
              <span class="fl-item">不显示</span>
            </template>
            <template v-else>
              <span class="fl-item">显示</span>
            </template>
            <span class="fl-item">
            <el-button type="primary" size="mini" @click="editData(item.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delData(item.id)">删除</el-button>
          </span></p>
          <p class="clear-fl" v-for="ite in item.childs" v-if="item._open_">
          <span class="fl-name"><i class="iconfont icon-dian2 fl-i-w"></i>
            <em class="fl-name-box">{{ite.name}}</em></span>
            <span class="fl-item">{{ite.sort}}</span>
            <template v-if="ite.show == 0">
              <span class="fl-item">不显示</span>
            </template>
            <template v-else>
              <span class="fl-item">显示</span>
            </template>
            <span class="fl-item">
            <el-button type="primary" size="mini" @click="editData(ite.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delData(ite.id)">删除</el-button>
          </span>
          </p>
        </div>
      </div>
    </div>
    <!--添加管理员-->
    <el-dialog
      title="选择经营分类"
      :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input class="el-ipt" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="pid">
          <el-select class="el-ipt" v-model="ruleForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in fl"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input class="el-ipt" v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="show">
          <el-switch
            v-model="ruleForm.show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `导航管理，有商家设置管理。`
        }, // 提示模块参数
        tableData: [], // 表格数据
        dialogVisible: false, // 是否弹出页面
        ruleForm: {
          id: '', // 分类ID
          pid: 0, // 上级分类ID
          name: '', // 分类名称
          sort: '', // 排序  降序
          show: 0 // 是否显示  0=不显示 1=显示
        },
        rules: {
          name: [
            {required: true, message: '请输入分类名', trigger: 'blur'}
          ],
          pid: [
            {required: true, type: 'number', message: '请选择上级分类', trigger: 'blur'}
          ]
        },
        id: '', // 所编辑id
        fl: [],
        loading: true
      }
    },
    created() {
      this.getDataList();
    },
    methods: {
      // 请求列表
      getDataList() {
        this.axios.post(this.getApi('seller/auth/shop_cate_list')
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            res.data.list.forEach(item => {
              item._open_ = true; // 定义节点是否展开
            });
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
      editData(id = '') {
        this.id = id;
        this.dialogVisible = true;
        this.antiShake.antiShake((resolve, reject) => {
          this.axios.post(this.getApi('seller/auth/shop_cate_edit'),
            `id=${id}`
          ).then(res => {
            resolve(res);
            if (res.data.code === 0) {
              // 合并对象 存在覆盖
              this.ruleForm = Object.assign(this.ruleForm, res.data.info);
              /*if (res.data.info.name) {
                this.ruleForm = res.data.info;
              } else {
                this.ruleForm = {
                  id: '', // 分类ID
                  pid: 0, // 上级分类ID
                  name: '', // 分类名称
                  sort: '', // 排序  降序
                  show: 0 // 是否显示  0=不显示 1=显示
                }
              }*/
              this.fl = res.data.cate_list;
            } else {
              this.$message(res.data.msg)
            }
          }).catch((err) => {
            reject(err);
            // this.$message('对不起！请稍后再试')
          })
        })
      },
      // 提交保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/shop_cate_save'),
                this.dafa({
                  id: this.id,
                  name: this.ruleForm.name,
                  pid: this.ruleForm.pid,
                  sort: this.ruleForm.sort,
                  show: this.ruleForm.show
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.dialogVisible = false;
                  this.getDataList();
                }
              }).catch((err) => {
                reject(err);
                // this.$message('对不起！请稍后再试')
              })
            })
          }
        })
      },
      // 删除
      delData(id) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/shop_cate_del'),
              this.dafa({
                id: id
              })
            ).then(res => {
              resolve(res);
              // this.$message(res.data.msg);
              if (res.data.code === 0) {
                this.getDataList();
              }
            }).catch(err => {
              reject(err)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          this.ruleForm = {
            id: '', // 分类ID
            pid: 0, // 上级分类ID
            name: '', // 分类名称
            sort: '', // 排序  降序
            show: 0 // 是否显示  0=不显示 1=显示
          }
        }
      }
    },
    components: {hint}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fl-tit {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ededed;
  }

  .fl-con {
    text-align: center;
  }

  .clear-fl {
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }

  .fl-name {
    float: left;
    display: inline-block;
    width: 55%;
    font-size: 14px;
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .fl-item {
    float: left;
    width: 15%;
    display: inline-block;
  }

  .fl-dd {
    line-height: 50px;
  }

  .fl-name-box {
    margin: 0 15px 0 5px;
  }

  .fl-i {
    color: #999;
    padding: 5px;
  }

  .fl-i-w {
    margin-left: 25px;
    color: #ddd;
  }

  .el-ipt {
    width: 290px;
  }
</style>
