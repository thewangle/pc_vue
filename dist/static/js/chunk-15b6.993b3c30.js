(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-15b6"],{20:function(t,e){},21:function(t,e){},22:function(t,e){},"6iMN":function(t,e,n){"use strict";n.r(e);var i=n("cLjf"),a=n.n(i),l=n("hDQ3"),s=n.n(l),o=(n("f0Pt"),n("3rzS"),n("X4fA")),r=n("a/LZ"),c=n.n(r),u=n("gZTm"),d=n("AJLq"),f=n.n(d),p={name:"Dashboard",data:function(){return{years:1,listLoading:!1,list:[],listQuery:{page_no:1,page_size:10,name:"",phone:"",role:Object(o.a)(),userid:Object(o.d)(),userpartid:Object(o.f)()},total:1,dialogVisible:!1,dialogrenewalfee:!1,table_info:{}}},mounted:function(){this.handleFilter()},computed:{},methods:{toExcle:function(){var t=f.a.utils.table_to_book(document.getElementById("out-table"));f.a.writeFile(t,"会员列表.xlsx")},handleShowDetial:function(t){this.table_info=t,this.dialogVisible=!0},edituserinfo:function(){var t=this;if(!/^1[3456789]\d{9}$/.test(this.table_info.phone))return this.$message({message:"请您输入正确的手机号格式！",type:"warning"}),!1;Object(u.c)(this.table_info).then(function(e){t.dialogVisible=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t._fetchActivityList()}).catch(function(e){t.$message("编辑会员信息失败!")})},renewalfee:function(t){this.table_info=t,this.dialogrenewalfee=!0},renewalfeebt:function(){var t=this,e=c()(this.table_info.addtime).add("days",365*this.years).format("YYYY-MM-DD HH:mm:ss"),n={username:this.table_info.username,addtime:e};renewalFee(n).then(function(e){t.dialogrenewalfee=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t.years=1,t._fetchActivityList()}).catch(function(e){t.$message(e)})},copyTask:function(t){var e=this;this.$confirm("此操作将永久删除该账号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={id:t.id};Object(u.b)(n).then(function(t){e.$message({type:"success",message:t.data.message}),e._fetchActivityList()}).catch(function(t){e.$message("删除失败")})}).catch(function(){})},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchActivityList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchActivityList()},_fetchActivityList:function(){var t=this;return s()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.listLoading=!0,Object(u.d)(t.listQuery).then(function(e){var n=e.data;console.log(n),200==n.code&&(t.listLoading=!1,t.total=n.data.count,n.data.data.forEach(function(t,e){1==t.sex&&(t.sex="男"),2==t.sex&&(t.sex="女")}),t.list=n.data.data),201==n.code&&(t.list=[],t.listLoading=!1,t.$message("没有更多用户!"))}).catch(function(e){t.list=[],t.listLoading=!1,t.$message("获取用户信息失败")});case 2:case"end":return e.stop()}},e,t)}))()},handleFilter:function(){this.listQuery.page_no=1,this._fetchActivityList()},dialog_close:function(){this.table_info="",console.log("11111")},dialogfee_close:function(){this.table_info="",console.log("this.years")}}},_=(n("Wx7f"),n("ZrdR")),b=Object(_.a)(p,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入会员姓名"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入会员手机号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.phone,callback:function(e){t.$set(t.listQuery,"phone",e)},expression:"listQuery.phone"}}),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.toExcle}},[t._v("导出")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"",id:"out-table","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"会员姓名",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"电话","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"会员生日",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.birthday))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"年龄",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.age)+" 岁")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"会员性别",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.sex))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"会员描述",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.description))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"添加时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.addtime))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.handleShowDetial(e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.renewalfee(e.row)}}},[t._v("推送")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.copyTask(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisible,close:t.dialog_close,title:"账号编辑"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("div",{staticClass:"dialog_div"},[n("span",[t._v("会员姓名")]),t._v(" "),n("el-input",{attrs:{disabled:!0,autocomplete:"off"},model:{value:t.table_info.name,callback:function(e){t.$set(t.table_info,"name",e)},expression:"table_info.name"}})],1),t._v(" "),n("div",{staticClass:"dialog_div"},[n("span",[t._v("电话")]),t._v(" "),n("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.phone,callback:function(e){t.$set(t.table_info,"phone",e)},expression:"table_info.phone"}})],1),t._v(" "),n("div",{staticClass:"dialog_div"},[n("span",[t._v("会员生日")]),t._v(" "),n("el-input",{attrs:{disabled:!0,autocomplete:"off"},model:{value:t.table_info.birthday,callback:function(e){t.$set(t.table_info,"birthday",e)},expression:"table_info.birthday"}})],1),t._v(" "),n("div",{staticClass:"dialog_div"},[n("span",[t._v("会员性别")]),t._v(" "),n("el-input",{attrs:{disabled:!0,autocomplete:"off"},model:{value:t.table_info.sex,callback:function(e){t.$set(t.table_info,"sex",e)},expression:"table_info.sex"}})],1),t._v(" "),n("div",{staticClass:"dialog_div"},[n("span",[t._v("会员描述")]),t._v(" "),n("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.description,callback:function(e){t.$set(t.table_info,"description",e)},expression:"table_info.description"}})],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.edituserinfo}},[t._v("确 定")])],1)]),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogrenewalfee,close:t.dialogfee_close,title:"续费"},on:{"update:visible":function(e){t.dialogrenewalfee=e}}},[n("div",{staticClass:"dialog_div"},[n("span",{staticStyle:{width:"100px"}},[t._v("续费年限：")]),t._v(" "),n("div",{staticStyle:{width:"150px"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:t.years,callback:function(e){t.years=e},expression:"years"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"5px"}},[t._v("年")])]),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogrenewalfee=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.renewalfeebt}},[t._v("确 定")])],1)])],1)},[],!1,null,null,null);b.options.__file="memberlist.vue";e.default=b.exports},QCNC:function(t,e,n){},Wx7f:function(t,e,n){"use strict";var i=n("QCNC");n.n(i).a},gZTm:function(t,e,n){"use strict";n.d(e,"a",function(){return l}),n.d(e,"d",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"b",function(){return r});var i=n("f0Pt"),a=n.n(i);function l(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=member/addmember",t)}function s(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=member/getmemberinfo",t)}function o(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=member/editememberinfo",t)}function r(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=member/deletemember",t)}}}]);