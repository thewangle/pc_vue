(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0c5c"],{BMAJ:function(e,t,n){"use strict";n.r(t);var a=n("14Xm"),r=n.n(a),i=n("D3Ub"),s=n.n(i),o=n("dYX8"),c=n("X4fA"),l={name:"RoleManage",data:function(){return{roleList:[],role:"",menuList:[],allMenuList:[],checkedMenuList:[],roleName:"",title:"",id:"",addRoleVisible:!1,defaultProps:{children:"childs",label:"menu_name"}}},watch:{role:function(e){this.role=e,this._initMenuList()}},created:function(){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e._initRoleList();case 1:case"end":return t.stop()}},t,e)}))()},methods:{checkDisable:function(e){return e.id===Object(c.h)()},_getcheckedMenuIds:function(e){1==e[0].checked&&this.checkedMenuList.push(e[0].id);for(var t=0;t<e.length;t++)for(var n=0;n<e[t].childs.length;n++)for(var a=0;a<e[t].childs[n].childs.length;a++){console.log(e[t].childs[n].childs[a].checked);var r=e[t].childs[n].childs[a];1==r.checked&&this.checkedMenuList.push(r.id)}},_initRoleList:function(){var e=this;return s()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.i)();case 2:n=t.sent,a=n.data,e.roleList=a;case 5:case"end":return t.stop()}},t,e)}))()},_initMenuList:function(){var e=this;return s()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.j)({role_id:e.role});case 2:n=t.sent,a=n.data,e.menuList=a,e.checkedMenuList=[],e._getcheckedMenuIds(e.menuList);case 7:case"end":return t.stop()}},t,e)}))()},_addRole:function(){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.roleName){t.next=3;break}return e.$message({message:"角色名不能为空",type:"error"}),t.abrupt("return");case 3:if(console.log(e.id),!e.id){t.next=18;break}return t.prev=5,t.next=8,Object(o.g)({role_name:e.roleName,role_id:e.id});case 8:e.$message({message:"角色更新成功",type:"success"}),e._initRoleList(),e.handleClose(),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(5),e.handleClose();case 16:t.next=29;break;case 18:return t.prev=18,t.next=21,Object(o.a)({role_name:e.roleName});case 21:e.$message({message:"添加成功",type:"success"}),e._initRoleList(),e.handleClose(),t.next=29;break;case 26:t.prev=26,t.t1=t.catch(18),e.handleClose();case 29:case"end":return t.stop()}},t,e,[[5,13],[18,26]])}))()},_deleteRole:function(e){var t=this;return s()(r.a.mark(function n(){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.$confirm("确认删除该角色？").then(function(){var n=s()(r.a.mark(function n(a){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(o.e)({role_id:e});case 2:return n.next=4,t._initRoleList();case 4:case"end":return n.stop()}},n,t)}));return function(e){return n.apply(this,arguments)}}()).catch(function(e){});case 1:case"end":return n.stop()}},n,t)}))()},handleAddRoleVisible:function(){this.addRoleVisible=!0,this.title="新增角色"},handleAddRole:function(){this._addRole()},handleOpenRole:function(e){this.addRoleVisible=!0,this.title="更新角色",this.id=e.id,this.roleName=e.role_name},handleDeleteRole:function(e){this._deleteRole(e)},handleClose:function(){this.roleName="",this.addRoleVisible=!1,this.id=""},handleChangeRoleMenuList:function(){for(var e=this,t=this.$refs.menuTree.getCheckedNodes(!1,!0),n=[],a=0;a<t.length;a++)n.push(t[a].id);var i=n.join();this.$confirm("确认修改该角色权限吗").then(function(){var t=s()(r.a.mark(function t(n){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.o)({role_id:e.role,menu_ids:i});case 2:return t.next=4,e._initMenuList();case 4:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}()).catch(function(){var t=s()(r.a.mark(function t(n){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e._initMenuList();case 2:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())}}},d=(n("kVkq"),n("KHd+")),u=Object(d.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container documentation-container"},[n("el-row",[n("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[n("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[n("div",{attrs:{slot:"header"},slot:"header"},[n("span",[e._v("角色")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"50px"},attrs:{type:"primary"},on:{click:e.handleAddRoleVisible}},[e._v("新增角色")])],1),e._v(" "),n("div",{staticClass:"content"},e._l(e.roleList,function(t){return n("div",{key:t.id},[n("el-radio",{attrs:{label:t.id,disabled:e.checkDisable(t),border:"",width:"80px"},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}},[e._v(e._s(t.role_name))]),e._v(" "),n("div",{staticStyle:{float:"right"}},[n("el-button",{attrs:{type:"primary",round:""},on:{click:function(n){e.handleOpenRole(t)}}},[e._v("编辑角色")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger",round:""},on:{click:function(n){e.handleDeleteRole(t.id)}}},[e._v("删除角色")])],1)],1)}))])],1),e._v(" "),n("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[n("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[n("div",{attrs:{slot:"header"},slot:"header"},[n("span",[e._v("权限")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"50px"},attrs:{type:"primary"},on:{click:function(t){e.handleChangeRoleMenuList()}}},[e._v("修改权限")])],1),e._v(" "),n("div",{staticClass:"content"},[n("el-tree",{ref:"menuTree",attrs:{data:e.menuList,props:e.defaultProps,"default-checked-keys":e.checkedMenuList,"show-checkbox":"","node-key":"id"}})],1)])],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.addRoleVisible,title:e.title,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addRoleVisible=t},close:e.handleClose}},[n("el-form",[n("el-form-item",{attrs:{label:"角色名","label-width":"60px"}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:e.roleName,callback:function(t){e.roleName=t},expression:"roleName"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addRoleVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleAddRole}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"f82b938e",null);u.options.__file="roleManage.vue";t.default=u.exports},H2hq:function(e,t,n){},kVkq:function(e,t,n){"use strict";var a=n("H2hq");n.n(a).a}}]);