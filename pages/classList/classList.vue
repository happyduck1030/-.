<template>
<view class="classList">
	<view class="loadingLayout" v-if="!classifyList.length&&!noData">
		<uni-load-more status="loading"></uni-load-more>
	</view>
<view class="content">
	<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classifyList">
		<image :src="item.smallPicurl" mode="aspectFill"></image>
	</navigator>
</view>
<view class="loadingLayout" v-if="classifyList.length||noData">
		<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
	</view>
	<view class="safe-area-inset-bottom">
		
	</view>
</view>

</template>

<script setup>
import {apiGetClassify,apiGetIntoClassify} from'../../api/apis.js'
import {onMounted, ref} from 'vue'
import{onLoad,onReachBottom} from'@dcloudio/uni-app'
const classifyList=ref([])
const noData=ref(false)
//查询参数
const queryParams={pageNum:1,
pageSize:12
}
//接受上一个页面的参数
onLoad((e)=>{
	let{id=null,name=null}=e;
	queryParams.classid=id
	//修改导航标题
	uni.setNavigationBarTitle({
		title:name
	})
})
onReachBottom(()=>{
	if(noData.value) return
	queryParams.pageNum++
	getIntoClassify()
})
//点击分类的组件进入对应分类
const getIntoClassify = async () => {
	  try {
	    let res = await apiGetIntoClassify(
	     queryParams
		 //这里不和之前一样 没有加对象  因为queryParams本身就是一个对象
		
	    );
		 classifyList.value=[...classifyList.value, ...res.data]
		 if(queryParams.pageSize>res.data.length) noData.value=true
		 uni.setStorageSync(
		 	"storgClassList",classifyList.value
		 )
		 
	  } catch (error) {
	    console.error('API request failed:', error);
	  }
	};
	
	const gotoNext=()=>{
		uni.navigateTo({
			url:`/pages/preview/preview?id=${classifyList.value._id}`
		})
	}
//分享给好友
onShareAppMessage((e)=>{
	return{
		title:"壁纸分类",
		path:"/pages/classList/classList?id="+queryParams.classid  
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return{
		title:"壁纸~"
	}
})


	onMounted(()=>{
	getIntoClassify()
	
	})
</script>

<style lang="scss" scoped>
.classList{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
