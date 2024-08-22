<template>
<view class="userLayout"> 
<view :style="{height:getNavBarHeight()+'px'}">
	
</view>
	<view class="userInfo pageBg" v-if="userInfo">
		<view class="avatar">
			<image src="../../static/image/xxmLogo.png" mode="aspectFill"></image>
		</view>
		<view class="ip">
			{{userInfo.IP}}
		</view>
		<view class="address">
			来自于：{{userInfo.address.city||userInfo.address.province || userInfo.address.country}}
		</view>
		
		<view class="section">
			<user-items></user-items>
			<user-items></user-items>
			<user-items>
				<template #function>联系客服</template>  
			</user-items>
			<!-- #ifdef MP -->
				<button class="contact" open-type="contact">联系客服</button>
			<!-- #endif -->
			<!-- #ifndef APP -->
				<button class="contact" @click="callPhone"></button>
			<!-- #endif -->
		
		</view>
		<view class="other">
			<user-items v-for="item in 2" ></user-items>
		</view>
	</view>
	
<!-- <view v-else class="loadingLayout" >
	<view :style="{height:getNavBarHeight()+'px'}">
		
	</view>
	<uni-load-more status="loading"></uni-load-more>
</view> -->
</view>

</template>

<script setup>
	import {getNavBarHeight}from '@/utils/system.js'
	import {apiUserInfo} from '@/api/apis.js'
	import {onMounted, ref} from 'vue'
	
	const userInfo=ref(null)
const callPhone=()=>{
	uni.makePhoneCall({
		phoneNumber:"114"
	})
}
const getUserInfo=async()=>{
	let res=await apiUserInfo()
	userInfo.value=res.data
}
onMounted(()=>{
	getUserInfo()
})
</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address{
			font-size: 28rpx;
			color: #aaa;
			padding-bottom: 100rpx;
		}
		.section{
			width: 690rpx;
			margin:0 auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			// box-shadow: 0 0 30rpx rgba(0,0,0,0.1); 
			position: relative;
			.contact{
				position: absolute;
				height: 100rpx;
				width: 690rpx;
				background-color: blue;
				top: 210rpx;
				opacity: 0;
			}
		}
		.other{
			padding-top:60rpx ;
		}
	}
	
}
</style>
