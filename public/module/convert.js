function rpx2px(rpx, deviceWidth) {
  const px = (deviceWidth / 750) * Number(rpx);
  return Math.floor(px);
}

function px2rpx(px, deviceWidth) {
  const rpx = (750 / deviceWidth) * Number(px);
  return Math.floor(rpx);
}

export {rpx2px, px2rpx};