(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0001"],{"+3ch":function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"g",function(){return l}),n.d(t,"f",function(){return r}),n.d(t,"i",function(){return s}),n.d(t,"l",function(){return o}),n.d(t,"k",function(){return c}),n.d(t,"b",function(){return u}),n.d(t,"h",function(){return d}),n.d(t,"e",function(){return f}),n.d(t,"j",function(){return p}),n.d(t,"a",function(){return h}),n.d(t,"d",function(){return m}),n.d(t,"m",function(){return g});var a=n("t3Un");function i(e){return Object(a.a)({url:"/i/topteam/admin/AddAgent",method:"post",data:e})}function l(e){return Object(a.a)({url:"/i/topteam/admin/ModifyAgent",method:"post",data:e})}function r(e){return Object(a.a)({url:"/i/topteam/admin/DelAgent",method:"post",data:e})}function s(e){return Object(a.a)({url:"/i/topteam/admin/GetAgentList",method:"post",data:e})}function o(e){return Object(a.a)({url:"/i/topteam/admin/GetSubordinateAgent",method:"post",data:e})}function c(e){return Object(a.a)({url:"/i/topteam/admin/GetOperatorList",method:"post",data:e})}function u(e){return Object(a.a)({url:"/i/topteam/admin/AddOperator",method:"post",data:e})}function d(e){return Object(a.a)({url:"/i/topteam/admin/ModifyOperator",method:"post",data:e})}function f(e){return Object(a.a)({url:"/i/topteam/admin/DelOperator",method:"post",data:e})}function p(e){return Object(a.a)({url:"/i/topteam/admin/SearchCoachList",method:"post",data:e})}function h(e){return Object(a.a)({url:"/i/topteam/admin/AddCoach",method:"post",data:e})}function m(e){return Object(a.a)({url:"/i/topteam/admin/DelCoach",method:"post",data:e})}function g(e){return Object(a.a)({url:"/i/topteam/admin/ModifyCoach",method:"post",data:e})}},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),i=n.n(a),l=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=i()({},t.value),l=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=l.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var s=r.getBoundingClientRect(),o=r.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",r.appendChild(o)),l.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-s.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-s.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=l.color,o.className="waves-ripple z-active",!1}},!1)}}),r=function(e){e.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(r)),l.install=r;t.a=l},jUE0:function(e,t,n){},wa44:function(e,t,n){"use strict";n.r(t);var a=n("P2sY"),i=n.n(a),l=n("14Xm"),r=n.n(l),s=n("D3Ub"),o=n.n(s),c=n("+3ch"),u=n("+vOl"),d={name:"DailiManage",directives:{waves:n("ZySA").a},filters:{statusFilter:function(e){return{2:"一级代理商",3:"二级代理商",4:"三级代理商"}[e]}},data:function(){return{list:null,listLoading:!1,listQuery:{level:null,agent_name:null,province_id:null},allDaili:[{label:"一级代理",key:2},{label:"二级代理",key:3},{label:"三级代理",key:4}],dialogFormVisible:!1,dialogTitle:"",dialogType:"",cityList:[],dialogCityList:[],id:"",agentInfo:{name:null,username:null,level:null,contacts:null,phone:null,price:null,selectArea:[]},defaultProps:{value:"id",label:"name",children:"childs"}}},created:function(){this.init()},methods:{handleFilter:function(){this._fetchAgentList()},handleClose:function(){this._resetForm()},_resetForm:function(){this.agentInfo={name:null,username:null,level:null,contacts:null,phone:null,price:null,selectArea:[]},this.dialogType="",this.id=""},handleCreateAgent:function(){var e=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c.c)(e.agentInfo);case 3:return t.sent,e.dialogFormVisible=!1,t.next=7,e._fetchAgentList();case 7:e.$message({message:"创建成功",type:"success"}),t.next=16;break;case 10:return t.prev=10,t.t0=t.catch(0),e.dialogFormVisible=!1,t.next=15,e._fetchAgentList();case 15:e.$message({message:"创建失败",type:"error"});case 16:case"end":return t.stop()}},t,e,[[0,10]])}))()},handleEditAgent:function(){var e=this;return o()(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.handleCityListChange(e.agentInfo.selectArea),n=i()({},e.agentInfo,{id:e.id}),t.prev=2,t.next=5,Object(c.g)(n);case 5:return t.sent,e.dialogFormVisible=!1,t.next=9,e._fetchAgentList();case 9:e.$message({message:"修改成功",type:"success"}),t.next=18;break;case 12:return t.prev=12,t.t0=t.catch(2),e.dialogFormVisible=!1,t.next=17,e._fetchAgentList();case 17:e.$message({message:"创建失败",type:"error"});case 18:case"end":return t.stop()}},t,e,[[2,12]])}))()},handleCityListChange:function(e){this.agentInfo.province_id=e[0],this.agentInfo.city_id=e[1]||0,this.agentInfo.county_id=e[2]||0;var t="";this._getAllAdderss().forEach(function(e){t+=e}),this.agentInfo.address=t,console.log(this.agentInfo)},handleCreate:function(){var e=this;return o()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.dialogTitle="新增代理商",e.dialogType="add",e.dialogFormVisible=!0,e.dialogCityList=e._changeCityList();case 4:case"end":return t.stop()}},t,e)}))()},handleUpdateAgent:function(e){var t=this;return o()(r.a.mark(function n(){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.dialogTitle="修改代理商",t.dialogType="edit",t.id=e.id,t.dialogFormVisible=!0,t.agentInfo={name:e.name,username:e.username,level:e.level,contacts:e.contacts,phone:e.phone,price:e.price/100,selectArea:[e.province_id,e.city_id,e.county_id]},t.dialogCityList=t._changeCityList(e.province_id);case 5:case"end":return n.stop()}},n,t)}))()},handleDeleteAgent:function(e){var t=this;this.$confirm("确认删除该代理商？").then(function(){var n=o()(r.a.mark(function n(a){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(c.f)({agent_id:e});case 2:return n.next=4,t._fetchAgentList();case 4:case"end":return n.stop()}},n,t)}));return function(e){return n.apply(this,arguments)}}()).catch(function(e){})},_changeCityList:function(e){var t=[];return this.cityList.forEach(function(n){n.id===e&&t.push(n)}),t.length?t:this.cityList},_fetchAgentList:function(){var e=this;return o()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.prev=1,t.next=4,Object(c.i)(e.listQuery);case 4:n=t.sent,a=n.data,e.listLoading=!1,e.list=a,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),e.listLoading=!1;case 13:case"end":return t.stop()}},t,e,[[1,10]])}))()},_fetchCityList:function(){var e=this;return o()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(u.a)();case 2:n=t.sent,a=n.data,e._dealCityList(a),e.cityList=a;case 6:case"end":return t.stop()}},t,e)}))()},_dealCityList:function(e){var t=this;e.map(function(e){e.childs.length>0?t._dealCityList(e.childs):delete e.childs})},_getAllAdderss:function(){var e=this,t=[];return this.agentInfo.selectArea.forEach(function(n){e._dealAddress(e.dialogCityList,n,t)}),t},_dealAddress:function(e,t,n){var a=this;e.forEach(function(e){e.id===t&&n.push(e.name),e.childs&&e.childs.length>0&&a._dealAddress(e.childs,t,n)})},init:function(){this._fetchAgentList(),this._fetchCityList()}}},f=n("KHd+"),p=Object(f.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入代理商名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.agent_name,callback:function(t){e.$set(e.listQuery,"agent_name",t)},expression:"listQuery.agent_name"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"全部代理",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.level,callback:function(t){e.$set(e.listQuery,"level",t)},expression:"listQuery.level"}},e._l(e.allDaili,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"全部区域",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.province_id,callback:function(t){e.$set(e.listQuery,"province_id",t)},expression:"listQuery.province_id"}},e._l(e.cityList,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查询")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("新增代理商")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"编号",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代理商名称","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"联系人",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.contacts))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"联系电话",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.phone))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代理级别",align:"center",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("statusFilter")(t.row.level)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"活动价",align:"center",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.price/100))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"所在地区","class-name":"status-col",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.address))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleUpdateAgent(t.row)}}},[e._v("修改")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"success"}},[e._v("转移")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){e.handleDeleteAgent(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.handleClose}},[n("el-form",{attrs:{model:e.agentInfo,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"代理商名称"}},[n("el-input",{model:{value:e.agentInfo.name,callback:function(t){e.$set(e.agentInfo,"name",t)},expression:"agentInfo.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{model:{value:e.agentInfo.username,callback:function(t){e.$set(e.agentInfo,"username",t)},expression:"agentInfo.username"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"代理级别"}},[n("el-select",{attrs:{clearable:""},model:{value:e.agentInfo.level,callback:function(t){e.$set(e.agentInfo,"level",t)},expression:"agentInfo.level"}},e._l(e.allDaili,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"联系人"}},[n("el-input",{model:{value:e.agentInfo.contacts,callback:function(t){e.$set(e.agentInfo,"contacts",t)},expression:"agentInfo.contacts"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系电话"}},[n("el-input",{model:{value:e.agentInfo.phone,callback:function(t){e.$set(e.agentInfo,"phone",t)},expression:"agentInfo.phone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"活动价"}},[n("el-input",{attrs:{type:"number"},model:{value:e.agentInfo.price,callback:function(t){e.$set(e.agentInfo,"price",t)},expression:"agentInfo.price"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"所在区域"}},[n("el-cascader",{attrs:{options:e.dialogCityList,props:e.defaultProps,"change-on-select":"","expand-trigger":"click"},on:{change:e.handleCityListChange},model:{value:e.agentInfo.selectArea,callback:function(t){e.$set(e.agentInfo,"selectArea",t)},expression:"agentInfo.selectArea"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",[e._v("取消")]),e._v(" "),"add"===e.dialogType?n("el-button",{attrs:{type:"primary"},on:{click:e.handleCreateAgent}},[e._v("保存")]):e._e(),e._v(" "),"edit"===e.dialogType?n("el-button",{attrs:{type:"primary"},on:{click:e.handleEditAgent}},[e._v("修改")]):e._e()],1)],1)],1)},[],!1,null,null,null);p.options.__file="dailiManage.vue";t.default=p.exports}}]);