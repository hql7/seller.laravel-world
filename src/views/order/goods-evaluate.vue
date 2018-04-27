<template>
  <div class="goods-evaluate-list prop-box">
    <!--商品评价-->
    <div class="m-goods-evaluate-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>商品评价列表
        <!--<el-button type="text" icon="plus" size="small" class="add-member-btn add-btn" @click="edit_member('','')">添加会员
        </el-button>-->
        <div class="u-right">
          <el-select class="sele-s" v-model="point" placeholder="评分" :clearable="true">
            <el-option label="一星" value="1"></el-option>
            <el-option label="二星" value="2"></el-option>
            <el-option label="三星" value="3"></el-option>
            <el-option label="四星" value="4"></el-option>
            <el-option label="五星" value="5"></el-option>
          </el-select>
          <!--<el-select class="sele-s" v-model="status" placeholder="评价状态" :clearable="true">
            <el-option label="未评价" value="0"></el-option>
            <el-option label="已评价" value="1"></el-option>
          </el-select>-->
          <el-select class="sele-s" v-model="has_reply" placeholder="回复状态" :clearable="true">
            <el-option label="未回复" value="0"></el-option>
            <el-option label="已回复" value="1"></el-option>
          </el-select>
          <el-select class="sele-s" v-model="search_type" placeholder="搜索类型" :clearable="true">
            <el-option label="评价人" value="0"></el-option>
            <el-option label="评价内容" value="1"></el-option>
          </el-select>
          <el-input class="search"
                    placeholder="搜索关键词"
                    v-model="search_str">
            <el-button slot="append" icon="el-icon-search" @click="get_goods_evaluate"></el-button>
          </el-input>
        </div>
      </h2>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        ref="multipleTable">
        <el-table-column
          prop="order_no"
          label="订单编号"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="point"
          label="评分"
          min-width="200">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.point"
              disabled
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="good_name"
          label="商品名称"
          min-width="260">
          <template slot-scope="scope">
            <a :href="scope.row.good_link" target="_blank">{{scope.row.good_name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="buy_time"
          label="下单时间"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="comment_time"
          label="评论时间"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="has_reply"
          label="回复状态"
          min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.has_reply ==0 ">未回复</span>
            <span v-else>已回复</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="getEvaluateCon(scope.row.id)">回复

            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page>
    </div>
    <div class="add-brand prop" v-if="add_show">
      <crumb-cpt :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb-cpt>
      <div>
        <h3 class="user-h3">用户评论</h3>
        <div class="ev-box">
          <p><em class="ev-user">{{review.name}}</em> <span class="u-right c-999">{{review.time}}</span></p>
          <p class="con-box"><img :src="review.img" alt="lara-shop商城用户头像" title="lara-shop商城用户头像"
                                  class="ev-pic" width="70" height="70"><span class="ev-con">{{review.content}}</span>
          </p>
          <p v-if="review.imgs.length>0">
            <img v-for="item in review.imgs" :src="item" :key="item" class="ev-img"
                 alt="lara-shop商城用户评价图片" @click="seeBigImg(item)"
                 title="lara-shop商城用户评价图片" width="120" height="120">
          </p>
        </div>
        <div class="ev-reply-box">
          <p><em class="ev-user">{{reply.name}} </em><span class="u-right c-999">{{reply.time}}</span></p>
          <div class="admin-info">
            <img :src="reply.img" alt="lara-shop商城商家头像" title="lara-shop商城商家头像" class="ev-pic" width="70" height="70">
            <el-input
              type="textarea"
              :rows="4" class="reply-box"
              placeholder="请输入回复内容"
              v-model="reply.reply">
            </el-input>
          </div>
        </div>
        <div class="ipt-box">
          <button class="ev-reply-btn" @click="replyGoodsEvaluate">回复</button>
        </div>
      </div>
    </div>
    <!--查看大图-->
    <div class="see-big" v-if="see_big" @click="closeBigImg"><img :src="see_big" alt="lara-shop商城用户评价图片"
                                                                  title="lara-shop商城用户评价图片"></div>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import page from '@/components/page.vue'
  import CrumbCpt from '@/components/crumb.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `买家可在订单完成后对订单商品进行评价操作，评价信息将显示在对应的商品页面。`
        }, // 提示模块参数
        tableData: [], // 表格数据
        point: '', // 评分  1=一星 2=二星...5=五星
        status: '', // 评价状态  0=未评价 1=已评价
        has_reply: '', // 回复状态 0=未回复 1=已回复
        search_type: '', // 搜索类型 0=评价人 1=评价内容
        search_str: '', // 搜索内容
        // multipleSelection: [], // 选中列
        totalPage: 1, // 总页
        add_show: false,
        crumb: {
          from: '商品评价',
          now: '评价回复'
        }, // 面包屑模块参数
        review: {
          id: '',
          name: '',
          img: '',
          content: '',
          imgs: [],
          time: ''
        }, // 评价信息
        reply: {
          id: '',
          img: '', // 头像
          name: '', // 名
          reply: '', // 内容
          time: '' // 时间
        }, // 回复信息
        see_big: '', // 大图盒子
        loading: true
      }
    },
    created() {
      this.get_goods_evaluate()
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false
      },
      // 监听子分页组件 翻页
      to_page() {
        this.get_goods_evaluate()
      },
      // 获取列表
      get_goods_evaluate() {
        this.axios.post(this.getApi('seller/auth/review_list'),
          this.dafa({
            index: this.index,
            point: this.point,
            has_reply: this.has_reply,
            search_type: this.search_type,
            search_str: this.search_str
          })
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
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
      // 查看评价页
      getEvaluateCon(id) {
        this.id = id;
        this.add_show = true;
        this.antiShake.antiShake((resolve, reject) => {
          this.axios.post(this.getApi('seller/auth/review_reply_page'),
            `id=${id}`
          ).then(res => {
            resolve(res);
            if (res.data.code === 0) {
              this.review = res.data.review;
              this.reply = res.data.reply;
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      // 查看大图
      seeBigImg(img) {
        this.see_big = img;
      },
      // 关闭大图
      closeBigImg() {
        this.see_big = ''
      },
      // 回复评价
      replyGoodsEvaluate() {
        if (this.reply.reply) {
          this.antiShake.antiShake((resolve, reject) => {
            this.axios.post(this.getApi('seller/auth/review_reply'),
              this.dafa({
                id: this.id,
                reply: this.reply.reply
              })
            ).then(res => {
              resolve(res);
              // this.$message(res.data.msg);
              if (res.data.code === 0) {
                this.add_show = false;
                this.get_goods_evaluate()
              }
            }).catch(err => {
              reject(err)
            })
          })
        } else {
          this.$message('请输入回复内容')
        }
      }
    },
    computed: {
      index() {
        return this.$store.state.index
      }
    },
    components: {
      hint, page, CrumbCpt
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-h3 {
    line-height: 40px;
    font-size: 14px;
    color: #333;
    padding-left: 15px;
    border-left: 1px solid #dadada;
    border-right: 1px solid #dadada;
    border-top: 6px solid #d2d6de;
    margin-top: 30px;
    border-radius: 5px 5px 0 0;
  }

  .ev-box {
    padding: 15px;
    border: 1px solid #dadada;
    margin-bottom: 35px;
  }

  .ev-user {
    font-size: 14px;
    font-weight: bold;
  }

  .con-box {
    overflow: hidden;
  }

  .ev-pic {
    float: left;
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .ev-box {
    line-height: 22px;
  }

  .ev-con {
    display: block;
    background-color: #f3f3f3;
    color: #333;
    padding: 5px 15px;
    border-radius: 5px;
    margin-left: 85px;
  }

  .ev-img {
    width: 120px;
    height: 120px;
    margin: 5px;
  }

  .see-big {
    width: 400px;
    height: 400px;
    position: fixed;
    top: 200px;
    left: 50%;
    z-index: 99;
    margin-left: -200px;
  }

  .see-big > img {
    width: 100%;
    height: 100%;
  }

  .reply-box {
    margin-left: 15px;
    width: 90%;
  }

  .ev-reply-box {
    line-height: 22px;
  }

  .ipt-box {
    margin: 30px 0;
    text-align: center;
  }

  .ev-reply-btn {
    width: 90px;
    height: 36px;
    background-color: #48cfae;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
</style>
