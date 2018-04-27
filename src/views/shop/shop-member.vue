<template>
  <div class="type-list prop-box">
    <!--广告位-->
    <div class="m-type-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>店铺会员关注列表 <em class="c-danger">{{tableData.length}}位</em>
        <el-button type="text" icon="plus" size="small" class="add-role-btn add-btn" @click="openPopup">发消息
        </el-button>
        <div class="u-right">
          <el-input class="search"
                    placeholder="搜索会员名"
                    v-model="name">
            <el-button slot="append" icon="el-icon-search" @click="getDataList()"></el-button>
          </el-input>
        </div>
      </h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        border
        ref="multipleTable">
        <el-table-column
          prop="name"
          label="会员名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="关注时间"
          min-width="200">
        </el-table-column>
      </el-table>
      <page-item :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page-item>
    </div>
    <!--申请-->
    <el-dialog
      title="推送消息"
      :visible.sync="dialogVisible"
      width="80%">
      <el-input class="msg-title" v-model="msg.title" placeholder="请输入消息标题"></el-input>
      <editor-item @getEditor="getEditor" :content="content"></editor-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMsgOk">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import PageItem from '@/components/page.vue'
  import EditorItem from '@/components/editor.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `关注本店铺的会员列表，可以给会员推送消息。`
        }, // 提示模块参数
        name: '', // 会员名
        tableData: [], // 表格数据
        totalPage: 1, // 总页
        dialogVisible: false, // 是否弹出页面
        msg: {
          title: '',
          content: ''
        }, // 发送消息相关
        content: '',
        loading: true
      }
    },
    created() {
      this.getDataList()
    },
    methods: {
      // 监听子分页组件 翻页
      to_page() {
        this.getDataList()
      },
      // 监听子组件 编辑器内容
      getEditor(data) {
        this.content = data
      },
      // 获取列表
      getDataList() {
        this.axios.post(this.getApi('seller/auth/shop_attention_list'),
          this.dafa({
            index: this.index,
            name: this.name
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
      // 打开编写消息面板
      openPopup() {
        this.dialogVisible = true;
      },
      // 发送消息
      sendMsgOk() {
        if (!this.msg.title) {
          this.$message('请输入消息标题')
        } else if (!this.content) {
          this.$message('请输入消息内容')
        } else {
          this.axios.post(this.getApi('seller/auth/shop_send_message'),
            this.dafa({
              title: this.msg.title,
              content: this.content
            })
          ).then(res => {
            this.$message(res.data.msg);
            if (res.data.code === 0) {
              this.dialogVisible = false;
            }
          })
        }
      }
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          this.msg.title = '';
          this.content = '';
        }
      }
    },
    computed: {
      index() {
        return this.$store.state.index
      }
    },
    components: {
      hint, EditorItem, PageItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .msg-title {
    margin-bottom: 20px;
  }
</style>

