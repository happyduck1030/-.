<template>
<view class="preview" v-if="currentInfo">
<swiper  :current="currentIndex" @change="swpierChange">
	<swiper-item v-for=" (item,index) in classList" key="item._id">
		<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFit"></image>
	</swiper-item>
	</swiper>
	<view class="mask" v-if="maskSkate">
		<view class="goBack" :style="{top:getStatusBarHeight()+'px'}" @click="goBack()">
			<uni-icons type="back" color="#fff" size="20"></uni-icons>
		</view>
		<view class="count">
			{{currentIndex+1}}/{{classList.length}}
		</view>
		<view class="time">
			10:10
		</view>
		<view class="date">
			<uni-dateformat :date="new Date()" format="MM月dd日"> </uni-dateformat>
		</view>
		<view class="footer">
			<view class="box">
				<uni-icons type="info" size="28"></uni-icons>
				<view class="text" @click="clickInfo">
					信息
				</view>
			</view>
			<view class="box" >
				<uni-icons type="star" size="28"  @click="clickScore"></uni-icons>
				<view class="text">
					{{currentInfo.score}}
				</view>
			</view>
			<view class="box" @click="clickDownload">
				<uni-icons type="download" size="28"></uni-icons>
				<view class="text">
					下载
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="infoPopup" type="bottom">
		<view class="infoPopup">
			<view class="popHeader">
				<view class="">
					
				</view>
				<view class="title">
					壁纸信息
				</view>
				<view class="close" @click="clickInfoClose">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>
			<scroll-view scroll-y >
				<view class="content">
					<view class="row">
						<view class="label">
							分类:
						</view>
						<text selectable class="value class">明星美女</text>
					</view>
					<view class="row">
						<view class="label">
							发布者
						</view>
						<text class="value">
							{{currentInfo.nickname}}
						</text>
					</view>
					<view class="row">
						<text class="label">评分：</text>
						<view class="value roteBox">
							<uni-rate readonly touchable :value="currentInfo.score" size="16"/>
							<text class="score">{{currentInfo.score}}分</text>
						
						</view>
					</view>
					<view class="row">
							<text class="label">
								摘要:
							</text>
							<view class="value">
								{{currentInfo.description}}
							</view>
					</view>
					<view class="row">
						<view class="label">
							标签:
						</view>
						<view class="value tabs">
							<view class="tab" v-for="tab in currentInfo.tabs" :key="tab">
								{{tab}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
	
	<uni-popup ref="scorePopup" :is-mask-click="false">
		<view class="scorePopup">
			<view class="popHeader">
				<view class="">
				</view>
				<view class="title">
					{{isScore?'评分过了~':'壁纸评分'}}
				
				<view class="close" @click="clickScoreClose">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
				</view>
			</view>
			<view class="content">
				<uni-rate v-model="userScore" allow-half :disabled="isScore" disabled-color="#FFCA3E">
					<text class="text">{{userScore}}分</text>
				</uni-rate>
				<view class="footer" v-if="currentInfo">
					<!-- <button type="default" size="mini" plain></button> -->
				</view>
			</view>
			<view class="footer">
				<button @click="submitScore" :disabled="!userScore||isScore" type="defult" size="mini" plain>确认评分</button>
			</view>
		</view>
	</uni-popup>
</view>

</template>

<script setup> 
import { ref } from 'vue';
import {onLoad}from '@dcloudio/uni-app'
import { getStatusBarHeight } from '@/utils/system.js';
import {apiGetSetupScore,apiWriteDownload }from '@/api/apis.js'
const userScore=ref(0)
const maskSkate = ref(true)
const infoPopup=ref(null)
const scorePopup=ref(null)
const classList=ref([])
const currentId= ref(null)
const currentIndex=ref(0)
const readImgs=ref([])
const currentInfo=ref(null)
const isScore=ref(false)
const clickInfo=()=>{
	infoPopup.value.open()
	//open是组件的内置方法
	//默认点击空白处会关闭弹窗 
}
const storgClassList=uni.getStorageSync(
	'storgClassList'
)
// console.log(storgClassList)
classList.value=storgClassList.map(item=>{
	return {
		...item,
		picurl:item.smallPicurl.replace("_small.webp",".jpg")
	}
})

//遮罩层状态
const maskChange=()=>{
	maskSkate.value=!maskSkate.value
}

//点击关闭信息弹窗
const clickInfoClose=()=>{
	infoPopup.value.close()
}
//评分弹窗
const clickScore=()=>{
	if(currentInfo.value.userScore)
	{
		isScore.value=true
		userScore.value=currentInfo.value.userScore
	}
	scorePopup.value.open()
}
//关闭评分
const clickScoreClose=()=>{
	userScore.value=0
	scorePopup.value.close();
	isScore.value=false
}
//确认评分
const submitScore=async()=>{
	uni.showLoading({
		title:"加载中..."
	})
	let {classid,_id:wallId}=currentInfo.value
	let res=await apiGetSetupScore({
		classid,
		wallId,
		userScore:userScore.value
	})
	uni.hideLoading()
	if(res.errCode===0)
	{
		uni.showToast({
			title:"评分成功",
			icon:"none"
		})
		classList.value[currentIndex.value].userScore=userScore.value
		uni.setStorageSync("storgClassList",classList.value)
		clickScoreClose()
	}

}

//返回上一页
 const goBack=()=>{
	 // 这里捕获错误的目的是分享的时候被分享用户可以点击返回进入我们的小程序首页
	 uni.navigateBack({
		 success:()=>{
			
		 },
		 fail:(err)=>{
			 uni.reLaunch({
			 	url:"/pages/index/index"
			 })
		 }
})
 }
 
 //点击下载
 const clickDownload=async()=>{
	 //#ifdef H5
	 uni.showModal({
		 content:"请长按保存壁纸",
		 showCancel:false
	 })
	 // #endif
	 
	 //#ifndef H5
	 uni.showLoading({
	 	title:"下载中...",
		mask:true
	 })
	 let {classid,_id:wallId}=currentInfo.value
	let res= apiWriteDownload({
		 classid,
		 wallId
	 })
	 	uni.saveImageToPhotosAlbum({
	 		filePath:currentInfo.value.picurl,
	 		success:(res)=>{
	 			console.log(res)
				uni.showToast({
					title:"保存成功,请到相册查看",
					icon:"none"
				})
	 		},
			fail:err=>{
				if(err.errMsg=='saveImageToPhotoAlbum:fail cancel')
				{
					uni.showToast({
						title:"保存失败，请重新下载",
						icon:"none"
					})
				}
				uni.showModal({
					title:"提示",
					content:"需要授权保存到相册",
					success:res=>{
						if(res.confirm)
						{
							uni.openSetting({
								success: (setting)=>{
									console.log(setting)
									if(['setting.autoSetting[scope.writePhotoAlbum'])
									{
										uni.showToast({
											title:"获取授权成功",
											icon:"none"
										})
									}else{
										title:"获取权限失败"
									}
								}
							})
						}
					}
					
				})
			}
	 	})
 }
 
 //#endif
 //接收参数
onLoad((e)=>{
	currentId.value=e.id
	currentIndex.value = classList.value.findIndex(item=>{
		return item._id==currentId.value
	})
	readImgs.value.push(
	currentIndex.value<=0 ? classList.value.length-1:currentIndex.value-1,
	currentIndex.value,
	currentIndex.value>=classList.value.length-1 ? 0 :currentIndex.value+1
	)
		currentInfo.value=classList.value[currentIndex.value]
	
})

//接收swiper的图片序号渲染到页面
const swpierChange=(e)=>{
	currentIndex.value=e.detail.current
	readImgs.value.push(currentIndex.value<=0 ? classList.value.length-1:currentIndex.value-1,
	currentIndex.value,
	currentIndex.value>=classList.value.length-1 ? 0 :currentIndex.value+1)

}


//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"壁纸分类",
		path:"/pages/preview/preview ?id="+currentId.value  
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"壁纸~"
	}
})
//这里进行一个缓存的清空 避免串台
onunload(()=>{
	uni.removeStorageSync("storgClassList")
})

