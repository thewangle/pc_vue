(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-02cc"],{"44Km":function(t,e,n){"use strict";n.r(e);var a=n("cLjf"),s=n.n(a),r=n("hDQ3"),i=n.n(r),o=(n("f0Pt"),n("X4fA")),u=n("a/LZ"),c=n.n(u),l=n("iVKg"),d={name:"registered",data:function(){return{username:"",name:"",password:"",department:"",adminname:"",loading:!1,allusers:[],phone:"",partantuser:Object(o.c)()}},mounted:function(){this._fetchUserList()},computed:{tab_biao:function(){return 0==Object(o.a)()?"运营商":1==Object(o.a)()?"部门":2==Object(o.a)()?"柜组":void 0}},methods:{handleLogin:function(){var t=this;if(""!=this.username&&""!=this.password&&""!=this.department&&""!=this.adminname&&""!=this.phone){if(!/^1[3456789]\d{9}$/.test(this.phone))return this.$message({message:"请您输入正确的手机号格式！",type:"warning"}),!1;var e=!0;if(this.allusers.forEach(function(n,a){n.username==t.username&&(t.$message({message:"对不起！该用户已存在！",type:"warning"}),e=!1)}),e){var n=this,a={username:n.username,password:n.password,department:n.department,adminname:n.adminname,partantuser:n.partantuser,phone:n.phone,addtime:c()(new Date).add("days",365).format("YYYY-MM-DD HH:mm:ss")};Object(l.a)(a).then(function(t){var e=t.data;200==e.code?(n.$message({message:"恭喜您！注册成功！",type:"success"}),n.$router.push({path:"/user/userlist"})):202==e.code?n.$message({message:"该用户名已经存在！",type:"warning"}):n.$message.error("对不起！注册失败！")}).catch(function(t){n.$message.error("对不起！注册失败！")})}}else this.$message({message:"请您填写完整信息",type:"warning"})},_fetchUserList:function(){var t=this;return i()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:Object(l.f)().then(function(e){var n=e.data;200==n.code&&(t.allusers=n.data),201==n.code&&console.log("获取失败")}).catch(function(t){console.log("获取失败")});case 1:case"end":return e.stop()}},e,t)}))()}}},p=(n("WLZZ"),n("ZrdR")),f=Object(p.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"tab"},[n("div",{staticStyle:{"text-align":"center"}},[t._v("新增"+t._s(t.tab_biao))]),t._v(" "),n("div",{staticClass:"biao"},[n("span",[t._v("用户名")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}},[n("i",{staticClass:"el-icon-user-solid",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),n("div",{staticClass:"biao"},[n("span",[t._v("密码")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}},[n("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),n("div",{staticClass:"biao"},[n("span",[t._v(t._s(t.tab_biao)+"名称")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入"+t.tab_biao+"名称"},model:{value:t.department,callback:function(e){t.department=e},expression:"department"}},[n("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),n("div",{staticClass:"biao"},[n("span",[t._v("管理员")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入管理员名称"},model:{value:t.adminname,callback:function(e){t.adminname=e},expression:"adminname"}},[n("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),n("div",{staticClass:"biao"},[n("span",[t._v("电话")]),t._v(" "),n("el-input",{attrs:{placeholder:"请输入管理员电话"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}},[n("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),n("el-button",{staticClass:"submit",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("注 册")])],1)])},[],!1,null,"1256422a",null);f.options.__file="index.vue";e.default=f.exports},HZr4:function(t,e,n){},WLZZ:function(t,e,n){"use strict";var a=n("HZr4");n.n(a).a},iVKg:function(t,e,n){"use strict";n.d(e,"l",function(){return r}),n.d(e,"k",function(){return i}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u}),n.d(e,"c",function(){return c}),n.d(e,"m",function(){return l}),n.d(e,"f",function(){return d}),n.d(e,"g",function(){return p}),n.d(e,"h",function(){return f}),n.d(e,"i",function(){return m}),n.d(e,"d",function(){return h}),n.d(e,"e",function(){return g}),n.d(e,"j",function(){return b});var a=n("f0Pt"),s=n.n(a);function r(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/login",t)}function i(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getuserinfo",t)}function o(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/adduser",t)}function u(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/deleuser",t)}function c(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/editeuser",t)}function l(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/renewalfee",t)}function d(t){return s.a.get("http://49.235.163.210/yii2/frontend/web/?r=login/getallusers")}function p(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyid",t)}function f(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyidmain",t)}function m(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getallusersbyidthis",t)}function h(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getalluser",t)}function g(t){return s.a.post("http://49.235.163.210/yii2/frontend/web/?r=login/getalluserbyuid",t)}function b(t){return s.a.get("https://geo.datav.aliyun.com/areas/bound/370000_full.json")}}}]);