webpackJsonp([21],{"20ST":function(t,e,a){"use strict";function i(t){a("auIY")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("6Trz"),l=a("js5j"),s={data:function(){return{hint:{title:"操作提示",content:"用户可在商品信息页对商品进行咨询。"},tableData:[],multipleSelection:[],totalPage:1,dialogVisible:!1,msg:"",id:"",del_id:[],loading:!0}},created:function(){this.get_message()},methods:{to_page:function(){this.get_message()},get_message:function(){var t=this;this.axios.post(this.getApi("seller/auth/shop_msg_list"),this.dafa({index:this.index})).then(function(e){t.loading=!1,0===e.data.code?(t.tableData=e.data.list,t.totalPage=e.data.fy_pgCount):t.$message(e.data.msg)}).catch(function(){t.loading=!1,t.$message("对不起！请稍后再试")})},see_message:function(){var t=this;this.dialogVisible=!0,this.axios.post(this.getApi("seller/auth/shop_msg_view"),"id="+this.id).then(function(e){0===e.data.code?t.msg=e.data.content:t.$message(e.data.msg)})},handle:function(t,e){switch(this.id=e,t){case"0":this.see_message();break;case"1":this.del_message()}},toggleSelection:function(t){var e=this;t?t.forEach(function(t){e.$refs.multipleTable.toggleRowSelection(t)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(t){this.multipleSelection=t},del_message:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.$confirm("是否确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){"all"==e?t.multipleSelection.forEach(function(e){t.del_id.push(e.id)}):t.del_id.push(t.id),t.axios.post(t.getApi("seller/auth/shop_msg_del"),t.dafa({id_list:t.del_id})).then(function(e){t.$message(e.data.msg),t.del_id=[],0===e.data.code?t.get_message():t.toggleSelection()}).catch(function(e){console.log(e),t.$message("对不起！请稍后再试"),t.toggleSelection(),t.del_id=[]})}).catch(function(){t.toggleSelection(),t.del_id=[],t.$message({type:"info",message:"已取消删除"})})}},computed:{index:function(){return this.$store.state.index}},components:{hint:n.a,page:l.a}},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"message-list prop-box"},[a("div",{staticClass:"m-message-list m-prop-box"},[a("hint",{attrs:{title:t.hint.title,content:t.hint.content}}),t._v(" "),a("h2",[t._v("消息列表")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",attrs:{"element-loading-text":"拼命加载中",data:t.tableData,stripe:"",border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{on:{command:function(a){t.handle(a,e.row.id)}}},[a("el-button",{attrs:{type:"primary",size:"small"}},[t._v("\n              处理"),a("i",{staticClass:"el-icon-setting el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{staticClass:"i-box",attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"0"}},[a("i",{staticClass:"iconfont icon-wancheng1 c-danger"}),t._v("查看\n              ")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"1"}},[a("i",{staticClass:"iconfont icon-shanchu c-danger"}),t._v("  删除\n              ")])],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题","min-width":"240"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"内容","min-width":"340"}}),t._v(" "),a("el-table-column",{attrs:{prop:"time",label:"时间","min-width":"180"}})],1),t._v(" "),t.tableData.length>0?a("div",{staticClass:"select-all"},[a("el-button",{attrs:{plain:!0,type:"primary"},on:{click:function(e){t.toggleSelection()}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{plain:!0,disabled:0==t.multipleSelection.length,type:"danger"},on:{click:function(e){t.del_message("all")}}},[t._v("删除\n      ")])],1):t._e(),t._v(" "),a("page",{attrs:{totalPage:t.totalPage,currentPage:t.index},on:{toPage:t.to_page}})],1),t._v(" "),a("el-dialog",{attrs:{title:"查看消息",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"cao-zuo"},[t._v("\n      "+t._s(t.msg)+"\n    ")])])],1)},c=[],d={render:o,staticRenderFns:c},r=d,g=a("VU/8"),u=i,h=g(s,r,!1,u,"data-v-b9c6e5aa",null);e.default=h.exports},auIY:function(t,e,a){var i=a("wh54");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("61866c79",i,!0)},wh54:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"\n.cao-zuo[data-v-b9c6e5aa] {\n}\n",""])}});