webpackJsonp([26],{"7vA+":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n.see-goods-fy[data-v-43dcbaae] {\n  overflow: hidden;\n  margin-top: 10px;\n}\n.el-pagination[data-v-43dcbaae] {\n  float: right;\n}\n.del-sele-good[data-v-43dcbaae] {\n  width: 60px;\n  margin: 0;\n}\n.submit-box[data-v-43dcbaae] {\n  margin: 20px 0 40px;\n  padding-left: 240px;\n}\n.u-right[data-v-43dcbaae] {\n  margin-bottom: 15px;\n}\n.u-right .el-input[data-v-43dcbaae] {\n  width: 290px;\n}\n\n",""])},OWGV:function(e,t,a){var l=a("7vA+");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("2a670efb",l,!0)},diyU:function(e,t,a){"use strict";function l(e){a("OWGV")}Object.defineProperty(t,"__esModule",{value:!0});var o=a("6Trz"),i=a("zVef"),n=a("js5j"),s={data:function(){return{hint:{title:"操作提示",content:"优惠促销管理, 由平台设置管理。"},tableData:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},date_time:"",start_time:"",end_time:"",status:"",search_str:"",multipleSelection:[],totalPage:1,add_show:!1,crumb:{from:"捆绑促销列表",now:"编辑活动"},ruleForm:{title:"",good_id:null,good_name:"",max_num:null,min_num:null,price:null,start_time:"",end_time:"",desc:""},rules:{title:[{required:!0,message:"请输入活动名称",trigger:"blur"}],good_name:[{required:!0,message:"请选择商品",trigger:"blur"}],max_num:[{required:!0,type:"number",message:"请设置团购活动允许购买的最大数量(数值)",trigger:"blur"}],min_num:[{required:!0,type:"number",message:"团购活动成立的最小购买量（数值）",trigger:"blur"}],price:[{required:!0,type:"number",message:"请输入团购价格（数值）",trigger:"blur"}],start_time:[],end_time:[],desc:[{required:!0,message:"请填写活动描述",trigger:"blur"}]},dialogVisible_goods:!1,choice_goods_data:[],choice_index:1,choice_pgCount:null,search_type:"",search_str_:"",good_id:"",radio:null,id:"",del_id:[],loading:!0}},created:function(){this.get_seles()},methods:{go_back:function(){this.add_show=!1},to_page:function(){this.get_seles()},get_seles:function(){var e=this;this.axios.post(this.getApi("seller/auth/groupbuy_list"),this.dafa({index:this.index,start_time:this.start_time,end_time:this.end_time,title:this.search_str,status:this.status})).then(function(t){e.loading=!1,0===t.data.code?(e.tableData=t.data.list,e.totalPage=t.data.fy_pgCount):e.$message(t.data.msg)}).catch(function(){e.loading=!1,e.$message("对不起！请稍后再试")})},get_seles_goods:function(){var e=this;this.dialogVisible_goods=!0,this.axios.post(this.getApi("seller/auth/groupbuy_goods"),this.dafa({goods_id:this.good_id,index:this.choice_index,search_type:this.search_type,search_str:this.search_str_})).then(function(t){0===t.data.code&&(e.choice_pgCount=t.data.fy_pgCount,e.choice_goods_data=t.data.list)})},next_choice_goods:function(e){this.choice_index=e,this.get_seles_goods()},choice_time:function(e){var t=Date.parse(new Date(e[0])),a=Date.parse(new Date(e[1]));this.start_time=t/1e3,this.end_time=a/1e3},edit_seles:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.id=t,this.antiShake.antiShake(function(a,l){e.axios.post(e.getApi("seller/auth/groupbuy_edit"),"id="+t).then(function(t){a(t),0===t.data.code&&(e.add_show=!0,t.data.info?(e.ruleForm=t.data.info,e.good_id=t.data.info.good_id):e.ruleForm={title:"",good_id:null,good_name:"",max_num:null,min_num:null,price:null,start_time:"",end_time:"",desc:""})}).catch(function(e){l(e),console.log(e)})})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},add_seles_goods:function(){var e=this;this.choice_goods_data.forEach(function(t){t.good_id==e.radio&&(e.ruleForm.good_id=e.radio,e.ruleForm.good_name=t.good_name)}),this.dialogVisible_goods=!1},del_seles:function(e){var t=this;this.$confirm("是否确认将删除此活动?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){"all"===e?t.multipleSelection.forEach(function(e){t.del_id.push(e.id)}):t.del_id.push(e),t.antiShake.antiShake(function(e,a){t.axios.post(t.getApi("seller/auth/groupbuy_del"),t.dafa({id_list:t.del_id})).then(function(a){e(a),t.del_id=[],0===a.data.code?t.get_seles():t.toggleSelection()}).catch(function(e){a(e),console.log(e),t.toggleSelection(),t.del_id=[]})})}).catch(function(){t.toggleSelection(),t.del_id=[],t.$message({type:"info",message:"已取消删除"})})},STIME:function(e){this.ruleForm.start_time=e},ETIME:function(e){this.ruleForm.end_time=e},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return t.$message("请检查填写信息是否有误"),!1;t.antiShake.antiShake(function(e,a){t.axios.post(t.getApi("seller/auth/groupbuy_save"),t.dafa({id:t.id,title:t.ruleForm.title,max_num:t.ruleForm.max_num,good_id:t.ruleForm.good_id,min_num:t.ruleForm.min_num,price:t.ruleForm.price,start_time:t.ruleForm.start_time,end_time:t.ruleForm.end_time,desc:t.ruleForm.desc})).then(function(a){e(a),0===a.data.code&&(t.add_show=!1,t.get_seles())}).catch(function(e){a(e)})})})}},computed:{index:function(){return this.$store.state.index}},components:{hint:o.a,crumb:i.a,page:n.a}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-list prop-box"},[a("div",{staticClass:"m-member-list m-prop-box"},[a("hint",{attrs:{title:e.hint.title,content:e.hint.content}}),e._v(" "),a("h2",[e._v("团购促销列表\n      "),a("el-button",{staticClass:"add-member-btn add-btn",attrs:{type:"text",icon:"plus",size:"small"},on:{click:function(t){e.edit_seles("","")}}},[e._v("添加活动\n      ")]),e._v(" "),a("div",{staticClass:"u-right"},[a("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","picker-options":e.pickerOptions,placeholder:"选择时间范围",align:"right"},on:{change:e.choice_time},model:{value:e.date_time,callback:function(t){e.date_time=t},expression:"date_time"}}),e._v(" "),a("el-select",{staticClass:"sele-s",attrs:{placeholder:"状态",clearable:!0},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("el-option",{attrs:{label:"未开始",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"进行中",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"已结束",value:"2"}})],1),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"搜索活动名"},model:{value:e.search_str,callback:function(t){e.search_str=t},expression:"search_str"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.get_seles},slot:"append"})],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"element-loading-text":"拼命加载中",data:e.tableData,stripe:"",border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"活动名称","min-width":"240"}}),e._v(" "),a("el-table-column",{attrs:{prop:"max_num",label:"限购总量","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goods_num",label:"商品数量","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"order_num",label:"订单数量","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"团购价格","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"start_time",label:"开始时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"end_time",label:"结束时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?a("span",[e._v("未开始")]):1==t.row.status?a("span",[e._v("进行中")]):a("span",[e._v("已结束")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small",icon:"edit"},on:{click:function(a){e.edit_seles(t.row.id)}}},[e._v("编辑\n          ")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small",icon:"delete"},on:{click:function(a){e.del_seles(t.row.id)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),e.tableData.length>0?a("div",{staticClass:"select-all"},[a("el-button",{attrs:{plain:!0,type:"primary"},on:{click:function(t){e.toggleSelection()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{plain:!0,disabled:0==e.multipleSelection.length,type:"danger"},on:{click:function(t){e.del_seles("all")}}},[e._v("删除\n      ")])],1):e._e(),e._v(" "),a("page",{attrs:{totalPage:e.totalPage,currentPage:e.index},on:{toPage:e.to_page}})],1),e._v(" "),e.add_show?a("div",{staticClass:"add-member prop"},[a("crumb",{attrs:{from:e.crumb.from,now:e.crumb.now},on:{goBack:e.go_back}}),e._v(" "),a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"240px"}},[a("el-form-item",{attrs:{label:"团购名称",prop:"title"}},[a("el-input",{model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品名称",prop:"good_name"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.ruleForm.good_name,callback:function(t){e.$set(e.ruleForm,"good_name",t)},expression:"ruleForm.good_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"团购活动允许购买的最大数量",prop:"max_num"}},[a("el-input",{model:{value:e.ruleForm.max_num,callback:function(t){e.$set(e.ruleForm,"max_num",e._n(t))},expression:"ruleForm.max_num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"团购活动成立的最小购买量",prop:"min_num"}},[a("el-input",{model:{value:e.ruleForm.min_num,callback:function(t){e.$set(e.ruleForm,"min_num",e._n(t))},expression:"ruleForm.min_num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"团购价格",prop:"price"}},[a("el-input",{model:{value:e.ruleForm.price,callback:function(t){e.$set(e.ruleForm,"price",e._n(t))},expression:"ruleForm.price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择日期时间"},on:{change:e.STIME},model:{value:e.ruleForm.start_time,callback:function(t){e.$set(e.ruleForm,"start_time",t)},expression:"ruleForm.start_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择日期时间"},on:{change:e.ETIME},model:{value:e.ruleForm.end_time,callback:function(t){e.$set(e.ruleForm,"end_time",t)},expression:"ruleForm.end_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动描述",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",rows:2},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择商品"}},[a("el-button",{on:{click:e.get_seles_goods}},[e._v("选择商品")]),e._v(" "),a("em",{staticClass:"c-danger"},[e._v("任何商品只能参加一种活动")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确认提交")])],1)],1)],1):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"选择商品",visible:e.dialogVisible_goods,width:"80%"},on:{"update:visible":function(t){e.dialogVisible_goods=t}}},[a("div",{staticClass:"u-right"},[a("el-select",{staticClass:"sele-s",attrs:{placeholder:"搜索类型",clearable:!0},model:{value:e.search_type,callback:function(t){e.search_type=t},expression:"search_type"}},[a("el-option",{attrs:{label:"商品编号",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"商品名称",value:"1"}})],1),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"搜索关键词"},model:{value:e.search_str_,callback:function(t){e.search_str_=t},expression:"search_str_"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.get_seles_goods},slot:"append"})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.choice_goods_data}},[a("el-table-column",{attrs:{label:"选择",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{staticClass:"radio",attrs:{label:e.choice_goods_data[t.$index].good_id},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{property:"good_name",label:"商品名称","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:t.row.good_link,target:"_blank"}},[e._v(e._s(t.row.good_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{property:"sell_price",label:"价格","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{property:"store_nums",label:"库存","min-width":"100"}})],1),e._v(" "),a("div",{staticClass:"see-goods-fy"},[a("el-pagination",{attrs:{"current-page":e.choice_index,layout:"total, prev, pager, next, jumper","page-count":e.choice_pgCount},on:{"current-change":e.next_choice_goods}})],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.add_seles_goods}},[e._v("选 择")])],1)],1)],1)},c=[],d={render:r,staticRenderFns:c},u=d,m=a("VU/8"),_=l,p=m(s,u,!1,_,"data-v-43dcbaae",null);t.default=p.exports}});