<template>
<view class="noticeLayout">
<view class="title">
	<view class="tag">
		<uni-tag :inverted="true" text="置顶" type="error"></uni-tag>
	</view>
	<view class="font">
		{{detail.title}}
	</view>
</view>
<view class="info">
	<view class="item">
		{{detail.author}}
	</view>
	<view class="item">
		<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss" />
	</view>
</view>
<view class="content">
	<mp-html :content="detail.content"></mp-html>
</view>
</view>

</template>

<script setup>
	import {apiNoticeDetail}from '@/api/apis.js'
	import{ref} from'vue'
	const detail=ref({})
const getNoticeDetail=async()=>{
	let res =await apiNoticeDetail()
	detail.value=res.data
}
</script>

<style lang="scss" scoped>

</style>
