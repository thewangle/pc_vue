(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8153"],{"6e/s":function(t,e,n){"use strict";var i=n("R0FC");n.n(i).a},HDHf:function(t,e,n){"use strict";n.d(e,"e",function(){return a}),n.d(e,"f",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return u}),n.d(e,"a",function(){return l}),n.d(e,"b",function(){return c}),n.d(e,"g",function(){return d}),n.d(e,"h",function(){return f}),n.d(e,"l",function(){return g}),n.d(e,"m",function(){return m}),n.d(e,"k",function(){return p}),n.d(e,"i",function(){return b}),n.d(e,"j",function(){return h}),n.d(e,"n",function(){return v}),n.d(e,"o",function(){return y}),n.d(e,"p",function(){return _}),n.d(e,"q",function(){return z});var i=n("f0Pt"),r=n.n(i);function a(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getsoldgoods",t)}function s(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getsoldgoodsbygroup",t)}function o(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getreturngoods",t)}function u(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getreturngoodsbygroup",t)}function l(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getlossgoods",t)}function c(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getlossgoodsbygroup",t)}function d(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getstoragegoods",t)}function f(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getstoragegoodsbygroup",t)}function g(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getsoldgoodsinfo",t)}function m(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getstoragegoodsinfo",t)}function p(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getreturngoodsinfo",t)}function b(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getlossgoodsinfo",t)}function h(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=member/getmembers",t)}function v(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getunsalablegoods",t)}function y(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getunsalablegoodsinfo",t)}function _(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getunsalablegoodsinfoforzb",t)}function z(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=report/getunsalablegoodslist",t)}},R0FC:function(t,e,n){},iVKg:function(t,e,n){"use strict";n.d(e,"l",function(){return a}),n.d(e,"k",function(){return s}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u}),n.d(e,"c",function(){return l}),n.d(e,"m",function(){return c}),n.d(e,"f",function(){return d}),n.d(e,"g",function(){return f}),n.d(e,"h",function(){return g}),n.d(e,"i",function(){return m}),n.d(e,"d",function(){return p}),n.d(e,"e",function(){return b}),n.d(e,"j",function(){return h});var i=n("f0Pt"),r=n.n(i);function a(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/login",t)}function s(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getuserinfo",t)}function o(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/adduser",t)}function u(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/deleuser",t)}function l(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/editeuser",t)}function c(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/renewalfee",t)}function d(t){return r.a.get("http://49.235.163.210/yii2/frontend/web/?r=login/getallusers")}function f(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyid",t)}function g(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyidmain",t)}function m(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyidthis",t)}function p(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getalluser",t)}function b(t){return r.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getalluserbyuid",t)}function h(t){return r.a.get("https://geo.datav.aliyun.com/areas/bound/370000_full.json")}},moDB:function(t,e,n){"use strict";n.r(e);var i=n("cLjf"),r=n.n(i),a=n("hDQ3"),s=n.n(a),o=n("3rzS"),u=n.n(o),l=n("88Rz"),c=n.n(l),d=(n("f0Pt"),n("a/LZ"),n("X4fA")),f=n("iVKg"),g=n("HDHf"),m={name:"DashboardAdmin",components:{},data:function(){return{tab2name:Object(d.e)(),series_data:[],series_data_change:[],changeQushixAxis:[],changeQushiseries:[],listQuery2:{bm:"",gz:"",role:Object(d.a)(),uid:Object(d.d)(),pid:Object(d.f)()},tab1info:{zongnums:0,boynums:0,girlnums:0},bms:[],gzs:[],bodyMax:0,itemnums:[],itemnames:["男","女"],itemnames1:["0岁 - 3岁","4岁 - 6岁","7岁 - 12岁","13岁 - 15岁","16岁 - 19岁","20岁 - 25岁","26岁 - 35岁","36岁 - 45岁","46岁以上"],itemnums1:[{value:0,name:"0岁 - 3岁"},{value:0,name:"4岁 - 6岁"},{value:0,name:"7岁 - 12岁"},{value:0,name:"13岁 - 15岁"},{value:0,name:"16岁 - 19岁"},{value:0,name:"20岁 - 25岁"},{value:0,name:"26岁 - 35岁"},{value:0,name:"36岁 - 45岁"},{value:0,name:"46岁以上"}],is_bm:!1,is_zzh:!1,is_gz:!1}},computed:{},mounted:function(){this.handleFilter2(),3!=Object(d.a)()&&this.getAllUserByidthis(),1==Object(d.a)()?(this.is_zzh=!0,this.is_bm=!1,this.is_gz=!1):2==Object(d.a)()?(this.is_zzh=!1,this.is_bm=!0,this.is_gz=!1):3==Object(d.a)()&&(this.is_zzh=!1,this.is_bm=!1,this.is_gz=!0)},created:function(){},methods:{zeOver:function(){u()("#zonge").toggleClass("animated wobble"),setTimeout(function(){u()("#zonge").removeClass("animated wobble")},1e3)},zeOver1:function(){u()("#zonge1").toggleClass("animated rubberBand"),setTimeout(function(){u()("#zonge1").removeClass("animated rubberBand")},1e3)},zeOver2:function(){u()("#zonge2").toggleClass("animated shake"),setTimeout(function(){u()("#zonge2").removeClass("animated shake")},1e3)},zeOver3:function(){u()("#zonge3").toggleClass("animated rubberBand"),setTimeout(function(){u()("#zonge3").removeClass("animated rubberBand")},1e3)},zeOver4:function(){u()("#zonge4").toggleClass("animated shake"),setTimeout(function(){u()("#zonge4").removeClass("animated shake")},1e3)},getAllUserByidthis:function(){var t=this;Object(f.i)(this.listQuery2).then(function(e){e.data.forEach(function(e){1==Object(d.a)()&&t.bms.push({label:e.department,value:e.id}),2==Object(d.a)()&&t.gzs.push({label:e.department,value:e.id})})}).catch(function(t){console.log(t)})},handleFilter2:function(t){var e=this;1==t&&(""==this.listQuery2.bm?this.tab2name=Object(d.e)():Object(f.e)({uid:this.listQuery2.bm}).then(function(t){var n=t.data;e.tab2name=n.department})),2==t&&(""==this.listQuery2.gz?this.tab2name=Object(d.e)():Object(f.e)({uid:this.listQuery2.gz}).then(function(t){var n=t.data;e.tab2name=n.department})),this._fetchActivityList2()},_fetchActivityList2:function(){var t=this;return s()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t._fetchreturnGoodsByGroup();case 1:case"end":return e.stop()}},e,t)}))()},_fetchreturnGoodsByGroup:function(){var t=this;return s()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.itemnums=[],t.itemnames=[],t.itemnums1.forEach(function(t){t.value=0}),Object(g.j)(t.listQuery2).then(function(e){var n=e.data;if(201==n.code)t.$message({message:"没有更多新入库信息！",type:"warning",duration:5e3});else{t.tab1info=n.data.listdata;var i=0,r=0;n.data.leftdata.forEach(function(e){1==e.sex&&(i+=1),2==e.sex&&(r+=1),e.age>=0&&e.age<=3&&(t.itemnums1[0].value+=1),e.age>=4&&e.age<=6&&(t.itemnums1[1].value+=1),e.age>=7&&e.age<=12&&(t.itemnums1[2].value+=1),e.age>=13&&e.age<=15&&(t.itemnums1[3].value+=1),e.age>=16&&e.age<=19&&(t.itemnums1[4].value+=1),e.age>=20&&e.age<=25&&(t.itemnums1[5].value+=1),e.age>=26&&e.age<=35&&(t.itemnums1[6].value+=1),e.age>=36&&e.age<=45&&(t.itemnums1[7].value+=1),e.age>=46&&(t.itemnums1[8].value+=1)}),t.itemnums=[{value:i,name:"男"},{value:r,name:"女"}],t.itemnames=["男","女"];var a=t;setTimeout(function(){a.pie_change_qushi(),a.zbChart()},800)}}).catch(function(t){console.log(t)});case 4:case"end":return e.stop()}},e,t)}))()},pie_change_qushi:function(){var t=c.a.init(this.$refs.pie_change_qushi),e={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} 个 ({d}%)"},legend:{top:95,left:55,itemGap:20,formatter:function(t){return t},orient:"vertical",data:this.itemnames},series:[{name:"会员男女占比",type:"pie",radius:"80%",roseType:"angle",center:["50%","50%"],label:{formatter:"{b}: {d}%"},data:this.itemnums}]};t.clear(),t.setOption(e),window.addEventListener("resize",function(){t.resize()})},zbChart:function(){var t=c.a.init(this.$refs.zbChart),e={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} 个 ({d}%)"},legend:{left:55,itemGap:20,formatter:function(t){return t},orient:"vertical",data:this.itemnames1},series:[{name:"会员男女占比",type:"pie",radius:"80%",roseType:"angle",center:["50%","50%"],label:{formatter:"{b}: {d}%"},data:this.itemnums1}]};t.clear(),t.setOption(e),window.addEventListener("resize",function(){t.resize()})}}},p=(n("6e/s"),n("ZrdR")),b=Object(p.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page_wrap animated flipInY"},[n("div",{staticClass:"tab_model_wrap"},[n("div",{staticClass:"tag1_wrap"},[t.is_zzh?n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择部门",clearable:""},on:{change:function(e){t.handleFilter2(1)}},model:{value:t.listQuery2.bm,callback:function(e){t.$set(t.listQuery2,"bm",e)},expression:"listQuery2.bm"}},t._l(t.bms,function(t){return n("el-option",{attrs:{label:t.label,value:t.value}})})):t._e(),t._v(" "),t.is_bm?n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择柜组",clearable:""},on:{change:function(e){t.handleFilter2(2)}},model:{value:t.listQuery2.gz,callback:function(e){t.$set(t.listQuery2,"gz",e)},expression:"listQuery2.gz"}},t._l(t.gzs,function(t){return n("el-option",{attrs:{label:t.label,value:t.value}})})):t._e(),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter2}},[t._v("查询")])],1),t._v(" "),n("div",{staticClass:"salesTag"},[n("div",{staticClass:"salesTagList",staticStyle:{width:"32%"},attrs:{id:"zonge"},on:{click:t.zeOver}},[n("div",{staticClass:"salesTagListBiao"},[t._v(t._s(t.tab2name)+"会员数量")]),t._v(" "),n("div",[n("span",{staticClass:"salesTagListnum"},[t._v(t._s(t.tab1info.zongnums))]),t._v("个")])]),t._v(" "),n("div",{staticClass:"salesTagList",staticStyle:{width:"32%","background-image":"linear-gradient(104deg, #6bb3ff, #58a4ff)"},attrs:{id:"zonge1"},on:{click:t.zeOver1}},[n("div",{staticClass:"salesTagListBiao"},[t._v(t._s(t.tab2name)+"男会员数量")]),t._v(" "),n("div",[n("span",{staticClass:"salesTagListnum"},[t._v(t._s(t.tab1info.boynums))]),t._v("个")])]),t._v(" "),n("div",{staticClass:"salesTagList",staticStyle:{width:"32%","background-image":"linear-gradient(104deg, #ffbb3f, #ff9e47)"},attrs:{id:"zonge2"},on:{click:t.zeOver2}},[n("div",{staticClass:"salesTagListBiao"},[t._v(t._s(t.tab2name)+"女会员数量")]),t._v(" "),n("div",[n("span",{staticClass:"salesTagListnum"},[t._v(t._s(t.tab1info.girlnums))]),t._v("个")])])]),t._v(" "),n("div",{staticStyle:{width:"100%","padding-right":"15px"}},[n("div",{staticClass:"fengebr",attrs:{id:"zonge3"},on:{click:t.zeOver3}},[n("h2",[t._v("会员男女比例图例分析")])]),t._v(" "),n("div",{ref:"pie_change_qushi",staticStyle:{width:"100%",height:"400px",margin:"20px 0"}}),t._v(" "),n("div",{staticClass:"fengebr",attrs:{id:"zonge4"},on:{click:t.zeOver4}},[n("h2",[t._v("会员年龄段图例分析")])]),t._v(" "),n("div",{ref:"zbChart",staticStyle:{width:"100%",height:"400px",margin:"20px 0"}})])])])},[],!1,null,null,null);b.options.__file="memberanalysis.vue";e.default=b.exports}}]);