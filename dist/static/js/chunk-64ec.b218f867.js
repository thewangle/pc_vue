(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-64ec"],{JkJ3:function(t,e,n){},Quqd:function(t,e,n){"use strict";n.r(e);var a=n("14Xm"),i=n.n(a),r=n("D3Ub"),l=n.n(r),o=n("zK94"),s=n("ZySA"),u=(n("7Qib"),{name:"AtivityRecord",directives:{waves:s.a},filters:{activityFilter:function(t){return{1:"团队-基础版",2:"个人-基础版"}[t]},timeFilter:function(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((+e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((+e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((+e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((+e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(+e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())}},data:function(){return{list:null,listLoading:!1,total:0,listQuery:{page_no:1,page_size:10,type:1,agent_name:void 0,name:void 0,status:5},activities:[{label:"团队-基础版",key:1}],dialogInfoVisible:!1,gridData:[],all_task_rate:"",all_score_rate:""}},created:function(){this._fetchList()},methods:{handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchList()},handleFilter:function(){this.listQuery.page_no=1,this._fetchList()},handleShowDetial:function(t){this.dialogInfoVisible=!0,this.gridData=[],this._fetchDetial(t.id)},_fetchDetial:function(t){var e=this;return l()(i.a.mark(function n(){var a,r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(o.t)(t);case 2:a=n.sent,r=a.data,e.gridData=r.list,e.all_task_rate=r.all_task_rate,e.all_score_rate=r.all_score_rate;case 7:case"end":return n.stop()}},n,e)}))()},_fetchList:function(){var t=this;return l()(i.a.mark(function e(){var n,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.prev=1,e.next=4,Object(o.q)(t.listQuery);case 4:n=e.sent,a=n.data,t.list=a.list,t.total=a.total,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:t.listLoading=!1;case 13:case"end":return e.stop()}},e,t,[[1,10]])}))()}}}),c=(n("SA1+"),n("KHd+")),d=Object(c.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入运营商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.agent_name,callback:function(e){t.$set(t.listQuery,"agent_name",e)},expression:"listQuery.agent_name"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入活动名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择活动类型"},on:{change:t.handleFilter},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.activities,function(t){return n("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"运营商",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.agent_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动名称","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"游戏类型",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("activityFilter")(e.row.type)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"开始时间",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.set_start_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"结束时间",align:"center",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.set_stop_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"队伍数量",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.team_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"玩家数量","class-name":"status-col",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.player_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.handleShowDetial(e.row)}}},[t._v("查看")]),t._v(" "),e.row.img_pakage_url?n("el-button",{attrs:{type:"success",size:"small"}},[n("a",{attrs:{href:e.row.img_pakage_url}},[t._v("下载图片")])]):t._e(),t._v(" "),n("el-button",{attrs:{size:"small"}},[n("a",{attrs:{href:"/i/topteam/admin/exporttask?activity_id="+e.row.id}},[t._v("下载任务")])])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,visible:t.dialogInfoVisible,title:"活动详情查看","custom-class":"detaildialog"},on:{"update:visible":function(e){t.dialogInfoVisible=e}}},[n("el-table",{attrs:{data:t.gridData,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"队伍编号"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"队伍名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"开始时间",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.start_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"结束时间",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timeFilter")(e.row.end_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"得分"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.score))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"队伍得分率",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.score_rate)+"%")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"队伍正确率",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.c_task_num_rate)+"%")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"整体得分率",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t.all_score_rate)+"%")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"整体正确率",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t.all_task_rate)+"%")])]}}])})],1)],1)],1)},[],!1,null,null,null);d.options.__file="activityRecord.vue";e.default=d.exports},"SA1+":function(t,e,n){"use strict";var a=n("JkJ3");n.n(a).a},ZySA:function(t,e,n){"use strict";var a=n("P2sY"),i=n.n(a),r=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var a=i()({},e.value),r=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),l=r.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var o=l.getBoundingClientRect(),s=l.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",l.appendChild(s)),r.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=r.color,s.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(l)),r.install=l;e.a=r},jUE0:function(t,e,n){},zK94:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"o",function(){return r}),n.d(e,"p",function(){return l}),n.d(e,"l",function(){return o}),n.d(e,"s",function(){return s}),n.d(e,"c",function(){return u}),n.d(e,"n",function(){return c}),n.d(e,"e",function(){return d}),n.d(e,"h",function(){return f}),n.d(e,"u",function(){return p}),n.d(e,"x",function(){return m}),n.d(e,"j",function(){return _}),n.d(e,"m",function(){return h}),n.d(e,"q",function(){return v}),n.d(e,"t",function(){return b}),n.d(e,"r",function(){return g}),n.d(e,"k",function(){return y}),n.d(e,"d",function(){return w}),n.d(e,"z",function(){return k}),n.d(e,"g",function(){return S}),n.d(e,"v",function(){return x}),n.d(e,"b",function(){return j}),n.d(e,"i",function(){return O}),n.d(e,"y",function(){return L}),n.d(e,"w",function(){return C}),n.d(e,"f",function(){return Q});var a=n("t3Un");function i(t){return Object(a.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function r(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function l(){return Object(a.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function o(t){return Object(a.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function s(t){return Object(a.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function u(t){return Object(a.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function c(t){return Object(a.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function d(t){return Object(a.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function f(t){return Object(a.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function p(t){return Object(a.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function m(t){return Object(a.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function _(t){return Object(a.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function h(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function v(t){return Object(a.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function b(t){return Object(a.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function g(t){return Object(a.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function y(t){return Object(a.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function w(t){return Object(a.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function k(t){return Object(a.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function S(t){return Object(a.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(a.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function j(t){return Object(a.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function O(t){return Object(a.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function L(t){return Object(a.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function C(t){return Object(a.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function Q(t){return Object(a.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}}}]);