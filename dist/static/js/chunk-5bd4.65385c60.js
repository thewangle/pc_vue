(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5bd4"],{QtpY:function(t,e,a){"use strict";a.r(e);var n=a("14Xm"),i=a.n(n),r=a("D3Ub"),o=a.n(r),s=a("zK94"),u={name:"TaskClassfiy",data:function(){return{list:null,listLoading:!1,dialogTitle:"",dialogFormVisible:!1,dialogType:"",total:0,listQuery:{page_no:1,page_size:10},taskClassfiyName:"",taskClassfiyId:""}},created:function(){this._getTacskClassifyList()},methods:{_getTacskClassifyList:function(){var t=this;return o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.next=3,Object(s.D)(t.listQuery);case 3:a=e.sent,t.total=a.data.total,t.list=a.data.list,t.listLoading=!1;case 7:case"end":return e.stop()}},e,t)}))()},handleSizeChange:function(t){this.listQuery.page_size=t,this._getTacskClassifyList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._getTacskClassifyList()},handleCreate:function(){this.dialogType="add",this.dialogTitle="新增题目分类",this.dialogFormVisible=!0},handleClose:function(){this.dialogFormVisible=!1,this.dialogTitle="",this.dialogType="",this.taskClassfiyName="",this.taskClassfiyId=""},handleUpdate:function(t){this.dialogType="edit",this.dialogTitle="修改题目分类",this.taskClassfiyName=t.name,this.taskClassfiyId=t.id,this.dialogFormVisible=!0},handleDelete:function(t){var e=this;this.$confirm("确认删除改题目分类吗？").then(function(){var a=o()(i.a.mark(function a(n){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(s.k)({id:t.id});case 2:return e.$message({message:"删除成功",type:"success"}),a.next=5,e._getTacskClassifyList();case 5:case"end":return a.stop()}},a,e)}));return function(t){return a.apply(this,arguments)}}()).catch(function(){var t=o()(i.a.mark(function t(a){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e._getTacskClassifyList();case 2:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())},handleSubmit:function(){var t=this;return o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.taskClassfiyName||t.$message({message:"请输入题目分类",type:"success"}),"add"!==t.dialogType){e.next=13;break}return e.prev=2,e.next=5,Object(s.b)({name:t.taskClassfiyName});case 5:e.sent,t.$message({message:"添加题目分类成功",type:"success"}),t.handleClose(),t._getTacskClassifyList(),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(2);case 13:if("edit"!==t.dialogType){e.next=25;break}return e.prev=14,e.next=17,Object(s.I)({id:t.taskClassfiyId,name:t.taskClassfiyName});case 17:e.sent,t.$message({message:"修改题目分类成功",type:"success"}),t.handleClose(),t._getTacskClassifyList(),e.next=25;break;case 23:e.prev=23,e.t1=e.catch(14);case 25:case"end":return e.stop()}},e,t,[[2,11],[14,23]])}))()}}},c=a("KHd+"),d=Object(c.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("新增题目分类")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"题目分类字典",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.handleClose}},[a("el-form",{attrs:{"label-position":"right","label-width":"120px"}},[a("el-form-item",{attrs:{label:"题目分类名称"}},[a("el-input",{model:{value:t.taskClassfiyName,callback:function(e){t.taskClassfiyName=e},expression:"taskClassfiyName"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.handleClose}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)],1)},[],!1,null,null,null);d.options.__file="taskClassify.vue";e.default=d.exports},zK94:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"r",function(){return r}),a.d(e,"s",function(){return o}),a.d(e,"o",function(){return s}),a.d(e,"v",function(){return u}),a.d(e,"d",function(){return c}),a.d(e,"q",function(){return d}),a.d(e,"f",function(){return l}),a.d(e,"j",function(){return m}),a.d(e,"A",function(){return f}),a.d(e,"H",function(){return p}),a.d(e,"m",function(){return h}),a.d(e,"p",function(){return g}),a.d(e,"t",function(){return b}),a.d(e,"x",function(){return y}),a.d(e,"u",function(){return k}),a.d(e,"n",function(){return v}),a.d(e,"e",function(){return _}),a.d(e,"J",function(){return j}),a.d(e,"i",function(){return C}),a.d(e,"D",function(){return O}),a.d(e,"b",function(){return T}),a.d(e,"k",function(){return w}),a.d(e,"I",function(){return x}),a.d(e,"E",function(){return L}),a.d(e,"g",function(){return z}),a.d(e,"F",function(){return N}),a.d(e,"z",function(){return S}),a.d(e,"y",function(){return F}),a.d(e,"B",function(){return Q}),a.d(e,"C",function(){return $}),a.d(e,"c",function(){return I}),a.d(e,"h",function(){return V}),a.d(e,"G",function(){return D}),a.d(e,"w",function(){return G}),a.d(e,"l",function(){return M});var n=a("t3Un");function i(t){return Object(n.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function r(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function o(){return Object(n.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function s(t){return Object(n.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function u(t){return Object(n.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function c(t){return Object(n.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function d(t){return Object(n.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function l(t){return Object(n.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function m(t){return Object(n.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function f(t){return Object(n.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function p(t){return Object(n.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function h(t){return Object(n.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function g(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function b(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function y(t){return Object(n.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function k(t){return Object(n.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function v(t){return Object(n.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function _(t){return Object(n.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function j(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function C(t){return Object(n.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function O(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(n.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function T(t){return Object(n.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function w(t){return Object(n.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function x(t){return Object(n.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function L(t){return Object(n.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function z(t){return Object(n.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}function N(t,e){return Object(n.a)({url:"/i/topteam/admin/MoveTask?id="+t+"&move_type="+e})}function S(t){return Object(n.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:t})}function F(t){return Object(n.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:t})}function Q(t){return Object(n.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:t})}function $(t){return Object(n.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:t})}function I(t){return Object(n.a)({url:"/i/topteam/admin/addgame",method:"post",data:t})}function V(t){return Object(n.a)({url:"/i/topteam/admin/updategame",method:"post",data:t})}function D(t){return Object(n.a)({url:"/i/topteam/admin/onsale",method:"post",data:t})}function G(t){return Object(n.a)({url:"/i/topteam/admin/getgamelist",method:"post",data:t})}function M(t){return Object(n.a)({url:"/i/topteam/admin/delgame",method:"post",data:t})}}}]);