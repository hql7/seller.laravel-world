webpackJsonp([4],{"/QkV":function(t,n,e){"use strict";function i(t){e("GwGY")}function a(t){e("RIpN")}Object.defineProperty(n,"__esModule",{value:!0});var o=e("woOf"),s=e.n(o),r={data:function(){return{menu:[],user:{name:"",vip:""},link:{},activeIndex:this.$route.name,activeArrey:[this.$route.name.split("-")[0]]}},watch:{$route:function(){this.activeIndex=this.$route.name,this.activeArrey=[this.$route.name.split("-")[0]]}},created:function(){this.getMenu(),this.getUser(),this.getLinkData()},methods:{getMenu:function(){var t=this;this.axios.post(this.getApi("seller/auth/menu")).then(function(n){0===n.data.code&&(t.menu=n.data.menu)})},getUser:function(){this.user=this.getobjS("user")},outLogin:function(){var t=this;this.axios.post(this.getApi("root/login-exit")).then(function(n){t.$message(n.data.msg),0===n.data.code&&t.$router.push("/login")}).catch(function(n){t.$message("请重试")})},getLinkData:function(){var t=this;this.axios.post(this.getApi("root/auth/config_page"),"title=siteinfo").then(function(n){0===n.data.code&&(t.link=s()(t.link,n.data.kv))})},handleOpen:function(t,n){},handleClose:function(t,n){}}},d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"menu"},[e("div",{staticClass:"nav-top"},[e("router-link",{attrs:{to:"/index",tag:"span"}},[t._v("首页")]),t._v(" "),e("ul",{staticClass:"menu-user"},[e("li",[e("a",{attrs:{href:t.link.home,target:"_blank"}},[t._v("商城首页")])]),t._v(" "),e("router-link",{attrs:{to:"/index",tag:"li"}},[t._v("商家中心")]),t._v(" "),e("li",{staticClass:"user"},[e("p",[t._v(t._s(t.user.name||"admin"))]),t._v(" "),e("p",[t._v(t._s(t.user.vip||"管理员"))])]),t._v(" "),e("li",{on:{click:t.outLogin}},[e("i",{staticClass:"iconfont icon-fcstubiao24"}),t._v("退出")])],1)],1),t._v(" "),e("div",{staticClass:"nav-left"},[e("router-link",{attrs:{to:"/index",tag:"h1"}},[t._v("为尔盈商城商家中心")]),t._v(" "),e("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.activeIndex,"default-openeds":t.activeArrey,"unique-opened":!0,"background-color":"#2a3f54","text-color":"#fff","active-text-color":"#ffd04b"},on:{open:t.handleOpen,close:t.handleClose}},t._l(t.menu,function(n){return e("el-submenu",{key:n.id,attrs:{index:n.id}},[e("template",{slot:"title"},[e("i",{staticClass:"iconfont",class:n.icon}),t._v(" "),e("span",[t._v(t._s(n.title))])]),t._v(" "),t._l(n.child,function(n){return e("el-menu-item-group",{key:n.id},[e("el-menu-item",{attrs:{index:n.id}},[e("router-link",{attrs:{to:{name:n.id},tag:"h3"}},[t._v(" "+t._s(n.title))])],1)],1)})],2)}))],1)])},l=[],c={render:d,staticRenderFns:l},u=c,p=e("VU/8"),f=i,h=p(r,u,!1,f,"data-v-63ca45d4",null),v=h.exports,x={data:function(){return{}},components:{Menus:v}},g=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"view"},[e("Menus"),t._v(" "),e("div",{staticClass:"all-right"},[e("router-view")],1)],1)},m=[],b={render:g,staticRenderFns:m},_=b,k=e("VU/8"),w=a,z=k(x,_,!1,w,"data-v-21331ce0",null);n.default=z.exports},GwGY:function(t,n,e){var i=e("PAzN");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("1b8134a0",i,!0)},PAzN:function(t,n,e){n=t.exports=e("FZ+f")(!1),n.push([t.i,"\n.nav-left[data-v-63ca45d4] {\n  width: 260px;\n  height: 100%;\n  background-color: #2a3f54;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 999;\n}\n.el-menu[data-v-63ca45d4] {\n  width: 100%;\n}\n.nav-left > h1[data-v-63ca45d4] {\n  width: 259px;\n  height: 65px;\n  line-height: 65px;\n  text-align: center;\n  font-size: 22px;\n  font-weight: bold;\n  cursor: pointer;\n  color: #fff;\n}\n.nav-top[data-v-63ca45d4] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 999;\n  width: 100%;\n  height: 65px;\n  line-height: 65px;\n  font-size: 14px;\n  background-color: #ededed;\n  color: #2a3f54;\n  -webkit-box-shadow: 1px 2px 5px rgba(178, 178, 178, .35);\n          box-shadow: 1px 2px 5px rgba(178, 178, 178, .35);\n  padding-left: 290px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.nav-top > span[data-v-63ca45d4] {\n  cursor: pointer;\n  font-size: 16px;\n  font-weight: bold;\n  color: #4d6987;\n}\n.menu-user li[data-v-63ca45d4] {\n  float: left;\n  padding-left: 25px;\n  padding-right: 25px;\n  border-left: 1px solid #d3d3d3;\n  text-align: center;\n}\n.menu-user[data-v-63ca45d4] {\n  float: right;\n  margin-right: 30px;\n  height: 100%;\n  cursor: pointer;\n}\n.user[data-v-63ca45d4] {\n  padding: 7px 30px;\n  line-height: 26px;\n}\n.menu-user i[data-v-63ca45d4] {\n  font-size: 20px;\n  line-height: 46px;\n  margin-right: 5px;\n  vertical-align: -2px;\n}\n",""])},RIpN:function(t,n,e){var i=e("zZW6");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("199aa32c",i,!0)},zZW6:function(t,n,e){n=t.exports=e("FZ+f")(!1),n.push([t.i,"\n.view[data-v-21331ce0] {\n  background-color: #f2f3f3;\n}\n.all-right[data-v-21331ce0] {\n  margin-left: 260px;\n  margin-top: 65px;\n  min-width: 1000px;\n  padding: 25px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n",""])}});