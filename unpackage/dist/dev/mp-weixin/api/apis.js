"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner",
    method: "POST"
  });
}
function apiGetDayRandom() {
  return utils_request.request({ url: "/randomWall" });
}
function apiGetNotice(data) {
  return utils_request.request({
    url: "/wallNewList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetIntoClassify(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiGetSetupScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiWriteDownload(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiUserInfo(data = {}) {
  return utils_request.request({
    url: "/userInfo",
    data
  });
}
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetIntoClassify = apiGetIntoClassify;
exports.apiGetNotice = apiGetNotice;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apiUserInfo = apiUserInfo;
exports.apiWriteDownload = apiWriteDownload;
