"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({});
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        }),
        b: common_vendor.t(detail.value.title),
        c: common_vendor.t(detail.value.author),
        d: common_vendor.p({
          date: Date.now(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        e: common_vendor.p({
          content: detail.value.content
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
