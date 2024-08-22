<template>
	<view class="pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="homeLayout">
				<!-- 轮播图 -->
			<view class="banner">
			<swiper class="swiper" indicator-dots=true indicator-color=rgba(255,255,255,0.5) 
			indicator-active-color=#eee autoplay=true circular=true
			> 
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
				
			</swiper>
			</view>
			<view class="notice">
				<view class="left">
					<uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">公告</view>
				</view>
				<view class="center">
					<swiper autoplay interval="4000" vertical duration="200"> 
						<swiper-item v-for="item in noticeList" :key="item._id">{{item.title}}</swiper-item>
						
					</swiper>
				</view>
				<view class="right">
						<uni-icons type="right" size="20" color="#28b389"></uni-icons>
				</view>
			</view>
			
			<!-- 每日推荐模块 -->
				<day-recommand>
				</day-recommand>
				
				<!-- 专题精选模块 -->
				<com-sepcial :isMore=true :num=8></com-sepcial>
		</view>
	</view>


</template>

<script setup>
import { onMounted } from 'vue';
import{apiGetBanner,apiGetNotice}from '@/api/apis.js'
import {onShareAppMessage,onShareTimeline}from '@dcloudio/uni-app'
import{ref} from 'vue';

const bannerList=ref([])
const dailyList=ref([])
const noticeList=ref([])

//跳转到公告
const goNotice=()=>{
	uni.navigateTo({
		url:"/pages/notice/detail"
	})
}

//获取轮播图信息
const getBanner= async()=>{
	let res=await apiGetBanner()
	bannerList.value=res.data
	
}

//获取公告信息
const getNotice=async()=>{
	
	let res=await apiGetNotice()
	noticeList.value=res.data
}


//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"壁纸",
		path:"/pages/index/index"
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"壁纸~"
	}
})


//执行函数
onMounted(()=>{
	getBanner()
getNotice()

})


</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		padding: 30rpx 30rpx;
		.swiper{
			width: 690rpx;
			height: 340rpx;
			 item{
				width: 690rpx;
				padding: 0 30rpx;
			}
		   image{
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		display:flex;
		background-color: #f9f9f9;
		border-radius: 80rpx;
		line-height: 80rpx;
		margin-left: 30rpx;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text{
				color: #28b389;
				font-weight: bold;
				font-size: 30rpx;
			}
		}
		.center{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			swiper{
				height: 80rpx;
				width: 100%;
				&-item{
					height: 80rpx;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space:nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
	}
	
	
}
</style>
