<template>
	<view class="content">
		<view class="box">
			<navigator url="" class="box">
				<view class="mask_left">
					3天前更新
				</view>
				<image src="../../common/image/using/classify1.jpg" mode="aspectFill" class="img"></image>
				<view class="mask_low">
					壁纸内容
				</view>
			</navigator>
			
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	
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
</style>