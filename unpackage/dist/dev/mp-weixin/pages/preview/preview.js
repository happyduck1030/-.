"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const userScore = common_vendor.ref(0);
    const maskSkate = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const classList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const readImgs = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const isScore = common_vendor.ref(false);
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const storgClassList = common_vendor.index.getStorageSync(
      "storgClassList"
    );
    classList.value = storgClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    const maskChange = () => {
      maskSkate.value = !maskSkate.value;
    };
    const clickInfoClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const clickScoreClose = () => {
      userScore.value = 0;
      scorePopup.value.close();
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let { classid, _id: wallId } = currentInfo.value;
      let res = await api_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        clickScoreClose();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const clickDownload = async () => {
      common_vendor.index.showLoading({
        title: "下载中...",
        mask: true
      });
      let { classid, _id: wallId } = currentInfo.value;
      api_apis.apiWriteDownload({
        classid,
        wallId
      });
      common_vendor.index.saveImageToPhotosAlbum({
        filePath: currentInfo.value.picurl,
        success: (res) => {
          console.log(res);
          common_vendor.index.showToast({
            title: "保存成功,请到相册查看",
            icon: "none"
          });
        },
        fail: (err) => {
          if (err.errMsg == "saveImageToPhotoAlbum:fail cancel") {
            common_vendor.index.showToast({
              title: "保存失败，请重新下载",
              icon: "none"
            });
          }
          common_vendor.index.showModal({
            title: "提示",
            content: "需要授权保存到相册",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success: (setting) => {
                    console.log(setting);
                    if (["setting.autoSetting[scope.writePhotoAlbum"]) {
                      common_vendor.index.showToast({
                        title: "获取授权成功",
                        icon: "none"
                      });
                    }
                  }
                });
              }
            }
          });
        }
      });
    };
    common_vendor.onLoad((e) => {
      currentId.value = e.id;
      currentIndex.value = classList.value.findIndex((item) => {
        return item._id == currentId.value;
      });
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
      currentInfo.value = classList.value[currentIndex.value];
    });
    const swpierChange = (e) => {
      currentIndex.value = e.detail.current;
      readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
      );
    };
    onShareAppMessage((e) => {
      return {
        title: "壁纸分类",
        path: "/pages/preview/preview ?id=" + currentId.value
      };
    });
    onShareTimeline(() => {
      return {
        title: "壁纸~"
      };
    });
    onunload(() => {
      common_vendor.index.removeStorageSync("storgClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange),
            c: item.picurl
          } : {});
        }),
        c: currentIndex.value,
        d: common_vendor.o(swpierChange),
        e: maskSkate.value
      }, maskSkate.value ? {
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        h: common_vendor.o(($event) => goBack()),
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        l: common_vendor.p({
          type: "info",
          size: "28"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.o(clickScore),
        o: common_vendor.p({
          type: "star",
          size: "28"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.p({
          type: "download",
          size: "28"
        }),
        r: common_vendor.o(clickDownload)
      } : {}, {
        s: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        t: common_vendor.o(clickInfoClose),
        v: common_vendor.t(currentInfo.value.nickname),
        w: common_vendor.p({
          readonly: true,
          touchable: true,
          value: currentInfo.value.score,
          size: "16"
        }),
        x: common_vendor.t(currentInfo.value.score),
        y: common_vendor.t(currentInfo.value.description),
        z: common_vendor.f(currentInfo.value.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab
          };
        }),
        A: common_vendor.sr(infoPopup, "2dad6c07-5", {
          "k": "infoPopup"
        }),
        B: common_vendor.p({
          type: "bottom"
        }),
        C: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        D: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        E: common_vendor.o(clickScoreClose),
        F: common_vendor.t(userScore.value),
        G: common_vendor.o(($event) => userScore.value = $event),
        H: common_vendor.p({
          ["allow-half"]: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        I: currentInfo.value
      }, currentInfo.value ? {} : {}, {
        J: common_vendor.o(submitScore),
        K: !userScore.value || isScore.value,
        L: common_vendor.sr(scorePopup, "2dad6c07-8", {
          "k": "scorePopup"
        }),
        M: common_vendor.p({
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
