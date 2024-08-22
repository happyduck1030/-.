<template>
	<view  class="special">
		<common-title>
			<template #name>专题精选</template>
			<template #custom>
				<view class="text">
					More
				</view>
				</template>
		</common-title>
	
			<view class="content">
				<view v-for="item in classifyList" :key="item._id">
					<navigator 
					:url="`/pages/classList/classList?id=${item._id}&name=${item.name}`" class="box">
						<view class="mask_left">
						{{getTimeDifference(item.updateTime)}}
						</view>
						<image :src="item.picurl" mode="aspectFill" class="img"></image>
						<view class="mask_low">
							{{item.name}}
						</view>
					</navigator>
					
				</view>
				<navigator url="/pages/classList/classList" open-type="reLaunch" class="more" v-if="isMore">
						
						<view class="mask_all">
							<view >
								...
							</view>
							更多内容
						</view>
						<image class="img" src="../../common/image/using/preview1.jpg" mode="aspectFill"></image>
					
				</navigator>
			</view>
		
		
		
	</view>
</template>

<script setup>
	import {getTimeDifference}from "@/utils/common.js"
	import {onMounted, ref} from 'vue'
	import {apiGetClassify,apiGetIntoClassify} from'../../api/apis.js'
	const classifyList=ref([])
	defineProps({
		isMore:{
			type:Boolean,
			default:false
		},
		num:{
			type:Number
		},
		classify:{
			type:Object,
			default(){
				return{
					name:"默认名称",
					sort:'1',
					picurl:'../../common/image/using/classify1.jpg',
					updateTime: Date.now()-1000*60*60*5
				}
				
			}
		}
	})
	
	
	//获取推荐模块
	const getClassify=async()=>{
		let res=await apiGetClassify({
			select:true
		})
		console.log(res)
		classifyList.value=res.data
	}
	
	//进入分类壁纸
	
	onMounted(()=>{
		getClassify()
		getIntoClassify()
	})
</script>

<style lang="scss" scoped>
.special{
	width:750rpx;
	height: 480rpx;
	padding-top: 10rpx;

}
.text{
	line-height: 40rpx;
	font-size: 36rpx;
	color:#C9C9C9;
	padding-left: 60rpx;
}
.content{
	width: 750rpx;
	margin-top: 30rpx;
	padding:0 30rpx ;
	display: grid;
	grid-template-columns:repeat(3,1fr) ;
	gap: 15rpx;
	padding-top:20rpx ;
	padding-bottom: 50rpx;
	.box{
		position: relative;
		height: 340rpx;
		border-radius: 15rpx;
		overflow: hidden;
		.img{
			width: 100%;
			height: 100%;
		}
		.mask_left{
			position: absolute;
			left: 0;
			top: 0;
			background-color: rgba(250, 129, 90, 0.5);
			font-size: 22rpx;
			z-index: 5;
			color: #fff;
			padding: 6rpx 22rpx;
			border-radius: 0 0 20rpx 0;
			backdrop-filter: blur(20rpx);
		}
		.mask_low{
			position: absolute;
			z-index: 5;
			bottom: 0;
			height: 40rpx;
			background-color: (0,0,0,0.2);
			backdrop-filter: blur(50rpx);
			width: 225rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 30rpx;
			font-weight: 560;
			height: 50rpx;
		}
	}
	
}

.more{
	position: relative;
	height: 340rpx;
	border-radius: 15rpx;
	overflow: hidden;
	.img{
		width: 100%;
		height: 100%;
	}
	.mask_all{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: (0,0,0,0.3);
		backdrop-filter: blur(30rpx);
		z-index: 5;
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: 350;
		flex-direction: column;
	}
	
}
</style>