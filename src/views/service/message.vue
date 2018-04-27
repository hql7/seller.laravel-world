<template>
  <div class="message-list prop-box">
    <!--商品评价-->
    <div class="m-message-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>消息列表</h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <el-dropdown @command="handle($event,scope.row.id)">
              <el-button type="primary" size="small">
                处理<i class="el-icon-setting el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="i-box">
                <el-dropdown-item command="0"><i
                  class="iconfont icon-wancheng1 c-danger"></i>查看
                </el-dropdown-item>
                <el-dropdown-item command="1"><i class="iconfont icon-shanchu c-danger"></i>&nbsp;&nbsp;删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="240">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          min-width="340">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          min-width="180">
        </el-table-column>
      </el-table>
      <div class="select-all" v-if="tableData.length>0">
        <el-button :plain="true" type="primary" @click="toggleSelection()">取消</el-button>
        <el-button :plain="true" :disabled="multipleSelection.length==0" type="danger"
                   @click="del_message('all')">删除
        </el-button>
      </div>
      <page :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page>
    </div>
    <!--操作-->
    <el-dialog
      title="查看消息"
      :visible.sync="dialogVisible">
      <div class="cao-zuo">
        {{msg}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import page from '@/components/page.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `用户可在商品信息页对商品进行咨询。`
        }, // 提示模块参数
        tableData: [], // 表格数据
        multipleSelection: [], // 选中列
        totalPage: 1, // 总页
        dialogVisible: false, // 是否弹出
        msg: '', // 消息内容
        id: '', // 所编辑id
        del_id: [], // 删除储存数组
        loading: true
      }
    },
    created() {
      this.get_message()
    },
    methods: {
      // 监听子分页组件 翻页
      to_page() {
        this.get_message()
      },
      // 获取信息列表
      get_message() {
        this.axios.post(this.getApi('seller/auth/shop_msg_list'),
          this.dafa({
            index: this.index
          })
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableData = res.data.list;
            this.totalPage = res.data.fy_pgCount;
          } else {
            this.$message(res.data.msg)
          }
        }).catch(() => {
          this.loading = false;
          this.$message('对不起！请稍后再试')
        })
      },
      // 查看消息
      see_message() {
        this.dialogVisible = true;
        this.axios.post(this.getApi('seller/auth/shop_msg_view'),
          `id=${this.id}`
        ).then(res => {
          if (res.data.code === 0) {
            this.msg = res.data.content;
          } else {
            this.$message(res.data.msg)
          }
        })
      },
      // 操作
      handle(val, id) {
        this.id = id;
        switch (val) {
          case '0':
            this.see_message();
            break;
          case '1':
            this.del_message();
            break;
        }
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
      // 删除评价
      del_message(id = '') {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id == 'all') {
            this.multipleSelection.forEach(item => {
              this.del_id.push(item.id)
            })
          } else {
            this.del_id.push(this.id)
          }

          this.axios.post(this.getApi('seller/auth/shop_msg_del'),
            this.dafa({
              id_list: this.del_id
            })
          ).then(res => {
            this.$message(res.data.msg);
            this.del_id = [];
            if (res.data.code === 0) {
              this.get_message();
            } else {
              this.toggleSelection();
            }
          }).catch((err) => {
            console.log(err);
            this.$message('对不起！请稍后再试');
            this.toggleSelection();
            this.del_id = []
          })
        }).catch(() => {
          this.toggleSelection();
          this.del_id = [];
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    computed: {
      index() {
        return this.$store.state.index
      }
    },
    components: {
      hint, page
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cao-zuo {

  }
</style>
