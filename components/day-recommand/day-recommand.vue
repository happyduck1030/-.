<template>
	<common-title>
		<template #name>每日推荐</template>
		<template #custom>
			<view class="title">
				<uni-icons type="calendar-filled" size="30" color="#28b389"></uni-icons>
				<view class="text">
					<uni-dateformat :date="Date.now()" format='dd号'></uni-dateformat>
				</view>
				
			</view>
			
		</template>
	</common-title>
	<!-- 内容部分 -->
	<view class="select">
		<view class="content">
			<scroll-view scroll-x scroll-with-animation	show-scrollbar=false>
				<view class="img" v-for="item in dailyList" :key="item._id" @click="goPreview(item._id)">
					<image :src="item.smallPicurl" mode="aspectFill" ></image>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script setup>
	import { onMounted } from 'vue';
	import{apiGetDayRandom}from '../../api/apis.js'
	import{ref} from 'vue';
	
	const dailyList=ref([])
	
	const goPreview=(id)=>{
		uni.navigateTo({
			 url:"/pages/preview/preview?id="+id
		})
	uni.setStorageSync("strogClassList",dailyList.value)
	}
	
	//获取每日推荐
	const getDailyRecommand=async()=>{
		let res=await apiGetDayRandom()
		dailyList.value=res.data
	}
	
	onMounted(()=>{
		getDailyRecommand()
	})
</script>

<style lang="scss" scoped>
.select{
		width:750rpx;
		height: 480rpx;
		padding-top: 50rpx;
		padding-left: 30rpx;
		.content{
			display: flex;
			width: 720rpx;
			scroll-view{
				white-space: nowrap;
				.img{
						width: 250rpx;
						height: 430rpx;
						display: inline-block;
						margin-right:15rpx;
						image{
							width: 100%;
							height: 100%;
						}
				}
			}
		}
	}

.title{
	
		font-size: 30rpx;
		justify-content: center;
		align-items: center;
		line-height: 40rpx;
		color: #28b389;
		display: flex;
		.text{
			padding-left: 20rpx;
		}
	}
</style>