(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5779"],{"+7vn":function(t,a,e){},"7BsA":function(t,a,e){t.exports=function(t){function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}var e={};return a.m=t,a.c=e,a.i=function(t){return t},a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},a.p="/dist/",a(a.s=2)}([function(t,a,e){var n=e(4)(e(1),e(5),null,null);t.exports=n.exports},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(3);a.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,a,e,n){return e*(1-Math.pow(2,-10*t/n))*1024/1023+a}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var a=t-this.startTime;this.remaining=this.localDuration-a,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(a,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(a,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(a/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(a/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),a<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var a=(t+="").split("."),e=a[0],n=a.length>1?this.decimal+a[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(e);)e=e.replace(i,"$1"+this.separator+"$2");return this.prefix+e+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e(0),i=function(t){return t&&t.__esModule?t:{default:t}}(n);a.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=0,i="webkit moz ms o".split(" "),s=void 0,r=void 0;if("undefined"==typeof window)a.requestAnimationFrame=s=function(){},a.cancelAnimationFrame=r=function(){};else{a.requestAnimationFrame=s=window.requestAnimationFrame,a.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var l=void 0,o=0;o<i.length&&(!s||!r);o++)l=i[o],a.requestAnimationFrame=s=s||window[l+"RequestAnimationFrame"],a.cancelAnimationFrame=r=r||window[l+"CancelAnimationFrame"]||window[l+"CancelRequestAnimationFrame"];s&&r||(a.requestAnimationFrame=s=function(t){var a=(new Date).getTime(),e=Math.max(0,16-(a-n)),i=window.setTimeout(function(){t(a+e)},e);return n=a+e,i},a.cancelAnimationFrame=r=function(t){window.clearTimeout(t)})}a.requestAnimationFrame=s,a.cancelAnimationFrame=r},function(t,a){t.exports=function(t,a,e,n){var i,s=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(i=t,s=t.default);var l="function"==typeof s?s.options:s;if(a&&(l.render=a.render,l.staticRenderFns=a.staticRenderFns),e&&(l._scopeId=e),n){var o=Object.create(l.computed||null);Object.keys(n).forEach(function(t){var a=n[t];o[t]=function(){return a}}),l.computed=o}return{esModule:i,exports:s,options:l}}},function(t,a){t.exports={render:function(){var t=this,a=t.$createElement;return(t._self._c||a)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},CBPX:function(t,a,e){"use strict";var n=e("piJ4");e.n(n).a},EiNM:function(t,a,e){"use strict";var n=e("QGc0");e.n(n).a},OXW4:function(t,a,e){},QGc0:function(t,a,e){},QO5s:function(t,a,e){"use strict";var n=e("m5GR");e.n(n).a},lAbF:function(t,a,e){"use strict";e.r(a);var n=e("14Xm"),i=e.n(n),s=e("D3Ub"),r=e.n(s),l=e("7BsA"),o={components:{CountTo:e.n(l).a},props:{info:{type:Object,default:function(){return{}}}}},c=(e("EiNM"),e("KHd+")),u=Object(c.a)(o,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"panel-group",attrs:{gutter:40}},[e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel"},[e("div",{staticClass:"card-panel-icon-wrapper icon-people"},[e("svg-icon",{attrs:{"icon-class":"people","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("一级代理商数量")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_1,duration:2e3}}),t._v(" "),e("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel"},[e("div",{staticClass:"card-panel-icon-wrapper icon-message"},[e("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("二级代理商数量")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_2,duration:2e3}}),t._v(" "),e("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel"},[e("div",{staticClass:"card-panel-icon-wrapper icon-money"},[e("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("三级代理商数量")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_3,duration:2e3}}),t._v(" "),e("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),e("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[e("div",{staticClass:"card-panel"},[e("div",{staticClass:"card-panel-icon-wrapper icon-shoppingCard"},[e("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),e("div",{staticClass:"card-panel-description"},[e("div",{staticClass:"card-panel-text"},[t._v("运营商数量")]),t._v(" "),e("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":+t.info.level_4,duration:2e3}}),t._v(" "),e("span",{staticClass:"unit-color"},[t._v("家")])],1)])])],1)},[],!1,null,"ada1417e",null);u.options.__file="PanelGroup.vue";var d=u.exports,p={props:{type:{default:"team",type:String},num:{default:0,type:String}},data:function(){return{value:[]}},created:function(){this.initialDate()},methods:{initialDate:function(){var t=new Date,a=new Date(t.getTime()-2592e6);this.value=[a,t],this.$emit("timeChange",{type:this.type,value:this.value})},handleDateChange:function(t){this.value=t,this.$emit("timeChange",{type:this.type,value:this.value})}}},m=(e("x4tp"),Object(c.a)(p,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-card",{staticStyle:{width:"100%","padding-top":"15px"},attrs:{shadow:"hover"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v(t._s("team"===t.type?"团队版":"个人版")+"活动场次")]),t._v(" "),e("el-date-picker",{staticClass:"datePicker-wrapper",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"timestamp"},on:{change:t.handleDateChange},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}})],1),t._v(" "),e("div",{staticClass:"card-content"},[e("h4",[t._v("一个月内活动场次")]),t._v(" "),e("p",[t._v(t._s(t.num)+"场")]),t._v(" "),e("span",[t._v("点击上方日期可查询场次")])])])},[],!1,null,"becaa6f0",null));m.options.__file="TransactionTable.vue";var h=m.exports,f={name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}},v=(e("CBPX"),Object(c.a)(f,function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"pan-item",style:{zIndex:this.zIndex,height:this.height,width:this.width}},[a("div",{staticClass:"pan-info"},[a("div",{staticClass:"pan-info-roles-container"},[this._t("default")],2)]),this._v(" "),a("img",{staticClass:"pan-thumb",attrs:{src:this.image}})])},[],!1,null,"4178e1ea",null));v.options.__file="index.vue";var _={components:{PanThumb:v.exports},props:{num:{default:0,type:Number}},computed:{},methods:{handleRecharge:function(){this.$emit("recharge")}}},g=(e("n9Vi"),e("wk5q"),Object(c.a)(_,function(){var t=this.$createElement,a=this._self._c||t;return a("el-card",{staticClass:"box-card-component",staticStyle:{"margin-left":"8px"}},[a("div",{staticStyle:{position:"relative"}},[a("div",{staticClass:"progress-item",staticStyle:{"padding-top":"35px"}},[a("h4",[this._v("账户余额: "),a("span",[this._v(this._s(this.num))]),this._v(" ¥\n        "),a("el-button",{staticClass:"recharge_btn",on:{click:this.handleRecharge}},[this._v("充值")])],1)])])])},[],!1,null,"7eeeaca0",null));g.options.__file="BoxCard.vue";var b=g.exports,x=e("t3Un");function y(t){return Object(x.a)({url:"/i/topteam/admin/getsubtactnum",method:"post",data:t})}function w(t){return Object(x.a)({url:"/i/topteam/admin/getsubpactnum",method:"post",data:t})}var C={name:"DashboardAdmin",components:{PanelGroup:d,TransactionTable:h,BoxCard:b},data:function(){return{info:{},teamNum:"0",playerNum:"0"}},created:function(){this._getSubAgentNum()},methods:{handleRecharge:function(){},handleGetNum:function(t){this._getTeamActivityNum(t)},_getSubAgentNum:function(){var t=this;return r()(i.a.mark(function a(){var e;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(x.a)({url:"/i/topteam/admin/getsubagentnum",method:"get"});case 2:e=a.sent,t.info=e.data;case 4:case"end":return a.stop()}},a,t)}))()},_getTeamActivityNum:function(t){var a=this;return r()(i.a.mark(function e(){var n,s,r,l,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.type,s=t.value,(r={}).start_time=Math.floor(s[0]/1e3),r.end_time=Math.floor(s[1]/1e3),"team"!==n){e.next=9;break}return e.next=7,y(r);case 7:l=e.sent,a.teamNum=l.data.num;case 9:if("player"!==n){e.next=14;break}return e.next=12,w(r);case 12:o=e.sent,a.playerNum=o.data.num;case 14:case"end":return e.stop()}},e,a)}))()}}},V=(e("QO5s"),Object(c.a)(C,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("panel-group",{attrs:{info:t.info}}),t._v(" "),e("el-row",{attrs:{gutter:8}},[e("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[e("transaction-table",{attrs:{num:t.teamNum},on:{timeChange:t.handleGetNum}})],1),t._v(" "),e("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[e("transaction-table",{attrs:{type:"player",num:t.playerNum},on:{timeChange:t.handleGetNum}})],1)],1),t._v(" "),e("el-row",[e("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:24},xl:{span:24}}},[e("box-card",{attrs:{num:t.info.balance||0},on:{recharge:t.handleRecharge}})],1)],1)],1)},[],!1,null,"76d7bccd",null));V.options.__file="index.vue";var F={name:"Dashboard",components:{adminDashboard:V.exports},data:function(){return{currentRole:"adminDashboard"}}},A=Object(c.a)(F,function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"dashboard-container"},[a(this.currentRole,{tag:"component"})],1)},[],!1,null,null,null);A.options.__file="index.vue";a.default=A.exports},m5GR:function(t,a,e){},n9Vi:function(t,a,e){"use strict";var n=e("sVod");e.n(n).a},piJ4:function(t,a,e){},sVod:function(t,a,e){},wk5q:function(t,a,e){"use strict";var n=e("OXW4");e.n(n).a},x4tp:function(t,a,e){"use strict";var n=e("+7vn");e.n(n).a}}]);