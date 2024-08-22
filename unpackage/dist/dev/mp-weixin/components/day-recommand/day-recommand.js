"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../common-title/common-title.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title)();
}
const _sfc_main = {
  __name: "day-recommand",
  setup(__props) {
    const dailyList = common_vendor.ref([]);
    const goPreview = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
      common_vendor.index.setStorageSync("strogClassList", dailyList.value);
    };
    const getDailyRecommand = async () => {
      let res = await api_apis.apiGetDayRandom();
      dailyList.value = res.data;
    };
    common_vendor.onMounted(() => {
      getDailyRecommand();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "calendar-filled",
          size: "30",
          color: "#28b389"
        }),
        b: common_vendor.p({
          date: Date.now(),
          format: "dd号"
        }),
        c: common_vendor.f(dailyList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-261782a3"]]);
wx.createComponent(Component);
