webpackJsonp([41],{LNsc:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l("6Trz"),i=l("zVef"),a={data:function(){return{hint:{title:"操作提示",content:"网站系统管理员, 由总平台设置管理.点击列表里的删除按钮删除单个管理员时不受复选框的影响！复选框数据只在点击列表下方批量删除时有效"},tableData:[],multipleSelection:[],add_show:!1,crumb:{from:"角色管理",now:"添加角色"},ruleForm:{id:"",name:"",say:"",list:[]},checkAll:{1:!1,2:!1,3:!1,4:!1,5:!1,6:!1,7:!1,8:!1},checkeds:{1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]},powerList:[],rules:{name:[{required:!0,message:"请输入角色名",trigger:"blur"}],list:[{validator:this.va.vaArrey,trigger:"submit"}]},id:"",del_id:[],loading:!0}},created:function(){this.get_roles()},methods:{go_back:function(){this.add_show=!1},get_roles:function(){var e=this;this.axios.post(this.getApi("seller/auth/roles")).then(function(t){e.loading=!1,0===t.data.code?e.tableData=t.data.roles:e.$message(t.data.msg)}).catch(function(){e.loading=!1,e.$message("对不起！请稍后再试")})},edit_role:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.add_show=!0,this.id=t,this.checkeds={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]},this.checkAll={1:!1,2:!1,3:!1,4:!1,5:!1,6:!1,7:!1,8:!1},this.antiShake.antiShake(function(l,n){e.axios.post(e.getApi("seller/auth/roles-edit"),"id="+t).then(function(t){l(t),0===t.data.code&&(e.powerList=t.data.all_pers,e.ruleForm.name=t.data.name,e.ruleForm.say=t.data.description,e.powerList.forEach(function(t){e.checkAll[t.id]=t.checked,t.grandson.forEach(function(l){l.checked&&e.checkeds[t.id].push(l.id)})}))}).catch(function(e){n(e),console.log(e)})})},handleCheckAllChange:function(e,t,l){if(e){var n=[];this.powerList[l].grandson.forEach(function(e){n.push(e.id)}),this.checkeds[t]=n}else this.checkeds[t]=[]},handleCheckedChange:function(e,t,l){this.checkAll[t]=e.length===this.powerList[l].grandson.length},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e},del_role:function(e){var t=this;this.$confirm("是否确认删除角色?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){"all"===e?t.multipleSelection.forEach(function(e){t.del_id.push(e.id)}):t.del_id.push(e),t.antiShake.antiShake(function(e,l){t.axios.post(t.getApi("seller/auth/roles-del"),t.dafa({id:t.del_id})).then(function(l){e(l),t.del_id=[],0===l.data.code?t.get_roles():t.toggleSelection()}).catch(function(e){l(e),t.toggleSelection(),t.del_id=[]})})}).catch(function(){t.toggleSelection(),t.del_id=[],t.$message({type:"info",message:"已取消删除"})})},submitForm:function(e){var t=this,l=[];for(var n in this.checkeds)l=l.concat(this.checkeds[n]);this.ruleForm.list=l,this.$refs[e].validate(function(e){e&&t.antiShake.antiShake(function(e,l){t.axios.post(t.getApi("seller/auth/roles-save"),t.dafa({id:t.id,name:t.ruleForm.name,description:t.ruleForm.say,permissions:t.ruleForm.list})).then(function(l){e(l),0===l.data.code&&(t.add_show=!1,t.get_roles())}).catch(function(e){l(e)})})})}},computed:{},components:{hint:n.a,crumb:i.a}},o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"role-administrate prop-box"},[l("div",{staticClass:"m-role-administrate m-prop-box"},[l("hint",{attrs:{title:e.hint.title,content:e.hint.content}}),e._v(" "),l("h2",[e._v("角色列表\n      "),l("el-button",{staticClass:"add-role-btn add-btn",attrs:{type:"text",icon:"plus",size:"small"},on:{click:function(t){e.edit_role("")}}},[e._v("添加角色\n      ")])],1),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"element-loading-text":"拼命加载中",data:e.tableData,stripe:"",border:""},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{prop:"id",label:"ID"}}),e._v(" "),l("el-table-column",{attrs:{prop:"name",label:"角色名称","min-width":"90"}}),e._v(" "),l("el-table-column",{attrs:{prop:"description",label:"角色描述","min-width":"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"created_at",label:"角色创建时间","min-width":"160"}}),e._v(" "),l("el-table-column",{attrs:{prop:"updated_at",label:"角色更新时间","min-width":"160"}}),e._v(" "),l("el-table-column",{attrs:{prop:"operation",label:"操作","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"primary",size:"small",icon:"edit"},on:{click:function(l){e.edit_role(t.row.id)}}},[e._v("编辑\n          ")]),e._v(" "),l("el-button",{attrs:{type:"danger",size:"small",icon:"delete"},on:{click:function(l){e.del_role(t.row.id)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),e.tableData.length>0?l("div",{staticClass:"select-all"},[l("el-button",{attrs:{plain:!0,type:"primary"},on:{click:function(t){e.toggleSelection()}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{plain:!0,disabled:0==e.multipleSelection.length,type:"danger"},on:{click:function(t){e.del_role("all")}}},[e._v("删除\n      ")])],1):e._e()],1),e._v(" "),e.add_show?l("div",{staticClass:"add-role prop"},[l("crumb",{attrs:{from:e.crumb.from,now:e.crumb.now},on:{goBack:e.go_back}}),e._v(" "),l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"240px"}},[l("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[l("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"角色描述"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.say,callback:function(t){e.$set(e.ruleForm,"say",t)},expression:"ruleForm.say"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"权限分配",prop:"list"}},e._l(e.powerList,function(t,n){return l("div",[l("el-checkbox",{on:{change:function(l){e.handleCheckAllChange(l,t.id,n)}},model:{value:e.checkAll[t.id],callback:function(l){e.$set(e.checkAll,t.id,l)},expression:"checkAll[item.id]"}},[e._v("\n            全选-"+e._s(t.title)+"\n          ")]),e._v(" "),l("el-checkbox-group",{on:{change:function(l){e.handleCheckedChange(l,t.id,n)}},model:{value:e.checkeds[t.id],callback:function(l){e.$set(e.checkeds,t.id,l)},expression:"checkeds[item.id]"}},e._l(t.grandson,function(t){return l("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v("\n              "+e._s(t.title)+"\n            ")])}))],1)})),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确认提交")])],1)],1)],1):e._e()])},c=[],r={render:o,staticRenderFns:c},s=r,d=l("VU/8"),u=d(a,s,!1,null,null,null);t.default=u.exports}});