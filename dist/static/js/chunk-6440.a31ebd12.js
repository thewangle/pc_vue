(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6440"],{"+3ch":function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"g",function(){return o}),n.d(e,"f",function(){return r}),n.d(e,"i",function(){return c}),n.d(e,"n",function(){return u}),n.d(e,"m",function(){return d}),n.d(e,"l",function(){return s}),n.d(e,"k",function(){return l}),n.d(e,"b",function(){return m}),n.d(e,"h",function(){return f}),n.d(e,"e",function(){return p}),n.d(e,"j",function(){return h}),n.d(e,"a",function(){return b}),n.d(e,"d",function(){return v}),n.d(e,"o",function(){return g});var a=n("t3Un");function i(t){return Object(a.a)({url:"/i/topteam/admin/AddAgent",method:"post",data:t})}function o(t){return Object(a.a)({url:"/i/topteam/admin/ModifyAgent",method:"post",data:t})}function r(t){return Object(a.a)({url:"/i/topteam/admin/DelAgent",method:"post",data:t})}function c(t){return Object(a.a)({url:"/i/topteam/admin/GetAgentList",method:"post",data:t})}function u(t){return Object(a.a)({url:"/i/topteam/admin/TransSubordinateAgent",method:"post",data:t})}function d(t){return Object(a.a)({url:"/i/topteam/admin/TransAgent",method:"post",data:t})}function s(t){return Object(a.a)({url:"/i/topteam/admin/GetSubordinateAgent",method:"post",data:t})}function l(t){return Object(a.a)({url:"/i/topteam/admin/GetOperatorList",method:"post",data:t})}function m(t){return Object(a.a)({url:"/i/topteam/admin/AddOperator",method:"post",data:t})}function f(t){return Object(a.a)({url:"/i/topteam/admin/ModifyOperator",method:"post",data:t})}function p(t){return Object(a.a)({url:"/i/topteam/admin/DelOperator",method:"post",data:t})}function h(t){return Object(a.a)({url:"/i/topteam/admin/SearchCoachList",method:"post",data:t})}function b(t){return Object(a.a)({url:"/i/topteam/admin/AddCoach",method:"post",data:t})}function v(t){return Object(a.a)({url:"/i/topteam/admin/DelCoach",method:"post",data:t})}function g(t){return Object(a.a)({url:"/i/topteam/admin/ModifyCoach",method:"post",data:t})}},KiNR:function(t,e,n){"use strict";var a=n("RZmR");n.n(a).a},RZmR:function(t,e,n){},wYM5:function(t,e,n){"use strict";n.r(e);var a=n("cLjf"),i=n.n(a),o=n("hDQ3"),r=n.n(o),c=n("zK94"),u=n("+3ch"),d={data:function(){return{list:[],agentInfo:{contacts:"",username:"",phone:""},coachId:"",dialogFormVisible:!1}},methods:{handleClose:function(){this.agentInfo={contacts:"",username:"",phone:""},this.dialogFormVisible=!1},handleCreateCoach:function(){var t=this;return r()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(u.a)(t.agentInfo);case 3:n=e.sent,t.$message({message:"创建测试教练成功",type:"success"}),t.coachId=n.data,t.handleClose(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}},e,t,[[0,9]])}))()},handleCreateDemoAct:function(t){this._createDemoAct(t)},_createDemoAct:function(t){var e=this;return r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(e.coachId||3===t){n.next=4;break}return e.$message({message:"请先创建测试教练",type:"error"}),e.dialogFormVisible=!0,n.abrupt("return");case 4:return n.next=6,Object(c.k)({coach_id:e.coachId||0,type:t});case 6:a=n.sent,console.log(a),e._getDemoActList();case 9:case"end":return n.stop()}},n,e)}))()},_getDemoActList:function(){var t=this;return r()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.A)();case 2:n=e.sent,t.coachId=n.data.coach_id,t.list=n.data.list;case 5:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this._getDemoActList()}},s=(n("KiNR"),n("ZrdR")),l=Object(s.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"demo"},[t._m(0),t._v(" "),n("div",{staticClass:"demo-container"},[n("ul",{staticClass:"demo-list"},[n("li",[t._m(1),t._v(" "),n("div",{staticClass:"img-div"},[n("img",{attrs:{src:t.list[0]&&t.list[0].qcode_url,alt:""}})]),t._v(" "),n("div",{staticClass:"btn-div"},[n("el-button",{attrs:{type:"primary",disabled:!(!t.list[0]||!t.list[0].qcode_url)},on:{click:function(e){t.handleCreateDemoAct(1)}}},[t._v("获取活动二维码")])],1),t._v(" "),n("div",{staticClass:"btn-div",staticStyle:{"margin-top":"20px"}},[n("a",{attrs:{href:"/i/topteam/admin/downloadqrcode?act_id="+t.list[0].id,disabled:!(t.list[0]&&t.list[0].qcode_url)}},[t._v("导出活动二维码")])])]),t._v(" "),n("li",[t._m(2),t._v(" "),n("div",{staticClass:"img-div"},[n("img",{attrs:{src:t.list[1]&&t.list[1].qcode_url,alt:""}})]),t._v(" "),n("div",{staticClass:"btn-div"},[n("el-button",{attrs:{type:"primary",disabled:!(!t.list[1]||!t.list[1].qcode_url)},on:{click:function(e){t.handleCreateDemoAct(2)}}},[t._v("获取活动二维码")])],1),t._v(" "),n("div",{staticClass:"btn-div",staticStyle:{"margin-top":"20px"}},[n("a",{attrs:{href:"/i/topteam/admin/downloadqrcode?act_id="+t.list[1].id,disabled:!(t.list[1]&&t.list[1].qcode_url)}},[t._v("导出活动二维码")])])]),t._v(" "),n("li",[t._m(3),t._v(" "),n("div",{staticClass:"img-div"},[n("img",{attrs:{src:t.list[2]&&t.list[2].qcode_url,alt:""}})]),t._v(" "),n("div",{staticClass:"btn-div"},[n("el-button",{attrs:{type:"primary",disabled:!(!t.list[2]||!t.list[2].qcode_url)},on:{click:function(e){t.handleCreateDemoAct(3)}}},[t._v("获取活动二维码")])],1),t._v(" "),n("div",{staticClass:"btn-div",staticStyle:{"margin-top":"20px"}},[n("a",{attrs:{href:"/i/topteam/admin/downloadqrcode?act_id="+t.list[2].id,disabled:!(t.list[2]&&t.list[2].qcode_url)}},[t._v("导出活动二维码")])])])])]),t._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,title:"创建测试教练",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.handleClose}},[n("el-form",{attrs:{model:t.agentInfo,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"教练姓名"}},[n("el-input",{model:{value:t.agentInfo.contacts,callback:function(e){t.$set(t.agentInfo,"contacts",e)},expression:"agentInfo.contacts"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{model:{value:t.agentInfo.username,callback:function(e){t.$set(t.agentInfo,"username",e)},expression:"agentInfo.username"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"联系电话"}},[n("el-input",{model:{value:t.agentInfo.phone,callback:function(e){t.$set(t.agentInfo,"phone",e)},expression:"agentInfo.phone"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleCreateCoach}},[t._v("保存")])],1)],1)],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("header",[e("h1",[this._v("为了更好的协助各级代理商和运营商进行市场推广，平台提供不同活动类型的演示版本")]),this._v(" "),e("h4",[this._v("注：演示版活动可以重复举办，但是演示活动中的题目是平台内置的")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-haeder"},[e("h5",[this._v("团队版演示活动二维码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-haeder"},[e("h5",[this._v("特殊版演示活动二维码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-haeder"},[e("h5",[this._v("个人版演示活动二维码")])])}],!1,null,null,null);l.options.__file="demoGame.vue";e.default=l.exports},zK94:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"s",function(){return o}),n.d(e,"t",function(){return r}),n.d(e,"p",function(){return c}),n.d(e,"w",function(){return u}),n.d(e,"d",function(){return d}),n.d(e,"r",function(){return s}),n.d(e,"f",function(){return l}),n.d(e,"j",function(){return m}),n.d(e,"C",function(){return f}),n.d(e,"J",function(){return p}),n.d(e,"n",function(){return h}),n.d(e,"q",function(){return b}),n.d(e,"u",function(){return v}),n.d(e,"y",function(){return g}),n.d(e,"v",function(){return _}),n.d(e,"o",function(){return O}),n.d(e,"e",function(){return j}),n.d(e,"L",function(){return y}),n.d(e,"i",function(){return C}),n.d(e,"F",function(){return k}),n.d(e,"b",function(){return A}),n.d(e,"l",function(){return w}),n.d(e,"K",function(){return I}),n.d(e,"G",function(){return x}),n.d(e,"g",function(){return L}),n.d(e,"H",function(){return D}),n.d(e,"B",function(){return q}),n.d(e,"z",function(){return T}),n.d(e,"D",function(){return $}),n.d(e,"E",function(){return G}),n.d(e,"c",function(){return M}),n.d(e,"h",function(){return F}),n.d(e,"I",function(){return R}),n.d(e,"x",function(){return E}),n.d(e,"m",function(){return S}),n.d(e,"A",function(){return V}),n.d(e,"k",function(){return K});var a=n("t3Un");function i(t){return Object(a.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function o(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function r(){return Object(a.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function c(t){return Object(a.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function u(t){return Object(a.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function d(t){return Object(a.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function s(t){return Object(a.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function l(t){return Object(a.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function m(t){return Object(a.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function f(t){return Object(a.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function p(t){return Object(a.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function h(t){return Object(a.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function b(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function v(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function g(t){return Object(a.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function _(t){return Object(a.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function O(t){return Object(a.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function j(t){return Object(a.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function y(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function C(t){return Object(a.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function k(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(a.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function A(t){return Object(a.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function w(t){return Object(a.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function I(t){return Object(a.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function x(t){return Object(a.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function L(t){return Object(a.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}function D(t,e){return Object(a.a)({url:"/i/topteam/admin/MoveTask?id="+t+"&move_type="+e})}function q(t){return Object(a.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:t})}function T(t){return Object(a.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:t})}function $(t){return Object(a.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:t})}function G(t){return Object(a.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:t})}function M(t){return Object(a.a)({url:"/i/topteam/admin/addgame",method:"post",data:t})}function F(t){return Object(a.a)({url:"/i/topteam/admin/updategame",method:"post",data:t})}function R(t){return Object(a.a)({url:"/i/topteam/admin/onsale",method:"post",data:t})}function E(t){return Object(a.a)({url:"/i/topteam/admin/getgamelist",method:"post",data:t})}function S(t){return Object(a.a)({url:"/i/topteam/admin/delgame",method:"post",data:t})}function V(){return Object(a.a)({url:"/i/topteam/admin/getdemoactlist",method:"get"})}function K(t){return Object(a.a)({url:"/i/topteam/admin/adddemoact",method:"post",data:t})}}}]);