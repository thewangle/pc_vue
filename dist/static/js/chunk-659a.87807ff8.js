(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-659a"],{"1lkH":function(t,e,a){},"50XZ":function(t,e,a){},KkH3:function(t,e,a){},MIe2:function(t,e,a){"use strict";var n=a("WwAS");a.n(n).a},WwAS:function(t,e,a){},Zl0x:function(t,e,a){"use strict";var n=a("shXJ");a.n(n).a},ddOz:function(t,e,a){"use strict";var n=a("KkH3");a.n(n).a},fqXQ:function(t,e,a){},kWXS:function(t,e,a){"use strict";var n=a("fqXQ");a.n(n).a},lAbF:function(t,e,a){"use strict";a.r(e);var n=a("cLjf"),i=a.n(n),r=a("hDQ3"),s=a.n(r),o=a("ni5H"),u={components:{CountTo:a.n(o).a},props:{info:{type:Object,default:function(){return{}}}}},l=(a("MIe2"),a("ZrdR")),c=Object(l.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"panel-group",attrs:{gutter:40}},[a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-people"},[a("svg-icon",{attrs:{"icon-class":"people","class-name":"card-panel-icon"}})],1),t._v(" "),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v("一级代理商数量")]),t._v(" "),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_1,duration:2e3}}),t._v(" "),a("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-message"},[a("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v("二级代理商数量")]),t._v(" "),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_2,duration:2e3}}),t._v(" "),a("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-money"},[a("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v("三级代理商数量")]),t._v(" "),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.info.level_3,duration:2e3}}),t._v(" "),a("span",{staticClass:"unit-color"},[t._v("家")])],1)])]),t._v(" "),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-shoppingCard"},[a("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),t._v(" "),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v("运营商数量")]),t._v(" "),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":+t.info.level_4,duration:2e3}}),t._v(" "),a("span",{staticClass:"unit-color"},[t._v("家")])],1)])])],1)},[],!1,null,"4834471b",null);c.options.__file="PanelGroup.vue";var d=c.exports,p={props:{type:{default:"team",type:String},num:{default:0,type:String}},data:function(){return{value:[]}},created:function(){this.initialDate()},methods:{initialDate:function(){var t=new Date,e=new Date(t.getTime()-2592e6);this.value=[e,t],this.$emit("timeChange",{type:this.type,value:this.value})},handleDateChange:function(t){this.value=t,this.$emit("timeChange",{type:this.type,value:this.value})}}},m=(a("Zl0x"),Object(l.a)(p,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",{staticStyle:{width:"100%","padding-top":"15px"},attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s("team"===t.type?"团队版活动场次":"个人版活动人次"))]),t._v(" "),a("el-date-picker",{staticClass:"datePicker-wrapper",attrs:{type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"timestamp"},on:{change:t.handleDateChange},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),a("div",{staticClass:"card-content"},[a("h4",[t._v("活动"+t._s("team"===t.type?"场":"人")+"次")]),t._v(" "),a("p",[t._v(t._s(t.num)+t._s("team"===t.type?"场":"次"))]),t._v(" "),a("span",[t._v("点击上方日期可查询场次")])])])},[],!1,null,"4c17867d",null));m.options.__file="TransactionTable.vue";var f=m.exports,h={name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}},v=(a("kWXS"),Object(l.a)(h,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pan-item",style:{zIndex:this.zIndex,height:this.height,width:this.width}},[e("div",{staticClass:"pan-info"},[e("div",{staticClass:"pan-info-roles-container"},[this._t("default")],2)]),this._v(" "),e("img",{staticClass:"pan-thumb",attrs:{src:this.image}})])},[],!1,null,"f67ae59e",null));v.options.__file="index.vue";var g={components:{PanThumb:v.exports},props:{num:{default:0,type:Number}},computed:{},methods:{handleRecharge:function(){this.$emit("recharge")}}},b=(a("n9Vi"),a("ddOz"),Object(l.a)(g,function(){var t=this.$createElement,e=this._self._c||t;return e("el-card",{staticClass:"box-card-component",staticStyle:{"margin-left":"8px"}},[e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"progress-item",staticStyle:{"padding-top":"35px"}},[e("h4",[this._v("账户余额: "),e("span",[this._v(this._s(this.num))]),this._v(" ¥\n        "),e("el-button",{staticClass:"recharge_btn",on:{click:this.handleRecharge}},[this._v("充值")])],1)])])])},[],!1,null,"4798c082",null));b.options.__file="BoxCard.vue";var _=b.exports,y=a("t3Un");function x(t){return Object(y.a)({url:"/i/topteam/admin/getsubtactnum",method:"post",data:t})}function w(t){return Object(y.a)({url:"/i/topteam/admin/getsubpactnum",method:"post",data:t})}var O=a("zK94"),j=a("X4fA"),C={name:"DashboardAdmin",components:{PanelGroup:d,TransactionTable:f,BoxCard:_},data:function(){return{info:{},teamNum:"0",playerNum:"0",dialogFormVisible:!1,money:0,payType:"1",pay_er_url:"",level:Object(j.e)()}},created:function(){this._getSubAgentNum()},methods:{handleClose:function(){this.dialogFormVisible=!1,this.money=0,this.pay_er_url=""},handleRecharge:function(){this.dialogFormVisible=!0},handleGetNum:function(t){this._getTeamActivityNum(t)},paySuccess:function(){this.handleClose(),this._getSubAgentNum()},getPayOrder:function(){var t=this;return s()(i.a.mark(function e(){var a,n,r,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).type_id=Object(j.a)(),a.order_type="balance",a.money=t.money,e.next=6,Object(O.j)(a);case 6:n=e.sent,r=n.data,s=r.order_sn,r.order_type,t.pay_er_url="/i/topteam/api/getpayinfo?order_sn="+s+"&pay_type="+t.payType;case 9:case"end":return e.stop()}},e,t)}))()},_getSubAgentNum:function(){var t=this;return s()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(y.a)({url:"/i/topteam/admin/getsubagentnum",method:"get"});case 2:a=e.sent,t.info=a.data,t.info.balance=t.info.balance/100;case 5:case"end":return e.stop()}},e,t)}))()},_getTeamActivityNum:function(t){var e=this;return s()(i.a.mark(function a(){var n,r,s,o,u;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(n=t.type,r=t.value,(s={}).start_time=Math.floor(r[0]/1e3),s.end_time=Math.floor(r[1]/1e3),"team"!==n){a.next=9;break}return a.next=7,x(s);case 7:o=a.sent,e.teamNum=o.data.num;case 9:if("player"!==n){a.next=14;break}return a.next=12,w(s);case 12:u=a.sent,e.playerNum=u.data.num;case 14:case"end":return a.stop()}},a,e)}))()}}},V=(a("xFls"),Object(l.a)(C,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-editor-container"},[a("panel-group",{attrs:{info:t.info}}),t._v(" "),a("el-row",{attrs:{gutter:8}},[a("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[a("transaction-table",{attrs:{num:t.teamNum},on:{timeChange:t.handleGetNum}})],1),t._v(" "),a("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[a("transaction-table",{attrs:{num:t.playerNum,type:"player"},on:{timeChange:t.handleGetNum}})],1)],1),t._v(" "),"2"===t.level?a("el-row",[a("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:24},xl:{span:24}}},[a("box-card",{attrs:{num:t.info.balance||0},on:{recharge:t.handleRecharge}})],1)],1):t._e(),t._v(" "),a("el-dialog",{staticClass:"payDialog",attrs:{visible:t.dialogFormVisible,title:"账户充值"},on:{"update:visible":function(e){t.dialogFormVisible=e},close:t.handleClose}},[a("div",{staticStyle:{height:"200px"}},[a("div",{staticStyle:{float:"left",width:"48%"}},[a("el-form",{attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"充值金额","label-width":"100px"}},[a("el-input",{attrs:{type:"number",min:"0",step:"1"},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"充值方式","label-width":"100px"}},[a("el-radio",{attrs:{label:"1"},model:{value:t.payType,callback:function(e){t.payType=e},expression:"payType"}},[t._v("微信")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.getPayOrder}},[t._v("确 定")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.paySuccess}},[t._v("支付成功返回首页")])],1),t._v(" "),a("el-form-item",[a("span",[a("span",[t._v("点击确定后扫描右侧二维码")])])])],1)],1),t._v(" "),a("div",{staticStyle:{float:"right",width:"50%",height:"100%"}},[a("div",{staticStyle:{height:"140px",width:"140px",margin:"0 auto"}},[a("img",{staticStyle:{height:"138px",width:"138px"},attrs:{src:t.pay_er_url,alt:""}})])])])])],1)},[],!1,null,null,null));V.options.__file="index.vue";var F={name:"Dashboard",components:{adminDashboard:V.exports},data:function(){return{currentRole:"adminDashboard"}}},S=Object(l.a)(F,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"dashboard-container"},[e(this.currentRole,{tag:"component"})],1)},[],!1,null,null,null);S.options.__file="index.vue";e.default=S.exports},n9Vi:function(t,e,a){"use strict";var n=a("50XZ");a.n(n).a},ni5H:function(t,e,a){t.exports=function(t){function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,a){var n=a(4)(a(1),a(5),null,null);t.exports=n.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,a,n){return a*(1-Math.pow(2,-10*t/n))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var e=(t+="").split("."),a=e[0],n=e.length>1?this.decimal+e[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(a);)a=a.replace(i,"$1"+this.separator+"$2");return this.prefix+a+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(0),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=0,i="webkit moz ms o".split(" "),r=void 0,s=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=s=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=s=window.cancelAnimationFrame;for(var o=void 0,u=0;u<i.length&&(!r||!s);u++)o=i[u],e.requestAnimationFrame=r=r||window[o+"RequestAnimationFrame"],e.cancelAnimationFrame=s=s||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];r&&s||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),a=Math.max(0,16-(e-n)),i=window.setTimeout(function(){t(e+a)},a);return n=e+a,i},e.cancelAnimationFrame=s=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=s},function(t,e){t.exports=function(t,e,a,n){var i,r=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,r=t.default);var o="function"==typeof r?r.options:r;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),a&&(o._scopeId=a),n){var u=Object.create(o.computed||null);Object.keys(n).forEach(function(t){var e=n[t];u[t]=function(){return e}}),o.computed=u}return{esModule:i,exports:r,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},shXJ:function(t,e,a){},xFls:function(t,e,a){"use strict";var n=a("1lkH");a.n(n).a},zK94:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"s",function(){return r}),a.d(e,"t",function(){return s}),a.d(e,"p",function(){return o}),a.d(e,"w",function(){return u}),a.d(e,"d",function(){return l}),a.d(e,"r",function(){return c}),a.d(e,"f",function(){return d}),a.d(e,"j",function(){return p}),a.d(e,"C",function(){return m}),a.d(e,"J",function(){return f}),a.d(e,"n",function(){return h}),a.d(e,"q",function(){return v}),a.d(e,"u",function(){return g}),a.d(e,"y",function(){return b}),a.d(e,"v",function(){return _}),a.d(e,"o",function(){return y}),a.d(e,"e",function(){return x}),a.d(e,"L",function(){return w}),a.d(e,"i",function(){return O}),a.d(e,"F",function(){return j}),a.d(e,"b",function(){return C}),a.d(e,"l",function(){return V}),a.d(e,"K",function(){return F}),a.d(e,"G",function(){return S}),a.d(e,"g",function(){return A}),a.d(e,"H",function(){return k}),a.d(e,"B",function(){return T}),a.d(e,"z",function(){return N}),a.d(e,"D",function(){return D}),a.d(e,"E",function(){return q}),a.d(e,"c",function(){return M}),a.d(e,"h",function(){return $}),a.d(e,"I",function(){return R}),a.d(e,"x",function(){return P}),a.d(e,"m",function(){return E}),a.d(e,"A",function(){return z}),a.d(e,"k",function(){return L});var n=a("t3Un");function i(t){return Object(n.a)({url:"/i/topteam/admin/addactivity",method:"post",data:t})}function r(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function s(){return Object(n.a)({url:"/i/topteam/admin/getcoachlist",method:"get"})}function o(t){return Object(n.a)({url:"/i/topteam/admin/delactivity?act_id="+t,method:"get"})}function u(t){return Object(n.a)({url:"/i/topteam/admin/GetTaskList",method:"post",data:t})}function l(t){return Object(n.a)({url:"i/topteam/admin/addTask",method:"post",data:t})}function c(t){return Object(n.a)({url:"/i/topteam/admin/getactivityinfo",method:"post",data:t})}function d(t){return Object(n.a)({url:"/i/topteam/admin/auditact",method:"post",data:t})}function p(t){return Object(n.a)({url:"/i/topteam/api/createorder",method:"post",data:t})}function m(t){return Object(n.a)({url:"/i/topteam/api/getpayinfo",method:"post",data:t})}function f(t){return Object(n.a)({url:"/i/topteam/admin/updateactivity",method:"post",data:t})}function h(t){return Object(n.a)({url:"/i/topteam/admin/delTask?id="+t,method:"get"})}function v(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTask",method:"post",data:t})}function g(t){return Object(n.a)({url:"/i/topteam/admin/GetActivityList",method:"post",data:t})}function b(t){return Object(n.a)({url:"/i/topteam/admin/getactteamloginfo?act_id="+t,method:"get"})}function _(t){return Object(n.a)({url:"/i/topteam/admin/getTaskLibList",method:"post",data:t})}function y(t){return Object(n.a)({url:"/i/topteam/admin/delTaskLib?id="+t,method:"get"})}function x(t){return Object(n.a)({url:"/i/topteam/admin/addTaskLib",method:"post",data:t})}function w(t){return Object(n.a)({url:"/i/topteam/admin/ModifyTaskLib",method:"post",data:t})}function O(t){return Object(n.a)({url:"/i/topteam/admin/ChooseTasklib",method:"post",data:t})}function j(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page_no:1,page_size:1e3};return Object(n.a)({url:"/i/topteam/admin/getclassifylist",method:"get",data:t})}function C(t){return Object(n.a)({url:"/i/topteam/admin/addclassify",method:"post",data:t})}function V(t){return Object(n.a)({url:"/i/topteam/admin/delclassify",method:"post",data:t})}function F(t){return Object(n.a)({url:"/i/topteam/admin/Modifyclassify",method:"post",data:t})}function S(t){return Object(n.a)({url:"/i/topteam/admin/getactploginfo",method:"post",data:t})}function A(t){return Object(n.a)({url:"/i/topteam/admin/cancelact?act_id="+t,method:"get"})}function k(t,e){return Object(n.a)({url:"/i/topteam/admin/MoveTask?id="+t+"&move_type="+e})}function T(t){return Object(n.a)({url:"/i/topteam/admin/getactptloginfo",method:"post",data:t})}function N(t){return Object(n.a)({url:"/i/topteam/admin/getfenxipact",method:"post",data:t})}function D(t){return Object(n.a)({url:"/i/topteam/admin/getanswerrecord",method:"post",data:t})}function q(t){return Object(n.a)({url:"/i/topteam/admin/getanswerstatistics",method:"post",data:t})}function M(t){return Object(n.a)({url:"/i/topteam/admin/addgame",method:"post",data:t})}function $(t){return Object(n.a)({url:"/i/topteam/admin/updategame",method:"post",data:t})}function R(t){return Object(n.a)({url:"/i/topteam/admin/onsale",method:"post",data:t})}function P(t){return Object(n.a)({url:"/i/topteam/admin/getgamelist",method:"post",data:t})}function E(t){return Object(n.a)({url:"/i/topteam/admin/delgame",method:"post",data:t})}function z(){return Object(n.a)({url:"/i/topteam/admin/getdemoactlist",method:"get"})}function L(t){return Object(n.a)({url:"/i/topteam/admin/adddemoact",method:"post",data:t})}}}]);