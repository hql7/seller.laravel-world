<template>
  <div class="report-forms-order m-prop-box">
    <hint :title="hint.title" :content="hint.content"></hint>
    <h2>结算记录
      <div class="u-right">
        <el-date-picker
          v-model="date_time"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="choice_time"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-input placeholder="订单编号" v-model="order_no" class="search">
          <el-button slot="append" icon="el-icon-search" @click="get_hot_count"></el-button>
        </el-input>
      </div>
    </h2>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      ref="multipleTable"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="order_no"
        label="订单编号"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="order_amount"
        label="订单金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="system_tax"
        label="平台抽成"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="real_money"
        label="实际结算金额"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="time"
        label="结算时间"
        min-width="160">
      </el-table-column>
    </el-table>
    <page :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page>
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
          content: `本店铺与平台的资金结算记录`
        }, // 提示模块参数
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }, // 时间范围选择
        date_time: '', // 所选时间
        start_time: '', // 起始时间
        end_time: '', // 截止时间
        order_no: '', // 订单编号
        tableData: [],
        totalPage: 1, // 总页
        loading: true
      }
    },
    created() {
      this.get_hot_count()
    },
    methods: {
      // 监听子分页组件 翻页
      to_page() {
        this.get_hot_count()
      },
      // 请求列表
      get_hot_count() {
        this.axios.post(this.getApi('seller/auth/settlements'),
          this.dafa({
            index: this.index,
            order_no: this.order_no,
            start_time: this.start_time,
            end_time: this.end_time
          })
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableData = res.data.list;
            this.totalPage = res.data.fy_pgCount;
          } else {
            this.$message(res.data.msg)
          }
        }).catch(err => {
          this.loading = false;
          this.$message('对不起！请稍后再试')
        })
      },
      // 选择时间处理数据格式
      choice_time(val) {
        // let start = Date.parse(new Date(val.substr(0, 10)))
        // let end = Date.parse(new Date(val.substr(13, 10)))
        let start = Date.parse(new Date(val[0]))
        let end = Date.parse(new Date(val[1]))
        this.start_time = start / 1000
        this.end_time = end / 1000
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

</style>
