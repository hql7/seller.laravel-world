<template>
  <div class="sl-index">
    <div class="main-box">
      <!--第一部分 - 营业额信息-->
      <div class="m1-money">
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.total_money}}</p>
          <p class="my-tit">总成交金额</p>
        </div>
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.pc_money}}</p>
          <p class="my-tit">PC成交金额</p>
        </div>
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.app_money}}</p>
          <p class="my-tit">APP成交金额</p>
        </div>
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.wx_money}}</p>
          <p class="my-tit">小程序成交金额</p>
        </div>
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.today_money}}</p>
          <p class="my-tit">今日成交金额</p>
        </div>
        <div class="my-item">
          <p class="my-ts"><i class="iconfont icon-purse"></i>&nbsp;&nbsp;Rading volume</p>
          <p class="my-val">{{rading_volume.balance}}</p>
          <p class="my-tit">可提现余额</p>
        </div>
      </div>
      <!--第二部分 - 订单信息-->
      <div class="m2-order">
        <!--待处理订单信息-->
        <div class="or-info m2-or-item">
          <h3 class="or-h3">订单信息</h3>
          <ul class="or-info-box">
            <router-link to="/order/order-list" tag="li">
              待处理订单 <b class="u-right">（{{order_info.pending}}）</b>
            </router-link>
            <router-link to="/after-sale/order-refund" tag="li">
              待退款订单 <b class="u-right">（{{order_info.return_money}}）</b>
            </router-link>
            <router-link to="/after-sale/order-return" tag="li">
              待退换订单 <b class="u-right">（{{order_info.sales_return}}）</b>
            </router-link>
            <li>当前优惠活动 <b class="u-right">（{{order_info.discounts}}）</b></li>
            <li>将到期优惠活动 <b class="u-right">（{{order_info.end_discounts}}）</b></li>
          </ul>
        </div>
        <!--待处理订单交易提示-->
        <div class="or-ts m2-or-item">
          <h3 class="or-h3">订单交易提示</h3>
          <p class="i-br"></p>
          <ul class="or-transaction-box">
            <router-link :to="{name:'2-1',params:{pay_status:1}}" tag="li">待付款<b
              class="c-danger">（{{order_hint.no_pay}}）</b>
            </router-link>
            <router-link :to="{name:'2-1',params:{pay_status:2,delivery_status:0}}" tag="li">待发货<b
              class="c-danger">（{{order_hint.no_send}}）</b>
            </router-link>
            <router-link :to="{name:'2-1',params:{pay_status:2,delivery_status:1}}" tag="li">待收货<b
              class="c-danger">（{{order_hint.no_receive}}）</b>
            </router-link>
            <router-link :to="{name:'2-1',params:{delivery_status:2}}" tag="li">待评价<b
              class="c-danger">（{{order_hint.no_review}}）</b>
            </router-link>
            <router-link :to="{name:'2-1',params:{status:4}}" tag="li">已完成<b
              class="c-danger">（{{order_hint.accomplish}}）</b>
            </router-link>
          </ul>
        </div>
        <!--待处理订单交易提示-->
        <div class="or-good m2-or-item">
          <h3 class="or-h3">店铺及商品提示</h3>
          <p class="i-br"></p>
          <ul class="or-goods-box">
            <router-link to="/goods/insale-list" tag="li">在售商品<b class="c-danger">（{{goods_hint.sell_goods}}）</b>
            </router-link>
            <router-link to="/goods/outsale-list" tag="li">下架商品<b
              class="c-danger">（{{goods_hint.down_goods}}）</b>
            </router-link>
            <router-link to="/goods/outsale-list" tag="li">违规商品<b class="c-danger">（{{goods_hint.online_goods}}）</b>
            </router-link>
            <router-link to="/goods/insale-list" tag="li">库存预警<b
              class="c-danger">（{{goods_hint.store_warning}}）</b>
            </router-link>
          </ul>
        </div>
      </div>
      <!--第三部分 - 店铺信息-->
      <div class="m3-shop">
        <!--店铺信息-->
        <div class="sp-info sp-item">
          <h3 class="point-h3">{{shop_info.shop_name}}</h3>
          <div class="info-box">
            <div class="if-b-left">
              <img class="shop-logo" :src="shop_info.logo" :alt="shop_info.shop_name"
                   :title="shop_info.shop_name">
            </div>
            <div class="if-b-right">
              <ul class="if-ul-box">
                <li><label class="li-label">用户名：</label>{{shop_info.seller_name}}</li>
                <li><label class="li-label">店铺有效期：</label>{{shop_info.shop_time}}</li>
                <li><label class="li-label">店铺等级：</label>{{shop_info.level}}</li>
                <li><label class="li-label">最近登录：</label>{{shop_info.last_login}}</li>
                <li><label class="li-label">管理权限：</label>{{shop_info.role}}</li>
                <li><label class="li-label">最近登录IP：</label>{{shop_info.last_ip}}</li>
              </ul>
            </div>
          </div>
        </div>
        <!--评分信息-->
        <div class="sp-star sp-item">
          <h3 class="point-h3">店铺动态评分</h3>
          <div class="point-box">
            <div class="point-item">
              <p class="point-score">{{shop_point.describe}}分</p>
              <el-progress type="circle" :percentage="shop_point.describe*20"
                           status="success"></el-progress>
              <p class="point-label">描述相符</p>
            </div>
            <div class="point-item">
              <p class="point-score">{{shop_point.service}}分</p>
              <el-progress type="circle" :percentage="shop_point.service*20"></el-progress>
              <p class="point-label">物流服务</p>
            </div>
            <div class="point-item">
              <p class="point-score">{{shop_point.express}}分</p>
              <el-progress type="circle" :percentage="shop_point.express*20"
                           status="success"></el-progress>
              <p class="point-label">服务态度</p>
            </div>
            <div class="point-item">
              <p class="point-score">{{shop_point.attention_num}}人</p>
              <el-progress type="circle" :percentage="76" status="exception"></el-progress>
              <p class="point-label">关注人数</p>
            </div>
          </div>
        </div>
      </div>
      <!--仪表盘模式-->
      <div class="ybp-box">
        <h3 class="ybp-h3">仪表盘模式</h3>
        <div id="echarts1" class="echarts-point"></div>
        <div id="echarts2" class="echarts-point"></div>
        <div id="echarts3" class="echarts-point"></div>
        <div id="echarts4" class="echarts-point"></div>
      </div>
      <!--第四部分 - 排名信息-->
      <div class="m4-top">
        <!--销量排名-->
        <div class="tp-sell tp-item">
          <h3 class="or-h3">单品销量排名</h3>
          <el-table
            :data="sell_top"
            style="width: 100%">
            <el-table-column
              prop="key"
              label="排名"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品信息">
            </el-table-column>
            <el-table-column
              prop="num"
              label="销量"
              width="100px">
            </el-table-column>
          </el-table>
        </div>
        <!--收藏排名-->
        <div class="tp-star tp-item">
          <h3 class="or-h3">商品收藏排名</h3>
          <el-table
            :data="star_top"
            style="width: 100%">
            <el-table-column
              prop="key"
              width="100px"
              label="排名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品信息">
            </el-table-column>
            <el-table-column
              prop="num"
              width="100px"
              label="收藏">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--第五部分 - 统计报表-->
      <div class="echart-box">

      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';


  export default {
    data() {
      return {
        rading_volume: {
          total_money: 0, // 总成交金额
          pc_money: 0, // PC总成交金额
          app_money: 0, // APP总成交金额
          wx_money: 0, // 小程序总成交金额
          today_money: 0, // 今日总成交金额
          balance: 0 // 可提现余额
        }, // 营业额信息
        order_info: {
          pending: 0, // 待处理订单数
          discounts: 0, // 当前优惠活动
          end_discounts: 0, // 即将结束的优惠活动
          sales_return: 0, // 退换货订单
          return_money: 0 // 退款款订单
        }, // 待处理订单信息
        order_hint: {
          no_pay: 0, // 待付款
          no_send: 0, // 待发货
          no_receive: 0, // 待收货
          no_review: 0, // 待评价
          accomplish: 0 // 已完成
        }, // 店铺订单信息
        goods_hint: {
          sell_goods: 0, // 出售中的商品
          online_goods: 0, // 违规商品
          down_goods: 0, // 已下架商品
          store_warning: 0 // 库存预警商品
        }, // 店铺商品信息
        shop_info: {
          logo: require('@/assets/img/defult-seller-logo.png'), // logo
          company_name: '', // 公司名
          seller_name: '', // 用户名
          role: '', // 管理权限
          company_addr: '', // 公司地址
          phone: '', // 座机电话
          shop_name: '', // 店铺名称
          last_ip: '', // 最后登录IP
          email: '', // 邮箱账号
        }, // 店铺信息
        shop_point: {
          describe: 0, // 描述相符
          service: 0, // 服务态度
          express: 0, // 发货速度
          attention_num: 0 // 店铺收藏数
        }, // 评分信息
        sell_top: [], // 销量表
        star_top: [] // 收藏表
      }
    },
    created() {
      this.getMoneyInfo();
      this.getOrderGoodsInfo();
      this.getGoodsTopInfo(0, 5);
      this.getGoodsTopInfo(1, 5);
      this.getShopInfo();
    },
    mounted() {

    },
    methods: {
      // 设置仪表盘
      setEcharts(item) {
        item.max = item.max || 5;
        item.unit = item.unit || '分';
        let myChart = echarts.init(document.getElementById(item.e));
        // 指定图表的配置项和数据
        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}分"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          axisLabel: {
            /*formatter: function (e) {
              switch (e + "") {
                case "10":
                  return "0.5";
                case "20":
                  return "1.0";
                case "30":
                  return "1.5";
                case "40":
                  return "2.0";
                case "50":
                  return "2.5";
                case "60":
                  return "3.0";
                case "70":
                  return "3.5";
                case "80":
                  return "4.0";
                case "90":
                  return "4.5";
                case "100":
                  return "5.0";
                default:
                  return "";
              }
            },*/ // 修改数值
            textStyle: {fontSize: 15,}
          },
          series: [
            {
              name: item.name,
              type: 'gauge',
              //splitNumber: 5,
              max: item.max, // 最大值
              axisLine: {
                lineStyle: {
                  width: 15 // 这个是修改宽度的属性,
                }
              },
              splitLine: { // 线属性
                length: 15,
                lineStyle: {
                  color: '#ededed',
                  opacity: .6
                }
              },
              axisLabel: {
                textStyle: {
                  show: false
                }
              },
              axisTick: { //刻度样式show: false,
                lineStyle: {
                  opacity: .3
                }
              },
              detail: {formatter: '{value}' + item.unit},
              data: [{value: item.val, name: item.name}]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      // 获取成交金额信息
      getMoneyInfo() {
        this.axios.post(this.getApi('seller/auth/shop_earning_performance')
        ).then(res => {
          if (res.data.code === 0) {
            this.rading_volume = Object.assign(this.rading_volume, res.data.info)
          }
        })
      },
      // 获取店铺订单，商品信息
      getOrderGoodsInfo() {
        this.axios.post(this.getApi('seller/auth/shop_operation_performance')
        ).then(res => {
          if (res.data.code === 0) {
            this.order_info = Object.assign(this.order_info, res.data.order_info);
            this.order_hint = Object.assign(this.order_hint, res.data.order_hint);
            this.goods_hint = Object.assign(this.goods_hint, res.data.goods_hint);
          }
        })
      },
      /**
       * 获取店铺排行信息
       * @param tp  0=单品销量排行(5条);1=收藏排行(5条)
       * @param num 条数
       */
      getGoodsTopInfo(tp, num) {
        this.axios.post(this.getApi('seller/auth/shop_goods_ranking'),
          this.dafa({
            type: tp,
            limit: num
          })
        ).then(res => {
          if (res.data.code === 0) {
            if (tp === 0) {
              this.sell_top = res.data.list || [];
            } else {
              this.star_top = res.data.list || [];
            }
          }
        })
      },
      // 获取店铺信息
      getShopInfo() {
        this.axios.post(this.getApi('seller/auth/shop_index_info')
        ).then(res => {
          if (res.data.code === 0) {
            this.shop_info = Object.assign(this.shop_info, res.data.shop_info);
            this.shop_point = Object.assign(this.shop_point, res.data.shop_point);
            this.setEcharts({e: "echarts1", val: res.data.shop_point.describe, name: '描述相符'});
            this.setEcharts({e: "echarts2", val: res.data.shop_point.service, name: '物流评价'});
            this.setEcharts({e: "echarts3", val: res.data.shop_point.express, name: '物流评价'});
            this.setEcharts({
              e: "echarts4",
              val: res.data.shop_point.attention_num,
              name: '关注人数',
              max: 1000,
              unit: '人'
            });
          }
        })
      }
    },
    components: {}
  }

</script>

<style scoped>
  .sl-index {
    background-color: transparent;
    padding: 0;
    overflow-x: auto;
  }

  .sl-index > .main-box {
    min-width: 1300px;
  }

  /*第一部分 - 营业额信息*/
  .m1-money {
    overflow: hidden;
    margin: 10px 0 50px;
  }

  .m1-money > .my-item {
    float: left;
    width: 16.66%;
    padding-left: 20px;
    border-right: 2px solid #adb2b5;
    box-sizing: border-box;
  }

  .m1-money > .my-item:nth-last-child(1) {
    border: none;
  }

  .m1-money > .my-item:nth-last-child(-n+2) > .my-val {
    color: #e74c3c;
  }

  .m1-money .my-ts {
    color: #73879c;
  }

  .m1-money .my-val {
    color: #1abb9c;
    font-size: 32px;
    font-weight: bold;
  }

  .m1-money .my-tit {
    color: #73879c;
    font-size: 16px;
  }

  /*第二部分 - 订单信息*/
  .m2-order {
    position: relative;
    height: 300px;
  }

  .m2-or-item {
    height: 300px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e6e9ed;
    box-sizing: border-box;
  }

  .or-h3 {
    line-height: 20px;
    font-size: 18px;
    padding-left: 10px;
    border-left: 5px solid #28b779;
    margin-bottom: 20px;
  }

  .m2-order > .or-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    min-width: 400px;
  }

  .m2-order > .or-ts {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 37%;
    min-width: 470px;
    margin: 0 auto;
  }

  .m2-order > .or-good {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    min-width: 400px;
  }

  .or-info-box {
    font-size: 14px;
    line-height: 44px;
    color: #139ff0;
  }

  .or-info-box > li {
    cursor: pointer;
  }

  .or-transaction-box, .or-goods-box {
    overflow: hidden;
    line-height: 34px;
    text-align: center;
    padding-top: 30px;
  }

  .or-transaction-box > li, .or-goods-box > li {
    float: left;
    width: 30%;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #42c596;
    margin-right: 4%;
    margin-bottom: 30px;
  }

  .or-goods-box > li:nth-child(2n) {
    margin-right: 0;
  }

  .or-goods-box > li {
    float: left;
    width: 46%;
    border-radius: 4px;
    border: 1px solid #42c596;
    margin-right: 6%;
    margin-bottom: 30px;
  }

  .or-transaction-box > li:nth-child(3n) {
    margin-right: 0;
  }

  .i-br {
    height: 1px;
    background-color: #e6e9ed;
  }

  /*第三部分 - 店铺信息*/
  .m3-shop {
    position: relative;
    height: 310px;
    margin-top: 24px;
  }

  .m3-shop > .sp-item {
    position: absolute;
    top: 0;
    width: 49%;
    height: 100%;
    background-color: #fff;
    padding: 30px 0;
    border: 1px solid #e6e9ed;
    box-sizing: border-box;
  }

  .m3-shop > .sp-info {
    left: 0;
  }

  .m3-shop > .sp-star {
    right: 0;
  }

  .point-h3 {
    padding: 0 30px;
    font-size: 22px;
    color: #333;
  }

  .info-box {
    overflow: hidden;
    padding: 30px;
  }

  .info-box > .if-b-left {
    float: left;
    padding-top: 10px;
  }

  .info-box > .if-b-right {
    margin-left: 100px;
  }

  .shop-logo {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  .if-ul-box {
    overflow: hidden;
    font-size: 14px;
    line-height: 36px;
  }

  .if-ul-box > li {
    float: left;
    width: 50%;
  }

  .li-label {
    display: inline-block;
    width: 90px;
    text-align: right;
  }

  .point-box {
    overflow: hidden;
    text-align: center;
  }

  .point-item {
    float: left;
    position: relative;
    width: 25%;
    padding-top: 30px;
  }

  .point-score {
    position: absolute;
    z-index: 99;
    top: 63px;
    left: 50%;
    margin-left: -45px;
    padding: 15px;
    border-radius: 50%;
    width: 60px;
    background-color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  .point-label {
    margin-top: 15px;
    font-size: 14px;
    color: #333;
  }

  /*仪表盘 - 开始*/
  .ybp-box {
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    border: 1px solid #e6e9ed;
    margin-top: 24px;
  }

  .ybp-h3 {
    font-size: 22px;
    text-align: left;
    color: #333;
    padding-left: 20px;
    margin: 10px 0;
  }

  .echarts-point {
    width: 320px;
    height: 320px;
    display: inline-block;
  }

  /*仪表盘 - 结束*/

  /*第四部分 - 排名信息*/
  .m4-top {
    margin-top: 24px;
    position: relative;
    min-height: 380px;
  }

  .m4-top > .tp-item {
    position: absolute;
    top: 0;
    width: 49%;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e6e9ed;
    box-sizing: border-box;
  }

  .m4-top > .tp-sell {
    left: 0;
  }

  .m4-top > .tp-star {
    right: 0;
  }

  /*第五部分 - 图标区*/

  .echart-box {
    margin: 24px 0 200px;
  }
</style>
