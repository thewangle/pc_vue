(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-722f"],{"+3ch":function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"g",function(){return r}),n.d(e,"f",function(){return s}),n.d(e,"i",function(){return o}),n.d(e,"n",function(){return l}),n.d(e,"m",function(){return c}),n.d(e,"l",function(){return u}),n.d(e,"k",function(){return d}),n.d(e,"b",function(){return p}),n.d(e,"h",function(){return f}),n.d(e,"e",function(){return h}),n.d(e,"j",function(){return m}),n.d(e,"a",function(){return g}),n.d(e,"d",function(){return v}),n.d(e,"o",function(){return _});var a=n("t3Un");function i(t){return Object(a.a)({url:"/i/topteam/admin/AddAgent",method:"post",data:t})}function r(t){return Object(a.a)({url:"/i/topteam/admin/ModifyAgent",method:"post",data:t})}function s(t){return Object(a.a)({url:"/i/topteam/admin/DelAgent",method:"post",data:t})}function o(t){return Object(a.a)({url:"/i/topteam/admin/GetAgentList",method:"post",data:t})}function l(t){return Object(a.a)({url:"/i/topteam/admin/TransSubordinateAgent",method:"post",data:t})}function c(t){return Object(a.a)({url:"/i/topteam/admin/TransAgent",method:"post",data:t})}function u(t){return Object(a.a)({url:"/i/topteam/admin/GetSubordinateAgent",method:"post",data:t})}function d(t){return Object(a.a)({url:"/i/topteam/admin/GetOperatorList",method:"post",data:t})}function p(t){return Object(a.a)({url:"/i/topteam/admin/AddOperator",method:"post",data:t})}function f(t){return Object(a.a)({url:"/i/topteam/admin/ModifyOperator",method:"post",data:t})}function h(t){return Object(a.a)({url:"/i/topteam/admin/DelOperator",method:"post",data:t})}function m(t){return Object(a.a)({url:"/i/topteam/admin/SearchCoachList",method:"post",data:t})}function g(t){return Object(a.a)({url:"/i/topteam/admin/AddCoach",method:"post",data:t})}function v(t){return Object(a.a)({url:"/i/topteam/admin/DelCoach",method:"post",data:t})}function _(t){return Object(a.a)({url:"/i/topteam/admin/ModifyCoach",method:"post",data:t})}},"3TJE":function(t,e,n){"use strict";var a=n("uae9");n.n(a).a},ZySA:function(t,e,n){"use strict";var a=n("6ZY3"),i=n.n(a),r=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var a=i()({},e.value),r=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),s=r.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var o=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",s.appendChild(l)),r.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(n.pageY-o.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(n.pageX-o.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=r.color,l.className="waves-ripple z-active",!1}},!1)}}),s=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(s)),r.install=s;e.a=r},frj9:function(t,e,n){"use strict";n.r(e);var a=n("6ZY3"),i=n.n(a),r=n("cLjf"),s=n.n(r),o=n("hDQ3"),l=n.n(o),c=n("+3ch"),u=n("+vOl"),d=n("X4fA"),p={name:"YunYinManage",directives:{waves:n("ZySA").a},filters:{statusFilter:function(t){return{2:"一级代理商",3:"二级代理商",4:"三级代理商"}[t]}},data:function(){return{level:"level",is_operator:!0,list:null,listLoading:!1,total:1,listQuery:{page_no:1,page_size:10,name:null},dialogFormVisible:!1,cityList:[],dialogTitle:"",dialotType:"",id:"",dialogCityList:[],daliList:[],agentInfo:{name:null,username:null,agent_id:Object(d.a)(),contacts:null,phone:null,price:null,selectArea:[]},defaultProps:{value:"id",label:"name",children:"childs"},transTitle:"",dialogTransVisible:!1,superAgentId:"",rowInfo:{},supList:[],compareId:Object(d.a)()}},created:function(){this.init()},mounted:function(){this.getCookie(this.level)},methods:{getCookie:function(t){for(var e=document.cookie.split("; "),n=0;n<e.length;n++){var a=e[n].split("=");t==a[0]&&(5==a[1]?this.is_operator=!1:this.is_operator=!0)}},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchOperatorList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchOperatorList()},handleFilter:function(){this.listQuery.page_no=1,this._fetchOperatorList()},handleCreate:function(){this.dialogTitle="创建运营商",this.dialotType="add",this.dialogFormVisible=!0},handleTransClose:function(){this.dialogTransVisible=!1,this.transTitle="",this.superAgentId="",this.rowInfo={},this.supList=[]},handleTransAgent:function(){var t=this;return l()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.superAgentId){e.next=3;break}return t.$message({message:"请选择一个代理商",type:"error"}),e.abrupt("return");case 3:return e.prev=3,e.next=6,Object(c.m)({agent_id:t.rowInfo.id,superior_agent_id:t.superAgentId});case 6:e.sent,t.$message({message:"转移成功",type:"success"}),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(3);case 12:t.handleTransClose(),t._fetchOperatorList();case 14:case"end":return e.stop()}},e,t,[[3,10]])}))()},handleListTrans:function(t){var e=this;return l()(s.a.mark(function n(){var a,i;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.transTitle="转移代理信息",console.log(t),n.next=4,Object(c.l)({});case 4:if(a=n.sent,(i=a.data).length){n.next=9;break}return e.$message({message:"该用户没有下属机构，不能转移",type:"error"}),n.abrupt("return");case 9:e.supList=i,e.rowInfo=t,e.dialogTransVisible=!0;case 12:case"end":return n.stop()}},n,e)}))()},handleEditOperator:function(t){this.dialogTitle="修改运营商",this.dialotType="edit",this.dialogFormVisible=!0,this.id=t.id,this.agentInfo={name:t.name,username:t.username,agent_id:Object(d.a)(),contacts:t.contacts,phone:t.phone,price:t.price,selectArea:[t.province_id,t.city_id,t.county_id]}},handleClose:function(){this.dialogFormVisible=!1,this._restForm()},handleDeleteOperator:function(t){var e=this;this.$confirm("确认删除该运营商？").then(function(){var n=l()(s.a.mark(function n(a){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(c.e)({agent_id:t});case 2:return n.next=4,e._fetchOperatorList();case 4:case"end":return n.stop()}},n,e)}));return function(t){return n.apply(this,arguments)}}()).catch(function(t){})},handleCreateAgent:function(){var t=this;return l()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(c.b)(t.agentInfo);case 3:return e.sent,t.dialogFormVisible=!1,t._restForm(),e.next=8,t._fetchOperatorList();case 8:t.$message({message:"创建成功",type:"success"}),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}},e,t,[[0,11]])}))()},handleEditAgent:function(){var t=this;return l()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.handleCityListChange(t.agentInfo.selectArea),n=i()({},t.agentInfo,{id:t.id}),e.prev=2,e.next=5,Object(c.h)(n);case 5:return e.sent,t.dialogFormVisible=!1,t._restForm(),e.next=10,t._fetchOperatorList();case 10:t.$message({message:"修改成功",type:"success"}),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(2);case 15:case"end":return e.stop()}},e,t,[[2,13]])}))()},handleCityListChange:function(t){this.agentInfo.province_id=t[0],this.agentInfo.city_id=t[1]||0,this.agentInfo.county_id=t[2]||0;var e="";this._getAllAdderss().forEach(function(t){e+=t}),this.agentInfo.address=e},_restForm:function(){this.agentInfo={name:null,username:null,agent_id:Object(d.a)(),contacts:null,phone:null,price:null,selectArea:[]},this.id="",this.dialotType=""},_getAllAdderss:function(){var t=this,e=[];return this.agentInfo.selectArea.forEach(function(n){t._dealAddress(t.dialogCityList,n,e)}),e},_dealAddress:function(t,e,n){var a=this;t.forEach(function(t){t.id===e&&n.push(t.name),t.childs&&t.childs.length>0&&a._dealAddress(t.childs,e,n)})},_fetchOperatorList:function(){var t=this;return l()(s.a.mark(function e(){var n,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.prev=1,e.next=4,Object(c.k)(t.listQuery);case 4:n=e.sent,a=n.data,t.list=a.list,t.total=a.total,t.listLoading=!1,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),t.listLoading=!1;case 14:case"end":return e.stop()}},e,t,[[1,11]])}))()},_fetchCityList:function(){var t=this;return l()(s.a.mark(function e(){var n,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)();case 2:n=e.sent,a=n.data,t._dealCityList(a),t.cityList=a,t.dialogCityList=t._changeCityList(Object(d.g)());case 7:case"end":return e.stop()}},e,t)}))()},_dealCityList:function(t){var e=this;t.map(function(t){t.childs.length>0?e._dealCityList(t.childs):delete t.childs})},_changeCityList:function(t){var e=[];return this.cityList.forEach(function(n){n.id===t&&e.push(n)}),e.length?e:this.cityList},_dealLevel:function(){var t=this;return l()(s.a.mark(function e(){var n,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.l)({level:Object(d.e)()});case 2:n=e.sent,a=n.data,t.daliList=a;case 5:case"end":return e.stop()}},e,t)}))()},init:function(){this._fetchOperatorList(),this._fetchCityList(),this._dealLevel()}}},f=(n("3TJE"),n("ZrdR")),h=Object(f.a)(p,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入运营商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),t.is_operator?n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("新增运营商")]):t._e()],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","max-height":"400","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"编号",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"运营商名称","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"联系人",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.contacts))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"联系电话",width:"140px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"代理商名称",align:"center",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.agent_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"活动价(元)",align:"center",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.price))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"所在地区","class-name":"status-col",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.address))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{disabled:t.compareId===e.row.id,type:"primary",size:"mini"},on:{click:function(n){t.handleEditOperator(e.row)}}},[t._v("修改")]),t._v(" "),n("el-button",{attrs:{disabled:t.compareId===e.row.id,size:"mini",type:"success"},on:{click:function(n){t.handleListTrans(e.row)}}},[t._v("转移")]),t._v(" "),n("el-button",{attrs:{disabled:t.compareId===e.row.id,size:"mini",type:"danger"},on:{click:function(n){t.handleDeleteOperator(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.handleClose}},[n("el-form",{attrs:{model:t.agentInfo,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"运营商名称"}},[n("el-input",{model:{value:t.agentInfo.name,callback:function(e){t.$set(t.agentInfo,"name",e)},expression:"agentInfo.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{model:{value:t.agentInfo.username,callback:function(e){t.$set(t.agentInfo,"username",e)},expression:"agentInfo.username"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"代理级别"}},[n("el-select",{attrs:{clearable:""},model:{value:t.agentInfo.agent_id,callback:function(e){t.$set(t.agentInfo,"agent_id",e)},expression:"agentInfo.agent_id"}},t._l(t.daliList,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"联系人"}},[n("el-input",{model:{value:t.agentInfo.contacts,callback:function(e){t.$set(t.agentInfo,"contacts",e)},expression:"agentInfo.contacts"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"联系电话"}},[n("el-input",{model:{value:t.agentInfo.phone,callback:function(e){t.$set(t.agentInfo,"phone",e)},expression:"agentInfo.phone"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动价"}},[n("el-input",{attrs:{type:"number",onkeypress:"return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57"},model:{value:t.agentInfo.price,callback:function(e){t.$set(t.agentInfo,"price",e)},expression:"agentInfo.price"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"所在区域"}},[n("el-cascader",{attrs:{options:t.dialogCityList,props:t.defaultProps,size:"medium","change-on-select":"","expand-trigger":"click"},on:{change:t.handleCityListChange},model:{value:t.agentInfo.selectArea,callback:function(e){t.$set(t.agentInfo,"selectArea",e)},expression:"agentInfo.selectArea"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.handleClose}},[t._v("取消")]),t._v(" "),"add"===t.dialotType?n("el-button",{attrs:{type:"primary"},on:{click:t.handleCreateAgent}},[t._v("保存")]):t._e(),t._v(" "),"edit"===t.dialotType?n("el-button",{attrs:{type:"primary"},on:{click:t.handleEditAgent}},[t._v("保存")]):t._e()],1)],1),t._v(" "),n("el-dialog",{staticClass:"transDialog",attrs:{"close-on-click-modal":!1,title:t.transTitle,visible:t.dialogTransVisible},on:{"update:visible":function(e){t.dialogTransVisible=e},close:t.handleTransClose}},[n("div",{staticClass:"clearfix"},[n("div",{staticStyle:{float:"left",width:"40%"}},[n("el-form",{attrs:{"label-position":"left"}},[n("el-form-item",{attrs:{label:"运营商编号","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.id))])]),t._v(" "),n("el-form-item",{attrs:{label:"运营商名称","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.name))])]),t._v(" "),n("el-form-item",{attrs:{label:"联系人","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.contacts))])]),t._v(" "),n("el-form-item",{attrs:{label:"联系电话","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.phone))])]),t._v(" "),n("el-form-item",{attrs:{label:"现代理商名称","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.agent_name))])]),t._v(" "),n("el-form-item",{attrs:{label:"活动价","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.price))])]),t._v(" "),n("el-form-item",{attrs:{label:"所在地区","label-width":"100px"}},[n("span",[t._v(t._s(t.rowInfo.address))])])],1)],1),t._v(" "),n("div",{staticStyle:{float:"left",width:"18%","margin-top":"16%"}},[n("div",[n("i",{staticClass:"el-icon-d-arrow-right",staticStyle:{"font-size":"36px",color:"#409EFF"}}),t._v(" "),n("p",{staticStyle:{color:"#409EFF"}},[t._v("转移")])])]),t._v(" "),n("div",{staticStyle:{float:"right",width:"40%","margin-top":"16%"}},[n("el-form",[n("el-form-item",{attrs:{label:"选择代理商","label-width":"100px"}},[n("el-select",{attrs:{clearable:""},model:{value:t.superAgentId,callback:function(e){t.superAgentId=e},expression:"superAgentId"}},t._l(t.supList,function(e){return e.level<5?n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}}):t._e()}))],1)],1)],1)]),t._v(" "),n("div",{staticClass:"button-area",staticStyle:{"text-align":"center"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.handleTransAgent}},[t._v("确定")])],1)])],1)},[],!1,null,null,null);h.options.__file="yunyinManage.vue";e.default=h.exports},jUE0:function(t,e,n){},uae9:function(t,e,n){}}]);