(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5516"],{"3Uyc":function(t,e,n){"use strict";n.r(e);var a=n("14Xm"),i=n.n(a),r=n("D3Ub"),o=n.n(r),l=n("zK94"),s=n("ZySA"),u=(n("7Qib"),{name:"AtivityPRecord",directives:{waves:s.a},filters:{activityFilter:function(t){return{1:"团队-基础版",2:"个人-基础版"}[t]},timeFilter:function(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((+e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((+e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((+e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((+e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(+e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},filterTime:function(t){var e=parseInt(t/3600);e<10&&(e="0"+e);var n=parseInt(t/60%60);n<10&&(n="0"+n);var a=parseInt(t%60);return a<10&&(a="0"+a),e+":"+n+":"+a}},data:function(){return{list:null,listLoading:!1,total:0,listQuery:{page_no:1,page_size:10,type:2,agent_name:void 0,name:void 0,status:5,act_log:1,person_coach:null},activities:[{label:"个人-基础版",key:2}],dialogInfoVisible:!1,gridData:[],dialogTotal:0,dilogQuery:{page_no:1,page_size:10,act_id:""}}},created:function(){this._fetchList()},methods:{handledialogCurrentChange:function(t){this.dilogQuery.page_no=t,this._fetchDetial()},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchList()},handleFilter:function(){this.listQuery.page_no=1,this._fetchList()},handleShowDetial:function(t){this.dialogInfoVisible=!0,this.gridData=[],this._fetchDetial(t.id)},_fetchDetial:function(t){var e=this;return o()(i.a.mark(function n(){var a,r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t&&(e.dilogQuery.act_id=t),n.next=3,Object(l.w)(e.dilogQuery);case 3:a=n.sent,r=a.data,e.gridData=r.list,e.dialogTotal=+r.total;case 7:case"end":return n.stop()}},n,e)}))()},_fetchList:function(){var t=this;return o()(i.a.mark(function e(){var n,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.prev=1,e.next=4,Object(l.q)(t.listQuery);case 4:n=e.sent,a=n.data,t.list=a.list,t.total=a.total,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:t.listLoading=!1;case 13:case"end":return e.stop()}},e,t,[[1,10]])}))()}}}),c=(n("JXtW"),n("KHd+")),d=Object(c.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入运营商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.agent_name,callback:function(e){t.$set(t.listQuery,"agent_name",e)},expression:"listQuery.agent_name"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入活动名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择活动类型"},on:{change:t.handleFilter},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.activities,function(t){return n("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"是否指定教练",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.person_coach,callback:function(e){t.$set(t.listQuery,"person_coach",e)},expression:"listQuery.person_coach"}},[n("el-option",{key:"1",attrs:{label:"是",value:"1"}}),t._v(" "),n("el-option",{key:"2",attrs:{label:"否",value:"2"}})],1),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","max-height":"400","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"运营商",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.agent_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动名称","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"游戏类型",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("activityFilter")(e.row.type)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"开始时间",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.set_start_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"结束时间",align:"center",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.set_stop_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"玩家数量","class-name":"status-col",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.player_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.handleShowDetial(e.row)}}},[t._v("查看")]),t._v(" "),n("el-button",{attrs:{size:"small"}},[n("a",{attrs:{href:"/i/topteam/admin/exporttask?activity_id="+e.row.id}},[t._v("下载任务")])])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,visible:t.dialogInfoVisible,title:"活动详情查看","custom-class":"detaildialog"},on:{"update:visible":function(e){t.dialogInfoVisible=e}}},[n("el-table",{attrs:{data:t.gridData,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.act_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"玩家昵称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.user_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"任务用时",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("filterTime")(e.row.use_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"完成任务数",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.task_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"完成任务百分比",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.task_rate)+"%")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"得分"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.score))])]}}])})],1),t._v(" "),n("el-pagination",{attrs:{"current-page":t.dilogQuery.page_no,total:t.dialogTotal,background:"",layout:"total, prev, pager, next, jumper"},on:{"current-change":t.handledialogCurrentChange}})],1)],1)},[],!1,null,null,null);d.options.__file="activityPRecord.vue";e.default=d.exports},CVc1:function(t,e,n){},JXtW:function(t,e,n){"use strict";var a=n("CVc1");n.n(a).a},ZySA:function(t,e,n){"use strict";var a=n("P2sY"),i=n.n(a),r=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var a=i()({},e.value),r=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=r.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(l.width,l.height)+"px",o.appendChild(s)),r.type){case"center":s.style.top=l.height/2-s.offsetHeight/2+"px",s.style.left=l.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-l.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-l.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=r.color,s.className="waves-ripple z-active",!1}},!1)}}),o=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;e.a=r},jUE0:function(t,e,n){},zK94:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"o",function(){return r}),n.d(e,"p",function(){return o}),n.d(e,"l",function(){return l}),n.d(e,"s",function(){return s}),n.d(e,"c",function(){return u}),n.d(e,"n",function(){return c}),n.d(e,"e",function(){return d}),n.d(e,"h",function(){return p}),n.d(e,"u",function(){return f}),n.d(e,"x",function(){return m}),n.d(e,"j",function(){return h}),n.d(e,"m",function(){return _}),n.d(e,"q",function(){return g}),n.d(e,"t",function(){return v}),n.d(e,"r",function(){return y}),n.d(e,"k",function(){return b}),n.d(e,"d",function(){return w}),n.d(e,"z",function(){return k}),n.d(e,"g",function(){return x}),n.d(e,"v",function(){return j}),n.d(e,"b",function(){return O}),n.d(e,"i",function(){return S}),n.d(e,"y",function(){return C}),n.d(e,"w",function(){return Q}),n.d(e,"f",function(){return L});var a=n("t3Un");function i(t){return Object(a.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function r(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function o(){return Object(a.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function l(t){return Object(a.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function s(t){return Object(a.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function u(t){return Object(a.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function c(t){return Object(a.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function d(t){return Object(a.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function p(t){return Object(a.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function f(t){return Object(a.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function m(t){return Object(a.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function h(t){return Object(a.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function _(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function g(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function v(t){return Object(a.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function y(t){return Object(a.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function b(t){return Object(a.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function w(t){return Object(a.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function k(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function x(t){return Object(a.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function j(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(a.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function O(t){return Object(a.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function S(t){return Object(a.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function C(t){return Object(a.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function Q(t){return Object(a.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function L(t){return Object(a.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}}}]);