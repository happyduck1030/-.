const  BASE_URL='https://tea.qingnian8.com/api/bizhi'


//封装request
export function request(config={}){
	 
	let {url,
	method="GET",
	data={},
	}=config
	url=BASE_URL+url
	console.log('Request URL:', url);
	
	  
	return new Promise((resolve,reject)=>{
		uni.request({
			 url,
			      method, // 添加 method
			      data, // 添加 data
			      header: { "access-key": "202076" },
			success:res=>{
				if(res.data.errCode===0)
				{
					resolve(res.data)
				}else if(res.data.errCode===400)
				{
					uni.showModal({
						title:"错误提示",
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title:res.data.errMsg,
						icon:"none"
					})
					reject(res.data)
				}
				
			},
			fail:err=>{
				reject(err )
			}
		})
	})
	
}