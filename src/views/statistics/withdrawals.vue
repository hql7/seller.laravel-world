<template>
  <div class="withdrawals prop-box">
    <!--提现申请列表-->
    <div class="m-withdrawals-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>提现申请列表
        <el-button type="text" size="small" class="add-member-btn add-btn" @click="apply_withdrawals">申请提现
        </el-button>
        <em class="shop-bla">账户余额：{{balance}}</em>
      </h2>
      <h2>
        <div class="u-right">
          <el-date-picker
            v-model="date_time"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
            placeholder="选择日期范围"
            @change="choice_time"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-select class="sele-s" v-model="status" placeholder="处理状态" :clearable="true">
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已拒绝" value="1"></el-option>
            <el-option label="已打款" value="2"></el-option>
          </el-select>
          <el-select class="sele-s" v-model="search_type" placeholder="搜索类型" :clearable="true">
            <el-option label="收款人" value="1"></el-option>
            <el-option label="收款账号" value="0"></el-option>
          </el-select>
          <el-input placeholder="搜索关键词" v-model="search_str" class="search">
            <el-button slot="append" icon="el-icon-search" @click="get_withdrawals"></el-button>
          </el-input>
        </div>
      </h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <!--<el-table-column
          type="selection"
          width="55">
        </el-table-column>-->
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <el-dropdown @command="handle($event,scope.row.id)">
              <el-button type="primary" size="small">
                处理<i class="el-icon-setting el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="i-box">
                <el-dropdown-item command="0">
                  <i class="iconfont icon-wancheng1 c-danger"></i>&nbsp;查看
                </el-dropdown-item>
                <el-dropdown-item command="1">
                  <i class="iconfont icon-shanchu3 c-danger"></i>&nbsp;删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          prop="no"
          label="提现单编号"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="提现金额"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="account_name"
          label="银行名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="account_no"
          label="收款账号"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="收款人"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="申请时间"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" class="c-success">已拒绝 </span>
            <span v-else-if="scope.row.status==2" class="c-999">已打款</span>
            <span v-else class="c-blue">待审核</span>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="select-all" v-if="tableData.length>0">
        <el-button :plain="true" type="primary" @click="toggleSelection()">取消</el-button>
        <el-button :plain="true" :disabled="multipleSelection.length==0" type="danger"
                   @click="del_withdrawals('all', '')">删除
        </el-button>
      </div>-->
      <page :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page>
    </div>
    <!--申请-->
    <div class="add-member prop" v-if="add_show">
      <crumb :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px">
        <el-form-item label="当前账户资金">
          {{ruleForm.info.balance}}
        </el-form-item>
        <el-form-item label="开户行名称">
          {{ruleForm.info.bank_name}}
        </el-form-item>
        <el-form-item label="银行账号">
          {{ruleForm.info.bank_no}}
        </el-form-item>
        <el-form-item label="开户人姓名">
          {{ruleForm.info.bank_realname}}
        </el-form-item>
        <el-form-item label="提现金额" prop="amount">
          <el-input v-model.number="ruleForm.amount" placeholder="请输入提现金额"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" prop="account_name">
          <el-input v-model="ruleForm.account_name" placeholder="请输入银行名称"></el-input>
        </el-form-item>
        <el-form-item label="收款账号" prop="account_no">
          <el-input v-model="ruleForm.account_no" placeholder="请输入收款账号"></el-input>
        </el-form-item>
        <el-form-item label="收款人" prop="realname">
          <el-input v-model="ruleForm.realname" placeholder="请输入收款人"></el-input>
        </el-form-item>
        <el-form-item label="提现备注">
          <el-input v-model="ruleForm.note" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--查看-->
    <el-dialog title="查看提现详情" :visible.sync="dialogVisible">
      <ul class="see-tx">
        <li class="see-tx-li"><label class="see-tx-label">提现单编号：</label>{{info.no}}</li>
        <li class="see-tx-li"><label class="see-tx-label">提现金额：</label>{{info.amount}}</li>
        <li class="see-tx-li"><label class="see-tx-label">银行名称：</label>{{info.account_name}}</li>
        <li class="see-tx-li"><label class="see-tx-label">收款账号：</label>{{info.account_no}}</li>
        <li class="see-tx-li"><label class="see-tx-label">收款人：</label>{{info.realname}}</li>
        <li class="see-tx-li"><label class="see-tx-label">提现备注：</label>{{info.note}}</li>
        <li class="see-tx-li"><label class="see-tx-label">申请时间：</label>{{info.create_time}}</li>
        <li class="see-tx-li"><label class="see-tx-label">平台处理时间：</label>{{info.handling_time}}</li>
        <li class="see-tx-li"><label class="see-tx-label">平台处理意见：</label>{{info.handling_idea}}</li>
        <li class="see-tx-li"><label class="see-tx-label">状态：</label>
          <template v-if=" info.status == 0">待审核</template>
          <template v-else-if=" info.status == 1">已拒绝</template>
          <template v-else>已打款</template>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import crumb from '@/components/crumb.vue'
  import page from '@/components/page.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `提现申请， 由总平台审核与管理。提现申请上部为提示信息，显示您在申请店铺时所填写信息，防止您在需要时刻遗忘或错漏。您也可以
                    提至其他账户等，一切以您输入数据为准，请您谨慎填写！`
        }, // 提示模块参数
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }, // 时间范围选择
        date_time: '', // 搜索时间
        start_time: '', // 开始时间
        end_time: '', // 结束时间
        status: '', // 处理状态  0=待审核 1=已拒绝 2=已打款
        search_type: '', // 搜索类型 0=收款账号 1=收款人
        search_str: '', // 搜索内容
        tableData: [], // 表格数据
        balance: '0.00', // 商家账户余额
        multipleSelection: [], // 选中列
        totalPage: 1, // 总页
        add_show: false, // 是否弹出编辑页面
        crumb: {
          from: '提现申请',
          now: '申请'
        }, // 面包屑模块参数
        ruleForm: {
          info: {
            balance: '', // 当前账户资金
            bank_name: '', // 开户行名称
            bank_no: '', // 银行账号
            bank_realname: '' // 开户人姓名
          }, // 店铺资金相关信息
          amount: '', // 提现金额
          account_name: '', // 银行名称
          account_no: '', // 收款账号
          realname: '', // 收款人
          note: '' // 提现备注
        }, // 编辑页面表单数据
        rules: {
          amount: [
            {required: true, type: 'number', message: '请输入提现金额', trigger: 'blur'}
          ],
          account_name: [
            {required: true, message: '请输入银行名称', trigger: 'blur'}
          ],
          account_no: [
            {required: true, message: '请输入收款账号', trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '请输入收款人', trigger: 'blur'}
          ]
        }, // 验证规则
        dialogVisible: false, // 是否弹出
        info: {
          id: null,
          no: '', // 提现单编号
          amount: '', // 提现金额
          account_name: '', // 银行名称
          account_no: '', // 收款账号
          realname: '', // 收款人
          note: '', // 提现备注
          create_time: '', // 申请时间
          handling_time: '', // 平台处理时间
          handling_idea: '', // 平台处理意见
          status: null, // 状态  0=待审核 1=已拒绝 2=已打款
        }, // 弹出查看信息内容
        id: '', // 所编辑id
        del_id: [], // 删除储存数组
        loading: true
      }
    },
    created() {
      this.get_withdrawals()
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false
      },
      // 监听子分页组件 翻页
      to_page() {
        this.get_withdrawals()
      },
      // 获取提现列表
      get_withdrawals() {
        this.axios.post(this.getApi('seller/auth/withdraw_list'),
          this.dafa({
            index: this.index,
            start_time: this.start_time,
            end_time: this.end_time,
            search_str: this.search_str,
            status: this.status,
            search_type: this.search_type
          })
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.balance = res.data.balance;
            this.tableData = res.data.list;
            this.totalPage = res.data.fy_pgCount
          } else {
            this.$message(res.data.msg)
          }
        }).catch(() => {
          this.loading = false;
          this.$message('对不起！请稍后再试')
        })
      },
      // 操作
      handle(val, id) {
        this.to_do = val;
        this.id = id;
        switch (val) {
          case '0':
            this.see_withdrawals();
            break;
          case '1':
            this.del_withdrawals();
            break;
        }
      },
      // 查看
      see_withdrawals() {
        this.antiShake.antiShake((resolve, reject) => {
          this.axios.post(this.getApi('seller/auth/withdraw_view'),
            `id=${this.id}`
          ).then(res => {
            resolve(res);
            if (res.data.code === 0) {
              this.dialogVisible = true;
              this.info = res.data.info;
            }
          }).catch((err) => {
            reject(err);
            console.log(err);
            // this.$message('对不起！请稍后再试')
          })
        })
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
      // 申请提现
      apply_withdrawals() {
        this.add_show = true;
        this.axios.post(this.getApi('seller/auth/withdraw_apply')
        ).then(res => {
          if (res.data.code === 0) {
            this.ruleForm.info = res.data.info
          }
        })
      },
      // 删除
      del_withdrawals(id = '') {
        this.$confirm('是否确认删除申请单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*if (id === 'all') {
            this.multipleSelection.forEach(item => {
              this.del_id.push(item.id)
            })
          } else {
            this.del_id.push(this.id)
          }*/

          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/withdraw_del'),
              this.dafa({
                id: this.id
              })
            ).then(res => {
              resolve(res);
              // this.$message(res.data.msg);
              // this.del_id = [];
              if (res.data.code === 0) {
                this.get_withdrawals();
              }
            }).catch((err) => {
              reject(err);
              console.log(err);
              // this.$message('对不起！请稍后再试');
              // this.toggleSelection();
              // this.del_id = [];
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
      // 提交保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/withdraw_save'),
                this.dafa({
                  amount: this.ruleForm.amount,
                  account_name: this.ruleForm.account_name,
                  account_no: this.ruleForm.account_no,
                  realname: this.ruleForm.realname,
                  note: this.ruleForm.note
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.add_show = false;
                  this.get_withdrawals()
                }
              }).catch(err => {
                reject(err);
                console.log(err);
                // this.$message('对不起！请稍后再试 错误信息已在控制台打印')
              })
            })
          }
        })
      },
      // 时间格式
      choice_time(val) {
        // let start = Date.parse(new Date(val.substr(0, 10)));
        // let end = Date.parse(new Date(val.substr(13, 10)));
        let start = Date.parse(new Date(val[0]));
        let end = Date.parse(new Date(val[1]));
        this.start_time = start / 1000;
        this.end_time = end / 1000;
      }
    },
    computed: {
      index() {
        return this.$store.state.index
      }
    },
    components: {
      hint, crumb, page
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cao-zuo .el-select {
    width: 100%;
    margin-bottom: 20px;
  }

  .shop-bla {
    float: right;
    color: #f51322;
    font-weight: bold;
    background-color: #f7dbdb;
    padding: 3px 15px;
    border-radius: 5px;
  }

  .see-tx {
    border-top: 1px solid #f3f3f3;
    border-left: 1px solid #f3f3f3;
    border-right: 1px solid #f3f3f3;
  }

  .see-tx-li {
    line-height: 36px;
    border-bottom: 1px solid #f3f3f3;
  }

  .see-tx-label {
    display: inline-block;
    width: 200px;
    text-align: right;
    margin-right: 15px;
  }
</style>
