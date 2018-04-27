<template>
  <!--站点设置-->
  <div class="m-type-list m-prop-box">
    <hint :title="hint.title" :content="hint.content"></hint>
    <el-tabs type="border-card">
      <el-tab-pane label="店铺设置">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px" class="demo-ruleForm">
          <el-form-item label="店铺等级">
            {{ruleForm.grade_name}}
          </el-form-item>
          <el-form-item label="店铺名称">
            {{ruleForm.shop_name}}
          </el-form-item>
          <el-form-item label="店铺LOGO">
            <!--<el-upload
              class="avatar-uploader"
              :action="getApi('coms/upload-img')"
              :data="{type:11}"
              :show-file-list="false"
              list-type="picture-card"
              :on-success="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,0)}"
              :before-upload="beforeAvatarUpload">
              <img v-if="shop_img.logo" :src="shop_img.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <upload-item
              :onSuccess="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,0)}"
              :onRemove="handleRemove"
              :fileList="logo_fileList"
              :limit="1"
              :severType=11>
            </upload-item>
          </el-form-item>
          <el-form-item label="店铺条幅">
            <!-- <el-upload
               class="avatar-uploader avatar-uploader-lang"
               :action="getApi('coms/upload-img')"
               :data="{type:11}"
               :show-file-list="false"
               list-type="picture-card"
               :on-success="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,1)}"
               :before-upload="beforeAvatarUpload">
               <img v-if="shop_img.ad" :src="shop_img.ad" class="avatar-ad">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>-->
            <upload-item
              :onSuccess="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,1)}"
              :onRemove="handleRemove"
              :fileList="ad_fileList"
              :limit="1"
              :severType=11>
            </upload-item>
            <em class="c-danger">店铺条幅是店铺首页长条形横幅，长1920px宽120px</em>
          </el-form-item>
          <el-form-item label="店铺头像">
            <!--<el-upload
              class="avatar-uploader"
              :action="getApi('coms/upload-img')"
              :data="{type:11}"
              :show-file-list="false"
              list-type="picture-card"
              :on-success="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,2)}"
              :before-upload="beforeAvatarUpload">
              <img v-if="shop_img.head" :src="shop_img.head" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <upload-item
              :onSuccess="(response, file, fileList)=>{handleAvatarSuccess(response, file, fileList,2)}"
              :onRemove="handleRemove"
              :fileList="head_fileList"
              :limit="1"
              :severType=11>
            </upload-item>
          </el-form-item>
          <el-form-item label="客服QQ">
            <el-input v-model.number="ruleForm.qq_service"></el-input>
          </el-form-item>
          <el-form-item label="店铺电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺手机">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="卖家收货人姓名">
            <el-input v-model="ruleForm.receive_name"></el-input>
          </el-form-item>
          <el-form-item label="卖家收货地址">
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="ruleForm.province_id" placeholder="请选择"
                           @change="getArea($event,1)">
                  <el-option label="请选择" value="" disabled></el-option>
                  <el-option
                    v-for="item in area.province"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="ruleForm.city_id" placeholder="请选择" @change="getArea($event,2)">
                  <el-option label="请选择" value="" disabled></el-option>
                  <el-option
                    v-for="item in area.city"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="county_id">
                <el-select v-model="ruleForm.county_id" placeholder="请选择">
                  <el-option label="请选择" value="" disabled></el-option>
                  <el-option
                    v-for="item in area.county"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="卖家收货详细地址" prop="addr">
            <el-input v-model="ruleForm.addr"></el-input>
          </el-form-item>
          <el-form-item label="店铺头部导航条主题色">
            <el-color-picker v-model="ruleForm.nav_color"></el-color-picker>
            <em class="c-danger">此主题色会改变商品详情和店铺首页导航背景色，字体色为#fff白色，请谨慎配色</em>
          </el-form-item>
          <el-form-item label="卖家收货地址邮编">
            <el-input v-model="ruleForm.zip"></el-input>
          </el-form-item>
          <el-form-item label="SEO关键词">
            <el-input v-model="ruleForm.keywords"></el-input>
            <p class="c-danger">用于店铺搜索引擎的优化，关键字之间请用 _ 分隔,12个字以内</p>
          </el-form-item>
          <el-form-item label="SEO描述">
            <el-input type="textarea"
                      :rows="3" v-model="ruleForm.description"></el-input>
            <p class="c-danger">用于店铺搜索引擎的优化，建议120字以内</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确 认</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="pc端轮播设置">
        <el-carousel :autoplay="false" height="240px" arrow="always">
          <el-carousel-item v-for="item in ruleForm.pc_imgs" :key="item.link">
            <img class="swiper-img" :src="item.img" alt="lara-shop商城店铺轮播图">
          </el-carousel-item>
        </el-carousel>
        <!--<ul class="all-box">
          <li class="ev-img" v-for="(item,index) in pc_img">
            <el-upload
              class="avatar-uploader"
              :action="getApi('coms/upload-img')"
              :data="{type:11}"
              :show-file-list="true"
              list-type="picture-card"
              :limit="1"
              :on-exceed="exceed"
              :on-success="(response, file, fileList)=> {upSuccess(response, file, fileList,item)}"
              :on-remove="(file, fileList)=>{handleRemove(file, fileList,index)}"
              :before-upload="beforeAvatarUpload">
              <img v-if="item.img" :src="item.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="c-danger">跳转url：</p>
            <el-input v-model="item.link" placeholder="请输入内容"></el-input>
          </li>
        </ul>-->
        <div class="upload-box">
          <!--<el-upload
            :action="getApi('coms/upload-img')"
            :data="{type:11}"
            :limit="5"
            :on-exceed="exceed"
            :fileList="pc_fileList"
            list-type="picture-card"
            :on-success="upSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>-->
          <upload-item
            :onSuccess="upSuccess"
            :onRemove="handleRemove"
            :fileList="pc_fileList"
            :severType=11>
          </upload-item>
          <p class="c-danger">跳转url：</p>
          <el-input class="ipt-link" v-for="item in pc_img" :key="item.img" v-model="item.link"
                    placeholder="请输入连接地址"></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="app端轮播设置">
        <el-carousel :autoplay="false" height="240px" arrow="always">
          <el-carousel-item v-for="item in ruleForm.m_imgs" :key="item.link">
            <img class="swiper-img" :src="item.img" alt="lara-shop商城店铺轮播图">
          </el-carousel-item>
        </el-carousel>
        <div class="upload-box">
          <!-- <el-upload
             :action="getApi('coms/upload-img')"
             :data="{type:11}"
             :limit="5"
             :on-exceed="exceed"
             :fileList="app_fileList"
             list-type="picture-card"
             :on-success="upSuccess2"
             :before-upload="beforeAvatarUpload"
             :on-remove="handleRemove2">
             <i class="el-icon-plus"></i>
           </el-upload>-->
          <upload-item
            :onSuccess="upSuccess2"
            :onRemove="handleRemove2"
            :fileList="app_fileList"
            :severType=11>
          </upload-item>
          <p class="c-danger">跳转url：</p>
          <el-input class="ipt-link" v-for="item in app_img" :key="item.img" v-model="item.link"
                    placeholder="请输入连接地址"></el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import hint from '@/components/hint.vue'
  import uploadItem from '@/components/upload.vue'

  export default {
    data() {
      return {
        hint: {
          title: '操作提示',
          content: `店铺的基本设置，请如实填写。轮播设置可以设置最多五张图片，关联到5个链接用于店铺推广`
        }, // 提示模块参数
        shop_img: {
          logo: '',
          ad: '', // 店铺条幅
          head: ''
        }, // 店铺设置关于图片的信息
        logo_fileList: [],
        ad_fileList: [],
        head_fileList: [],
        pc_img: [], // pc端轮播图盒子
        pc_fileList: [], // pc端已存在图片盒子
        app_img: [], // app端轮播盒子
        app_fileList: [], // app端已存在图片盒子
        area: {
          province: [],
          city: [],
          county: []
        }, // 店铺地区信息
        ruleForm: {
          grade_name: '',
          shop_name: '',
          logo: '',
          ad: '',
          head: '',
          qq_service: '',
          nav_color: '',
          phone: '',
          mobile: '',
          receive_name: '',
          province_id: '',
          province_name: '',
          city_id: '',
          city_name: '',
          county_id: '',
          county_name: '',
          addr: '',
          zip: '',
          keywords: '',
          description: '',
          pc_imgs: [],
          m_imgs: []
        }, // 编辑页面表单数据
        rules: {
          phone: [
            {required: true, message: '请输入店铺电话', trigger: 'blur'}
          ],
          county_id: [
            {required: true, type: 'number', message: '请选择地址', trigger: 'blur'}
          ],
          addr: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ],
        } // 验证规则
      }
    },
    created() {
      this.get_data()
    },
    mounted() {
      this.getArea(0, 0)
    },
    methods: {
      // 点击预览时得到的数据
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true
      },
      // 上传成功回调 - 店铺
      handleAvatarSuccess(res, file, fileList, item) {
        switch (item) {
          case 0:
            this.ruleForm.logo = res.key;
            this.shop_img.logo = URL.createObjectURL(file.raw);
            break;
          case 1:
            this.ruleForm.ad = res.key;
            this.shop_img.ad = URL.createObjectURL(file.raw);
            break;
          case 2:
            this.ruleForm.head = res.key;
            this.shop_img.head = URL.createObjectURL(file.raw);
            break;
        }
      },
      // 上传成功回调 - pc
      upSuccess(res, file, fileList, bank) {
        this.pc_img.push({img: res.key, link: ''}); // 线上版
        this.ruleForm.pc_imgs.push({img: `${bank}${res.key}`});
        // this.pc_img.push({img: URL.createObjectURL(file.raw), link: ''}); // 本地版
      },
      // 上传成功回调 - app
      upSuccess2(res, file, fileList, bank) {
        this.app_img.push({img: res.key, link: ''}); // 线上版
        this.ruleForm.m_imgs.push({img: `${bank}${res.key}`});
        // this.app_img.push({img: URL.createObjectURL(file.raw), link: ''}); // 本地版
      },
      // 上传前钩子函数
      beforeAvatarUpload(file) {
        let isType = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isType) {
          this.$message.error('上传图片必须是JPG或PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isType && isLt2M
      },
      // 图片删除回调
      handleRemove(file, fileList) {
        let arr = [];
        this.pc_img.forEach(item => {
          if (file.response) {
            if (item.img != file.response.path) {
              arr.push(item)
            }
          } else {
            if (item.img != file.url) {
              arr.push(item)
            }
          }
        });
        this.pc_img = arr;
      },
      // 图片删除回调
      handleRemove2(file, fileList) {
        let arr = [];
        this.app_img.forEach(item => {
          if (file.response) {
            if (item.img != file.response.path) {
              arr.push(item)
            }
          } else {
            if (item.img != file.url) {
              arr.push(item)
            }
          }
        });
        this.app_img = arr;
      },
      // 超出个数限制
      exceed() {
        this.$message('最多上传5张图片')
      },
      // 获取数据
      get_data() {
        this.axios.post(this.getApi('seller/auth/shop_setting_page')
        ).then(res => {
          if (res.data.code === 0) {
            res.data.info.pc_imgs = res.data.info.pc_imgs || [];
            res.data.info.m_imgs = res.data.info.m_imgs || [];
            this.ruleForm = res.data.info;
            // 处理数据 - 头像 ad logo
            this.shop_img.head = res.data.info.head;
            this.shop_img.ad = res.data.info.ad;
            this.shop_img.logo = res.data.info.logo;
            this.logo_fileList = res.data.info.logo ? [{url: res.data.info.logo}] : [];
            this.ad_fileList = res.data.info.ad ? [{url: res.data.info.ad}] : [];
            this.head_fileList = res.data.info.head ? [{url: res.data.info.head}] : [];
            // 处理数据 - pc轮播
            // this.pc_img = res.data.info.pc_imgs;
            this.pc_fileList = [];
            this.pc_img = [];
            res.data.info.pc_imgs.forEach(item => {
              this.pc_fileList.push({name: '', url: item.img});
              this.pc_img.push(item)
            });
            /*for (let i = 0; i < 5; i++) {
             if (!this.pc_img[i]) {
             this.pc_img[i] = {img: '', link: ''};
             }
             }*/
            // 处理数据 - app轮播
            this.app_fileList = [];
            this.app_img = [];
            // this.app_img = res.data.info.m_imgs;
            res.data.info.m_imgs.forEach(item => {
              this.app_fileList.push({name: '', url: item.img});
              this.app_img.push(item)
            });
            // 处理市县地区数据
            this.area.city = [{id: res.data.info.city_id, name: res.data.info.city_name}];
            this.area.county = [{id: res.data.info.county_id, name: res.data.info.county_name}];
            /*for (let i = 0; i < 5; i++) {
             if (!this.app_img[i]) {
             this.app_img[i] = {img: '', link: ''};
             }
             }*/
          } else {
            this.$message(res.data.msg)
          }
        }).catch(err => {
          console.log(err);
          this.$message('对不起！请稍后再试')
        })
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/shop_setting_save'),
                this.dafa({
                  logo: this.ruleForm.logo,
                  ad: this.ruleForm.ad,
                  head: this.ruleForm.head,
                  qq_service: this.ruleForm.qq_service,
                  phone: this.ruleForm.phone,
                  mobile: this.ruleForm.mobile,
                  receive_name: this.ruleForm.receive_name,
                  province_id: this.ruleForm.province_id,
                  city_id: this.ruleForm.city_id,
                  nav_color: this.ruleForm.nav_color,
                  county_id: this.ruleForm.county_id,
                  addr: this.ruleForm.addr,
                  zip: this.ruleForm.zip,
                  keywords: this.ruleForm.keywords,
                  description: this.ruleForm.description,
                  pc_imgs: this.pc_img,
                  m_imgs: this.app_img
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.get_data()
                }
              }).catch(err => {
                reject(err);
              })
            })
          }
        })
      },
      // 获取省市县地区
      getArea(val, lv) {
        this.axios.post(this.getApi('coms/get_area'),
          `id=${val}`
        ).then(res => {
          if (res.data.code === 0) {
            switch (lv) {
              case 0:
                this.area.province = res.data.list;
                break;
              case 1:
                this.area.city = res.data.list;
                this.ruleForm.city_id = '';
                this.area.county = [];
                this.ruleForm.county_id = '';
                break;
              case 2:
                this.area.county = res.data.list;
                this.ruleForm.county_id = '';
                break;
            }
          }
        })
      }
    },
    components: {
      hint, uploadItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form .el-input, .el-textarea {
    width: 420px;
  }

  .el-button {
    width: 120px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }

  .avatar-ad {
    width: 600px;
    height: 80px;
  }

  .swiper-img {
    width: 100%;
    height: 100%;
  }

  /*.all-box {
    overflow: hidden;
    margin-top: 25px;
  }

  .ev-img {
    float: left;
    width: 20%;
    padding: 10px;
    box-sizing: border-box;
  }*/

  .ipt-link {
    width: 20%;
  }

  .upload-box {
    margin-top: 45px;
  }
</style>
