(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-72b0"],{"0xGk":function(t,e,i){"use strict";i.d(e,"a",function(){return l}),i.d(e,"d",function(){return o}),i.d(e,"e",function(){return s}),i.d(e,"f",function(){return r}),i.d(e,"c",function(){return c}),i.d(e,"b",function(){return u});var n=i("f0Pt"),a=i.n(n);function l(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/addsort",t)}function o(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getsortinfo",t)}function s(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getsortinfoall",t)}function r(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getsortinfoone",t)}function c(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/editsortinfo",t)}function u(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/deletesort",t)}},DP6j:function(t,e,i){"use strict";var n=i("EsH2");i.n(n).a},EsH2:function(t,e,i){},hLGN:function(t,e,i){"use strict";i.r(e);var n=i("cLjf"),a=i.n(n),l=i("hDQ3"),o=i.n(l),s=(i("f0Pt"),i("3rzS"),i("X4fA")),r=(i("a/LZ"),i("xA6U")),c=i("0xGk"),u=i("prnK"),d={name:"Dashboard",data:function(){return{isgz:!1,zcInprice:0,zcOutprice:0,ispricein:!0,ispriceout:!0,years:1,sorts:[],suppliers:[],listLoading:!1,list:[],listQuery:{page_no:1,page_size:10,name:"",code:"",sortid:"",supplierid:"",role:Object(s.a)(),uid:Object(s.d)(),pid:Object(s.f)()},total:1,dialogVisible:!1,dialogVisible1:!1,dialogVisible2:!1,dialogrenewalfee:!1,table_info:{},table_info1:{},table_info2:{},numtypes:[{value:1,label:"售出"},{value:2,label:"退货"},{value:3,label:"报损"},{value:4,label:"新入库"}],dates:[{value:1,label:"星期一"},{value:2,label:"星期二"},{value:3,label:"星期三"},{value:4,label:"星期四"},{value:5,label:"星期五"},{value:6,label:"星期六"},{value:7,label:"星期天"}],times:[{value:1,label:"1:00"},{value:2,label:"2:00"},{value:3,label:"3:00"},{value:4,label:"4:00"},{value:5,label:"5:00"},{value:6,label:"6:00"},{value:7,label:"7:00"},{value:8,label:"8:00"},{value:9,label:"9:00"},{value:10,label:"10:00"},{value:11,label:"11:00"},{value:12,label:"12:00"},{value:13,label:"13:00"},{value:14,label:"14:00"},{value:15,label:"15:00"},{value:16,label:"16:00"},{value:17,label:"17:00"},{value:18,label:"18:00"},{value:19,label:"19:00"},{value:20,label:"20:00"},{value:21,label:"21:00"},{value:22,label:"22:00"},{value:23,label:"23:00"},{value:24,label:"24:00"}],pricesortList:[{value:1,label:"进价"},{value:2,label:"售价"}]}},mounted:function(){this.handleFilter(),this.getsortinfoall(),this.getsupplierall(),3==Object(s.a)()&&(this.isgz=!0)},computed:{},methods:{pricesortSelect:function(t){1==t&&(this.ispricein=!1,this.ispriceout=!0,this.table_info1.outprice=this.zcOutprice),2==t&&(this.ispricein=!0,this.ispriceout=!1,this.table_info1.inprice=this.zcInprice)},getsortinfoall:function(){var t=this,e={role:Object(s.a)(),uid:Object(s.d)(),pid:Object(s.f)()};Object(c.e)(e).then(function(e){e.data.forEach(function(e){t.sorts.push({value:e.id,label:e.name})})}).catch(function(t){console.log(t)})},getsupplierall:function(){var t=this,e={role:Object(s.a)(),uid:Object(s.d)(),pid:Object(s.f)()};Object(u.d)(e).then(function(e){e.data.forEach(function(e){t.suppliers.push({value:e.id,label:e.name})})}).catch(function(t){console.log(t)})},handleShowDetial:function(t){this.table_info=t,this.dialogVisible=!0},handleShowprice:function(t){this.table_info1=t,this.zcInprice=t.inprice,this.zcOutprice=t.outprice,this.dialogVisible1=!0},handleShownums:function(t){this.table_info2=t,this.table_info2.inpricenow=t.inprice,this.table_info2.outpricenow=t.outprice,this.table_info2.changenums=1,this.dialogVisible2=!0},editegoodsinfo:function(){var t=this;if(""!=this.table_info.name&&""!=this.table_info.format&&""!=this.table_info.sortid&&""!=this.table_info.supplierid){var e=/^\+?[1-9][0-9]*$/;e.test(this.table_info.maxnums)&&e.test(this.table_info.minnums)?this.table_info.maxnums<this.table_info.minnums?this.$message({message:"库存上线不得小于库存下线",type:"warning"}):(this.table_info.type=0,Object(r.c)(this.table_info).then(function(e){t.dialogVisible=!1,t.$message({type:"success",message:e.data.message}),t.table_info="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您输入正确的数量",type:"warning"})}else this.$message({message:"请您填写完整信息",type:"warning"})},editegoodsinfo1:function(){var t=this;""!=this.table_info1.inprice&&""!=this.table_info1.outprice?this.table_info.outprice<this.table_info.inprice?this.$message({message:"售价不得小于进价",type:"warning"}):(this.table_info1.type=1,Object(r.c)(this.table_info1).then(function(e){t.dialogVisible1=!1,t.$message({type:"success",message:e.data.message}),t.table_info1="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您填写完整信息",type:"warning"})},editegoodsinfo2:function(){var t=this;""!=this.table_info2.changenums&&""!=this.table_info2.numtype&&""!=this.table_info2.date&&""!=this.table_info2.time&&""!=this.table_info2.inpricenow&&""!=this.table_info2.outpricenow?(console.log(this.table_info2),this.table_info2.type=2,Object(r.c)(this.table_info2).then(function(e){t.dialogVisible2=!1,t.$message({type:"success",message:e.data.message}),t.table_info2="",t._fetchActivityList()}).catch(function(e){t.$message("编辑商品失败!")})):this.$message({message:"请您填写完整信息",type:"warning"})},renewalfee:function(t){this.table_info=t,this.dialogrenewalfee=!0},copyTask:function(t){var e=this;this.$confirm("此操作将永久删除该账号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:t.id};Object(r.b)(i).then(function(t){e.$message({type:"success",message:t.data.message}),e._fetchActivityList()}).catch(function(t){e.$message("删除失败")})}).catch(function(){})},handleSizeChange:function(t){this.listQuery.page_size=t,this._fetchActivityList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._fetchActivityList()},_fetchActivityList:function(){var t=this;return o()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.listLoading=!0,Object(r.d)(t.listQuery).then(function(e){var i=e.data;200==i.code&&(t.listLoading=!1,t.total=i.data.count,t.list=i.data.data,""==t.list&&t.$message({type:"warning",message:"没有更多商品!"})),201==i.code&&(t.list=[],t.listLoading=!1,t.$message("没有更多商品!"))}).catch(function(e){t.list=[],t.listLoading=!1,t.$message("获取商品信息失败")});case 2:case"end":return e.stop()}},e,t)}))()},handleFilter:function(){this.listQuery.page_no=1,this._fetchActivityList()},dialog_close:function(){this.table_info=""},dialogfee_close:function(){this.table_info=""}}},f=(i("DP6j"),i("ZrdR")),p=Object(f.a)(d,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dashboard-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品编码"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.code,callback:function(e){t.$set(t.listQuery,"code",e)},expression:"listQuery.code"}}),t._v(" "),t.isgz?i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择分类",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.sortid,callback:function(e){t.$set(t.listQuery,"sortid",e)},expression:"listQuery.sortid"}},t._l(t.sorts,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})})):t._e(),t._v(" "),t.isgz?i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择供应商",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.supplierid,callback:function(e){t.$set(t.listQuery,"supplierid",e)},expression:"listQuery.supplierid"}},t._l(t.suppliers,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})})):t._e(),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","max-height":"400","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品名称",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品编码","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.code))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品规格",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.format))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品数量",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.nums))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品进价",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.inprice)+" 元")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"商品售价",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.outprice)+" 元")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"毛利率",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(((e.row.outprice-e.row.inprice)/e.row.inprice*100).toFixed(2))+" %")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"添加时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.addtime))])]}}])}),t._v(" "),t.isgz?i("el-table-column",{attrs:{label:"操作",align:"center",width:"500","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.handleShowDetial(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.handleShowprice(e.row)}}},[t._v("进/售价")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.handleShownums(e.row)}}},[t._v("出/入库")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.copyTask(e.row)}}},[t._v("删除")])]}}])}):t._e()],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible,close:t.dialog_close,title:"商品编辑"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品名称")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.name,callback:function(e){t.$set(t.table_info,"name",e)},expression:"table_info.name"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品编码")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.code,callback:function(e){t.$set(t.table_info,"code",e)},expression:"table_info.code"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品分类")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:t.table_info.sortid,callback:function(e){t.$set(t.table_info,"sortid",e)},expression:"table_info.sortid"}},t._l(t.sorts,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("供应商")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择供应商"},model:{value:t.table_info.supplierid,callback:function(e){t.$set(t.table_info,"supplierid",e)},expression:"table_info.supplierid"}},t._l(t.suppliers,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品规格")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.format,callback:function(e){t.$set(t.table_info,"format",e)},expression:"table_info.format"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("库存上线")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.maxnums,callback:function(e){t.$set(t.table_info,"maxnums",e)},expression:"table_info.maxnums"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("库存下线")]),t._v(" "),i("el-input",{attrs:{autocomplete:"off"},model:{value:t.table_info.minnums,callback:function(e){t.$set(t.table_info,"minnums",e)},expression:"table_info.minnums"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("会员描述")]),t._v(" "),i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入商品描述"},model:{value:t.table_info.remark,callback:function(e){t.$set(t.table_info,"remark",e)},expression:"table_info.remark"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible1,title:"进/售价更改"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("更改类别")]),t._v(" "),i("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择更改类别"},on:{change:t.pricesortSelect},model:{value:t.table_info1.pricesort,callback:function(e){t.$set(t.table_info1,"pricesort",e)},expression:"table_info1.pricesort"}},t._l(t.pricesortList,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品进价")]),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.ispricein,autocomplete:"off"},model:{value:t.table_info1.inprice,callback:function(e){t.$set(t.table_info1,"inprice",e)},expression:"table_info1.inprice"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品售价")]),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.ispriceout,autocomplete:"off"},model:{value:t.table_info1.outprice,callback:function(e){t.$set(t.table_info1,"outprice",e)},expression:"table_info1.outprice"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible1=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo1}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible2,title:"出入库更改"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[i("div",{staticClass:"dialog_div"},[i("span",[t._v("出入库类别")]),t._v(" "),i("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选出入库分类"},model:{value:t.table_info2.numtype,callback:function(e){t.$set(t.table_info2,"numtype",e)},expression:"table_info2.numtype"}},t._l(t.numtypes,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("增/减数量")]),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"off"},model:{value:t.table_info2.changenums,callback:function(e){t.$set(t.table_info2,"changenums",e)},expression:"table_info2.changenums"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("日期选择")]),t._v(" "),i("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择日期"},model:{value:t.table_info2.date,callback:function(e){t.$set(t.table_info2,"date",e)},expression:"table_info2.date"}},t._l(t.dates,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("时间选择")]),t._v(" "),i("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择时间"},model:{value:t.table_info2.time,callback:function(e){t.$set(t.table_info2,"time",e)},expression:"table_info2.time"}},t._l(t.times,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品进价")]),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"off"},model:{value:t.table_info2.inpricenow,callback:function(e){t.$set(t.table_info2,"inpricenow",e)},expression:"table_info2.inpricenow"}})],1),t._v(" "),i("div",{staticClass:"dialog_div"},[i("span",[t._v("商品售价")]),t._v(" "),i("el-input",{staticStyle:{width:"300px"},attrs:{autocomplete:"off"},model:{value:t.table_info2.outpricenow,callback:function(e){t.$set(t.table_info2,"outpricenow",e)},expression:"table_info2.outpricenow"}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible2=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.editegoodsinfo2}},[t._v("确 定")])],1)])],1)},[],!1,null,null,null);p.options.__file="goodslist.vue";e.default=p.exports},prnK:function(t,e,i){"use strict";i.d(e,"a",function(){return l}),i.d(e,"e",function(){return o}),i.d(e,"d",function(){return s}),i.d(e,"c",function(){return r}),i.d(e,"b",function(){return c});var n=i("f0Pt"),a=i.n(n);function l(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=supplier/addsupplier",t)}function o(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=supplier/getsupplierinfo",t)}function s(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getsupplierall",t)}function r(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=supplier/editesupplierinfo",t)}function c(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=supplier/deletesupplier",t)}},xA6U:function(t,e,i){"use strict";i.d(e,"a",function(){return l}),i.d(e,"d",function(){return o}),i.d(e,"e",function(){return s}),i.d(e,"g",function(){return r}),i.d(e,"f",function(){return c}),i.d(e,"c",function(){return u}),i.d(e,"b",function(){return d}),i.d(e,"k",function(){return f}),i.d(e,"j",function(){return p}),i.d(e,"h",function(){return b}),i.d(e,"l",function(){return _}),i.d(e,"i",function(){return v});var n=i("f0Pt"),a=i.n(n);function l(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/addgoods",t)}function o(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodsinfo",t)}function s(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodsinfolog",t)}function r(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodbygoodsid",t)}function c(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodsinfobyid",t)}function u(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/editegoodsinfo",t)}function d(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/deletgoods",t)}function f(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodsinfofortab1",t)}function p(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodschangefortab1",t)}function b(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getgoodschangequshi",t)}function _(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getpricechangequshi",t)}function v(t){return a.a.post("http://49.235.163.210/yii2/frontend/web/?r=goods/getpricechangequshisort",t)}}}]);