(window.webpackJsonp=window.webpackJsonp||[]).push([["XDht"],{XDht:function(e,t,n){"use strict";n.r(t);var a=n("P2sY"),l=n.n(a),i=n("14Xm"),r=n.n(i),o=n("D3Ub"),s=n.n(o),c=n("dYX8"),u={name:"UserManage",filters:{genderFilter:function(e){return{0:"女",1:"男"}[e]}},data:function(){return{list:null,listLoading:!1,roleList:null,dialogFormVisible:!1,dialogTitle:null,dialogType:null,admin_id:null,agentInfo:{name:null,phone:null,role_id:null,gender:null,username:null,password:null}}},created:function(){this.init()},methods:{handleCreate:function(){this.dialogTitle="新增员工",this.dialogFormVisible=!0,this.dialogType="create"},handleClose:function(){this._resetAgentInfo()},handleDeleteStaff:function(e){var t=this;this.$confirm("确认删除该员工？").then(function(){var n=s()(r.a.mark(function n(a){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(c.d)({admin_id:e.id});case 2:return n.next=4,t._fetchStaffList();case 4:case"end":return n.stop()}},n,t)}));return function(e){return n.apply(this,arguments)}}()).catch(function(e){})},handleUpdataStaff:function(e){this.dialogTitle="修改员工",this.dialogFormVisible=!0,this.dialogType="update";var t={name:e.name,phone:e.phone,role_id:e.role_id,gender:e.gender};this.agentInfo=t,this.admin_id=e.id},handleCreateStaff:function(){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("create"!==e.dialogType){t.next=5;break}return t.next=3,e._addStaff();case 3:t.next=8;break;case 5:if("update"!==e.dialogType){t.next=8;break}return t.next=8,e._editStaff(e.admin_id);case 8:return e._resetAgentInfo(),t.next=11,e._fetchStaffList();case 11:case"end":return t.stop()}},t,e)}))()},_resetAgentInfo:function(){this.agentInfo={name:null,phone:null,role_id:null,gender:null,username:null,password:null}},_editStaff:function(e){var t=this;return s()(r.a.mark(function n(){var a;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=l()({},t.agentInfo,{admin_id:e}),n.prev=1,n.next=4,Object(c.f)(a);case 4:n.sent,t.dialogFormVisible=!1,n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),t.dialogFormVisible=!1;case 11:case"end":return n.stop()}},n,t,[[1,8]])}))()},_addStaff:function(){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c.b)(e.agentInfo);case 3:t.sent,e.dialogFormVisible=!1,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.dialogFormVisible=!1;case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},_fetchStaffList:function(){var e=this;return s()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.prev=1,t.next=4,Object(c.i)();case 4:n=t.sent,a=n.data,e.list=a,e.listLoading=!1,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),e.listLoading=!1;case 13:case"end":return t.stop()}},t,e,[[1,10]])}))()},_fetchRoleList:function(){var e=this;return s()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.g)();case 2:n=t.sent,a=n.data,e.roleList=a;case 5:case"end":return t.stop()}},t,e)}))()},init:function(){this._fetchStaffList(),this._fetchRoleList()}}},f=n("KHd+"),d=Object(f.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("新增员工")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"手机号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.phone))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"员工姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("genderFilter")(t.row.gender)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"角色",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.role_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(n){e.handleUpdataStaff(t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleDeleteStaff(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.handleClose}},[n("el-form",{attrs:{model:e.agentInfo,"label-position":"right","label-width":"120px"}},[n("el-form-item",{attrs:{label:"员工姓名"}},[n("el-input",{model:{value:e.agentInfo.name,callback:function(t){e.$set(e.agentInfo,"name",t)},expression:"agentInfo.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"电话"}},[n("el-input",{model:{value:e.agentInfo.phone,callback:function(t){e.$set(e.agentInfo,"phone",t)},expression:"agentInfo.phone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"角色名称"}},[n("el-select",{attrs:{clearable:""},model:{value:e.agentInfo.role_id,callback:function(t){e.$set(e.agentInfo,"role_id",t)},expression:"agentInfo.role_id"}},e._l(e.roleList,function(t){return n("el-option",{key:t.id,attrs:{label:t.role_name,value:t.id,disabled:"create"===e.dialogType&&t.id<=6||"update"===e.dialogType&&t.disable_role}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"性别"}},[n("el-select",{attrs:{clearable:""},model:{value:e.agentInfo.gender,callback:function(t){e.$set(e.agentInfo,"gender",t)},expression:"agentInfo.gender"}},[n("el-option",{attrs:{label:"女",value:"0"}}),e._v(" "),n("el-option",{attrs:{label:"男",value:"1"}})],1)],1),e._v(" "),"create"===e.dialogType?n("el-form-item",{attrs:{label:"登录名"}},[n("el-input",{model:{value:e.agentInfo.username,callback:function(t){e.$set(e.agentInfo,"username",t)},expression:"agentInfo.username"}})],1):e._e(),e._v(" "),"create"===e.dialogType?n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{model:{value:e.agentInfo.password,callback:function(t){e.$set(e.agentInfo,"password",t)},expression:"agentInfo.password"}})],1):e._e()],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleCreateStaff}},[e._v("保存")])],1)],1)],1)},[],!1,null,null,null);d.options.__file="userManage.vue";t.default=d.exports}}]);