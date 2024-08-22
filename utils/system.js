//获取系统状态栏的信息
	const SYSTEM_INFO=uni.getSystemInfoSync()
	export const getStatusBarHeight=()=>SYSTEM_INFO.statusBarHeight||15

//获取胶囊按钮的信息
	export const getTitleBarHeight=()=>{
		if(uni.getMenuButtonBoundingClientRect())
		{
			let{top,height}=uni.getMenuButtonBoundingClientRect();
			return height+(top-getStatusBarHeight())*2
		}else{
			return 40;
		}
	}
	export const getNavBarHeight=()=>{
		return getStatusBarHeight()+getTitleBarHeight()
	}