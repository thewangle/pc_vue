(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5cbc"],{"3oMv":function(t,e,a){"use strict";var n=a("VZQ+");a.n(n).a},CoPs:function(t,e,a){"use strict";a.r(e);var n=a("14Xm"),o=a.n(n),i=a("D3Ub"),r=a.n(i),u=a("zK94"),l=(a("vDqi"),{data:function(){return{gameName:"",dialogAddGame:!1,changeGame:!1,pullOfGame1:!1,pullOfGame2:!1,pullOnGame:!1,delGame1:!1,delGame2:!1,tableData:[],form:{game_name:"",type:"",money:"",uri:"",status:"",id:""},formLabelWidth:"120px",updateStatus:!1,chooseId:"",fileList:[]}},mounted:function(){this.gameList()},methods:{getGameUri:function(t){console.log(t,"res"),this.form.uri="",0===t.error_code?this.form.uri=t.data:(this.fileList=[],this.$message(t.error_msg?t.error_msg:"上传失败"))},handleRemove:function(t,e){console.log(t,e)},handlePreview:function(t){console.log(t)},handleExceed:function(t,e){this.$message.warning("只能上传一个文件")},beforeRemove:function(t,e){return this.$confirm("确定移除 "+t.name+"？")},addGame:function(){this.updateStatus=!1,this.dialogAddGame=!0,this.form={game_name:"",type:"",money:"",uri:"",status:"",id:""},this.fileList=[]},gameList:function(){var t=this;return r()(o.a.mark(function e(){var a,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={game_name:t.gameName?t.gameName:"",game_id:""},e.next=3,Object(u.x)(a);case 3:n=e.sent,t.tableData=n.data?n.data:[];case 5:case"end":return e.stop()}},e,t)}))()},saveGame:function(t){var e=this;return r()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if((n=e.form).game_name){a.next=4;break}return e.$message({showClose:!0,message:"请填写游戏名称",type:"warning"}),a.abrupt("return");case 4:if(n.uri){a.next=7;break}return e.$message({showClose:!0,message:"请上传游戏文件",type:"warning"}),a.abrupt("return");case 7:if(e.dialogFormVisible=!1,n.type=n.type?n.type:"0",n.status=t,void 0,!e.updateStatus){a.next=17;break}return a.next=14,Object(u.h)(n);case 14:a.sent,a.next=20;break;case 17:return a.next=19,Object(u.c)(n);case 19:a.sent;case 20:e.gameList(),e.dialogAddGame=!1;case 22:case"end":return a.stop()}},a,e)}))()},pullOn:function(t){this.chooseId=t.id,this.onSale(1),this.pullOnGame=!0,this.gameList()},pullOff:function(t){this.chooseId=t.id,this.pullOfGame1=!0},dialogPullOff:function(){this.changeGame=!1,this.delGame2=!1,this.pullOfGame1=!1,this.onSale(0),this.gameList()},onSale:function(t){var e=this;return r()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n={status:t,id:e.chooseId},a.next=3,Object(u.I)(n);case 3:a.sent;case 4:case"end":return a.stop()}},a,e)}))()},updateGame:function(t){this.chooseId=t.id,0===Number(t.status)?(this.updateStatus=!0,this.dialogAddGame=!0,this.form=t):this.changeGame=!0},delGame:function(t){this.chooseId=t.id,0===Number(t.status)?this.delGame1=!0:this.delGame2=!0},getDelGame:function(t){var e=this;return r()(o.a.mark(function t(){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.delGame1=!1,a={id:e.chooseId},t.next=4,Object(u.m)(a);case 4:t.sent,e.gameList();case 6:case"end":return t.stop()}},t,e)}))()}}}),s=(a("3oMv"),a("KHd+")),c=Object(s.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("header",[a("div",{staticClass:"search"},[a("el-input",{attrs:{placeholder:"请输入游戏名称"},model:{value:t.gameName,callback:function(e){t.gameName=e},expression:"gameName"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.gameList}},[t._v("搜索")])],1),t._v(" "),a("div",[a("el-button",{attrs:{type:"primary"},on:{click:t.addGame}},[t._v("新增游戏")])],1)]),t._v(" "),a("div",{staticClass:"table-content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:"",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",type:"index"}}),t._v(" "),a("el-table-column",{attrs:{prop:"game_name",label:"游戏名称"}}),t._v(" "),a("el-table-column",{attrs:{label:"游戏状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(1===Number(e.row.status)?"可用":"已下架"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.updateGame(e.row)}}},[t._v("修改")]),t._v(" "),1===Number(e.row.status)?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.pullOff(e.row,0)}}},[t._v("下架")]):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.pullOn(e.row,1)}}},[t._v("上架")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.delGame(e.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:t.updateStatus?"修改游戏":"新增游戏",visible:t.dialogAddGame},on:{"update:visible":function(e){t.dialogAddGame=e}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"游戏名称：","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.game_name,callback:function(e){t.$set(t.form,"game_name",e)},expression:"form.game_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"游戏文件：","label-width":t.formLabelWidth}},[t._v("\n        "+t._s(this.form.uri)+"\n        "),a("el-upload",{staticClass:"upload-demo",attrs:{action:"/i/topteam/admin/uploadfile","on-preview":t.handlePreview,"on-remove":t.handleRemove,"before-remove":t.beforeRemove,limit:1,"on-exceed":t.handleExceed,"file-list":t.fileList,"on-success":t.getGameUri,name:"game",data:{id:t.form.id}}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogAddGame=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{on:{click:function(e){t.saveGame(0)}}},[t._v("保 存")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.saveGame(1)}}},[t._v("保存并上架")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.changeGame,width:"30%"},on:{"update:visible":function(e){t.changeGame=e}}},[a("span",[t._v("修改此游戏，需要先将游戏下架。")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.changeGame=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogPullOff}},[t._v("下架")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.pullOfGame1,width:"30%"},on:{"update:visible":function(e){t.pullOfGame1=e}}},[a("span",[t._v("下架后，运营商将无法调取此游戏。")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.pullOfGame1=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogPullOff}},[t._v("确 认")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.pullOfGame2,width:"30%"},on:{"update:visible":function(e){t.pullOfGame2=e}}},[a("span",[t._v("由于当前正有活动使用此游戏，无法下架")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.pullOfGame2=!1}}},[t._v("关闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.pullOnGame,width:"30%"},on:{"update:visible":function(e){t.pullOnGame=e}}},[a("span",[t._v("游戏上架成功，创建活动时将能够正常使用此游戏。")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.pullOnGame=!1}}},[t._v("关闭")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.delGame1,width:"30%"},on:{"update:visible":function(e){t.delGame1=e}}},[a("span",[t._v("请确认是否要删除此游戏，删除后将无法恢复！")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.delGame1=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.getDelGame}},[t._v("确 认")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.delGame2,width:"30%"},on:{"update:visible":function(e){t.delGame2=e}}},[a("span",[t._v("下架后的游戏才能够删除，请先下架此游戏！")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.delGame2=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.dialogPullOff}},[t._v("下 架")])],1)])],1)},[],!1,null,null,null);c.options.__file="gameManage.vue";e.default=c.exports},"VZQ+":function(t,e,a){},zK94:function(t,e,a){"use strict";a.d(e,"a",function(){return o}),a.d(e,"s",function(){return i}),a.d(e,"t",function(){return r}),a.d(e,"p",function(){return u}),a.d(e,"w",function(){return l}),a.d(e,"d",function(){return s}),a.d(e,"r",function(){return c}),a.d(e,"f",function(){return d}),a.d(e,"j",function(){return m}),a.d(e,"C",function(){return f}),a.d(e,"J",function(){return p}),a.d(e,"n",function(){return b}),a.d(e,"q",function(){return h}),a.d(e,"u",function(){return v}),a.d(e,"y",function(){return g}),a.d(e,"v",function(){return _}),a.d(e,"o",function(){return O}),a.d(e,"e",function(){return G}),a.d(e,"L",function(){return y}),a.d(e,"i",function(){return j}),a.d(e,"F",function(){return k}),a.d(e,"b",function(){return w}),a.d(e,"l",function(){return x}),a.d(e,"K",function(){return L}),a.d(e,"G",function(){return C}),a.d(e,"g",function(){return S}),a.d(e,"H",function(){return A}),a.d(e,"B",function(){return N}),a.d(e,"z",function(){return T}),a.d(e,"D",function(){return z}),a.d(e,"E",function(){return I}),a.d(e,"c",function(){return D}),a.d(e,"h",function(){return M}),a.d(e,"I",function(){return P}),a.d(e,"x",function(){return $}),a.d(e,"m",function(){return E}),a.d(e,"A",function(){return K}),a.d(e,"k",function(){return R});var n=a("t3Un");function o(t){return Object(n.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function i(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function r(){return Object(n.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function u(t){return Object(n.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function l(t){return Object(n.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function s(t){return Object(n.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function c(t){return Object(n.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function d(t){return Object(n.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function m(t){return Object(n.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function f(t){return Object(n.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function p(t){return Object(n.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function b(t){return Object(n.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function h(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function v(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function g(t){return Object(n.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function _(t){return Object(n.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function O(t){return Object(n.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function G(t){return Object(n.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function y(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function j(t){return Object(n.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function k(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(n.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function w(t){return Object(n.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function x(t){return Object(n.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function L(t){return Object(n.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function C(t){return Object(n.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function S(t){return Object(n.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}function A(t,e){return Object(n.a)({url:"/i/topteam/admin/MoveTask?id="+t+"&move_type="+e})}function N(t){return Object(n.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:t})}function T(t){return Object(n.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:t})}function z(t){return Object(n.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:t})}function I(t){return Object(n.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:t})}function D(t){return Object(n.a)({url:"/i/topteam/admin/addgame",method:"post",data:t})}function M(t){return Object(n.a)({url:"/i/topteam/admin/updategame",method:"post",data:t})}function P(t){return Object(n.a)({url:"/i/topteam/admin/onsale",method:"post",data:t})}function $(t){return Object(n.a)({url:"/i/topteam/admin/getgamelist",method:"post",data:t})}function E(t){return Object(n.a)({url:"/i/topteam/admin/delgame",method:"post",data:t})}function K(){return Object(n.a)({url:"/i/topteam/admin/getdemoactlist",method:"get"})}function R(t){return Object(n.a)({url:"/i/topteam/admin/adddemoact",method:"post",data:t})}}}]);