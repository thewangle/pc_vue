(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7d94"],{HeKR:function(t,e,s){"use strict";var i=s("MZn9");s.n(i).a},MZn9:function(t,e,s){},Ty0K:function(t,e,s){"use strict";s.r(e);var i=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("供应商名称"),e("span",{staticStyle:{color:"red"}},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("供应商地址"),e("span",{staticStyle:{color:"red"}},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("联系人"),e("span",{staticStyle:{color:"red"}},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("电话"),e("span",{staticStyle:{color:"red"}},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hellpWrap1"},[e("img",{staticClass:"hellpImg",attrs:{src:s("dqO4"),alt:""}}),this._v(" "),e("span",{staticClass:"hellpB"},[this._v("使用帮助")])])}],a=(s("f0Pt"),s("X4fA")),n=(s("a/LZ"),s("prnK")),r={name:"registered",data:function(){return{dialogVisible:!1,name:"",address:"",contact:"",remark:"",loading:!1,phone:""}},mounted:function(){},computed:{},methods:{handleLogin:function(){if(""!=this.name&&""!=this.address&&""!=this.contact&&""!=this.phone){if(!/^1[3456789]\d{9}$/.test(this.phone))return this.$message({message:"请您输入正确的手机号格式！",type:"warning"}),!1;var t=this,e={name:t.name,address:t.address,contact:t.contact,remark:t.remark,uid:Object(a.d)(),pid:Object(a.f)(),phone:t.phone};Object(n.a)(e).then(function(e){200==e.data.code?(t.$message({message:"恭喜您！注册成功！",type:"success"}),t.$router.push({path:"/supplier/supplierlist"})):t.$message.error("对不起！注册失败！")}).catch(function(e){t.$message.error("对不起！注册失败！")})}else this.$message({message:"请您填写完整信息",type:"warning"})}}},o=(s("HeKR"),s("ZrdR")),l=Object(o.a)(r,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap"},[s("div",{staticClass:"tab"},[s("div",{staticClass:"addB"},[t._v("新增供应商")]),t._v(" "),s("div",{staticClass:"biao"},[t._m(0),t._v(" "),s("el-input",{attrs:{placeholder:"请输入供应商名称"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}},[s("i",{staticClass:"el-icon-user-solid",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),s("div",{staticClass:"biao"},[t._m(1),t._v(" "),s("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入供应商地址"},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1),t._v(" "),s("div",{staticClass:"biao"},[t._m(2),t._v(" "),s("el-input",{attrs:{placeholder:"请输入联系人"},model:{value:t.contact,callback:function(e){t.contact=e},expression:"contact"}},[s("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),s("div",{staticClass:"biao"},[t._m(3),t._v(" "),s("el-input",{attrs:{placeholder:"请输入管理员电话"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}},[s("i",{staticClass:"el-icon-s-goods",attrs:{slot:"prefix"},slot:"prefix"})])],1),t._v(" "),s("div",{staticClass:"biao"},[s("span",[t._v("备注")]),t._v(" "),s("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入供应商备注"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),s("el-button",{staticClass:"submit",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("确 定")]),t._v(" "),s("drawer",{attrs:{title:"添加供应商页 - 使用说明",visible:t.dialogVisible,width:"500px","close-on-click-modal":""},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("div",{staticClass:"smWrap"},[s("div",{staticClass:"smB"},[t._v("概述：此页为添加供应商功能页")]),t._v(" "),s("div",{staticClass:"smContent"},[s("span",{staticClass:"smContentB"},[t._v("字段说明：")]),t._v(" "),s("div",{staticClass:"smContentC"},[s("div",[t._v('1."供应商名称"：该供应商的名称(必填)')]),t._v(" "),s("div",[t._v('2."供应商地址"：该供应商的联系地址(必填)')]),t._v(" "),s("div",[t._v('3."联系人"：该供应商的联系人姓名(必填)')]),t._v(" "),s("div",[t._v('4."电话"：该供应商的联系电话(必填)')]),t._v(" "),s("div",[t._v('5."备注"：该供应商的备注信息(选填)')])])]),t._v(" "),s("div",{staticClass:"smContent"},[s("span",{staticClass:"smContentB"},[t._v("备注：")]),t._v(" "),s("div",{staticClass:"smContentC"},[s("div",[t._v('带"*"均为必填项')])])])])]),t._v(" "),s("div",{staticClass:"hellpWrap",staticStyle:{top:"100px"},on:{click:function(e){t.dialogVisible=!0}}},[t._m(4)])],1)])},i,!1,null,"aca753e4",null);l.options.__file="index.vue";e.default=l.exports},dqO4:function(t,e,s){t.exports=s.p+"static/img/hellp.6fec94b.jpg"},prnK:function(t,e,s){"use strict";s.d(e,"a",function(){return n}),s.d(e,"e",function(){return r}),s.d(e,"d",function(){return o}),s.d(e,"c",function(){return l}),s.d(e,"b",function(){return c});var i=s("f0Pt"),a=s.n(i);function n(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/addsupplier",t)}function r(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/getsupplierinfo",t)}function o(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=goods/getsupplierall",t)}function l(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/editesupplierinfo",t)}function c(t){return a.a.post("http://www.wuzhi1688.com/yii2/frontend/web/?r=supplier/deletesupplier",t)}}}]);