</script>

<style lang="scss" scoped>
	.preview{
		position: relative;
		width: 100%;
		height: 100vh ;
		
		swiper{
			width: 100%;
			height: 100%;
			position: relative;
		}
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mask{
	

	
	
		&>view{
			position: absolute;
			left: 0;
			margin: auto;
			color: #fff;
			margin: auto;
			right: 0;
			width: fit-content;
			
		}
		.goBack{
			position: absolute;
			width: 50rpx;
			height: 50rpx;
			background: rgba(0,0,0,0.5);
			left: 30rpx !important;
			margin-left: 0;
			border-radius:100px ;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255,255,255,0.3);
			display: flex;
			justify-content: center;
			align-items: center;
		}
			
		.count{
			
			top: 10vh;
			background: rgba(0,0,0,0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 29rpx;
			backdrop-filter:blur(10rpx) ;
		}
		.time{
			font-size: 140rpx;
			top:calc(10vh + 80rpx );
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0,0,0,0.3);
		}
		.date{
			font-size: 34rpx;
			top: calc(10vh + 210rpx);
			text-shadow: 0 2rpx rgba(0,0,0,0.3);
		}
		.footer{
			background-color: rgba(255,255,255,0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0,0,0,0.1);
			backdrop-filter: blur(20rpx);
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 2rpx 12rpx;
		
				.text{
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}

	.infoPopup{
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		.popHeader{
			display: flex;
			justify-content: center;
			align-items: center;
			.title{
				color: $text-font-color-2;
				font-size: 26rpx;
			}
			.close{
		
				padding: 6rpx;
			}
		}
		scroll-view{
			max-height: 60vh;
			.content{
				.row{
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex: 1;
						width: 0;
						padding-left: 30rpx;
					}
					.roteBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color: $text-font-color-2;
							padding: 20rpx; 
						}
					}
					.tabs{
						display: flex;
						flex-wrap: wrap;
						.tab{
							border: 1px solid $brand-theme-color;
							color:$brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.class{
						color: $brand-theme-color;
					}
				}
			}
		}
	}

	.scorePopup{
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.title{
			display: flex;
			.close{
				padding-left: 300rpx;
			}
		}
		.content{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color:#FFCA3E;
				padding-left:10rpx ;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
			
			}
			.footer{
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
	}
</style>
