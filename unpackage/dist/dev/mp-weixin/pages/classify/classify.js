"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_com_sepcial2 = common_vendor.resolveComponent("com-sepcial");
  (_easycom_custom_nav_bar2 + _easycom_com_sepcial2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_com_sepcial = () => "../../components/com-sepcial/com-sepcial.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_com_sepcial)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      title: "分类"
    }),
    b: common_vendor.p({
      num: 15
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bcfa975"]]);
wx.createPage(MiniProgramPage);
