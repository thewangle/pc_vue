(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0d67"],{"2oTg":function(e,t,a){"use strict";a.r(t);var n=a("P2sY"),i=a.n(n),s=a("gDS+"),r=a.n(s),o=a("FyfS"),l=a.n(o),u=a("14Xm"),c=a.n(u),d=a("D3Ub"),p=a.n(d),f=a("EJiy"),m=a.n(f),h=a("GQeE"),g=a.n(h),k=a("zK94"),b=a("+vOl"),v=a("8SHQ"),_=a("vDqi"),w=a.n(_),y=a("XJYT"),I=a("X4fA"),x={name:"SubkectLib",filters:{typeFilter:function(e){return{1:"选择题",2:"文字题",3:"图片题",4:"视频题",5:"语音题",6:"拍照题"}[e]},answerTypeFilter:function(e){return{1:"普通题",2:"关卡题",3:"限时题",4:"抢答题"}[e]}},components:{quillEditor:a("lT11").quillEditor},data:function(){return{editorOption:{modules:{toolbar:[["bold","italic",{color:[]},"clean"]]}},jindu:0,is_progress:!1,files_size:"",total:0,listQuery:{page_no:1,page_size:10,name:null,type:null,answer_type:null},list:null,listLoading:!1,domain:"http://upload.qiniup.com/",qiniuAddress:v.a,dialogTaskVisible:!1,dialogTaskTitle:"",dialogTaskType:"",dialogMap:!1,taskInfo:{name:null,type:"1",desc:null,answer_type:"1",seq:null,question_img:null,options:{A:null,B:null,C:null,D:null},answer:[],answer2:"",answer_url:"",score:null,answer_limit:1,limit_time:0},taskQFileList:[],taskAFileList:[],dialogTaskImgVisible:!1,dialogTaskImageUrl:"",dialogAnswerImageUrl:"",dialogAnswerImgVisible:!1,nineImageUrl:"",dialogNineVisible:!1,searchLocation:""}},created:function(){this._fetchList()},computed:{optionsLength:function(){return g()(this.taskInfo.options).length},lastKey:function(){return g()(this.taskInfo.options)[this.optionsLength-1]}},methods:{handleConsole:function(e){return-1!==this.taskInfo.answer.indexOf(e)},handleAddNewLine:function(){if("Z"!==this.lastKey){console.log(m()(this.lastKey));var e=this.lastKey.charCodeAt();++e;var t=String.fromCharCode(e);this.$set(this.taskInfo.options,t,null)}else this.$message({message:"不能再增加选项啦~",type:"error"})},handleClickOption:function(e){1!==this.optionsLength?this.$delete(this.taskInfo.options,e):this.$message({message:"不能再删啦~"})},handleCheckBoxChange:function(e,t){if(!e||this.taskInfo.answer.indexOf(t)>=0||this.taskInfo.answer.push(t),!e&&this.taskInfo.answer.indexOf(t)>=0){var a=[];this.taskInfo.answer.forEach(function(e){e!==t&&a.push(e)}),this.taskInfo.answer=a}},handleOpenTenceMap:function(){var e=this;return p()(c.a.mark(function t(){var a,n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.dialogMap=!0,a=Object(I.d)(),n=e,e.$nextTick(function(){var e=new qq.maps.Map(document.getElementById("map-container")),t=new qq.maps.CityService,i=new qq.maps.Geocoder;a?i.getLocation(a):(t.setComplete(function(t){console.log(t),e.setCenter(t.detail.latLng),e.setZoom(13)}),t.searchLocalCity());var s=new qq.maps.Marker({map:e,content:"定位地点"});s.setVisible(!0),s.setAnimation(qq.maps.MarkerAnimation.DOWN),i.setComplete(function(t){e.setCenter(t.detail.location),e.setZoom(13),console.log(t);var a="";g()(t.detail.addressComponents).forEach(function(e){a+=t.detail.addressComponents[e]}),s.setTitle(a||t.detail.address),s.setPosition(t.detail.location)}),qq.maps.event.addListener(e,"click",function(e){var t=e.latLng.getLng(),a=e.latLng.getLat(),n=new qq.maps.LatLng(a,t);i.getAddress(n)}),qq.maps.event.addListener(s,"click",function(e){console.log(e),n.$alert(""+e.target.title,"定位地点")})});case 4:case"end":return t.stop()}},t,e)}))()},handleCurrentChange:function(e){this.listQuery.page_no=e,this._fetchList()},taskTypeChange:function(e){this.taskInfo.answer_type="1",this.taskInfo.answer_limit=1},answerTypeChange:function(e){"4"===e&&(this.taskInfo.answer_limit=1)},handleSizeChange:function(e){this.listQuery.page_size=e,this._fetchList()},handleFilter:function(){this.listQuery.page_no=1,this._fetchList()},handleAddTaskLib:function(){this.dialogTaskTitle="创建题目",this.dialogTaskType="add",this.dialogTaskVisible=!0,this.taskInfo.options={A:null,B:null,C:null,D:null}},handleRemove:function(e,t){this.taskAFileList=t},handleTaskImgPreview:function(){this.dialogTaskImageUrl=this.taskInfo.question_img,this.dialogTaskImgVisible=!0},handleAnswerImgPreview:function(){this.dialogAnswerImageUrl=this.taskInfo.answer_url,this.dialogAnswerImgVisible=!0},handleNineImgPreview:function(e){this.nineImageUrl=e.url,this.dialogNineVisible=!0},handleUpLoadTaksImg:function(e){this._uploadQiNiu(e,"task")},handleUpLoadAnswerImg:function(e){this._uploadQiNiu(e,"answer")},handleUpLoadNineImg:function(e){this._uploadQiNiu(e,"nine")},handleCloseTaskDialog:function(){this.dialogTaskVisible=!1,this._resetTaksForm(),this._fetchList(),this.jindu=0},handleDeleteTask:function(e){var t=this;this.$confirm("确认删除该题目？").then(function(){var a=p()(c.a.mark(function a(n){return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(k.n)(e);case 2:return a.next=4,t._fetchList();case 4:t.$message({message:"删除成功",type:"success"});case 5:case"end":return a.stop()}},a,t)}));return function(e){return a.apply(this,arguments)}}()).catch(function(e){})},handleFileChange:function(e){var t=this;this.is_progress=!0;var a=document.querySelector("#fileInput"),n=new FormData,i={headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){t.jindu=e.loaded/e.total*100|0,console.log(e.loaded/e.total*100|0)}};n.append("file",a.files[0]),w.a.post("/i/topteam/admin/importTaskLib",n,i).then(function(a){var n=a.data;0!==n.error_code?(t.$message({message:n.error_msg,type:"error"}),e.target.value=""):(t.$message({message:"导入成功",type:"success"}),e.target.value="",t._fetchList()),t.is_progress=!1,t.jindu=0})},canvasDataURL:function(e,t,a){var n=new Image;n.src=e,n.onload=function(){var e=this.width,n=this.height,i=e/n;e=t.width||e,n=t.height||e/i;var s=.7,r=document.createElement("canvas"),o=r.getContext("2d"),l=document.createAttribute("width");l.nodeValue=e;var u=document.createAttribute("height");u.nodeValue=n,r.setAttributeNode(l),r.setAttributeNode(u),o.drawImage(this,0,0,e,n),t.quality&&t.quality<=1&&t.quality>0&&(s=t.quality);var c=r.toDataURL("image/jpeg",s);a(c)}},photoCompress:function(e,t,a){var n=new FileReader;n.readAsDataURL(e);var i=this;n.onload=function(){var e=this.result;i.canvasDataURL(e,t,a)}},convertBase64UrlToBlob:function(e){for(var t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),i=n.length,s=new Uint8Array(i);i--;)s[i]=n.charCodeAt(i);return new Blob([s],{type:a})},handleImgChange:function(e){var t=this;return p()(c.a.mark(function a(){var n,i,s,o,u,d,p,f,m,h,k,b,v,_,I,x,T,L,C;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n={},i=document.querySelector("#ImgInput"),s=i.files.length,o={headers:{"Content-Type":"multipart/form-data"}},u=y.Loading.service({fullscreen:!0,text:"导入中"}),d=!0,p=!1,f=void 0,a.prev=8,m=l()(i.files);case 10:if(d=(h=m.next()).done){a.next=51;break}if(k=h.value,!(/image\/\w+/.test(k.type)&&k.size>1024e3)){a.next=17;break}return t.$message.error(k.name+" - 图片文件超过1M了，请调整后在进行导入!"),t.$nextTick(function(){u.close()}),e.target.value="",a.abrupt("return");case 17:return b=k.type.split("/")[1],v="top-team"+Date.now()+100*Math.random()+"."+b,a.next=21,t._fetchQiNiuToken();case 21:return _=a.sent,(I=new FormData).append("file",k),I.append("token",_),I.append("key",v),x=null,a.prev=27,a.next=30,w.a.post(t.domain,I,o);case 30:x=a.sent,a.next=38;break;case 33:a.prev=33,a.t0=a.catch(27),t.$nextTick(function(){u.close()}),e.target.value="",t.$message({message:"有图片上传失败，请重新上传全部图片",type:"error"});case 38:if(T=t.qiniuAddress+"/"+x.data.key,L=k.name.split(".")[0],n[L]=T,g()(n).length!==s){a.next=48;break}return a.next=44,w.a.post("/i/topteam/admin/MatchTaskLibPic",{match_list:r()(n)});case 44:(C=a.sent).data.error_code?t.$message({message:C.data.error_msg,type:"error"}):t.$message({message:"上传成功",type:"success"}),e.target.value="",t.$nextTick(function(){u.close()});case 48:d=!0,a.next=10;break;case 51:a.next=57;break;case 53:a.prev=53,a.t1=a.catch(8),p=!0,f=a.t1;case 57:a.prev=57,a.prev=58,!d&&m.return&&m.return();case 60:if(a.prev=60,!p){a.next=63;break}throw f;case 63:return a.finish(60);case 64:return a.finish(57);case 65:case"end":return a.stop()}},a,t,[[8,53,57,65],[27,33],[58,,60,64]])}))()},_uploadQiNiu:function(e,t){var a=this;return p()(c.a.mark(function n(){var i,s,r,o,l;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a.is_progress=!0,i={headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){a.jindu=e.loaded/e.total*100|0}},s="top-team"+Date.now()+Math.floor(100*Math.random())+e.file.name,n.next=5,a._fetchQiNiuToken();case 5:r=n.sent,(o=new FormData).append("token",r),o.append("key",s),l=a,e.file.size/1024>1025?a.photoCompress(e.file,{quality:.2},function(a){var n=l.convertBase64UrlToBlob(a);n.uid=e.file.uid,n.name=e.file.name,n.uid=e.file.uid,n.lastModified=e.file.lastModified,n.lastModifiedDate=e.file.lastModifiedDate,n.webkitRelativePath=e.file.webkitRelativePath,o.append("file",n),w.a.post("http://upload.qiniup.com/",o,i).then(function(e){var a=l.qiniuAddress+"/"+e.data.key;"task"===t&&(l.taskInfo.question_img=a),"answer"===t&&(l.taskInfo.answer_url=a),"nine"===t&&l.taskAFileList.push({name:e.data.key.slice(0,23),url:a}),l.is_progress=!1,l.jindu=0})}):(o.append("file",e.file),w.a.post(a.domain,o,i).then(function(e){var n=a.qiniuAddress+"/"+e.data.key;"task"===t&&(a.taskInfo.question_img=n),"answer"===t&&(a.taskInfo.answer_url=n),"nine"===t&&a.taskAFileList.push({name:e.data.key.slice(0,23),url:n}),a.is_progress=!1,a.jindu=0}));case 11:case"end":return n.stop()}},n,a)}))()},_resetTaksForm:function(){this.taskInfo={name:null,type:"1",desc:null,answer_type:"1",seq:null,question_img:null,options:{},answer:[],answer2:"",answer_url:"",score:null,answer_limit:1},this.taskQFileList=[],this.taskAFileList=[]},_fetchQiNiuToken:function(){var e=this;return p()(c.a.mark(function t(){var a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)();case 2:return a=e.sent,n=a.data,e.abrupt("return",n);case 5:case"end":return e.stop()}},t,e)}))()},_fetchList:function(){var e=this;return p()(c.a.mark(function t(){var a;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.next=3,Object(k.u)(e.listQuery);case 3:a=t.sent,e.total=a.data.total,e.list=a.data.list,e.listLoading=!1;case 7:case"end":return t.stop()}},t,e)}))()},handelCreateTaskSubmit:function(){var e=this;return p()(c.a.mark(function t(){var a,n,s,o,l,u;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.taskInfo,n=a.name,s=a.score,o=a.seq,n&&s&&o){t.next=4;break}return e.$message({message:"必填项不能为空",type:"error"}),t.abrupt("return");case 4:if((l=i()({},e.taskInfo)).answer=r()(l.answer),"1"!==l.type){t.next=15;break}if(u=!1,g()(l.options).forEach(function(e){l.options[e]||(u=!0)}),!u){t.next=12;break}return e.$message({message:"选项不能为空",type:"error"}),t.abrupt("return");case 12:if("[]"!==l.answer){t.next=15;break}return e.$message({message:"请填写答案",type:"error"}),t.abrupt("return");case 15:if("3"!==l.type){t.next=24;break}if(l.options=[],e.taskAFileList.forEach(function(e){l.options.push(e.url)}),!(l.options.length<9)){t.next=21;break}return e.$message({message:"请上传九张图片",type:"error"}),t.abrupt("return");case 21:if("[]"!==l.answer){t.next=24;break}return e.$message({message:"请填写答案",type:"error"}),t.abrupt("return");case 24:if(l.options=r()(l.options),"2"!==l.type){t.next=30;break}if(l.answer2){t.next=29;break}return e.$message({message:"答案不能为空",type:"error"}),t.abrupt("return");case 29:l.answer=l.answer2;case 30:if("4"!==l.type){t.next=35;break}if(l.answer_url){t.next=34;break}return e.$message({message:"请上传视频",type:"error"}),t.abrupt("return");case 34:l.answer=l.answer_url;case 35:if("5"!==l.type){t.next=40;break}if(l.answer_url){t.next=39;break}return e.$message({message:"请上传音频",type:"error"}),t.abrupt("return");case 39:l.answer=l.answer_url;case 40:if("6"!==l.type){t.next=45;break}if(l.answer_url){t.next=44;break}return e.$message({message:"请上传拍照图片",type:"error"}),t.abrupt("return");case 44:l.answer=l.answer_url;case 45:return t.prev=45,t.next=48,Object(k.e)(r()(l));case 48:t.sent,e.$message({message:"添加成功",type:"success"}),t.next=54;break;case 52:t.prev=52,t.t0=t.catch(45);case 54:e.dialogTaskVisible=!1;case 55:case"end":return t.stop()}},t,e,[[45,52]])}))()},handleUpdateTask:function(e){var t=this;this.dialogTaskType="edit",this.dialogTaskTitle="修改任务",this.dialogTaskVisible=!0,this.taskInfo.id=e.id,this.taskInfo.name=e.name,this.taskInfo.type=e.type,this.taskInfo.desc=e.task_desc,this.taskInfo.score=e.score,this.taskInfo.seq=e.seq,this.taskInfo.answer_limit=e.answer_limit||1,this.taskInfo.answer_type=e.answer_type,this.taskInfo.limit_time=e.limit_time||0,e.question_img&&(this.taskInfo.question_img=e.question_img,this.taskQFileList=[{name:e.name,url:e.question_img}]),"1"===e.type&&(this.taskInfo.answer=JSON.parse(e.answer),this.taskInfo.options=JSON.parse(e.options)),"2"===e.type&&(this.taskInfo.answer2=e.answer),"3"===e.type&&(this.taskAFileList=[],this.taskInfo.answer=JSON.parse(e.answer||"[]"),this.taskInfo.options=JSON.parse(e.options),this.taskInfo.options.forEach(function(e,a){t.taskAFileList.push({name:"图片"+(a+1),url:e})})),"4"!==e.type&&"5"!==e.type&&"6"!==e.type||(this.taskInfo.answer_url=e.answer,this.taskInfo.answer_url&&(this.taskAFileList=[{name:e.name,url:e.answer}]))},handelUpdateTaskSubmit:function(){var e=this;return p()(c.a.mark(function t(){var a,n,s,o,l,u,d;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.taskInfo,n=a.name,s=a.score,o=a.seq,l=a.answer_limit,n&&s&&o&&l){t.next=4;break}return e.$message({message:"必填项不能为空",type:"error"}),t.abrupt("return");case 4:if(u=i()({},e.taskInfo),Array.isArray(u.answer)&&(u.answer=r()(u.answer.sort())),"1"!==u.type){t.next=15;break}if(d=!1,g()(u.options).forEach(function(e){u.options[e]||(d=!0)}),!d){t.next=12;break}return e.$message({message:"选项不能为空",type:"error"}),t.abrupt("return");case 12:if("[]"!==u.answer){t.next=15;break}return e.$message({message:"请填写答案",type:"error"}),t.abrupt("return");case 15:if("3"!==u.type){t.next=25;break}if(u.options=[],e.taskAFileList.forEach(function(e){u.options.push(e.url)}),console.log(u.options),!(u.options.length<9)){t.next=22;break}return e.$message({message:"请上传九张图片",type:"error"}),t.abrupt("return");case 22:if("[]"!==u.answer){t.next=25;break}return e.$message({message:"请填写答案",type:"error"}),t.abrupt("return");case 25:if(u.options=r()(u.options),"2"!==u.type){t.next=31;break}if(u.answer2){t.next=30;break}return e.$message({message:"答案不能为空",type:"error"}),t.abrupt("return");case 30:u.answer=u.answer2;case 31:if("4"!==u.type){t.next=36;break}if(u.answer_url){t.next=35;break}return e.$message({message:"请上传视频",type:"error"}),t.abrupt("return");case 35:u.answer=u.answer_url;case 36:if("5"!==u.type){t.next=41;break}if(u.answer_url){t.next=40;break}return e.$message({message:"请上音频",type:"error"}),t.abrupt("return");case 40:u.answer=u.answer_url;case 41:if("6"!==u.type){t.next=46;break}if(u.answer_url){t.next=45;break}return e.$message({message:"请上传拍照图片",type:"error"}),t.abrupt("return");case 45:u.answer=u.answer_url;case 46:return t.prev=46,t.next=49,Object(k.J)(r()(u));case 49:t.sent,e.$message({message:"修改成功",type:"success"}),t.next=55;break;case 53:t.prev=53,t.t0=t.catch(46);case 55:e.dialogTaskVisible=!1;case 56:case"end":return t.stop()}},t,e,[[46,53]])}))()}}},T=(a("JKgV"),a("KHd+")),L=Object(T.a)(x,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入任务名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择任务类型",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.type,callback:function(t){e.$set(e.listQuery,"type",t)},expression:"listQuery.type"}},[a("el-option",{attrs:{label:"选择题",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"文字题",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"图片题",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"视频题",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"语音题",value:"5"}}),e._v(" "),a("el-option",{attrs:{label:"拍照题",value:"6"}})],1),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请选择答题类型",clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.answer_type,callback:function(t){e.$set(e.listQuery,"answer_type",t)},expression:"listQuery.answer_type"}},[a("el-option",{attrs:{label:"普通题",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"关卡题",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"团队限时题",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"活动抢答题",value:"4"}})],1),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查询")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleAddTaskLib}},[e._v("添加题目")]),e._v(" "),a("div",{staticClass:"filePicker",staticStyle:{float:"right"}},[a("label",[e._v("导入任务")]),e._v(" "),a("input",{attrs:{id:"fileInput",type:"file",name:"file",accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"},on:{change:e.handleFileChange}})]),e._v(" "),a("div",{staticClass:"filePicker",staticStyle:{float:"right","margin-right":"10px"}},[a("label",[e._v("导入图片")]),e._v(" "),a("input",{attrs:{id:"ImgInput",type:"file",name:"file",multiple:"",accept:"image/*,vedio/*,audio/*"},on:{change:e.handleImgChange}})])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.$index+(e.listQuery.page_no-1)*e.listQuery.page_size+1))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"题目标题",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"答案","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.answer))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"题目类型",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("typeFilter")(t.row.type)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"分值",align:"center",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.score))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"答题类型",align:"center",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("answerTypeFilter")(t.row.answer_type)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleUpdateTask(t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDeleteTask(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.page_no,"page-sizes":[10,20,30,50],"page-size":e.listQuery.page_size,total:e.total,background:"",layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{staticClass:"activityDialog",attrs:{"close-on-click-modal":!1,visible:e.dialogTaskVisible,title:e.dialogTaskTitle},on:{"update:visible":function(t){e.dialogTaskVisible=t},close:e.handleCloseTaskDialog}},[a("el-form",{staticClass:"demo-form-inline",attrs:{model:e.taskInfo}},[a("el-form-item",{attrs:{label:"题目标题","label-width":"100px"}},[a("el-input",{model:{value:e.taskInfo.name,callback:function(t){e.$set(e.taskInfo,"name",t)},expression:"taskInfo.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"题目类型","label-width":"100px"}},[a("el-select",{attrs:{disabled:"edit"===e.dialogTaskType},on:{change:e.taskTypeChange},model:{value:e.taskInfo.type,callback:function(t){e.$set(e.taskInfo,"type",t)},expression:"taskInfo.type"}},[a("el-option",{attrs:{label:"选择题",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"文字题",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"图片题",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"视频题",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"语音题",value:"5"}}),e._v(" "),a("el-option",{attrs:{label:"拍照题",value:"6"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"题目描述","label-width":"100px"}},[a("quill-editor",{ref:"myQuillEditor",attrs:{options:e.editorOption},model:{value:e.taskInfo.desc,callback:function(t){e.$set(e.taskInfo,"desc",t)},expression:"taskInfo.desc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"题目分值","label-width":"100px"}},[a("el-input",{attrs:{type:"number"},model:{value:e.taskInfo.score,callback:function(t){e.$set(e.taskInfo,"score",t)},expression:"taskInfo.score"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答题类型","label-width":"100px"}},[a("el-select",{attrs:{disabled:"edit"===e.dialogTaskType},on:{change:e.answerTypeChange},model:{value:e.taskInfo.answer_type,callback:function(t){e.$set(e.taskInfo,"answer_type",t)},expression:"taskInfo.answer_type"}},[a("el-option",{attrs:{label:"普通题",value:"1"}}),e._v(" "),"1"===e.taskInfo.type||"2"===e.taskInfo.type||"3"===e.taskInfo.type?a("el-option",{attrs:{label:"关卡题",value:"2"}}):e._e(),e._v(" "),"1"===e.taskInfo.type||"2"===e.taskInfo.type||"3"===e.taskInfo.type?a("el-option",{attrs:{label:"限时题",value:"3"}}):e._e(),e._v(" "),"1"===e.taskInfo.type||"2"===e.taskInfo.type||"3"===e.taskInfo.type?a("el-option",{attrs:{label:"抢答题",value:"4"}}):e._e()],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"题目顺序","label-width":"100px"}},[a("el-input",{attrs:{type:"number"},model:{value:e.taskInfo.seq,callback:function(t){e.$set(e.taskInfo,"seq",t)},expression:"taskInfo.seq"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"答题人数","label-width":"100px"}},[a("el-input",{attrs:{disabled:"4"===e.taskInfo.answer_type||"1"!==e.taskInfo.type&&"2"!==e.taskInfo.type&&"3"!==e.taskInfo.type,type:"number"},model:{value:e.taskInfo.answer_limit,callback:function(t){e.$set(e.taskInfo,"answer_limit",t)},expression:"taskInfo.answer_limit"}})],1),e._v(" "),"3"===e.taskInfo.answer_type?a("el-form-item",{attrs:{label:"答题时间","label-width":"100px"}},[a("el-input",{attrs:{type:"number"},model:{value:e.taskInfo.limit_time,callback:function(t){e.$set(e.taskInfo,"limit_time",t)},expression:"taskInfo.limit_time"}},[a("div",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("(秒)")])])],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"题目图片","label-width":"100px"}},[a("el-upload",{attrs:{"http-request":e.handleUpLoadTaksImg,"on-preview":e.handleTaskImgPreview,limit:1,action:e.domain,"file-list":e.taskQFileList,"list-type":"picture-card",accept:"image/jpeg,image/gif,image/png"}},[a("el-button",[e._v("上传图片")])],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogTaskImgVisible},on:{"update:visible":function(t){e.dialogTaskImgVisible=t}}},[a("img",{attrs:{src:e.dialogTaskImageUrl,width:"100%",alt:""}})])],1),e._v(" "),"1"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"题目选项","label-width":"100px"}},[e._l(e.taskInfo.options,function(t,n){return a("el-input",{key:n,attrs:{placeholder:"请输入选项内容"},model:{value:e.taskInfo.options[n],callback:function(t){e.$set(e.taskInfo.options,n,t)},expression:"taskInfo.options[index]"}},[a("template",{staticStyle:{width:"51px"},slot:"prepend"},[e._v(e._s(n))]),e._v(" "),a("template",{slot:"suffix"},[n===e.lastKey?a("el-button",{staticStyle:{"margin-top":"4px"},attrs:{size:"mini",type:"primary"},on:{click:function(t){e.handleClickOption(n)}}},[e._v("删除")]):e._e()],1),e._v(" "),a("template",{slot:"append"},[a("el-checkbox",{attrs:{checked:-1!==e.taskInfo.answer.indexOf(n)},on:{change:function(t){e.handleCheckBoxChange(t,n)}}},[e._v("是否为正确答案")])],1)],2)}),e._v(" "),a("el-button",{staticStyle:{"margin-top":"10px"},on:{click:e.handleAddNewLine}},[e._v("添加一行")])],2)]:e._e(),e._v(" "),"2"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"答案","label-width":"100px"}},[a("el-input",{model:{value:e.taskInfo.answer2,callback:function(t){e.$set(e.taskInfo,"answer2",t)},expression:"taskInfo.answer2"}})],1)]:e._e(),e._v(" "),"3"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"九宫格图片","label-width":"100px"}},[a("el-upload",{attrs:{"http-request":e.handleUpLoadNineImg,"on-preview":e.handleNineImgPreview,"on-remove":e.handleRemove,limit:9,action:e.domain,"file-list":e.taskAFileList,multiple:"","list-type":"picture",accept:"image/jpeg,image/gif,image/png"}},[a("el-button",[e._v("上传图片")])],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogNineVisible},on:{"update:visible":function(t){e.dialogNineVisible=t}}},[a("img",{attrs:{src:e.nineImageUrl,width:"100%",alt:""}})])],1),e._v(" "),a("el-form-item",{attrs:{label:"答案","label-width":"100px"}},[a("el-checkbox-group",{model:{value:e.taskInfo.answer,callback:function(t){e.$set(e.taskInfo,"answer",t)},expression:"taskInfo.answer"}},[a("el-checkbox",{attrs:{label:"1"}}),e._v(" "),a("el-checkbox",{attrs:{label:"2"}}),e._v(" "),a("el-checkbox",{attrs:{label:"3"}}),e._v(" "),a("el-checkbox",{attrs:{label:"4"}}),e._v(" "),a("el-checkbox",{attrs:{label:"5"}}),e._v(" "),a("el-checkbox",{attrs:{label:"6"}}),e._v(" "),a("el-checkbox",{attrs:{label:"7"}}),e._v(" "),a("el-checkbox",{attrs:{label:"8"}}),e._v(" "),a("el-checkbox",{attrs:{label:"9"}})],1)],1)]:e._e(),e._v(" "),"4"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"题目视频","label-width":"100px"}},[a("el-upload",{attrs:{"http-request":e.handleUpLoadAnswerImg,"on-preview":e.handleAnswerImgPreview,limit:1,action:e.domain,"file-list":e.taskAFileList,accept:"video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb"}},[a("el-button",[e._v("上传视频")])],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogAnswerImgVisible},on:{"update:visible":function(t){e.dialogAnswerImgVisible=t}}},[a("video",{attrs:{src:e.dialogAnswerImageUrl,controls:"",autoplay:"",width:"100%"}})])],1)]:e._e(),e._v(" "),"5"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"题目语音","label-width":"100px"}},[a("el-upload",{attrs:{"http-request":e.handleUpLoadAnswerImg,"on-preview":e.handleAnswerImgPreview,limit:1,action:e.domain,"file-list":e.taskAFileList,accept:"audio/*"}},[a("el-button",[e._v("上传音频")])],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogAnswerImgVisible},on:{"update:visible":function(t){e.dialogAnswerImgVisible=t}}},[a("video",{attrs:{src:e.dialogAnswerImageUrl,controls:"",autoplay:"",width:"100%"}})])],1)]:e._e(),e._v(" "),"6"===e.taskInfo.type?[a("el-form-item",{attrs:{label:"拍照图片","label-width":"100px"}},[a("el-upload",{attrs:{"http-request":e.handleUpLoadAnswerImg,"on-preview":e.handleAnswerImgPreview,limit:1,action:e.domain,"file-list":e.taskAFileList,"list-type":"picture-card",accept:"image/jpeg,image/gif,image/png"}},[a("el-button",[e._v("上传图片")])],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogAnswerImgVisible},on:{"update:visible":function(t){e.dialogAnswerImgVisible=t}}},[a("img",{attrs:{src:e.dialogAnswerImageUrl,width:"100%",alt:""}})])]:e._e(),e._v(" "),a("el-form-item",[a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:e.handleCloseTaskDialog}},[e._v("取消")]),e._v(" "),"add"===e.dialogTaskType?a("el-button",{attrs:{type:"primary"},on:{click:e.handelCreateTaskSubmit}},[e._v("添加题目")]):e._e(),e._v(" "),"edit"===e.dialogTaskType?a("el-button",{attrs:{type:"primary"},on:{click:e.handelUpdateTaskSubmit}},[e._v("修改题目")]):e._e()],1)])],2)],1),e._v(" "),a("el-dialog",{staticClass:"activityDialog",attrs:{"close-on-click-modal":!1,visible:e.dialogMap,title:"选择定位"},on:{"update:visible":function(t){e.dialogMap=t}}},[a("el-form",[a("el-form-item",{attrs:{label:"查询地址","label-width":"100"}},[a("el-input",{attrs:{value:e.searchLocation}})],1)],1),e._v(" "),a("div",{staticStyle:{width:"100%",height:"500px"},attrs:{id:"map-container"}})],1),e._v(" "),e.is_progress?a("div",{staticClass:"progress_wrap",attrs:{id:"progress"}},[a("div",{staticClass:"progress_wraps"},[a("div",{staticClass:"progress_bg"}),e._v(" "),a("div",{staticClass:"progress_content"},[a("el-progress",{attrs:{percentage:e.jindu,type:"circle"}})],1)])]):e._e()],1)},[],!1,null,null,null);L.options.__file="subjectLib.vue";t.default=L.exports},"8SHQ":function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n="http://cdnimg.bxunion.com"},JKgV:function(e,t,a){"use strict";var n=a("eE/V");a.n(n).a},"eE/V":function(e,t,a){},"gDS+":function(e,t,a){e.exports={default:a("oh+g"),__esModule:!0}},"oh+g":function(e,t,a){var n=a("WEpk"),i=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},zK94:function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"r",function(){return s}),a.d(t,"s",function(){return r}),a.d(t,"o",function(){return o}),a.d(t,"v",function(){return l}),a.d(t,"d",function(){return u}),a.d(t,"q",function(){return c}),a.d(t,"f",function(){return d}),a.d(t,"j",function(){return p}),a.d(t,"A",function(){return f}),a.d(t,"H",function(){return m}),a.d(t,"m",function(){return h}),a.d(t,"p",function(){return g}),a.d(t,"t",function(){return k}),a.d(t,"x",function(){return b}),a.d(t,"u",function(){return v}),a.d(t,"n",function(){return _}),a.d(t,"e",function(){return w}),a.d(t,"J",function(){return y}),a.d(t,"i",function(){return I}),a.d(t,"D",function(){return x}),a.d(t,"b",function(){return T}),a.d(t,"k",function(){return L}),a.d(t,"I",function(){return C}),a.d(t,"E",function(){return A}),a.d(t,"g",function(){return O}),a.d(t,"F",function(){return j}),a.d(t,"z",function(){return q}),a.d(t,"y",function(){return $}),a.d(t,"B",function(){return S}),a.d(t,"C",function(){return F}),a.d(t,"c",function(){return U}),a.d(t,"h",function(){return Q}),a.d(t,"G",function(){return V}),a.d(t,"w",function(){return N}),a.d(t,"l",function(){return D});var n=a("t3Un");function i(e){return Object(n.a)({url:"/i/topteam/admin/addactivity",method:"post",data:e})}function s(e){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:e})}function r(){return Object(n.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function o(e){return Object(n.a)({url:"/i/topteam/admin/delactivity?act_id="+e,method:"get"})}function l(e){return Object(n.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:e})}function u(e){return Object(n.a)({url:"i/topteam/admin/addTask",method:"post",data:e})}function c(e){return Object(n.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:e})}function d(e){return Object(n.a)({url:"/i/topteam/admin/auditact",method:"post",data:e})}function p(e){return Object(n.a)({url:"/i/topteam/api/createorder",method:"post",data:e})}function f(e){return Object(n.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:e})}function m(e){return Object(n.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:e})}function h(e){return Object(n.a)({url:"/i/topteam/admin/delTask?id="+e,method:"get"})}function g(e){return Object(n.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:e})}function k(e){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:e})}function b(e){return Object(n.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+e,method:"get"})}function v(e){return Object(n.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:e})}function _(e){return Object(n.a)({url:"/i/topteam/admin/delTaskLib?id="+e,method:"get"})}function w(e){return Object(n.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:e})}function y(e){return Object(n.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:e})}function I(e){return Object(n.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:e})}function x(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(n.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:e})}function T(e){return Object(n.a)({url:"/i/topteam/admin/addclassify",method:"post",data:e})}function L(e){return Object(n.a)({url:"/i/topteam/admin/delclassify",method:"post",data:e})}function C(e){return Object(n.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:e})}function A(e){return Object(n.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:e})}function O(e){return Object(n.a)({url:"/i/topteam/admin/cancelact?act_id="+e,method:"get"})}function j(e,t){return Object(n.a)({url:"/i/topteam/admin/MoveTask?id="+e+"&move_type="+t})}function q(e){return Object(n.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:e})}function $(e){return Object(n.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:e})}function S(e){return Object(n.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:e})}function F(e){return Object(n.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:e})}function U(e){return Object(n.a)({url:"/i/topteam/admin/addgame",method:"post",data:e})}function Q(e){return Object(n.a)({url:"/i/topteam/admin/updategame",method:"post",data:e})}function V(e){return Object(n.a)({url:"/i/topteam/admin/onsale",method:"post",data:e})}function N(e){return Object(n.a)({url:"/i/topteam/admin/getgamelist",method:"post",data:e})}function D(e){return Object(n.a)({url:"/i/topteam/admin/delgame",method:"post",data:e})}}}]);