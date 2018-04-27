<template>
  <div class="classify-list prop-box" v-loading="loading">
    <!--店铺信息-->
    <hint :title="hint.title" :content="hint.content"></hint>
    <div class="reg-info">
      <h3>公司信息</h3>
      <ul>
        <li><b>公司名称：</b>{{company_info.gs_name}}</li>
        <li><b>公司性质：</b>
          <span v-if="company_info.gs_nature == 0">股份有限公司</span>
          <span v-else-if="company_info.gs_nature == 1">个人独立企业</span>
          <span v-else-if="company_info.gs_nature == 2">有限责任公司</span>
          <span v-else-if="company_info.gs_nature == 3">外资</span>
          <span v-else-if="company_info.gs_nature == 4">中外合资</span>
          <span v-else-if="company_info.gs_nature == 5">国企</span>
          <span v-else-if="company_info.gs_nature == 6">合伙制企业</span>
          <span v-else>其他</span>
        </li>
        <li><b>公司官网地址：</b>{{company_info.gs_website}}</li>
        <li><b>固定电话：</b>{{company_info.gs_phone}}</li>
        <li><b>公司所在地：</b>{{company_info.gs_location}}</li>
        <li><b>公司详细地址：</b>{{company_info.gs_addr}}</li>
        <li><b>电子邮箱：</b>{{company_info.gs_email}}</li>
        <li><b>传真：</b>{{company_info.gs_fax}}</li>
        <li class="big-li"><b>邮政编码：</b>{{company_info.gs_zipcode}}</li>
      </ul>
      <h3>营业执照信息</h3>
      <ul>
        <li><b>一证一码商家：</b>
          <span v-if="license_info.card_code==0">是</span>
          <span v-else>否</span>
        </li>
        <li><b>注册资金（￥万元）：</b>{{license_info.reg_money}}</li>
        <template v-if="license_info.card_code == 0">
          <li><b>统一社会信用代码：</b>{{license_info.credit_code}}</li>
          <li><b>法定代表人姓名：</b>{{license_info.legal_name}}</li>
          <li><b>是否长期：</b>
            <span v-if="license_info.forever == 0">否</span>
            <span v-else>是</span>
          </li>
          <li>
            <b>营业执照有效期开始时间：</b>{{license_info.license_start}}
          </li>
          <li v-if="license_info.forever == 0">
            <b>营业执照有效期结束时间：</b>{{license_info.license_end}}
          </li>
          <li>
            <b>营业执照经营范围：</b>{{license_info.license_scope}}
          </li>
          <li><b>纳税人类型：</b>
            <span v-if="license_info.taxpayer_type == 0">一般纳税人</span>
            <span v-else-if="license_info.taxpayer_type == 1">小规模纳税人</span>
            <span v-else>非增值税纳税人</span>
          </li>
          <li><b>纳税类型税码：</b>
            <span v-if="license_info.tax_code == 0">0%</span>
            <span v-if="license_info.tax_code == 1">3%</span>
            <span v-if="license_info.tax_code == 2">6%</span>
            <span v-if="license_info.tax_code == 3">7%</span>
            <span v-if="license_info.tax_code == 4">11%</span>
            <span v-if="license_info.tax_code == 5">13%</span>
            <span v-if="license_info.tax_code == 6">17%</span>
          </li>
        </template>
        <template v-else>
          <li>
            <b>营业执照注册号：</b>{{license_info.license_number}}
          </li>
          <li>
            <b>法定代表人姓名：</b>{{license_info.legal_name}}
          </li>
          <li><b>是否长期：</b>
            <span v-if="license_info.forever == 0">否</span>
            <span v-else>是</span>
          </li>
          <li>
            <b>营业执照有效期开始时间：</b>{{license_info.license_start}}
          </li>
          <li v-if="license_info.forever == 0">
            <b>营业执照有效期结束时间：</b>{{license_info.license_end}}
          </li>
          <li>
            <b>营业执照经营范围：</b>{{license_info.license_scope}}
          </li>
          <li>
            <b>组织机构代码：</b>{{license_info.org_code}}
          </li>
          <li>
            <b>税务登记号码（识别号）：</b>{{license_info.taxpayer_code}}
          </li>
          <li><b>纳税人类型：</b>{{license_info.taxpayer_type}}
          </li>
          <li><b>纳税类型税码：</b>
            <span v-if="license_info.tax_code == 0">0%</span>
            <span v-if="license_info.tax_code == 1">3%</span>
            <span v-if="license_info.tax_code == 2">6%</span>
            <span v-if="license_info.tax_code == 3">7%</span>
            <span v-if="license_info.tax_code == 4">11%</span>
            <span v-if="license_info.tax_code == 5">13%</span>
            <span v-else>17%</span>
          </li>
        </template>
      </ul>
      <h3>银行卡信息</h3>
      <ul>
        <li><b>银行开户名：</b>{{bank_info.bank_realname}}
        </li>
        <li><b>银行账号：</b>{{bank_info.bank_no}}
        </li>
        <li><b>开户银行支行名称：</b>{{bank_info.bank_name}}
        </li>
        <li><b>开户行所在地：</b>{{bank_info.bank_location}}
        </li>
      </ul>
      <h3>店铺信息</h3>
      <ul>
        <li><b>主账号：</b>{{shop_info.main_account}}</li>
        <li><b>店铺名称：</b>{{shop_info.shop_name}}</li>
        <li><b>店铺等级名称：</b>{{shop_info.grade_name}}</li>
        <li><b>店铺主营大类：</b>{{shop_info.cate_name}}</li>
        <li><b>店铺性质：</b>
          <span v-if="shop_info.shop_nature == 0">旗舰店</span>
          <span v-else-if="shop_info.shop_nature == 1">专卖店</span>
          <span v-else>专营店</span>
        </li>
        <li><b>店铺负责人姓名：</b>{{shop_info.seller_name}}</li>
        <li><b>店铺负责人手机：</b>{{shop_info.seller_mobile}}</li>
        <li><b>店铺负责人QQ号：</b>{{shop_info.seller_qq}}</li>
        <li><b>店铺负责人邮箱：</b>{{shop_info.seller_email}}</li>
        <li><b>店铺所在地：</b>{{shop_info.shop_location}}</li>
        <li class="big-li"><b>店铺详细地址：</b>{{shop_info.shop_addr}}</li>
      </ul>
      <h3>经营类目</h3>
      <el-table class="lm"
                :data="shop_info.business_cate"
                stripe
                border
                style="width: 100%">
        <el-table-column
          prop="cate1_name"
          label="一级类目">
        </el-table-column>
        <el-table-column
          prop="cate2_name"
          label="二级类目">
        </el-table-column>
        <el-table-column
          prop="cate3_name"
          label="三级类目">
        </el-table-column>
        <el-table-column
          prop="yj_percent"
          label="佣金比例">
        </el-table-column>
      </el-table>
      <h3>证件信息 &nbsp;&nbsp;<strong class="c-danger">所有证件扫描件均为一张</strong></h3>
      <dl>
        <dt><b>企业营业执照副本复印件（需加盖红章）</b>
          <img class="zz-img" :src="zj_info.img1" alt="lara-shop商城商家入驻资质" title="lara-shop商城商家入驻资质" width="150"
               height="150">
        </dt>
        <dt><b>税务登记证复印件（国税、地税）（需加盖红章）</b>
          <img class="zz-img" :src="zj_info.img2" alt="lara-shop商城商家入驻资质" title="lara-shop商城商家入驻资质" width="150"
               height="150">
        </dt>
        <dt><b>组织机构代码证复印件（需加盖红章）</b>
          <img class="zz-img" :src="zj_info.img3" alt="lara-shop商城商家入驻资质" title="lara-shop商城商家入驻资质" width="150"
               height="150">
        </dt>
        <dt><b>法人身份证正反面复印件或护照（需加盖红章）</b>
          <img class="zz-img" :src="zj_info.img4" alt="lara-shop商城商家入驻资质" title="lara-shop商城商家入驻资质" width="150"
               height="150">
        </dt>
        <dt><b>店铺负责人身份证正反面复印件（需加盖红章）</b>
          <img class="zz-img" :src="zj_info.img5" alt="lara-shop商城商家入驻资质" title="lara-shop商城商家入驻资质" width="150"
               height="150">
        </dt>
      </dl>
    </div>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `本店铺的详细信息。`
        }, // 提示模块参数
        company_info: {
          gs_name: '', // 公司名称
          gs_nature: '', // 公司性质  0=股份有限公司 1=个人独立企业 2=有限责任公司 3=外资 4=中外合资 5=国企 6=合伙制企业 7=其他
          gs_website: '', // 公司官网地址
          gs_location: '', // 公司所在地省市县拼接字符串  北京市，市辖区，东城区
          gs_addr: '', // 公司所在地详细地址    南山区西丽镇留仙大道
          gs_phone: '', // 固定电话
          gs_email: '', // 电子邮箱
          gs_fax: '', // 传真
          gs_zipcode: '' // 邮政编码
        }, // 公司信息
        license_info: {
          card_code: '', // 一证一码商家  0=是 1=否
          reg_money: '', // 注册资金(单位：万元(人民币))
          credit_code: '', // 统一社会信用代码
          legal_name: '', // 法定代表人姓名
          license_start: '', // 营业执照有效期开始时间
          license_end: '', // 营业执照有效期结束时间
          forever: '', // 是否长期  0=否 1=是  (长期时不需要选择营业执照时间)
          license_scope: '', // 营业执照经营范围
          taxpayer_type: '', // 纳税人类型   0=一般纳税人 1=小规模纳税人 2=非增值税纳税人
          tax_code: '', // 纳税类型税码 0=0% 1=3% 2=6% 3=7% 4=11% 5=13% 6=17%
          license_number: '', // 营业执照注册号
          org_code: '', // 组织机构代码
          taxpayer_code: '' // 税务登记号码(纳税人识别号)
        }, // 营业执照信息
        bank_info: {
          bank_realname: '', // 银行开户名
          bank_no: '', // 银行账号
          bank_name: '', // 开户银行支行名称
          bank_location: '' // 开户银行支行所在地省市拼接字符串  河南省，郑州市
        }, // 银行卡信息
        shop_info: {
          main_account: '', // 主账号
          shop_name: '', // 店铺名称
          grade_name: '', // 店铺等级名称
          cate_name: '', // 店铺主营大类名称
          shop_nature: '', // 店铺性质  0=旗舰店 1=专卖店 2=专营店
          seller_name: '', // 店铺负责人姓名
          seller_mobile: '', // 店铺负责人手机
          seller_qq: '', // 店铺负责人QQ号
          seller_email: '', // 店铺负责人邮箱
          shop_location: '', // 店铺所在地省市县拼接字符串    北京市，市辖区，东城区
          shop_addr: '', // 店铺所在地详细地址    南山区西丽镇留仙大道1001号
          business_cate: [] // 经营类目
        }, // 店铺信息
        zj_info: {
          img1: '', // 企业营业执照副本复印件（需加盖红章）
          img2: '', // 税务登记证复印件（国税、地税）（需加盖红章）
          img3: '', // 组织机构代码证复印件（需加盖红章）
          img4: '', // 法人身份证正反面复印件或护照（需加盖红章）
          img5: '' // 店铺负责人身份证正反面复印件（需加盖红章）
        }, // 证件信息
        loading: true
      }
    },
    created() {
      this.get_data()
    },
    methods: {
      get_data() {
        this.axios.post(this.getApi('seller/auth/shop_info')
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.company_info = res.data.company_info;
            this.license_info = res.data.license_info;
            this.bank_info = res.data.bank_info;
            this.zj_info = res.data.zj_info;
            this.shop_info = res.data.shop_info;
          }
        }).catch(err => {
          this.loading = false;
          this.$message('网络错误 请重试')
        })
      }
    },
    computed: {},
    components: {
      hint
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shop-business h3 {
    line-height: 40px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 10px;
  }

  .reg-info h3 {
    height: 38px;
    line-height: 38px;
    background-color: #cccccc;
    color: #fff;
    padding-left: 10px;
  }

  .reg-info ul {
    overflow: hidden;
    border-right: 1px solid #ccc;
    margin-bottom: 25px;
  }

  .lm, .reg-info dl {
    margin-bottom: 25px;
  }

  .reg-info li {
    float: left;
    width: 50%;
    height: 38px;
    line-height: 37px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }

  .reg-info li > b, .reg-info dt > b {
    float: left;
    width: 165px;
    background-color: #f7f7f7;
    text-align: right;
    padding-right: 10px;
    margin-right: 10px;
    box-sizing: border-box;
  }

  .reg-info dt > b {
    width: 340px;
    height: 150px;
  }

  .reg-info .big-li {
    width: 100%;
  }

  .reg-info dl {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  .reg-info dt {
    border-bottom: 1px solid #ccc;
    line-height: 150px;
  }

  .zz-img {
    width: 150px;
    height: 150px;
  }

</style>
