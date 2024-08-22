<template>
	<view class="common-title">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.common-title{
	display: flex;
	padding-top: 50rpx;
	padding-left: 30rpx;
	
	.name{
		font-weight: bold;
		font-size: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		width: 490rpx;
	}
	.custom{
		width: 200rpx;
	}
}
</style>