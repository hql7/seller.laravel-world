webpackJsonp([34],{MT43:function(e,t,a){"use strict";function n(e){a("Zbjb")}Object.defineProperty(t,"__esModule",{value:!0});var l=a("6Trz"),i=a("js5j"),s=a("zVef"),o={data:function(){return{hint:{title:"操作提示",content:"买家可在订单完成后对订单商品进行评价操作，评价信息将显示在对应的商品页面。"},tableData:[],point:"",status:"",has_reply:"",search_type:"",search_str:"",totalPage:1,add_show:!1,crumb:{from:"商品评价",now:"评价回复"},review:{id:"",name:"",img:"",content:"",imgs:[],time:""},reply:{id:"",img:"",name:"",reply:"",time:""},see_big:"",loading:!0}},created:function(){this.get_goods_evaluate()},methods:{go_back:function(){this.add_show=!1},to_page:function(){this.get_goods_evaluate()},get_goods_evaluate:function(){var e=this;this.axios.post(this.getApi("seller/auth/review_list"),this.dafa({index:this.index,point:this.point,has_reply:this.has_reply,search_type:this.search_type,search_str:this.search_str})).then(function(t){e.loading=!1,0===t.data.code?(e.tableData=t.data.list,e.totalPage=t.data.fy_pgCount):e.$message(t.data.msg)}).catch(function(){e.loading=!1,e.$message("对不起！请稍后再试")})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},getEvaluateCon:function(e){var t=this;this.id=e,this.add_show=!0,this.antiShake.antiShake(function(a,n){t.axios.post(t.getApi("seller/auth/review_reply_page"),"id="+e).then(function(e){a(e),0===e.data.code&&(t.review=e.data.review,t.reply=e.data.reply)}).catch(function(e){n(e)})})},seeBigImg:function(e){this.see_big=e},closeBigImg:function(){this.see_big=""},replyGoodsEvaluate:function(){var e=this;this.reply.reply?this.antiShake.antiShake(function(t,a){e.axios.post(e.getApi("seller/auth/review_reply"),e.dafa({id:e.id,reply:e.reply.reply})).then(function(a){t(a),0===a.data.code&&(e.add_show=!1,e.get_goods_evaluate())}).catch(function(e){a(e)})}):this.$message("请输入回复内容")}},computed:{index:function(){return this.$store.state.index}},components:{hint:l.a,page:i.a,CrumbCpt:s.a}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"goods-evaluate-list prop-box"},[a("div",{staticClass:"m-goods-evaluate-list m-prop-box"},[a("hint",{attrs:{title:e.hint.title,content:e.hint.content}}),e._v(" "),a("h2",[e._v("商品评价列表\n      "),e._v(" "),a("div",{staticClass:"u-right"},[a("el-select",{staticClass:"sele-s",attrs:{placeholder:"评分",clearable:!0},model:{value:e.point,callback:function(t){e.point=t},expression:"point"}},[a("el-option",{attrs:{label:"一星",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"二星",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"三星",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"四星",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"五星",value:"5"}})],1),e._v(" "),a("el-select",{staticClass:"sele-s",attrs:{placeholder:"回复状态",clearable:!0},model:{value:e.has_reply,callback:function(t){e.has_reply=t},expression:"has_reply"}},[a("el-option",{attrs:{label:"未回复",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"已回复",value:"1"}})],1),e._v(" "),a("el-select",{staticClass:"sele-s",attrs:{placeholder:"搜索类型",clearable:!0},model:{value:e.search_type,callback:function(t){e.search_type=t},expression:"search_type"}},[a("el-option",{attrs:{label:"评价人",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"评价内容",value:"1"}})],1),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"搜索关键词"},model:{value:e.search_str,callback:function(t){e.search_str=t},expression:"search_str"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.get_goods_evaluate},slot:"append"})],1)],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"element-loading-text":"拼命加载中",data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{prop:"order_no",label:"订单编号","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"用户名","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"point",label:"评分","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-rate",{attrs:{disabled:"",colors:["#99A9BF","#F7BA2A","#FF9900"]},model:{value:t.row.point,callback:function(a){e.$set(t.row,"point",a)},expression:"scope.row.point"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"content",label:"评论内容","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"good_name",label:"商品名称","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:t.row.good_link,target:"_blank"}},[e._v(e._s(t.row.good_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"buy_time",label:"下单时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"comment_time",label:"评论时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"has_reply",label:"回复状态","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.has_reply?a("span",[e._v("未回复")]):a("span",[e._v("已回复")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){e.getEvaluateCon(t.row.id)}}},[e._v("回复\n\n          ")])]}}])})],1),e._v(" "),a("page",{attrs:{totalPage:e.totalPage,currentPage:e.index},on:{toPage:e.to_page}})],1),e._v(" "),e.add_show?a("div",{staticClass:"add-brand prop"},[a("crumb-cpt",{attrs:{from:e.crumb.from,now:e.crumb.now},on:{goBack:e.go_back}}),e._v(" "),a("div",[a("h3",{staticClass:"user-h3"},[e._v("用户评论")]),e._v(" "),a("div",{staticClass:"ev-box"},[a("p",[a("em",{staticClass:"ev-user"},[e._v(e._s(e.review.name))]),e._v(" "),a("span",{staticClass:"u-right c-999"},[e._v(e._s(e.review.time))])]),e._v(" "),a("p",{staticClass:"con-box"},[a("img",{staticClass:"ev-pic",attrs:{src:e.review.img,alt:"lara-shop商城用户头像",title:"lara-shop商城用户头像",width:"70",height:"70"}}),a("span",{staticClass:"ev-con"},[e._v(e._s(e.review.content))])]),e._v(" "),e.review.imgs.length>0?a("p",e._l(e.review.imgs,function(t){return a("img",{key:t,staticClass:"ev-img",attrs:{src:t,alt:"lara-shop商城用户评价图片",title:"lara-shop商城用户评价图片",width:"120",height:"120"},on:{click:function(a){e.seeBigImg(t)}}})})):e._e()]),e._v(" "),a("div",{staticClass:"ev-reply-box"},[a("p",[a("em",{staticClass:"ev-user"},[e._v(e._s(e.reply.name)+" ")]),a("span",{staticClass:"u-right c-999"},[e._v(e._s(e.reply.time))])]),e._v(" "),a("div",{staticClass:"admin-info"},[a("img",{staticClass:"ev-pic",attrs:{src:e.reply.img,alt:"lara-shop商城商家头像",title:"lara-shop商城商家头像",width:"70",height:"70"}}),e._v(" "),a("el-input",{staticClass:"reply-box",attrs:{type:"textarea",rows:4,placeholder:"请输入回复内容"},model:{value:e.reply.reply,callback:function(t){e.$set(e.reply,"reply",t)},expression:"reply.reply"}})],1)]),e._v(" "),a("div",{staticClass:"ipt-box"},[a("button",{staticClass:"ev-reply-btn",on:{click:e.replyGoodsEvaluate}},[e._v("回复")])])])],1):e._e(),e._v(" "),e.see_big?a("div",{staticClass:"see-big",on:{click:e.closeBigImg}},[a("img",{attrs:{src:e.see_big,alt:"lara-shop商城用户评价图片",title:"lara-shop商城用户评价图片"}})]):e._e()])},p=[],c={render:r,staticRenderFns:p},d=c,h=a("VU/8"),v=n,u=h(o,d,!1,v,"data-v-97b215b4",null);t.default=u.exports},Zbjb:function(e,t,a){var n=a("zlD0");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("73ed3264",n,!0)},zlD0:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n.user-h3[data-v-97b215b4] {\n  line-height: 40px;\n  font-size: 14px;\n  color: #333;\n  padding-left: 15px;\n  border-left: 1px solid #dadada;\n  border-right: 1px solid #dadada;\n  border-top: 6px solid #d2d6de;\n  margin-top: 30px;\n  border-radius: 5px 5px 0 0;\n}\n.ev-box[data-v-97b215b4] {\n  padding: 15px;\n  border: 1px solid #dadada;\n  margin-bottom: 35px;\n}\n.ev-user[data-v-97b215b4] {\n  font-size: 14px;\n  font-weight: bold;\n}\n.con-box[data-v-97b215b4] {\n  overflow: hidden;\n}\n.ev-pic[data-v-97b215b4] {\n  float: left;\n  display: inline-block;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n}\n.ev-box[data-v-97b215b4] {\n  line-height: 22px;\n}\n.ev-con[data-v-97b215b4] {\n  display: block;\n  background-color: #f3f3f3;\n  color: #333;\n  padding: 5px 15px;\n  border-radius: 5px;\n  margin-left: 85px;\n}\n.ev-img[data-v-97b215b4] {\n  width: 120px;\n  height: 120px;\n  margin: 5px;\n}\n.see-big[data-v-97b215b4] {\n  width: 400px;\n  height: 400px;\n  position: fixed;\n  top: 200px;\n  left: 50%;\n  z-index: 99;\n  margin-left: -200px;\n}\n.see-big > img[data-v-97b215b4] {\n  width: 100%;\n  height: 100%;\n}\n.reply-box[data-v-97b215b4] {\n  margin-left: 15px;\n  width: 90%;\n}\n.ev-reply-box[data-v-97b215b4] {\n  line-height: 22px;\n}\n.ipt-box[data-v-97b215b4] {\n  margin: 30px 0;\n  text-align: center;\n}\n.ev-reply-btn[data-v-97b215b4] {\n  width: 90px;\n  height: 36px;\n  background-color: #48cfae;\n  color: #fff;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  border: none;\n  border-radius: 5px;\n}\n",""])}});