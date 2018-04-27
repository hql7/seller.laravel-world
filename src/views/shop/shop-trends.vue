<template>
  <div class="shop-trends prop-box">
    <!--广告位-->
    <div class="m-type-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>店铺动态列表 <em>{{tableData.length}}条</em>
        <el-button type="text" icon="plus" size="small" class="add-role-btn add-btn" @click="editData('')">添加动态
        </el-button>
      </h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        border
        ref="multipleTable">
        <el-table-column
          prop="title"
          label="标题"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editData(scope.row.id)">编辑
            </el-button>
            <el-button type="danger" size="small" @click="delData(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page-item :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page-item>
    </div>
    <!--申请-->
    <div class="add-trends prop" v-if="add_show">
      <crumb-item :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb-item>
      <el-input class="msg-title" v-model="info.title" placeholder="请输入动态标题"></el-input>
      <editor-item @getEditor="getEditor" :content="content"></editor-item>
      <el-button type="primary" @click="sendSave">确认保存</el-button>
    </div>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import CrumbItem from '@/components/crumb.vue'
  import PageItem from '@/components/page.vue'
  import EditorItem from '@/components/editor.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `编辑或发布本店的一些动态文章。`
        }, // 提示模块参数
        tableData: [], // 表格数据
        totalPage: 1, // 总页
        add_show: false, // 是否弹出页面
        crumb: {
          from: '店铺动态',
          now: '动态编辑'
        }, // 面包屑模块参数
        info: {
          title: '',
          content: ''
        }, // 发送消息相关
        content: '',
        id: '',
        loading: true
      }
    },
    created() {
      this.getDataList();
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false;
      },
      // 监听子分页组件 翻页
      to_page() {
        this.getDataList()
      },
      // 监听子组件 编辑器内容
      getEditor(data) {
        this.info.content = data
      },
      // 获取列表
      getDataList() {
        this.axios.post(this.getApi('seller/auth/shop_news_list'),
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
        })
      },
      // 保存动态
      sendSave() {
        if (!this.info.title) {
          this.$message('请输入动态标题')
        } else if (!this.info.content) {
          this.$message('请输入动态内容')
        } else {
          this.axios.post(this.getApi('seller/auth/shop_news_save'),
            this.dafa({
              id: this.id,
              title: this.info.title,
              content: this.info.content
            })
          ).then(res => {
            this.$message(res.data.msg);
            if (res.data.code === 0) {
              this.add_show = false;
              this.getDataList();
            }
          })
        }
      },
      // 编辑动态
      editData(id = '') {
        this.id = id;
        this.add_show = true;
        this.axios.post(this.getApi('seller/auth/shop_news_edit'),
          `id=${id}`
        ).then(res => {
          if (res.data.code === 0) {
            this.info = res.data.info;
            this.content = res.data.info.content || '';
          } else {
            this.$message(res.data.msg)
          }
        })
      },
      // 删除动态
      delData(id) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post(this.getApi('seller/auth/shop_news_del'),
            `id=${id}`
          ).then(res => {
            this.$message(res.data.msg);
            if (res.data.code === 0) {
              this.getDataList()
            }
          })
        }).catch(() => {
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
      hint, EditorItem, PageItem, CrumbItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .msg-title {
    margin: 20px 0;
  }
</style>

