(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-684e"],{"0xGk":function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"d",function(){return s}),i.d(e,"e",function(){return l}),i.d(e,"f",function(){return r}),i.d(e,"c",function(){return u}),i.d(e,"b",function(){return c});var n=i("f0Pt"),o=i.n(n);function a(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/addsort",t)}function s(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfo",t)}function l(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoall",t)}function r(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoone",t)}function u(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/editsortinfo",t)}function c(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/deletesort",t)}},21:function(t,e){},22:function(t,e){},23:function(t,e){},"9OY2":function(t,e,i){},"LR/H":function(t,e,i){"use strict";i.r(e);var n=i("cLjf"),o=i.n(n),a=i("hDQ3"),s=i.n(a),l=(i("f0Pt"),i("3rzS"),i("X4fA")),r=(i("a/LZ"),i("xA6U")),u=i("0xGk"),c=i("prnK"),f=i("AJLq"),d=i.n(f),p={name:"Dashboard",data:function(){return{years:1,sorts:[],suppliers:[],listLoading:!1,list:[],listQuery:{numtype:"",page_no:1,page_size:10,name:"",code:"",sortid:"",supplierid:"",type:2,role:Object(l.a)(),uid:Object(l.d)(),pid:Object(l.f)()},numtypes:[{value:1,label:"售出"},{value:2,label:"退货"},{value:3,label:"报损"},{value:4,label:"新入库"}],total:1,dialogVisible:!1,dialogVisible1:!1,dialogVisible2:!1,dialogrenewalfee:!1,table_info:{},table_info1:{},table_info2:{}}},mounted:function(){this.handleFilter(),this.getsortinfoall(),this.getsupplierall()},computed:{},methods:{toExcle:function(){var t=d.a.utils.table_to_book(document.getElementById("out-table"));d.a.writeFile(t,"库存变动记录.xlsx")},getsortinfoall:function(){var t=this,e={role:Object(l.a)(),uid:Object(l.d)(),pid:Object(l.f)()};Object(u.e)(e).then(function(e){e.data.forEach(function(e){t.sorts.push({value:e.id,label:e.name})})}).catch(function(t){console.log(t)})},getsupplierall:function(){var t=this,e={role:Object(l.a)(),uid:Object(l.d)(),pid:Object(l.f)()};Object(c.d)(e).then(function(e){e.data.forEach(function(e){t.suppliers.push({value:e.id,label:e.name})})}).catch(function(t){console.log(t)})},handleShowDetial:function(t){this.table_info=t,this.dialogVisible=!0},handleShowprice:function(t){this.table_info1=t,this.dialogVisible1=!0},handleShownums:function(t){this.table_info2=t,this.dialogVisible2=!0},editegoodsinfo:function(){var t=this;if(""!=this.table_info.name&&""!=this.table_info.format&&""!=this.table_info.sortid&&""!=this.table_info.supplierid){var e=/^\+?[1-9][0-9]*$/;e.test(this.table_info.maxnums)&&e.test(this.table_info.minnums)?this.table_info.maxnums<this.table_info.minnums?this.$message({message:"库存上线不得小于库存下线",type:"warning"}):(this.table_info.type=0,Object(r.c)(this.table_info).then(function(e){t.dialogVisible=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您输入正确的数量",type:"warning"})}else this.$message({message:"请您填写完整信息",type:"warning"})},editegoodsinfo1:function(){var t=this;""!=this.table_info1.inprice&&""!=this.table_info1.outprice?this.table_info.outprice<this.table_info.inprice?this.$message({message:"售价不得小于进价",type:"warning"}):(this.table_info1.type=1,Object(r.c)(this.table_info1).then(function(e){t.dialogVisible1=!1,t.$message({type:"success",message:e.data.message}),t.table_info1="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您填写完整信息",type:"warning"})},editegoodsinfo2:function(){var t=this;""!=this.table_info2.nums?(this.table_info2.type=2,Object(r.c)(this.table_info2).then(function(e){t.dialogVisible2=!1,t.$message({type:"success",message:e.data.message}),t.table_info2="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您填写完整信息",type:"warning"})},renewalfee:function(t){this.table_info=t,this.dialogrenewalfee=!0},copyTask:function(t){var e=this;this.$confirm("此操作将永久删除该账号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:t.id};Object(r.b)(i).then(function(t){e.$message({type:"success",message:t.data.message}),e._fetchActivityList()}).catch(function(t){e.$message("删除失败")})}).catch(function(){})},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchActivityList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchActivityList()},_fetchActivityList:function(){var t=this;return s()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.listLoading=!0,Object(r.e)(t.listQuery).then(function(e){var i=e.data;200==i.code&&(t.listLoading=!1,t.total=i.data.count,i.data.data.forEach(function(t){1==t.numtype&&(t.numtype="售出"),2==t.numtype&&(t.numtype="退货"),3==t.numtype&&(t.numtype="报损"),4==t.numtype&&(t.numtype="新入库")}),t.list=i.data.data,""==t.list&&t.$message({type:"warning",message:"没有更多商品!"})),201==i.code&&(t.list=[],t.listLoading=!1,t.$message("没有更多商品!"))}).catch(function(e){t.list=[],t.listLoading=!1,t.$message("获取商品信息失败")});case 2:case"end":return e.stop()}},e,t)}))()},handleFilter:function(){this.listQuery.page_no=1,this._fetchActivityList()},dialog_close:function(){this.table_info="",console.log("11111")},dialogfee_close:function(){this.table_info=""}}},b=(i("Rqtf"),i("ZrdR")),_=Object(b.a)(p,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dashboard-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品编码"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.code,callback:function(e){t.$set(t.listQuery,"code",e)},expression:"listQuery.code"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择商品分类",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.sortid,callback:function(e){t.$set(t.listQuery,"sortid",e)},expression:"listQuery.sortid"}},t._l(t.sorts,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择供应商",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.supplierid,callback:function(e){t.$set(t.listQuery,"supplierid",e)},expression:"listQuery.supplierid"}},t._l(t.suppliers,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择出入库类别",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.numtype,callback:function(e){t.$set(t.listQuery,"numtype",e)},expression:"listQuery.numtype"}},t._l(t.numtypes,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.toExcle}},[t._v("导出")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"",id:"out-table","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品名称",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品编码","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.code))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品规格",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.format))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"原商品数量",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.numbefore))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"现商品数量",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.numnow))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"变动个数",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.numnow-e.row.numbefore))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"出入库类别",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.numtype))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品进价",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.priceinnow))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品售价",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.priceoutnow))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"更改时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.addtime))])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible,close:t.dialog_close,title:"商品编辑"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品名称")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.name,callback:function(e){t.$set(t.table_info,"name",e)},expression:"table_info.name"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品编码")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.code,callback:function(e){t.$set(t.table_info,"code",e)},expression:"table_info.code"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品分类")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:t.table_info.sortid,callback:function(e){t.$set(t.table_info,"sortid",e)},expression:"table_info.sortid"}},t._l(t.sorts,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("供应商")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择供应商"},model:{value:t.table_info.supplierid,callback:function(e){t.$set(t.table_info,"supplierid",e)},expression:"table_info.supplierid"}},t._l(t.suppliers,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品规格")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.format,callback:function(e){t.$set(t.table_info,"format",e)},expression:"table_info.format"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("库存上线")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.maxnums,callback:function(e){t.$set(t.table_info,"maxnums",e)},expression:"table_info.maxnums"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("库存下线")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.minnums,callback:function(e){t.$set(t.table_info,"minnums",e)},expression:"table_info.minnums"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("会员描述")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入商品描述"},model:{value:t.table_info.remark,callback:function(e){t.$set(t.table_info,"remark",e)},expression:"table_info.remark"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible1,title:"进/售价更改"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品进价")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info1.inprice,callback:function(e){t.$set(t.table_info1,"inprice",e)},expression:"table_info1.inprice"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品售价")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info1.outprice,callback:function(e){t.$set(t.table_info1,"outprice",e)},expression:"table_info1.outprice"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible1=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo1}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible2,title:"出入库更改"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品数量")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info2.nums,callback:function(e){t.$set(t.table_info2,"nums",e)},expression:"table_info2.nums"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible2=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo2}},[t._v("确 定")])],1)])],1)},[],!1,null,null,null);_.options.__file="numslog.vue";e.default=_.exports},Rqtf:function(t,e,i){"use strict";var n=i("9OY2");i.n(n).a},prnK:function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"e",function(){return s}),i.d(e,"d",function(){return l}),i.d(e,"c",function(){return r}),i.d(e,"b",function(){return u});var n=i("f0Pt"),o=i.n(n);function a(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/addsupplier",t)}function s(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/getsupplierinfo",t)}function l(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsupplierall",t)}function r(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/editesupplierinfo",t)}function u(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/deletesupplier",t)}},xA6U:function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"d",function(){return s}),i.d(e,"e",function(){return l}),i.d(e,"g",function(){return r}),i.d(e,"f",function(){return u}),i.d(e,"c",function(){return c}),i.d(e,"b",function(){return f}),i.d(e,"k",function(){return d}),i.d(e,"j",function(){return p}),i.d(e,"h",function(){return b}),i.d(e,"l",function(){return _}),i.d(e,"i",function(){return h});var n=i("f0Pt"),o=i.n(n);function a(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/addgoods",t)}function s(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodsinfo",t)}function l(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodsinfolog",t)}function r(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodbygoodsid",t)}function u(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodsinfobyid",t)}function c(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/editegoodsinfo",t)}function f(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/deletgoods",t)}function d(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodsinfofortab1",t)}function p(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodschangefortab1",t)}function b(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getgoodschangequshi",t)}function _(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getpricechangequshi",t)}function h(t){return o.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getpricechangequshisort",t)}}}]);