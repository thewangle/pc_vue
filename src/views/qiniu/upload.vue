<template>
  <div style="padding:10px;">
    <el-tag>单个图片上传</el-tag>
    <div class="bar"></div>
    <el-form :inline="true" :model="activityInfo">
      <el-upload
        :http-request="handleUpLoadIconImg"
        :on-preview="handleIconCardPreview"
        :on-remove="handleIconCardicon"
        :limit="1"
        :action="domain"
        :file-list="iconFilelist"
        list-type="picture-card"
      >
        <el-button>上传图片</el-button>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" width="100%" alt="">
      </el-dialog>
    </el-form>
    <div class="bar"></div>
    <el-tag>多张图片上传</el-tag>
    <div class="bar"></div>
    <div class="filePicker">
      <div class="filePicker_div">上传多张图片</div>
      <input
        class="filePicker_inp"
        id="ImgInput"
        type="file"
        name="file"
        multiple
        accept="image/*,vedio/*,audio/*"
        @change="handleImgChange">
    </div>
    <div class="bar"></div>
    <el-tag>文件上传</el-tag>
    <div class="bar"></div>
    <div class="filePicker">
      <div class="filePicker_div">上传excle文件</div>
      <input
        class="filePicker_inp"
        id="fileInput"
        type="file"
        name="file"
        multiple
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change="handleFileChange">
    </div>
    <!-- 进度条 -->
    <div id="progress" v-if='is_progress' class="progress_wrap">
      <div class="progress_wraps">
        <div class="progress_bg"></div>
        <div class="progress_content">
          <el-progress  :percentage='jindu' type="circle"></el-progress>
          <div style="text-align: center;">{{ img_num }} / {{ img_nums }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchQiNiuToken } from './../../service/common' //获取七牛云token
