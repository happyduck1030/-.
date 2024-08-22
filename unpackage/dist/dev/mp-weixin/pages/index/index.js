"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_day_recommand2 = common_vendor.resolveComponent("day-recommand");
  const _easycom_com_sepcial2 = common_vendor.resolveComponent("com-sepcial");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_day_recommand2 + _easycom_com_sepcial2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_day_recommand = () => "../../components/day-recommand/day-recommand.js";
const _easycom_com_sepcial = () => "../../components/com-sepcial/com-sepcial.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_day_recommand + _easycom_com_sepcial)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const getBanner = async () => {
      let res = await api_apis.apiGetBanner();
      bannerList.value = res.data;
    };
    const getNotice = async () => {
      let res = await api_apis.apiGetNotice();
      noticeList.value = res.data;
    };
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "壁纸~"
      };
    });
    common_vendor.onMounted(() => {
      getBanner();
      getNotice();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        c: common_vendor.p({
          type: "notification-filled",
          size: "20",
          color: "#28b389"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.p({
          isMore: true,
          num: 8
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
