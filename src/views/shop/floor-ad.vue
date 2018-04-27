<template>
  <div class="member-list prop-box">
    <!--商品促销-->
    <div class="m-member-list m-prop-box">
      <hint :title="hint.title" :content="hint.content"></hint>
      <h2>楼层列表
        <el-button type="text" icon="plus" size="small" class="add-member-btn add-btn" @click="edit_seles('')">
          添加楼层
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
                  class="iconfont icon-chakangengduoshangpin c-danger"></i>&nbsp;查看商品
                </el-dropdown-item>
                <el-dropdown-item command="1"><i class="iconfont icon-wancheng1 c-danger"></i>编辑
                </el-dropdown-item>
                <el-dropdown-item command="2"><i class="iconfont icon-shanchu4 c-danger"></i>&nbsp;删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          prop="floor"
          label="所在楼层"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="楼层标题"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="subtitle"
          label="楼层副标题"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="color"
          label="主题色彩"
          min-width="90">
          <template slot-scope="scope">
            <span :style="{backgroundColor:scope.row.color,padding:'15px',lineHeight:'24px'}">{{scope.row.color}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_open"
          label="是否开启"
          min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.is_open == 0 ">关闭</span>
            <span v-else>开启</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="select-all" v-if="tableData.length>0">
        <el-button :plain="true" type="primary" @click="toggleSelection()">取消</el-button>
        <el-button :plain="true" :disabled="multipleSelection.length==0" type="danger"
                   @click="del_seles('all')">删除
        </el-button>
      </div>
      <!--<page :totalPage="totalPage" :currentPage="index" @toPage="to_page"></page>-->
    </div>
    <!--添加楼层-->
    <div class="add-member prop" v-if="add_show">
      <crumb :from="crumb.from" :now="crumb.now" @goBack="go_back"></crumb>
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px">
            <el-form-item label="所在楼层" prop="floor">
              <el-input v-model.number="ruleForm.floor" placeholder="请输入楼层数"></el-input>
              <span id="floor"> L</span>
            </el-form-item>
            <el-form-item label="楼层标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="楼层副标题" prop="subtitle">
              <el-input v-model="ruleForm.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="楼层主题色">
              <el-color-picker v-model="ruleForm.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="商品分类" prop="cate_id">
              <el-select v-model="ruleForm.cate_id" @change="change_cateGoods"
                         placeholder="请选择分类">
                <el-option v-for="item in category" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <!--<em class="c-danger">&nbsp;只能对一级分类上传广告图（分类发生变化，分类商品重新选择）</em>-->
            </el-form-item>
            <!--  <el-form-item label="广告链接" prop="link">
                  <el-input v-model="ruleForm.link"></el-input>
                </el-form-item>
                <el-form-item label="PC首页广告图">
                  <el-upload
                    class="avatar-uploader"
                    :action="getApi('coms/upload-img')"
                    :data="{type:3}"
                    :show-file-list="false"
                    list-type="picture-card"
                    :on-success="handlePcSuccess"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="pcUrl" :src="pcUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  &lt;!&ndash;<em class="c-danger">建议为正方型图片，尺寸建议宽度为480*480，如果不上传默认为第一个缩略图，仅支持jpg格式。</em>&ndash;&gt;
                </el-form-item>
                <el-form-item label="APP分类广告图">
                  <el-upload
                    class="avatar-uploader"
                    :action="getApi('coms/upload-img')"
                    :data="{type:3}"
                    :show-file-list="false"
                    list-type="picture-card"
                    :on-success="handleMobileSuccess"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="phoneUrl" :src="phoneUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  &lt;!&ndash;<em class="c-danger">建议为正方型图片，尺寸建议宽度为480*480，如果不上传默认为第一个缩略图，仅支持jpg格式。</em>&ndash;&gt;
                </el-form-item>-->
            <el-form-item label="是否开启">
              <el-switch
                v-model="ruleForm.is_open"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="选择商品">
              <el-button @click="choice_goods">选择商品</el-button>
              <em class="c-danger"> 只有分类下的商品可选择</em>
            </el-form-item>
            <el-table
              :data="ruleForm.goods"
              stripe
              style="width: 100%">
              <el-table-column
                prop="good_name"
                label="商品名称"
                min-width="300">
                <template slot-scope="scope">
                  <a :href="scope.row.good_link" target="_blank">{{scope.row.good_name}}</a>
                </template>
              </el-table-column>
              <el-table-column
                prop="sell_price"
                label="价格"
                min-width="140">
              </el-table-column>
              <el-table-column
                prop="store_nums"
                label="库存"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="120">
                <template slot-scope="scope">
                  <el-button class="del-sele-good" type="danger" size="small"
                             @click="del_seles_goods(scope.$index, tableData)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
        <div class="submit-box">
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
        </div>
      </el-tabs>
    </div>
    <!--操作-->
    <el-dialog
      title="查看商品"
      :visible.sync="dialogVisible"
      width="80%">
      <el-table :data="see_goods_data">
        <el-table-column property="good_name" label="商品名称" min-width="260">
          <template slot-scope="scope">
            <a :href="scope.row.good_link" target="_blank">{{scope.row.good_name}}</a>
          </template>
        </el-table-column>
        <el-table-column property="sell_price" label="价格" min-width="100"></el-table-column>
        <el-table-column property="store_nums" label="库存" min-width="100"></el-table-column>
      </el-table>
    </el-dialog>
    <!--选择商品加入活动-->
    <el-dialog
      title="选择商品"
      :visible.sync="dialogVisible_goods"
      width="80%">
      <div class="u-right">
        <el-select class="sele-s" v-model="search_type" placeholder="搜索类型" :clearable="true">
          <el-option label="商品编号" value="0"></el-option>
          <el-option label="商品名称" value="1"></el-option>
        </el-select>
        <el-input placeholder="搜索关键词" v-model="search_str_" class="search">
          <el-button slot="append" icon="el-icon-search" @click="get_seles_goods"></el-button>
        </el-input>
      </div>
      <el-table :data="choice_goods_data"
                @selection-change="handleSelectionChange_">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="good_name" label="商品名称" min-width="260">
          <template slot-scope="scope">
            <a :href="scope.row.good_link" target="_blank">{{scope.row.good_name}}</a>
          </template>
        </el-table-column>
        <el-table-column property="sell_price" label="价格" min-width="100"></el-table-column>
        <el-table-column property="store_nums" label="库存" min-width="100"></el-table-column>
      </el-table>
      <div class="see-goods-fy">
        <el-pagination
          @current-change="next_choice_goods"
          :current-page="choice_index"
          layout="total, prev, pager, next, jumper"
          :page-count="choice_pgCount">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_seles_goods">添 加</el-button>
      </span>
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
          content: `店铺首页的商品分类展示布局`
        }, // 提示模块参数
        tableData: [], // 表格数据
        multipleSelection: [], // 选中列
        totalPage: 1, // 总页
        add_show: false, // 是否弹出编辑页面
        crumb: {
          from: '楼层管理',
          now: '编辑楼层'
        }, // 面包屑模块参数
        ruleForm: {
          id: '',
          floor: null,
          title: '',
          subtitle: '',
          color: '',
          goods: [],
          is_open: '1'
        },//编辑页面表单数据
        rules: {
          floor: [
            {required: true, type: 'number', message: '请输入数值', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入楼层标题', trigger: 'blur'}
          ],
          subtitle: [
            {required: true, message: '请输入楼层副标题', trigger: 'blur'}
          ],
          cate_id: [
            {required: true, type: 'number', message: '请选择商品分类', trigger: 'change'}
          ],
          link: [
            {required: true, message: '广告链接必填', trigger: 'blur'}
          ]
        }, // 验证规则
        dialogVisible: false, // 是否弹出
        see_index: 1, // 查看商品当前页
        see_pgCount: null, // 查看商品总页数
        see_goods_data: [], // 查看商品表格
//        seles_goods_data: [], // 参加次活动的商品信息
        dialogVisible_goods: false, // 选择参加活动的商品
        choice_goods_data: [], // 可选加入活动的商品列表
        choice_index: 1, // 可选商品当前页
        choice_pgCount: null, // 可选加入活动的商品列表总页数
        search_type: '', // 搜索类型
        search_str_: '', // 搜索关键词
        str_good_id: '', // 列表中已有的商品id拼接字符串
        multipleSelection_: [], // 参加活动商品选中列
        id: '', // 所编辑id
        del_id: [], // 删除储存数组
        loading: true,
        category: [],
        img_pc: '',
        img_phone: '',
        pcUrl: '',
        phoneUrl: ''
      }
    },
    created() {
      this.get_seles()
    },
    methods: {
      // 监听子组件点击事件 关闭弹出层
      go_back() {
        this.add_show = false
      },
      // 监听子分页组件 翻页
      to_page() {
        this.get_seles()
      },
      // 商品分类发生变化时分类商品重新获取
      change_cateGoods() {
        this.ruleForm.goods = [];
      },
      // 广告上传
      handlePcSuccess(res, file) { // img_pc
        this.img_pc = res.path;
        this.pcUrl = URL.createObjectURL(file.raw)
      },
      handleMobileSuccess(res, file) { // img_phone
        this.img_phone = res.path;
        this.phoneUrl = URL.createObjectURL(file.raw)
      },
      // logo上传前钩子函数
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传广告图必须是JPG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传广告图大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      //获取商品一级分类
      get_category() {
        this.axios.post(this.getApi('seller/auth/shop_cate_list')
        ).then(res => {
          if (res.data.code === 0) {
            this.category = res.data.list
          }
        })
      },
      // 获取楼层列表
      get_seles() {
        this.axios.post(this.getApi('seller/auth/floor_list')
        ).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableData = res.data.list
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
        switch (val) {
          case '0':
            this.dialogVisible = true;
            this.see_goods(id);
            break;
          case '1':
            this.edit_seles(id);
            break;
          case '2':
            this.del_seles(id);
            break
        }
      },
      // 查看
      see_goods(floor_id) {
        this.axios.post(this.getApi('seller/auth/floor_view'),
          this.dafa({
            id: floor_id,
          })
        ).then(res => {
          if (res.data.code === 0) {
            this.see_goods_data = res.data.list
          } else {
            this.$message(res.data.msg)
          }
        }).catch(err => {
          this.$message('对不起！请稍后再试')
        })
      },
      // 查看商品翻页
      next_see_goods(val) {
        this.see_index = val;
        this.see_goods();
      },
      // 选择活动商品
      choice_goods() {
        this.str_good_id = '';
        // if (this.ruleForm.cate_id) {
        this.dialogVisible_goods = true;
        this.ruleForm.goods.forEach(item => {
          this.str_good_id += item.good_id + ','
        });
        this.get_seles_goods()
        // } else {
        //   this.$message('请选择商品分类')
        // }

      },
      // 获取可参与活动商品
      get_seles_goods() {
        this.axios.post(this.getApi('seller/auth/floor_goods'),
          this.dafa({
            index: this.choice_index,
            goods_id: this.str_good_id,
            cate_id: this.ruleForm.cate_id,
            search_type: this.search_type,
            search_str: this.search_str_
          })
        ).then(res => {
          if (res.data.code === 0) {
            this.choice_pgCount = res.data.fy_pgCount;
            this.choice_goods_data = res.data.list
          }
        })
      },
      // 选择商品翻页
      next_choice_goods(val) {
        this.choice_index = val;
        this.get_seles_goods();
      },
      // 选择时间处理数据格式
      choice_time(val) {
        let start = Date.parse(new Date(val.substr(0, 19)));
        let end = Date.parse(new Date(val.substr(22, 19)));
        this.start_time = start / 1000;
        this.end_time = end / 1000;
      },
      // 编辑活动
      edit_seles(sales_id) {
        this.id = sales_id;
        this.add_show = true;
        this.antiShake.antiShake((resolve, reject) => {
          this.axios.post(this.getApi('seller/auth/floor_edit'),
            `id=${this.id}`
          ).then(res => {
            resolve(res);
            if (res.data.code === 0) {
              this.ruleForm = Object.assign(this.ruleForm, res.data.info)
            }
          }).catch((err) => {
            reject(err);
            console.log(err);
            // this.$message('对不起！请稍后再试')
          })
        });
        this.get_category()
      },
      // 删除此活动里的商品
      del_seles_goods(index, rows) {
        this.ruleForm.goods.splice(index, 1)
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
      // 收集参加活动商品选中列
      handleSelectionChange_(val) {
        this.multipleSelection_ = val
      },
      // 添加活动上商品
      add_seles_goods() {
        this.ruleForm.goods = this.multipleSelection_.concat(this.ruleForm.goods);
        this.dialogVisible_goods = false;
      },
      // 删除活动
      del_seles(id) {
        this.$confirm('是否确认将删除此楼层?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id === 'all') {
            this.multipleSelection.forEach(item => {
              this.del_id += item.id + ','
            })
          } else {
            this.del_id += id + ','
          }

          this.axios.post(this.getApi('seller/auth/floor_del'),
            this.dafa({
              id_list: this.del_id
            })
          ).then(res => {
            this.$message(res.data.msg)
            this.del_id = '';
            if (res.data.code === 0) {
              this.get_seles()
            } else {
              this.toggleSelection();
            }
          }).catch((err) => {
            console.log(err);
            this.$message('对不起！请稍后再试');
            this.toggleSelection();
            this.del_id = '';
          })
        }).catch(() => {
          this.toggleSelection();
          this.del_id = '';
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 时间格式
      STIME(val) {
        this.ruleForm.start_time = val
      },
      ETIME(val) {
        this.ruleForm.end_time = val
      },
      // 提交保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let str = '';
            this.ruleForm.goods.forEach(item => {
              str += item.good_id + ','
            });

            this.antiShake.antiShake((resolve, reject) => {
              this.axios.post(this.getApi('seller/auth/floor_save'),
                this.dafa({
                  id: this.id,
                  floor: this.ruleForm.floor,
                  title: this.ruleForm.title,
                  cate_id: this.ruleForm.cate_id,
                  subtitle: this.ruleForm.subtitle,
                  color: this.ruleForm.color,
                  goods_id: str,
                  is_open: this.ruleForm.is_open
                })
              ).then(res => {
                resolve(res);
                // this.$message(res.data.msg);
                if (res.data.code === 0) {
                  this.add_show = false;
                  this.get_seles();
                  this.category = [];
                }
              }).catch(err => {
                reject(err);
                // this.$message('对不起！请稍后再试')
              })
            })
          }
        })
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
  .see-goods-fy {
    overflow: hidden;
    margin-top: 10px;
  }

  .el-pagination {
    float: right;
  }

  .del-sele-good {
    width: 60px;
    margin: 0;
  }

  .submit-box {
    margin: 20px 0 40px;
    padding-left: 240px;
  }

  .u-right {
    margin-bottom: 15px;
  }

  .u-right .el-input {
    width: 290px;
  }

  #floor {
    font-size: 20px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
</style>
