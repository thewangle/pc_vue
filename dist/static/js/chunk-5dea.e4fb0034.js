(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5dea"],{"69Nf":function(t,e,i){var n=i("f4ri"),a=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}},dtWC:function(t,e,i){"use strict";i.r(e);var n=i("6ZY3"),a=i.n(n),l=i("omC7"),s=i.n(l),c=i("cLjf"),r=i.n(c),o=i("hDQ3"),d=i.n(o),u=i("dYX8"),h={name:"DictionaryInfo",data:function(){return{list:null,listLoading:!1,dialogTitle:"",dialogFormVisible:!1,dialogType:"",dialogEditTitle:"",dialogEditVisible:!1,dialogEditChildTitle:"",dialogEditChildVisible:!1,total:0,listQuery:{page_no:1,page_size:10},name:"",scence_name:"",tagList:[],editList:[],childEditList:[],selectItem:null,childSelectItem:null,id:null}},created:function(){this._getDictionaryList()},methods:{_getDictionaryList:function(){var t=this;return d()(r.a.mark(function e(){var i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.next=3,Object(u.n)(t.listQuery);case 3:i=e.sent,t.total=i.data.total,t.list=i.data.list,t.listLoading=!1;case 7:case"end":return e.stop()}},e,t)}))()},_getTagList:function(t){var e=this;return d()(r.a.mark(function i(){var n;return r.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,Object(u.m)(t);case 3:n=i.sent,e.tagList=n.data.list,i.next=10;break;case 7:i.prev=7,i.t0=i.catch(0),e.$message({message:"获取模板标签失败",type:"error"});case 10:case"end":return i.stop()}},i,e,[[0,7]])}))()},handleCreate:function(){var t=this;return d()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t._getTagList();case 2:t.dialogTitle="新增采集信息模板",t.dialogFormVisible=!0,t.dialogType="add";case 5:case"end":return e.stop()}},e,t)}))()},handleClose:function(){this.tagList=[],this.name="",this.scence_name="",this.id=null},handleCheckBoxChange:function(t,e){console.log(t),console.log(e),e.is_show=Number(t),console.log(e.is_show)},handleSelectChange:function(t,e){var i={};this.tagList.forEach(function(t){t.tag_name===e.children_name&&(i=t)}),e.editList.forEach(function(e){e.id===t&&(i.editList=e.child_value,i.arrValue=t)}),this.tagList=JSON.parse(s()(this.tagList))},handleSubmit:function(){var t=this;return d()(r.a.mark(function e(){var i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.name){e.next=3;break}return t.$message({message:"请输入模板名称",type:"error"}),e.abrupt("return");case 3:if(t.scence_name){e.next=6;break}return t.$message({message:"请输入应用场景",type:"error"}),e.abrupt("return");case 6:if(i=!1,t.tagList.forEach(function(t){Number(t.is_show)&&(i=!0)}),i){e.next=11;break}return t.$message({message:"请至少展示一个信息",type:"error"}),e.abrupt("return");case 11:if("add"!==t.dialogType||!i){e.next=14;break}return e.next=14,Object(u.c)({tag_list:t.tagList,template_name:t.name,scence_name:t.scence_name});case 14:if("edit"!==t.dialogType||!i){e.next=17;break}return e.next=17,Object(u.p)({tag_list:t.tagList,template_name:t.name,scence_name:t.scence_name,template_id:t.id});case 17:return t.dialogFormVisible=!1,t.handleClose(),e.next=21,t._getDictionaryList();case 21:case"end":return e.stop()}},e,t)}))()},handleOpenEditDialog:function(t){this.dialogEditVisible=!0,this.dialogEditTitle=t.tag_name+"编辑",this.selectItem=t,this.editList=this.selectItem.editList||[]},addNewLine:function(){var t={tag_name:this.selectItem.tag_name,childe_btn:this.selectItem.children_name,del_btn:"删除",value:null,child_value:null};if(this.editList.length){var e=this.editList[this.editList.length-1].id;t.id=++e}else t.id=1;this.editList.push(t)},handelDelEdit:function(t){this.editList=this.editList.filter(function(e){return!(e.id===t.id)})},handleEditChildBtn:function(t){var e=this;this.editList.forEach(function(i){i.id===t.id&&(e.childEditList=i.child_value||[])}),this.dialogEditChildTitle=t.childe_btn+"编辑",this.dialogEditChildVisible=!0,this.childSelectItem=t},handleEditSubmit:function(){var t=this;console.log("====>",this.selectItem),this.selectItem.editList=this.editList,this.tagList.forEach(function(e){t.selectItem.parent_id>0&&t.selectItem.parent_id===e.id&&e.editList.forEach(function(e){e.id===t.selectItem.arrValue&&(e.child_value=t.editList)})});var e=[];this.tagList.forEach(function(i){if(i.id===t.selectItem.id){var n=a()({},t.selectItem);e.push(n)}else e.push(i)}),this.tagList=e,this.dialogEditVisible=!1},handleEditChildSubmit:function(){this.childSelectItem.child_value=this.childEditList,this.dialogEditChildVisible=!1},handleEditClose:function(){this.editList=[],this.selectItem=null},handleEditChildClose:function(){},addNewChildLine:function(){console.log(this.childSelectItem);var t={tag_name:this.childSelectItem.childe_btn,childe_btn:this.childSelectItem.children_name,del_btn:"删除",value:null,child_value:null};if(this.childEditList.length){var e=this.childEditList[this.childEditList.length-1].id;t.id=++e}else t.id=1;this.childEditList.push(t)},handelDelChildEdit:function(t){this.childEditList=this.childEditList.filter(function(e){return!(e.id===t.id)})},handleSizeChange:function(t){this.listQuery.page_size=t,this._getDictionaryList()},handleCurrentChange:function(t){this.listQuery.page_no=t,this._getDictionaryList()},handleDelete:function(t){var e=this;this.$confirm("是否要删除此采集信息模板？").then(function(){var i=d()(r.a.mark(function i(n){return r.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Object(u.d)(t.id);case 2:return e.$message({message:"删除成功",type:"success"}),i.next=5,e._getDictionaryList();case 5:case"end":return i.stop()}},i,e)}));return function(t){return i.apply(this,arguments)}}()).catch(function(){var t=d()(r.a.mark(function t(i){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e._getDictionaryList();case 2:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())},handleEditTpl:function(t){var e=this;return d()(r.a.mark(function i(){return r.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,e._getTagList(t.id);case 2:e.id=t.id,e.name=t.name,e.scence_name=t.scence_name,e.dialogTitle="修改采集信息模板",e.dialogFormVisible=!0,e.dialogType="edit";case 8:case"end":return i.stop()}},i,e)}))()}}},m=i("ZrdR"),g=Object(m.a)(h,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("新增信息模板")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"采集信息模板名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"应用场景",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.scence_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(i){t.handleEditTpl(e.row)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":t.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.handleClose}},[i("el-form",{attrs:{"label-position":"right","label-width":"140px"}},[i("el-form-item",{attrs:{label:"采集信息模板名称"}},[i("el-input",{attrs:{maxlength:"10"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"应用场景"}},[i("el-input",{attrs:{maxlength:"15"},model:{value:t.scence_name,callback:function(e){t.scence_name=e},expression:"scence_name"}})],1),t._v(" "),t._l(t.tagList,function(e){return i("el-form-item",{key:e.id,attrs:{label:e.tag_name}},["1"===e.show_type?i("div",[i("el-input",{staticStyle:{width:"200px"},attrs:{disabled:""}}),t._v(" "),i("el-checkbox",{attrs:{checked:"1"===e.is_show},on:{change:function(i){t.handleCheckBoxChange(i,e)}}},[t._v("是否展示")])],1):t._e(),t._v(" "),"2"===e.show_type?i("div",[i("el-select",{attrs:{placeholder:"全部"},on:{change:function(i){t.handleSelectChange(i,e)}},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"item.value"}},t._l(e.editList,function(t){return i("el-option",{key:t.id,attrs:{label:t.value,value:t.id}})})),t._v(" "),"人员所属"!==e.tag_name?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleOpenEditDialog(e)}}},[t._v("编辑")]):t._e(),t._v(" "),i("el-checkbox",{attrs:{checked:"1"===e.is_show},on:{change:function(i){t.handleCheckBoxChange(i,e)}}},[t._v("是否展示")])],1):t._e()])})],2),t._v(" "),i("div",{staticStyle:{textAlign:"center"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialogEditTitle,visible:t.dialogEditVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogEditVisible=e},close:t.handleEditClose}},[i("el-form",{attrs:{"label-position":"right","label-width":"140px"}},[t._l(t.editList,function(e){return i("el-form-item",{key:e.id,attrs:{label:e.tag_name}},[i("el-input",{staticStyle:{width:"200px"},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"item.value"}}),t._v(" "),e.childe_btn?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.handleEditChildBtn(e)}}},[t._v(t._s(e.childe_btn))]):t._e(),t._v(" "),i("el-button",{attrs:{type:"warnning"},on:{click:function(i){t.handelDelEdit(e)}}},[t._v(t._s(e.del_btn))])],1)}),t._v(" "),i("el-form-item",[i("el-button",{on:{click:function(e){t.addNewLine(t.editList)}}},[t._v("新增一行")])],1)],2),t._v(" "),i("div",{staticStyle:{textAlign:"center"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleEditSubmit}},[t._v("保存")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialogEditChildTitle,visible:t.dialogEditChildVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogEditChildVisible=e},close:t.handleEditChildClose}},[i("el-form",{attrs:{"label-position":"right","label-width":"140px"}},[t._l(t.childEditList,function(e){return i("el-form-item",{key:e.id,attrs:{label:e.tag_name}},[i("el-input",{staticStyle:{width:"200px"},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"item.value"}}),t._v(" "),e.childe_btn?i("el-button",{attrs:{type:"primary"}},[t._v(t._s(e.childe_btn))]):t._e(),t._v(" "),i("el-button",{attrs:{type:"warnning"},on:{click:function(i){t.handelDelChildEdit(e)}}},[t._v(t._s(e.del_btn))])],1)}),t._v(" "),i("el-form-item",[i("el-button",{on:{click:t.addNewChildLine}},[t._v("新增一行")])],1)],2),t._v(" "),i("div",{staticStyle:{textAlign:"center"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleEditChildSubmit}},[t._v("保存")])],1)],1)],1)},[],!1,null,null,null);g.options.__file="dictionaryInfo.vue";e.default=g.exports},omC7:function(t,e,i){t.exports={default:i("69Nf"),__esModule:!0}}}]);