import { qiniuAddress } from './../../config' //获取七牛云仓库绑定的域名
import { MessageBox, Message } from 'element-ui'
export default{
  data() {
    return {
      dialogVisible: false,//图片预览展示diolog是否显示
      dialogImageUrl: '',//图片预览展示图片地址
      activityInfo: { //form表单data
        imgUrl_1: '',
        imgUrl_2: '',
      },
      domain: 'http://upload.qiniup.com/',//上传到七牛云的地址
      iconFilelist: [],//上传文件列表
      is_progress: false,//上传进度条
      jindu: 0,//进度条进度值
      img_num: 0,//已经上传了多少个文件
      img_nums: 0,//上传文件的总个数
      qiniuAddress: qiniuAddress,//七牛云仓库绑定的域名
    }
  },
  methods: {
    // 获取七牛云token
    async _fetchQiNiuToken() {
      const res = await fetchQiNiuToken()
      const { data } = res
      return data
    },
    //自定义上传函数
    handleUpLoadIconImg(req) {
      let type = 'one'
      this._uploadQiNiu(req)//封装的上传七牛云函数
    },
    //图片预览放大
    handleIconCardPreview() {
      this.dialogImageUrl = this.activityInfo.imgUrl_1
      this.dialogVisible = true
    },
    //移除图片时的钩子函数
    handleIconCardicon() {
      this.activityInfo.imgUrl_1 = 'src/assets/404_images/bg_img.jpg'
      this.dialogImageUrl = this.activityInfo.imgUrl_1
    },
    // 上传七牛云
    async _uploadQiNiu(req, type) {
      // this.is_progress=true //进度条展现
      const config = { //进度条百分比
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          this.jindu=progressEvent.loaded / progressEvent.total * 100 | 0
        }
      }
      const fileType = req.file.type.split('/')[1] //获取到上传的文件
      // 重命名要上传的文件
      const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + '.' + fileType
      const token = await this._fetchQiNiuToken() //上传七牛云token
      const formData = new FormData() //创建FormData对象，用来以键值对的方式存储form表单data
      formData.append('token', token)
      formData.append('key', keyname)
      let that=this
      if(req.file.size/1024 > 1025) { //大于1M，进行压缩上传
          if(req.file.type.indexOf("image/")==-1){ //如果传的不是图片
            formData.append('file', req.file) //将文件添加到formdata
            axios.post(this.domain, formData, config).then(res => {
              const url = this.qiniuAddress + '/' + res.data.key
              if (type === 'one') {
                this.activityInfo.imgUrl_1 = url
              }
              this.is_progress = false  //进度条关闭
              this.jindu = 0 //进度值清零
            })
          } else {
            this.photoCompress(req.file, {  //传的是图片的话进行图片压缩
                quality: 0.2
            }, function(base64){
                let bl = that.convertBase64UrlToBlob(base64);
                bl.uid=req.file.uid
                bl.name=req.file.name
                bl.uid=req.file.uid
                bl.lastModified=req.file.lastModified
                bl.lastModifiedDate=req.file.lastModifiedDate
                bl.webkitRelativePath=req.file.webkitRelativePath
                formData.append('file', bl); // 文件对象
                axios.post('http://upload.qiniup.com/', formData, config).then(res => {
                  const url = that.qiniuAddress + '/' + res.data.key
                  if (type === 'one') {
                    that.activityInfo.imgUrl_1 = url
                  }
                  that.is_progress = false
                  that.jindu = 0
                })
            });
          }
      }else{
        formData.append('file', req.file)
        axios.post(this.domain, formData, config).then(res => {
          const url = this.qiniuAddress + '/' + res.data.key
          if (type === 'one') {
            this.activityInfo.imgUrl_1 = url
          }
          this.is_progress = false
          this.jindu = 0
        })
      }
    },
    //多张图片上传
    async handleImgChange(e) {
      // this.is_progress=true
      const ImgObj = {}
      const ImgInput = document.querySelector('#ImgInput') //获取input标签
      const length = ImgInput.files.length //上传文件的个数
      this.img_nums = length //用于进度条进度值
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let count = 0;
      for(let item of ImgInput.files) { //对上传文件进行for循环
        this.img_num = this.img_num + 1
        this.jindu = Math.floor(this.img_num / (length) * 100)//计算进度百分比
        if (this.img_num == this.img_nums) {//判断如果是最后一个文件的时候处理进度条相关
          this.is_progress = false
          this.jindu = 0
          this.img_num = 0
        }
        const fileType = item.type.split('/')[1]
        const keyname = 'top-team' + Date.now() + '' + (Math.random() * 100) + '.' + fileType
        const token = await this._fetchQiNiuToken()
        const formData = new FormData()
        formData.append('token', token)
        formData.append('key', keyname)
        let that=this
        if (/image\/\w+/.test(item.type) && item.size > 1024000) {//如果是图片并且大于1M进行压缩
          this.photoCompress(item, {
              quality: 0.2
          }, function(base64){
              let bl = that.convertBase64UrlToBlob(base64);
              bl.uid=item.uid
              bl.name=item.name
              bl.uid=item.uid
              bl.lastModified=item.lastModified
              bl.lastModifiedDate=item.lastModifiedDate
              bl.webkitRelativePath=item.webkitRelativePath
              formData.append('file', bl); // 文件对象
              axios.post('http://upload.qiniup.com/', formData, config).then(res=>{
                const url = that.qiniuAddress + '/' + res.data.key
                const name = item.name.split('.')[0]
                ImgObj[name] = url
                console.log(Object.keys(ImgObj).length)
                if (Object.keys(ImgObj).length === length) {//判断是否是最后一个文件
                  axios.post(//如果是最后一个,把文件列表发给后端，用于分配
                    '/i/topteam/admin/MatchTaskPic',
                    {match_list: JSON.stringify(ImgObj)}
                  ).then(res=>{
                    if (!res.data.error_code) {
                      that.$message({ message: '上传成功', type: 'success' })
                      that._fetchTaskList(that.activityId)
                    } else {
                      that.$message({ message: res.data.error_msg, type: 'error' })
                    }
                    e.target.value = ''
                  })
                }
              })
          });
        }else{
          formData.append('file', item)
          try {
            await axios.post('http://upload.qiniup.com/', formData, config).then(res=>{
              const url = this.qiniuAddress + '/' + res.data.key
              const name = item.name.split('.')[0]
              ImgObj[name] = url
              console.log(Object.keys(ImgObj).length)
              if (Object.keys(ImgObj).length === length) {
                axios.post(
                  '/i/topteam/admin/MatchTaskPic',
                  { activity_id: this.activityId, match_list: JSON.stringify(ImgObj) }
                ).then(res=>{
                  if (!res.data.error_code) {
                    this.$message({ message: '上传成功', type: 'success' })
                    this._fetchTaskList(this.activityId)
                  } else {
                    this.$message({ message: res.data.error_msg, type: 'error' })
                  }
                  e.target.value = ''
                })
              }
            })
          } catch (error) {
            console.log(error)
            e.target.value = ''
            this.$message({message: '有图片上传失败，请重新上传全部图片', type: 'error'})
          }
        }
      }
    },
    // 文件上传
    handleFileChange(e) {
      // this.is_progress=true
      const fileInput = document.querySelector('#fileInput')
      const formData = new FormData()
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          this.jindu=progressEvent.loaded / progressEvent.total * 100 | 0
        }
      }
      formData.append('file', fileInput.files[0])
      axios.post('/i/aaa/admin/importTask', formData, config).then(res => {
        const data = res.data
        if (data.error_code !== 0) {
          this.$message({ message: data.error_msg, type: 'error' })
          e.target.value = ''
        } else {
          this.$message({ message: '导入成功', type: 'success' })
          e.target.value = ''
        }
        this.is_progress = false
        this.jindu = 0
      })
    },
  }
}
</script>
<style scope>
.bar {
  width: 100%;
  height: 2px;
  background: #DCDFE6;
  border-radius: 10px;
  margin: 20px 0;
}
.progress_wrap{
  width:100%;height:100%;
  position: absolute;top: 0;left: 0;z-index:9999;
}
.progress_wrap{
  width:100%;height:100%;
  display:flex;justify-content: center;align-items: center;
}
.filePicker {
  position: relative;
  width: 120px;
  height: 36px;
  cursor: pointer;
  color: white;
  border-radius: 10px; 
}
.filePicker_inp:hover {
  cursor: pointer;
}
.filePicker_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 36px;
  background: #409eff;
  z-index: 1
}
.filePicker_inp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}
</style>
