(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2369"],{"/CEL":function(t,e,i){},"0xGk":function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"d",function(){return r}),i.d(e,"e",function(){return o}),i.d(e,"f",function(){return c}),i.d(e,"c",function(){return l}),i.d(e,"b",function(){return u});var a=i("f0Pt"),s=i.n(a);function n(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/addsort",t)}function r(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfo",t)}function o(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoall",t)}function c(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsortinfoone",t)}function l(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/editsortinfo",t)}function u(t){return s.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/deletesort",t)}},"3Hjr":function(t,e,i){t.exports=i.p+"static/img/nodata.2a4cf7d.jpg"},HHRD:function(t,e,i){"use strict";i.r(e);var a=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hellpWrap1"},[e("img",{staticClass:"hellpImg",attrs:{src:i("dqO4"),alt:""}}),this._v(" "),e("span",{staticClass:"hellpB"},[this._v("使用帮助")])])}],s=i("cLjf"),n=i.n(s),r=i("hDQ3"),o=i.n(r),c=i("3rzS"),l=i.n(c),u=i("7u+w"),h=i.n(u),d=(i("f0Pt"),i("a/LZ")),p=i.n(d),v=i("X4fA"),f=(i("iVKg"),i("xA6U")),m=(i("0xGk"),{name:"DashboardAdmin",components:{},data:function(){return{dialogVisible:!1,isShowEchart:!0,isShowEchart1:!0,changeQushixAxis:[],changeQushiseries:[],changeQushixAxis1:[],changeQushiseries1:[],time_tab2:[p()().subtract(7,"days").format(),p()().format()],time_tab1:[p()().subtract(7,"days").format(),p()().format()],listQuery2:{time:[],goodsid:"",priceinorout:1,role:Object(v.a)(),uid:Object(v.d)(),pid:Object(v.f)()},listQuery1:{time:[],goodsid:"",priceinorout:1,role:Object(v.a)(),uid:Object(v.d)(),pid:Object(v.f)()},priceinoroutlist:[{label:"进价",value:1},{label:"售价",value:2}],priceinoroutlists:[{label:"售出",value:1},{label:"退货",value:2},{label:"报损",value:3},{label:"补货",value:4}],leibie:"售出",priceHigh:0,pricelow:0,priceci:0,numtypes:[],numtypess:[],tab2name:"",tab2names:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},computed:{},mounted:function(){this.GetGoodsinfobyid(),this.time_select1(),this.time_select2(),this.handleFilter2(),this.handleFilter1()},created:function(){},methods:{zeOver:function(){l()("#zonge").addClass("animated bounce"),setTimeout(function(){l()("#zonge").removeClass("animated bounce")},1e3)},zeOvers:function(){l()("#zonges").addClass("animated bounce"),setTimeout(function(){l()("#zonges").removeClass("animated bounce")},1e3)},GetGoodsinfobyid:function(){var t=this;Object(f.f)({uid:Object(v.d)()}).then(function(e){var i=e.data;200==i.code&&i.data.forEach(function(e,i){0==i&&(t.listQuery2.goodsid=e.id,t.listQuery1.goodsid=e.id,t.tab2name=e.name,t.tab2names=e.name),t.numtypes.push({label:e.name,value:e.id}),t.numtypess.push({label:e.name,value:e.id})})}).catch(function(t){console.log(t)})},time_select1:function(t){this.listQuery1.time[0]=p()(this.time_tab1[0]).valueOf()/1e3,this.listQuery1.time[1]=p()(this.time_tab1[1]).valueOf()/1e3},time_select2:function(t){this.listQuery2.time[0]=p()(this.time_tab2[0]).valueOf()/1e3,this.listQuery2.time[1]=p()(this.time_tab2[1]).valueOf()/1e3},handleFilter2:function(t){var e=this;1==t&&Object(f.g)({goodsid:this.listQuery2.goodsid}).then(function(t){var i=t.data;e.tab2name=i.data.name}),this._fetchActivityList2()},handleFilter1:function(t){var e=this;1==t&&Object(f.g)({goodsid:this.listQuery1.goodsid}).then(function(t){var i=t.data;e.tab2names=i.data.name}),2==t&&(1==this.listQuery1.priceinorout&&(this.leibie="售出"),2==this.listQuery1.priceinorout&&(this.leibie="退货"),3==this.listQuery1.priceinorout&&(this.leibie="报损"),4==this.listQuery1.priceinorout&&(this.leibie="补货")),this._fetchActivityList1()},_fetchActivityList2:function(){var t=this;return o()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.listQuery2.time.length){e.next=3;break}return t.$message({message:"请您选择日期！",type:"warning"}),e.abrupt("return");case 3:t._fetchGoodsChangeQushi();case 4:case"end":return e.stop()}},e,t)}))()},_fetchActivityList1:function(){var t=this;return o()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.listQuery1.time.length){e.next=3;break}return t.$message({message:"请您选择日期！",type:"warning"}),e.abrupt("return");case 3:t._fetchGoodsChangeQushi1();case 4:case"end":return e.stop()}},e,t)}))()},_fetchGoodsChangeQushi:function(){var t=this;return o()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.changeQushixAxis=[],t.changeQushiseries=[],Object(f.l)(t.listQuery2).then(function(e){var i=e.data;if(201==i.code)t.isShowEchart=!1,t.$message({message:"没有更多价格变化信息！",type:"warning",duration:5e3});else{t.isShowEchart=!0,t.priceci=i.data.data.leftdata.length,i.data.data.leftdata[0].priceinnow?(t.pricelow=i.data.data.leftdata[0].priceinnow,i.data.data.leftdata.forEach(function(e,i){t.priceHigh>e.priceinnow?t.priceHigh=t.priceHigh:t.priceHigh=e.priceinnow,t.pricelow<e.priceinnow?t.pricelow=t.pricelow:t.pricelow=e.priceinnow,t.changeQushixAxis.push(e.addtime),t.changeQushiseries.push(e.priceinnow)})):(t.pricelow=i.data.data.leftdata[0].priceoutnow,i.data.data.leftdata.forEach(function(e,i){t.priceHigh>e.priceoutnow?t.priceHigh=t.priceHigh:t.priceHigh=e.priceoutnow,t.pricelow<e.priceoutnow?t.pricelow=t.pricelow:t.pricelow=e.priceoutnow,t.changeQushixAxis.push(e.addtime),t.changeQushiseries.push(e.priceoutnow)}));var a=t;setTimeout(function(){a.pie_kucunChangeQushi()},500)}}).catch(function(e){t.isShowEchart=!1,console.log(e)});case 3:case"end":return e.stop()}},e,t)}))()},_fetchGoodsChangeQushi1:function(){var t=this;return o()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.changeQushixAxis1=[],t.changeQushiseries1=[],Object(f.m)(t.listQuery1).then(function(e){var i=e.data;if(201==i.code)t.isShowEchart1=!1,t.$message({message:"没有更多库存变化信息！",type:"warning",duration:5e3});else{t.isShowEchart1=!0,i.data.forEach(function(e,i){t.changeQushixAxis1.push(e.addtime),t.changeQushiseries1.push(Math.abs(Number(e.numbefore)-Number(e.numnow)))});var a=t;setTimeout(function(){a.pie_kucunChangeQushi1()},500)}}).catch(function(e){t.isShowEchart1=!1,console.log(e)});case 3:case"end":return e.stop()}},e,t)}))()},pie_kucunChangeQushi:function(){var t=h.a.init(this.$refs.pie_change_qushi),e={toolbox:{feature:{saveAsImage:{title:"下载"}}},tooltip:{trigger:"item",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},xAxis:{type:"category",boundaryGap:!1,data:this.changeQushixAxis},yAxis:{type:"value"},series:[{data:this.changeQushiseries,type:"line",areaStyle:{}}]};t.clear(),t.setOption(e)},pie_kucunChangeQushi1:function(){var t=h.a.init(this.$refs.pie_change_qushi1),e={toolbox:{feature:{saveAsImage:{title:"下载"}}},tooltip:{trigger:"item",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},xAxis:{type:"category",boundaryGap:!1,data:this.changeQushixAxis1},yAxis:{type:"value"},series:[{data:this.changeQushiseries1,type:"line",areaStyle:{}}]};t.clear(),t.setOption(e)}}}),_=(i("pvu1"),i("ZrdR")),g=Object(_.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page_wrap animated rotateIn"},[a("div",{staticClass:"tab_model_wrap"},[a("div",{staticClass:"tag1_wrap"},[a("el-date-picker",{attrs:{type:"daterange",align:"left","unlink-panels":"","start-placeholder":"开始日期","range-separator":"至","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.time_select2},model:{value:t.time_tab2,callback:function(e){t.time_tab2=e},expression:"time_tab2"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择商品",filterable:""},on:{change:function(e){t.handleFilter2(1)}},model:{value:t.listQuery2.goodsid,callback:function(e){t.$set(t.listQuery2,"goodsid",e)},expression:"listQuery2.goodsid"}},t._l(t.numtypess,function(t){return a("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择变动种类",filterable:""},on:{change:t.handleFilter2},model:{value:t.listQuery2.priceinorout,callback:function(e){t.$set(t.listQuery2,"priceinorout",e)},expression:"listQuery2.priceinorout"}},t._l(t.priceinoroutlist,function(t){return a("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter2}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"fengebr",attrs:{id:"zonge"},on:{click:t.zeOver}},[a("h2",[t._v("价格变动趋势图例分析")])]),t._v(" "),a("div",{staticClass:"tab1_content_wrap"},[a("div",{staticClass:"tab1_content_left"},[a("div",{staticClass:"tab1_content_left_tab"},[t._v(t._s(t.tab2name)+"价格趋势")]),t._v(" "),a("div",{staticClass:"tab1_content_left_list"},[a("div",[a("span",[t._v("最高价格：")]),a("span",[t._v(t._s(t.priceHigh))]),t._v(" 元")]),t._v(" "),a("div",[a("span",[t._v("最低价格：")]),a("span",[t._v(t._s(t.pricelow))]),t._v(" 元")]),t._v(" "),a("div",[a("span",[t._v("变动次数：")]),a("span",[t._v(t._s(t.priceci))]),t._v(" 次")])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowEchart,expression:"!isShowEchart"}],staticClass:"noDate",staticStyle:{width:"80%"}},[a("img",{staticClass:"nodataImg",attrs:{src:i("3Hjr"),alt:""}}),t._v(" "),a("span",{staticClass:"nodataSpan"},[t._v("暂无数据")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowEchart,expression:"isShowEchart"}],ref:"pie_change_qushi",staticStyle:{width:"80%",height:"400px",margin:"20px 0"}})])]),t._v(" "),a("div",{staticClass:"tab_model_wrap"},[a("div",{staticClass:"tag1_wrap"},[a("el-date-picker",{attrs:{type:"daterange",align:"left","unlink-panels":"","start-placeholder":"开始日期","range-separator":"至","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.time_select2},model:{value:t.time_tab1,callback:function(e){t.time_tab1=e},expression:"time_tab1"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择商品",filterable:""},on:{change:function(e){t.handleFilter1(1)}},model:{value:t.listQuery1.goodsid,callback:function(e){t.$set(t.listQuery1,"goodsid",e)},expression:"listQuery1.goodsid"}},t._l(t.numtypes,function(t){return a("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请选择变动种类",filterable:""},on:{change:function(e){t.handleFilter1(2)}},model:{value:t.listQuery1.priceinorout,callback:function(e){t.$set(t.listQuery1,"priceinorout",e)},expression:"listQuery1.priceinorout"}},t._l(t.priceinoroutlists,function(t){return a("el-option",{attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter1}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"fengebr",attrs:{id:"zonges"},on:{click:t.zeOvers}},[a("h2",[t._v("单品库存变动趋势图例分析")])]),t._v(" "),a("div",{staticClass:"tab1_content_wrap"},[a("div",{staticClass:"tab1_content_left"},[a("div",{staticClass:"tab1_content_left_tab"},[t._v(t._s(t.tab2names)+"库存变化")]),t._v(" "),a("div",{staticClass:"tab1_content_left_list"},[a("div",[a("span",[t._v("类别：")]),a("span",[t._v(t._s(t.leibie))])]),t._v(" "),a("div",[a("span",[t._v("柜组：")]),a("span",[t._v(t._s(t.tab2names))])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowEchart1,expression:"!isShowEchart1"}],staticClass:"noDate",staticStyle:{width:"80%"}},[a("img",{staticClass:"nodataImg",attrs:{src:i("3Hjr"),alt:""}}),t._v(" "),a("span",{staticClass:"nodataSpan"},[t._v("暂无数据")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowEchart1,expression:"isShowEchart1"}],ref:"pie_change_qushi1",staticStyle:{width:"80%",height:"400px",margin:"20px 0"}})]),t._v(" "),a("drawer",{attrs:{title:"单品分析页 - 使用说明",visible:t.dialogVisible,width:"500px","close-on-click-modal":""},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"smWrap"},[a("div",{staticClass:"smB"},[t._v("概述：此页分为单品价格变动分析和库存变动分析")]),t._v(" "),a("div",{staticClass:"smContent"},[a("span",{staticClass:"smContentB"},[t._v("价格变动：")]),t._v(" "),a("div",{staticClass:"smContentC"},[a("div",[t._v('1."时间段"、"商品"、"进/售价"均为必选字段')]),t._v(" "),a("div",[t._v('2.时间段选择需要选择"开始日期"和"结束日期"，也可选择"最近一周"、"最近一个月"、"最近三个月"的快捷方式（默认最近一周，时间段为必选！）')]),t._v(" "),a("div",[t._v('3."商品"支持模糊搜索选择，点击下拉框后，可在输入框中输入要选商品的名称或名称一部分')]),t._v(" "),a("div",[t._v('4.左栏展示所选条件下的"最高价格"、"最低价格"、"变动次数"')]),t._v(" "),a("div",[t._v('5.右栏展示所选条件下的"价格变动"的趋势记录(可点右侧下载此图例)')])])]),t._v(" "),a("div",{staticClass:"smContent"},[a("span",{staticClass:"smContentB"},[t._v("库存变动：")]),t._v(" "),a("div",{staticClass:"smContentC"},[a("div",[t._v('1."时间段"、"商品"、"进/售价"均为必选字段')]),t._v(" "),a("div",[t._v('2.时间段选择需要选择"开始日期"和"结束日期"，也可选择"最近一周"、"最近一个月"、"最近三个月"的快捷方式（默认最近一周，时间段为必选！）')]),t._v(" "),a("div",[t._v('3."商品"支持模糊搜索选择，点击下拉框后，可在输入框中输入要选商品的名称或名称一部分')]),t._v(" "),a("div",[t._v('4.左栏展示所选条件下的"类别"、"柜组名称"')]),t._v(" "),a("div",[t._v('5.右栏展示所选条件下的"库存数量变动"的趋势记录(为该单品的变动个数而非单品库存总数)')])])]),t._v(" "),a("div",{staticClass:"smContent"},[a("span",{staticClass:"smContentB"},[t._v("备注：")]),t._v(" "),a("div",{staticClass:"smContentC"},[a("div",[t._v('1.此模块只有"柜组级别"账号有')])])])])]),t._v(" "),a("div",{staticClass:"hellpWrap",on:{click:function(e){t.dialogVisible=!0}}},[t._m(0)])],1)])},a,!1,null,null,null);g.options.__file="pricechange.vue";e.default=g.exports},dqO4:function(t,e,i){t.exports=i.p+"static/img/hellp.6fec94b.jpg"},pvu1:function(t,e,i){"use strict";var a=i("/CEL");i.n(a).a}}]);