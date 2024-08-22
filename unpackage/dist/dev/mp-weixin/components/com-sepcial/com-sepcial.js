"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  _easycom_common_title2();
}
const _easycom_common_title = () => "../common-title/common-title.js";
if (!Math) {
  _easycom_common_title();
}
const _sfc_main = {
  __name: "com-sepcial",
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number
    },
    classify: {
      type: Object,
      default() {
        return {
          name: "默认名称",
          sort: "1",
          picurl: "../../common/image/using/classify1.jpg",
          updateTime: Date.now() - 1e3 * 60 * 60 * 5
        };
      }
    }
  },
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const getClassify = async () => {
      let res = await api_apis.apiGetClassify({
        select: true
      });
      console.log(res);
      classifyList.value = res.data;
    };
    common_vendor.onMounted(() => {
      getClassify();
      getIntoClassify();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(utils_common.getTimeDifference)(item.updateTime)),
            b: item.picurl,
            c: common_vendor.t(item.name),
            d: `/pages/classList/classList?id=${item._id}&name=${item.name}`,
            e: item._id
          };
        }),
        b: __props.isMore
      }, __props.isMore ? {
        c: common_assets._imports_0$1
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f6d1f03"]]);
wx.createComponent(Component);
