(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-76d5"],{JCNI:function(t,e,a){"use strict";a.d(e,"b",function(){return l}),a.d(e,"a",function(){return s}),a.d(e,"c",function(){return n});var i=a("t3Un");function l(t){return Object(i.a)({url:"/article/list",method:"get",params:t})}function s(t){return Object(i.a)({url:"/article/create",method:"post",data:t})}function n(t){return Object(i.a)({url:"/article/update",method:"post",data:t})}},Quqd:function(t,e,a){"use strict";a.r(e);var i=a("FyfS"),l=a.n(i),s=a("P2sY"),n=a.n(s),r=a("JCNI"),o=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],c={name:"AtivityRecord",directives:{waves:a("ZySA").a},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{page:1,limit:20,activity:void 0,businessName:void 0,activityName:void 0,status:void 0},activities:[{label:"团队-基础版",key:1},{label:"团队-精英版",key:2},{label:"个人-基础版",key:3},{label:"个人-基础版",key:4}],calendarTypeOptions:o,status:[{label:"待审批",key:"1"},{label:"准备中",key:"2"},{label:"进行中",key:"3"},{label:"暂停中",key:"4"},{label:"已完成",key:"5"},{label:"未通过",key:"6"}],statusOptions:["published","draft","deleted"],temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(r.b)(this.listQuery).then(function(e){t.list=e.data.items,t.total=e.data.total,setTimeout(function(){t.listLoading=!1},1500)})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(t.temp.id=parseInt(100*Math.random())+1024,t.temp.author="vue-element-admin",Object(r.a)(t.temp).then(function(){t.list.unshift(t.temp),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})}))})},handleUpdate:function(t){var e=this;this.temp=n()({},t),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var a=n()({},t.temp);a.timestamp=+new Date(a.timestamp),Object(r.c)(a).then(function(){var e=!0,a=!1,i=void 0;try{for(var s,n=l()(t.list);!(e=(s=n.next()).done);e=!0){var r=s.value;if(r.id===t.temp.id){var o=t.list.indexOf(r);t.list.splice(o,1,t.temp);break}}}catch(t){a=!0,i=t}finally{try{!e&&n.return&&n.return()}finally{if(a)throw i}}t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},handleDelete:function(t){this.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var e=this.list.indexOf(t);this.list.splice(e,1)}}},u=a("KHd+"),p=Object(u.a)(c,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入运营商名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.businessName,callback:function(e){t.$set(t.listQuery,"businessName",e)},expression:"listQuery.businessName"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入活动名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.activityName,callback:function(e){t.$set(t.listQuery,"activityName",e)},expression:"listQuery.activityName"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择活动类型",clearable:""},on:{change:t.handleFilter},model:{value:t.listQuery.activity,callback:function(e){t.$set(t.listQuery,"activity",e)},expression:"listQuery.activity"}},t._l(t.activities,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择活动状态"},on:{change:t.handleFilter},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},t._l(t.status,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("新增活动")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","min-height":"1000px"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"运营商",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.timestamp))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"活动名称","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"link-type"},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"游戏类型",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.author))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"开始时间",width:"80px"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(+e.row.importance,function(t){return a("svg-icon",{key:t,staticClass:"meta-item__icon",attrs:{"icon-class":"star"}})})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"结束时间",align:"center",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.pageviews?a("span",{staticClass:"link-type"},[t._v(t._s(e.row.pageviews))]):a("span",[t._v("0")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"队伍数量",align:"center",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.pageviews?a("span",{staticClass:"link-type"},[t._v(t._s(e.row.pageviews))]):a("span",[t._v("0")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"玩家数量","class-name":"status-col",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v(t._s(e.row.status))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v(t._s(t.$t("table.edit")))]),t._v(" "),"published"!=e.row.status?a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){t.handleModifyStatus(e.row,"published")}}},[t._v(t._s(t.$t("table.publish"))+"\n        ")]):t._e(),t._v(" "),"draft"!=e.row.status?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleModifyStatus(e.row,"draft")}}},[t._v(t._s(t.$t("table.draft"))+"\n        ")]):t._e(),t._v(" "),"deleted"!=e.row.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleModifyStatus(e.row,"deleted")}}},[t._v(t._s(t.$t("table.delete"))+"\n        ")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,total:t.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{attrs:{label:t.$t("table.type"),prop:"type"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"Please select"},model:{value:t.temp.type,callback:function(e){t.$set(t.temp,"type",e)},expression:"temp.type"}},t._l(t.calendarTypeOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("table.date"),prop:"timestamp"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"Please pick a date"},model:{value:t.temp.timestamp,callback:function(e){t.$set(t.temp,"timestamp",e)},expression:"temp.timestamp"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("table.title"),prop:"title"}},[a("el-input",{model:{value:t.temp.title,callback:function(e){t.$set(t.temp,"title",e)},expression:"temp.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("table.status")}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"Please select"},model:{value:t.temp.status,callback:function(e){t.$set(t.temp,"status",e)},expression:"temp.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("table.importance")}},[a("el-rate",{staticStyle:{"margin-top":"8px"},attrs:{colors:["#99A9BF","#F7BA2A","#FF9900"],max:3},model:{value:t.temp.importance,callback:function(e){t.$set(t.temp,"importance",e)},expression:"temp.importance"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("table.remark")}},[a("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"Please input"},model:{value:t.temp.remark,callback:function(e){t.$set(t.temp,"remark",e)},expression:"temp.remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v(t._s(t.$t("table.confirm")))]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v(t._s(t.$t("table.confirm")))])],1)],1)],1)},[],!1,null,null,null);p.options.__file="activityRecord.vue";e.default=p.exports},ZySA:function(t,e,a){"use strict";var i=a("P2sY"),l=a.n(i),s=(a("jUE0"),{bind:function(t,e){t.addEventListener("click",function(a){var i=l()({},e.value),s=l()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),n=s.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var r=n.getBoundingClientRect(),o=n.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",n.appendChild(o)),s.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(a.pageY-r.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(a.pageX-r.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=s.color,o.className="waves-ripple z-active",!1}},!1)}}),n=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(n)),s.install=n;e.a=s},jUE0:function(t,e,a){}}]);