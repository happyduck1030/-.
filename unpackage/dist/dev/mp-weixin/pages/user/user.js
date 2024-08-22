"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_user_items2 = common_vendor.resolveComponent("user-items");
  _easycom_user_items2();
}
const _easycom_user_items = () => "../../components/user-items/user-items.js";
if (!Math) {
  _easycom_user_items();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const callPhone = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "114"
      });
    };
    const getUserInfo = async () => {
      let res = await api_apis.apiUserInfo();
      userInfo.value = res.data;
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        b: userInfo.value
      }, userInfo.value ? {
        c: common_assets._imports_0,
        d: common_vendor.t(userInfo.value.IP),
        e: common_vendor.t(userInfo.value.address.city || userInfo.value.address.province || userInfo.value.address.country),
        f: common_vendor.o(callPhone),
        g: common_vendor.f(2, (item, k0, i0) => {
          return {
            a: "0f7520f0-3-" + i0
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
