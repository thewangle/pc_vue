(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-08fc"],{22:function(t,e){},23:function(t,e){},24:function(t,e){},TBtZ:function(t,e,i){"use strict";var n=i("ipaO");i.n(n).a},dqO4:function(t,e,i){t.exports=i.p+"static/img/hellp.6fec94b.jpg"},ipaO:function(t,e,i){},kyEp:function(t,e,i){"use strict";i.r(e);var n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hellpWrap1"},[e("img",{staticClass:"hellpImg",attrs:{src:i("dqO4"),alt:""}}),this._v(" "),e("span",{staticClass:"hellpB"},[this._v("使用帮助")])])}],a=i("cLjf"),s=i.n(a),l=i("hDQ3"),o=i.n(l),c=(i("f0Pt"),i("3rzS"),i("X4fA")),r=(i("a/LZ"),i("prnK")),u=i("AJLq"),d=i.n(u),p={name:"Dashboard",data:function(){return{dialogVisible11:!1,listLoading:!1,list:[],listQuery:{page_no:1,page_size:10,name:"",phone:"",role:Object(c.a)(),uid:Object(c.d)(),pid:Object(c.f)()},total:1,dialogVisible:!1,table_info:{}}},mounted:function(){this.handleFilter()},computed:{},methods:{tcclose:function(){this._fetchActivityList()},toExcle:function(){var t=d.a.utils.table_to_book(document.getElementById("out-table"));d.a.writeFile(t,"供应商列表.xlsx")},handleShowDetial:function(t){this.table_info=t,this.dialogVisible=!0},edituserinfo:function(){var t=this;if(!/^1[3456789]\d{9}$/.test(this.table_info.phone))return this.$message({message:"请您输入正确的手机号格式！",type:"warning"}),!1;Object(r.c)(this.table_info).then(function(e){t.dialogVisible=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t._fetchActivityList()}).catch(function(e){t.$message("编辑供应商信息失败!")})},copyTask:function(t){var e=this;this.$confirm("此操作将永久删除该供应商, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:t.id};Object(r.b)(i).then(function(t){e.$message({type:"success",message:t.data.message}),e._fetchActivityList()}).catch(function(t){e.$message("删除失败")})}).catch(function(){})},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchActivityList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchActivityList()},_fetchActivityList:function(){var t=this;return o()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.listLoading=!0,Object(r.e)(t.listQuery).then(function(e){var i=e.data;200==i.code&&(t.listLoading=!1,t.total=i.data.count,t.list=i.data.data),201==i.code&&(t.list=[],t.listLoading=!1,t.$message("没有更多供应商!"))}).catch(function(e){t.list=[],t.listLoading=!1,t.$message("获取供应商信息失败！")});case 2:case"end":return e.stop()}},e,t)}))()},handleFilter:function(){this.listQuery.page_no=1,this._fetchActivityList()},dialog_close:function(){this.table_info=""},dialogfee_close:function(){this.table_info="",console.log("this.years")}}},f=(i("TBtZ"),i("ZrdR")),_=Object(f.a)(p,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dashboard-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入供应商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入供应商手机号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.phone,callback:function(e){t.$set(t.listQuery,"phone",e)},expression:"listQuery.phone"}}),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.toExcle}},[t._v("导出")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"",stripe:"",id:"out-table","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"供应商名称",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"电话","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"供应商地址",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.address))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"联系人",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.contact))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"备注",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.remark))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"添加时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.addtime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.handleShowDetial(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.copyTask(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible,close:t.dialog_close,title:"供应商编辑"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.tcclose}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("供应商名称")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.name,callback:function(e){t.$set(t.table_info,"name",e)},expression:"table_info.name"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("电话")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.phone,callback:function(e){t.$set(t.table_info,"phone",e)},expression:"table_info.phone"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("供应商地址")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入供应商地址"},model:{value:t.table_info.address,callback:function(e){t.$set(t.table_info,"address",e)},expression:"table_info.address"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("联系人")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.contact,callback:function(e){t.$set(t.table_info,"contact",e)},expression:"table_info.contact"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("备注")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入供应商备注"},model:{value:t.table_info.remark,callback:function(e){t.$set(t.table_info,"remark",e)},expression:"table_info.remark"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.edituserinfo}},[t._v("确 定")])],1)]),t._v(" "),i("drawer",{attrs:{title:"供应商列表页 - 使用说明",visible:t.dialogVisible11,width:"500px","close-on-click-modal":""},on:{"update:visible":function(e){t.dialogVisible11=e}}},[i("div",{staticClass:"smWrap"},[i("div",{staticClass:"smB"},[t._v("概述：此页为供应商的展示与编辑页")]),t._v(" "),i("div",{staticClass:"smContent"},[i("span",{staticClass:"smContentB"},[t._v("列表：")]),t._v(" "),i("div",{staticClass:"smContentC"},[i("div",[t._v("1.展示账号下的所有供应商")]),t._v(" "),i("div",[t._v('2.点击"编辑"会弹出"供应商编辑"对话框，对该供应商进行编辑，点击"取消"取消编辑，点击"确定"提交编辑')]),t._v(" "),i("div",[t._v('3.点击"删除"会弹出"是否删除该供应商"提示框"取消"将不删除该供应商，"确定"会永久删除该供应商')])])]),t._v(" "),i("div",{staticClass:"smContent"},[i("span",{staticClass:"smContentB"},[t._v("备注：")]),t._v(" "),i("div",{staticClass:"smContentC"},[i("div",[t._v('"导出"功能，是导出当前商品列表里的内容，如果想多导出，可把列表每页显示调高（最高每页/50）')])])])])]),t._v(" "),i("div",{staticClass:"hellpWrap",staticStyle:{top:"100px"},on:{click:function(e){t.dialogVisible11=!0}}},[t._m(0)])],1)},n,!1,null,null,null);_.options.__file="supplierlist.vue";e.default=_.exports},prnK:function(t,e,i){"use strict";i.d(e,"a",function(){return s}),i.d(e,"e",function(){return l}),i.d(e,"d",function(){return o}),i.d(e,"c",function(){return c}),i.d(e,"b",function(){return r});var n=i("f0Pt"),a=i.n(n);function s(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/addsupplier",t)}function l(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/getsupplierinfo",t)}function o(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsupplierall",t)}function c(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/editesupplierinfo",t)}function r(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/deletesupplier",t)}}}]);