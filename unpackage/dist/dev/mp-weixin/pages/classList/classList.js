"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const queryParams = {
      pageNum: 1,
      pageSize: 12
    };
    common_vendor.onLoad((e) => {
      let { id = null, name = null } = e;
      queryParams.classid = id;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getIntoClassify();
    });
    const getIntoClassify = async () => {
      try {
        let res = await api_apis.apiGetIntoClassify(
          queryParams
          //这里不和之前一样 没有加对象  因为queryParams本身就是一个对象
        );
        classifyList.value = [...classifyList.value, ...res.data];
        if (queryParams.pageSize > res.data.length)
          noData.value = true;
        common_vendor.index.setStorageSync(
          "storgClassList",
          classifyList.value
        );
      } catch (error) {
        console.error("API request failed:", error);
      }
    };
    onShareAppMessage((e) => {
      return {
        title: "壁纸分类",
        path: "/pages/classList/classList?id=" + queryParams.classid
      };
    });
    onShareTimeline(() => {
      return {
        title: "壁纸~"
      };
    });
    common_vendor.onMounted(() => {
      getIntoClassify();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classifyList.value.length && !noData.value
      }, !classifyList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id
          };
        }),
        d: classifyList.value.length || noData.value
      }, classifyList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-104357ab"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
