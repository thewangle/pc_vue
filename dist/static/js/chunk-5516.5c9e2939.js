(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5516"],{"3Uyc":function(t,e,a){"use strict";a.r(e);var n=a("gDS+"),i=a.n(n),r=a("14Xm"),l=a.n(r),o=a("YEIV"),s=a.n(o),c=a("D3Ub"),u=a.n(c),d=a("zK94"),p=a("dYX8"),f=a("ZySA"),m=(a("7Qib"),a("MT78")),h=a.n(m),v={name:"AtivityPRecord",directives:{waves:f.a},filters:{activityFilter:function(t){return{1:"团队-基础版",2:"个人-基础版"}[t]},timeFilter:function(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((+e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((+e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((+e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((+e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(+e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},filterTime:function(t){var e=parseInt(t/3600);e<10&&(e="0"+e);var a=parseInt(t/60%60);a<10&&(a="0"+a);var n=parseInt(t%60);return n<10&&(n="0"+n),e+":"+a+":"+n}},data:function(){return{list:null,listLoading:!1,total:0,listQuery:{page_no:1,page_size:10,type:2,agent_name:void 0,name:void 0,status:5,act_log:1,person_coach:null},activities:[{label:"个人-基础版",key:2}],dialogInfoVisible:!1,gridData:[],dialogTotal:0,dilogQuery:{page_no:1,page_size:10,act_id:""},filterList:[],tagList:[],template_id:0,dialogPerResult:!1,specialCharts:!1,activeName2:"first",tableResultData:[],perInfoParams:{},tiplist:[],playerName:""}},created:function(){this._fetchList()},methods:{handleShowClose:function(){this.activeName2="first",this.playerName=""},handledialogFilter:function(){var t=this;return u()(l.a.mark(function e(){var a,n,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.specialCharts=!1,a=[],t.tagList.forEach(function(t){if(t.value){var e=s()({},t.id,t.value);a.push(e)}}),t.dilogQuery.tagList=a,e.next=6,Object(d.v)(t.dilogQuery);case 6:n=e.sent,i=n.data,t.gridData=i.list;case 9:case"end":return e.stop()}},e,t)}))()},handleSelectChange:function(t,e){var a={};this.tagList.forEach(function(t){t.tag_name===e.children_name&&(a=t)}),e.editList.forEach(function(e){e.id===t&&(a.editList=e.child_value,a.arrValue=t)}),this.tagList=JSON.parse(i()(this.tagList))},handleClose:function(){this.tagList=[],this.filterList=[],this.template_id=0,this.dilogQuery={page_no:1,page_size:10,act_id:""},this.tiplist=[],this.specialCharts=!1},_filterName:function(t){var e="";return this.filterList.forEach(function(a){a.id===t&&(e=a.tag_name)}),e},handledialogCurrentChange:function(t){this.dilogQuery.page_no=t,this._fetchDetial()},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchList()},handleFilter:function(){this.listQuery.page_no=1,this._fetchList()},handleShowDetial:function(t){this.dialogInfoVisible=!0,this.gridData=[],this._fetchDetial(t)},_fetchDetial:function(t){var e=this;return u()(l.a.mark(function a(){var n,i,r;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.id&&(e.dilogQuery.act_id=t.id),n=null,!(t.template_id>0)){a.next=13;break}return e.template_id=t.template_id,a.next=6,Object(p.m)(t.template_id);case 6:return i=a.sent,e.tagList=i.data.list,a.next=10,Object(d.v)(e.dilogQuery);case 10:n=a.sent,a.next=16;break;case 13:return a.next=15,Object(d.A)(e.dilogQuery);case 15:n=a.sent;case 16:r=n.data,e.gridData=r.list,e.dialogTotal=+r.total,e.filterList=r.head;case 20:case"end":return a.stop()}},a,e)}))()},_fetchList:function(){var t=this;return u()(l.a.mark(function e(){var a,n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.prev=1,e.next=4,Object(d.q)(t.listQuery);case 4:a=e.sent,n=a.data,t.list=n.list,t.total=n.total,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:t.listLoading=!1;case 13:case"end":return e.stop()}},e,t,[[1,10]])}))()},analysis:function(){var t=this;return u()(l.a.mark(function e(){var a,n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],t.tagList.forEach(function(t){if(t.value){var e=s()({},t.id,t.value);a.push(e)}}),t.dilogQuery.tagList=a,e.next=5,Object(d.u)(t.dilogQuery);case 5:n=e.sent,n.data,t.tiplist=n.data.list,t.specialCharts=!0,t.$nextTick(function(){t.pieCharts("pieChart")});case 10:case"end":return e.stop()}},e,t)}))()},pieCharts:function(t){var e=this;this.tiplist.forEach(function(a,n){var i=h.a.init(e.$refs[""+t+n][0]);if("pieChart"===t){var r={title:{text:a.name||"全部",left:"left"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},series:[{type:"pie",radius:"65%",center:["50%","50%"],selectedMode:"single",data:[{value:a.correct.num,name:a.correct.num+"分",itemStyle:{color:"green"}},{value:a.error.num,name:a.error.num+"分",itemStyle:{color:"red"}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};i.setOption(r)}if("pie"===t){var l={title:{text:a.name||"全部",left:"left"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},series:[{type:"pie",radius:"65%",center:["50%","50%"],selectedMode:"single",data:[{value:a.right_percent.split("%")[0],name:a.right_score+"分",itemStyle:{color:"green"}},{value:a.wrong_percent.split("%")[0],name:a.wrong_score+"分",itemStyle:{color:"red"}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};i.setOption(l)}})},showPerResult:function(t){var e=this;return u()(l.a.mark(function a(){var n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t),e.perInfoParams={activity_id:e.dilogQuery.act_id,openid:t.user_id},a.next=4,Object(d.x)(e.perInfoParams);case 4:n=a.sent,e.tableResultData=n.data,e.dialogPerResult=!0,e.playerName=t.user_name;case 8:case"end":return a.stop()}},a,e)}))()},tabClick:function(t,e){var a=this;return u()(l.a.mark(function n(){var i;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log(t,e),"second"!==t.name){n.next=8;break}return n.next=4,Object(d.y)(a.perInfoParams);case 4:i=n.sent,a.tiplist=i.data,console.log(a.tiplist),a.$nextTick(function(){a.pieCharts("pie")});case 8:case"end":return n.stop()}},n,a)}))()}}},_=(a("JXtW"),a("KHd+")),g=Object(_.a)(v,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入运营商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.agent_name,callback:function(e){t.$set(t.listQuery,"agent_name",e)},expression:"listQuery.agent_name"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入活动名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择活动类型"},on:{change:t.handleFilter},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.activities,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"是否指定教练",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.person_coach,callback:function(e){t.$set(t.listQuery,"person_coach",e)},expression:"listQuery.person_coach"}},[a("el-option",{key:"1",attrs:{label:"是",value:"1"}}),t._v(" "),a("el-option",{key:"2",attrs:{label:"否",value:"2"}})],1),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","max-height":"400","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"运营商",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.agent_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"活动名称","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"游戏类型",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("activityFilter")(e.row.type)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"开始时间",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("timeFilter")(e.row.set_start_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"结束时间",align:"center",width:"155"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("timeFilter")(e.row.set_stop_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"玩家数量","class-name":"status-col",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.player_num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.handleShowDetial(e.row)}}},[t._v("查看")]),t._v(" "),a("el-button",{attrs:{size:"small"}},[a("a",{attrs:{href:"/i/topteam/admin/exporttask?activity_id="+e.row.id}},[t._v("下载任务")])])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{"close-on-click-modal":!1,visible:t.dialogInfoVisible,title:"活动详情查看","custom-class":"detaildialog"},on:{"update:visible":function(e){t.dialogInfoVisible=e},close:t.handleClose}},[t.template_id>0?a("div",{staticClass:"filter-container"},[t._l(t.tagList,function(e){return"1"===e.is_show&&"2"===e.show_type?a("el-select",{key:e.id,staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请选择"+e.tag_name},on:{change:function(a){t.handleSelectChange(a,e)}},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"item.value"}},t._l(e.editList,function(t){return a("el-option",{key:t.id,attrs:{label:t.value,value:t.value}})})):t._e()}),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handledialogFilter}},[t._v("查询")]),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.analysis}},[t._v("统计分析")])],2):t._e(),t._v(" "),t.specialCharts?a("div",t._l(t.tiplist,function(e,n){return a("div",{key:n,staticClass:"pie-item"},[a("div",{ref:"pieChart"+n,refInFor:!0,staticStyle:{width:"400px",height:"300px"}}),t._v(" "),a("div",t._l(e,function(e,n){return a("p",{key:n},[t._v(t._s(e.tip))])}))])})):a("div",[a("el-table",{attrs:{data:t.gridData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"活动名称",width:"140px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.act_name))])]}}])}),t._v(" "),t._l(t.filterList,function(e){return a("el-table-column",{key:e.id,attrs:{label:t._filterName(e.id),width:"140px"},scopedSlots:t._u([{key:"default",fn:function(n){return[a("span",[t._v(t._s(n.row[e.id]))])]}}])})}),t._v(" "),a("el-table-column",{attrs:{label:"玩家昵称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.user_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"任务用时",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("filterTime")(e.row.use_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"完成任务数",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.task_num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"完成任务百分比",width:"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.task_rate)+"%")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"得分"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.score))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"统计"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.showPerResult(e.row)}}},[t._v("查看")])]}}])})],2),t._v(" "),a("el-pagination",{attrs:{"current-page":t.dilogQuery.page_no,total:t.dialogTotal,background:"",layout:"total, prev, pager, next, jumper"},on:{"current-change":t.handledialogCurrentChange}})],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogPerResult,title:"个人答题信息",width:"70%"},on:{"update:visible":function(e){t.dialogPerResult=e},close:t.handleShowClose}},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.tabClick},model:{value:t.activeName2,callback:function(e){t.activeName2=e},expression:"activeName2"}},[a("el-tab-pane",{attrs:{label:"答题结果",name:"first"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableResultData}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"task_name",label:"题目标题",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"task_desc",label:"题目描述",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Classify",label:"题目分类"}}),t._v(" "),a("el-table-column",{attrs:{prop:"task_score",label:"题目分值"}}),t._v(" "),a("el-table-column",{attrs:{prop:"score",label:"题目得分"}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"统计分析",name:"second"}},[a("div",t._l(t.tiplist,function(e,n){return a("div",{key:n,staticClass:"pie-item"},[a("div",{ref:"pie"+n,refInFor:!0,staticStyle:{width:"400px",height:"300px"}}),t._v(" "),a("div",{staticStyle:{"padding-top":"80px"}},[a("p",[t._v(t._s(t.playerName+" "+e.name+" 正确得分"+e.right_score+"，占题目分类的"+e.right_percent))]),t._v(" "),a("p",[t._v(t._s(t.playerName+" "+e.name+" 失误得分"+e.wrong_score+"，占题目分类的"+e.wrong_percent))])])])}))])],1)],1)],1)},[],!1,null,null,null);g.options.__file="activityPRecord.vue";e.default=g.exports},CVc1:function(t,e,a){},JXtW:function(t,e,a){"use strict";var n=a("CVc1");a.n(n).a},ZySA:function(t,e,a){"use strict";var n=a("P2sY"),i=a.n(n),r=(a("jUE0"),{bind:function(t,e){t.addEventListener("click",function(a){var n=i()({},e.value),r=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=r.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var o=l.getBoundingClientRect(),s=l.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",l.appendChild(s)),r.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=r.color,s.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(l)),r.install=l;e.a=r},jUE0:function(t,e,a){},zK94:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"o",function(){return r}),a.d(e,"p",function(){return l}),a.d(e,"l",function(){return o}),a.d(e,"s",function(){return s}),a.d(e,"c",function(){return c}),a.d(e,"n",function(){return u}),a.d(e,"e",function(){return d}),a.d(e,"h",function(){return p}),a.d(e,"w",function(){return f}),a.d(e,"C",function(){return m}),a.d(e,"j",function(){return h}),a.d(e,"m",function(){return v}),a.d(e,"q",function(){return _}),a.d(e,"t",function(){return g}),a.d(e,"r",function(){return b}),a.d(e,"k",function(){return y}),a.d(e,"d",function(){return w}),a.d(e,"E",function(){return k}),a.d(e,"g",function(){return x}),a.d(e,"z",function(){return C}),a.d(e,"b",function(){return S}),a.d(e,"i",function(){return O}),a.d(e,"D",function(){return j}),a.d(e,"A",function(){return L}),a.d(e,"f",function(){return Q}),a.d(e,"B",function(){return D}),a.d(e,"v",function(){return N}),a.d(e,"u",function(){return T}),a.d(e,"x",function(){return z}),a.d(e,"y",function(){return E});var n=a("t3Un");function i(t){return Object(n.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function r(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function l(){return Object(n.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function o(t){return Object(n.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function s(t){return Object(n.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function c(t){return Object(n.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function u(t){return Object(n.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function d(t){return Object(n.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function p(t){return Object(n.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function f(t){return Object(n.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function m(t){return Object(n.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function h(t){return Object(n.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function v(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function _(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function g(t){return Object(n.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function b(t){return Object(n.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function y(t){return Object(n.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function w(t){return Object(n.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function k(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function x(t){return Object(n.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function C(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(n.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function S(t){return Object(n.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function O(t){return Object(n.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function j(t){return Object(n.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function L(t){return Object(n.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function Q(t){return Object(n.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}function D(t,e){return Object(n.a)({url:"/i/topteam/admin/MoveTask?id="+t+"&move_type="+e})}function N(t){return Object(n.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:t})}function T(t){return Object(n.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:t})}function z(t){return Object(n.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:t})}function E(t){return Object(n.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:t})}}}]);