<template>
	<view class="section">
		<view class="list">
			<view class="row" >
				<view class="left">
					<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
					<view class="text">
					<slot  name="function"></slot>
					</view>
					
				</view>
				<view class="right">
					<view class="text">
						slot
					</view>
					<uni-icons type="right" size="20" color="777"></uni-icons>
				</view>
			</view>
		</view>
	</view></template>

<script setup>
	
</script>

<style lang="scss" scoped>
.list{
	.row{
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		height: 100rpx;
	
		border-bottom: 1px solid #eee;
		&:last-child{border-bottom: 0;}
		.left{
			display: flex;
			align-items: center;
			color: $text-font-color-1;
			font-size: 33rpx;
			.text{
				padding-left: 20rpx;
				
			}
		}
		.right{
			display: flex;
			align-items: center;
			color: $text-font-color-1;
		}
	}
}
</style>