(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3fc5"],{"0xGk":function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"d",function(){return o}),i.d(e,"e",function(){return l}),i.d(e,"f",function(){return r}),i.d(e,"c",function(){return c}),i.d(e,"b",function(){return d});var s=i("f0Pt"),a=i.n(s);function n(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/addsort",t)}function o(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfo",t)}function l(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoall",t)}function r(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoone",t)}function c(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/editsortinfo",t)}function d(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/deletesort",t)}},22:function(t,e){},23:function(t,e){},24:function(t,e){},P6ME:function(t,e,i){"use strict";i.r(e);var s=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hellpWrap1"},[e("img",{staticClass:"hellpImg",attrs:{src:i("dqO4"),alt:""}}),this._v(" "),e("span",{staticClass:"hellpB"},[this._v("使用帮助")])])}],a=i("cLjf"),n=i.n(a),o=i("hDQ3"),l=i.n(o),r=(i("f0Pt"),i("3rzS"),i("X4fA")),c=(i("a/LZ"),i("0xGk")),d=i("AJLq"),u=i.n(d),f={name:"Dashboard",data:function(){return{dialogVisible1:!1,is_gz:!1,listLoading:!1,dialogaddsort:!1,sorts:{name:"",remark:"",role:Object(r.a)(),uid:Object(r.d)(),pid:Object(r.f)()},list:[],listQuery:{page_no:1,page_size:10,name:"",role:Object(r.a)(),uid:Object(r.d)(),pid:Object(r.f)()},total:1,dialogVisible:!1,table_info:{}}},mounted:function(){this.handleFilter(),3==Object(r.a)()&&(this.is_gz=!0)},computed:{},methods:{tcclose:function(){this._fetchActivityList()},toExcle:function(){var t=u.a.utils.table_to_book(document.getElementById("out-table"));u.a.writeFile(t,"分类列表.xlsx")},addsort:function(){this.dialogaddsort=!0},addsortsubmit:function(){var t=this;""!=this.sorts.name?Object(c.a)(this.sorts).then(function(e){200==e.data.code?(t.$message({message:"恭喜您！添加成功！",type:"success"}),t.dialogaddsort=!1,t._fetchActivityList()):(t.$message.error("对不起！添加失败！"),t.dialogaddsort=!1)}).catch(function(e){t.$message.error("对不起！添加失败！"),t.dialogaddsort=!1}):this.$message({message:"请您填写分类名称",type:"warning"})},handleShowDetial:function(t){this.table_info=t,this.dialogVisible=!0},editsortinfo:function(){var t=this;Object(c.c)(this.table_info).then(function(e){t.dialogVisible=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t._fetchActivityList()}).catch(function(e){t.$message("编辑分类信息失败!")})},copyTask:function(t){var e=this;this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:t.id};Object(c.b)(i).then(function(t){e.$message({type:"success",message:t.data.message}),e._fetchActivityList()}).catch(function(t){e.$message("删除失败")})}).catch(function(){})},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchActivityList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchActivityList()},_fetchActivityList:function(){var t=this;return l()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.listLoading=!0,Object(c.d)(t.listQuery).then(function(e){var i=e.data;200==i.code&&(t.listLoading=!1,t.total=i.data.count,t.list=i.data.data),201==i.code&&(t.list=[],t.listLoading=!1,t.$message("没有更多分类!"))}).catch(function(e){t.list=[],t.listLoading=!1,t.$message("获取分类信息失败！")});case 2:case"end":return e.stop()}},e,t)}))()},handleFilter:function(){this.listQuery.page_no=1,this._fetchActivityList()},dialog_close:function(){this.table_info=""},dialogfee_close:function(){this.table_info="",console.log("this.years")}}},v=(i("hnLj"),i("ZrdR")),_=Object(v.a)(f,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dashboard-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入分类名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),t.is_gz?i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.addsort}},[t._v("添加分类")]):t._e(),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.toExcle}},[t._v("导出")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"",stripe:"",id:"out-table","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"分类名称",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"备注","min-width":"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.remark))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"添加时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.addtime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.handleShowDetial(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.copyTask(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogaddsort,title:"添加分类"},on:{"update:visible":function(e){t.dialogaddsort=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("分类名称")]),t._v(" "),i("el-input",{attrs:{placeholder:"请输入分类名称",autocomplete:"off"},model:{value:t.sorts.name,callback:function(e){t.$set(t.sorts,"name",e)},expression:"sorts.name"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("备注")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入分类备注"},model:{value:t.sorts.remark,callback:function(e){t.$set(t.sorts,"remark",e)},expression:"sorts.remark"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogaddsort=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addsortsubmit}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible,close:t.dialog_close,title:"分类编辑"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.tcclose}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("分类名称")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.name,callback:function(e){t.$set(t.table_info,"name",e)},expression:"table_info.name"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("备注")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入供应商备注"},model:{value:t.table_info.remark,callback:function(e){t.$set(t.table_info,"remark",e)},expression:"table_info.remark"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editsortinfo}},[t._v("确 定")])],1)]),t._v(" "),i("drawer",{attrs:{title:"分类管理页 - 使用说明",visible:t.dialogVisible1,width:"500px","close-on-click-modal":""},on:{"update:visible":function(e){t.dialogVisible1=e}}},[i("div",{staticClass:"smWrap"},[i("div",{staticClass:"smB"},[t._v("概述：此页为分类的添加与编辑页")]),t._v(" "),i("div",{staticClass:"smContent"},[i("span",{staticClass:"smContentB"},[t._v("分类添加：")]),t._v(" "),i("div",{staticClass:"smContentC"},[i("div",[t._v('1.点击"添加分类"会弹出添加分类对话框')]),t._v(" "),i("div",[t._v('2."分类名称"为要添加分类的名称')]),t._v(" "),i("div",[t._v('3."备注"为要添加分类的备注描述')]),t._v(" "),i("div",[t._v('4.点击"取消"关闭对话框，不会添加分类')]),t._v(" "),i("div",[t._v('5.点击"确定"添加新分类')])])]),t._v(" "),i("div",{staticClass:"smContent"},[i("span",{staticClass:"smContentB"},[t._v("分类列表：")]),t._v(" "),i("div",{staticClass:"smContentC"},[i("div",[t._v("1.展示账号下的所有分类")]),t._v(" "),i("div",[t._v('2.点击"编辑"会弹出"分类编辑"对话框，对该分类进行编辑')]),t._v(" "),i("div",[t._v('3."分类编辑"时点击"取消"不会提交分类编辑并关闭对话框，点击"确定"提交该分类编辑')]),t._v(" "),i("div",[t._v('4.点击"删除"会弹出"是否删除该分类"提示框，"取消"将不删除该分类，"确定"会永久删除该分类')])])]),t._v(" "),i("div",{staticClass:"smContent"},[i("span",{staticClass:"smContentB"},[t._v("备注：")]),t._v(" "),i("div",{staticClass:"smContentC"},[i("div",[t._v('1."部门级别"账号只能编辑/删除分类，不能添加新分类')]),t._v(" "),i("div",[t._v('2."导出"功能，是导出当前商品列表里的内容，如果想多导出，可把列表每页显示调高（最高每页/50）')])])])])]),t._v(" "),i("div",{staticClass:"hellpWrap",staticStyle:{top:"100px"},on:{click:function(e){t.dialogVisible1=!0}}},[t._m(0)])],1)},s,!1,null,null,null);_.options.__file="sort.vue";e.default=_.exports},d9Su:function(t,e,i){},dqO4:function(t,e,i){t.exports=i.p+"static/img/hellp.6fec94b.jpg"},hnLj:function(t,e,i){"use strict";var s=i("d9Su");i.n(s).a}}]);