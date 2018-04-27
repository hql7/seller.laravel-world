<template>
  <div class="type-list prop-box">
    <!--广告位-->
    <div class="m-type-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>经营类目列表
        <el-button type="text" icon="plus" size="small" class="add-role-btn add-btn" @click="edit_cms('')">申请类目
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
          prop="fname"
          label="经营类目"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="yj_percent"
          label="佣金比例(%)"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          min-width="100">
          <template slot-scope="scope">
            <span v-if=" scope.row.status == 0 ">待审核</span>
            <span v-else-if=" scope.row.status == 1 ">已通过</span>
            <span v-else>已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="120">
          <template slot-scope="scope">
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
    <!--申请-->
    <el-dialog
      title="选择经营分类"
      :visible.sync="dialogVisible"
      width="80%">
      <el-select v-model="fl.cl1" placeholder="请选择" @change="getFL($event,1)">
        <el-option label="请选择" value="" disabled></el-option>
        <el-option
          v-for="item in fl.cl1_list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="fl.cl2" placeholder="请选择" @change="getFL($event,2)">
        <el-option label="请选择" value="" disabled></el-option>
        <el-option
          v-for="item in fl.cl2_list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="fl.cl3" placeholder="请选择" @change="choiceYJ">
        <el-option label="请选择" value="" disabled></el-option>
        <el-option
          v-for="item in fl.cl3_list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <p class="yj-box">佣金比例：{{yj_percent}}%</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendApply">确 定</el-button>
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
        multipleSelection: [], // 选中列
        dialogVisible: false, // 是否弹出页面
        id: '', // 所编辑id
        del_id: [], // 删除储存数组
        fl: {
          cl1: '',
          cl1_list: [],
          cl2: '',
          cl2_list: [],
          cl3: '',
          cl3_list: []
        },
        yj_percent: '', // 佣金比例
        loading: true
      }
    },
    created() {
      this.get_cms()
    },
    methods: {
      // 获取列表
      get_cms() {
        this.axios.post(this.getApi('seller/auth/shop_fid_list')
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
      // 申请
      edit_cms() {
        this.dialogVisible = true;
        this.getFL(0, 0)
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
            this.axios.post(this.getApi('seller/auth/shop_fid_del'),
              this.dafa({
                id: id
              })
            ).then(res => {
              resolve(res);
              // this.$message(res.data.msg);
              // this.del_id = [];
              if (res.data.code === 0) {
                this.get_cms();
              }
            }).catch((err) => {
              reject(err);
              console.log(err);
              // this.$message('对不起！请稍后再试');
              // this.toggleSelection();
              // this.del_id = []
            })
          })
        }).catch(() => {
          // this.toggleSelection();
          // this.del_id = [];
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 获取三级分类
      getFL(val, lv) {
        this.axios.post(this.getApi('coms/get_cate'),
          `id=${val}`
        ).then(res => {
          if (res.data.code === 0) {
            switch (lv) {
              case 0:
                this.fl.cl1_list = res.data.list;
                break;
              case 1:
                this.fl.cl2_list = res.data.list;
                this.fl.cl2 = '';
                this.fl.cl3_list = [];
                this.fl.cl3 = '';
                this.yj_percent = '';
                break;
              case 2:
                this.fl.cl3_list = res.data.list;
                this.fl.cl3 = '';
                this.yj_percent = '';
                break;
            }
          }
        })
      },
      // 选择三级分类显示佣金
      choiceYJ(val) {
        this.fl.cl3_list.forEach(item => {
          if (item.id == val) {
            this.yj_percent = item.yj_percent
          }
        })
      },
      // 申请经营类目
      sendApply() {
        if (this.fl.cl3) {
          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/shop_fid_apply'),
              this.dafa({
                cate_id: this.fl.cl3
              })
            ).then(res => {
              resolve(res);
              // this.$message(res.data.msg);
              if (res.data.code === 0) {
                this.dialogVisible = false;
                this.get_cms()
              }
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
    },
    computed: {},
    components: {
      hint
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .yj-box {
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #f51322;
  }
</style>

