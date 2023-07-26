// app.js
App({
  onLaunch: function() {
    // use window height as initial glass height
    const info = wx.getWindowInfo();
    this.windowHeight = info.windowHeight;
    this.windowWidth = info.windowWidth;
    this.safeHeight = Math.floor(info.windowHeight * 0.6);
  },
  // value setting here can be accessed by other pages with calling getApp
  windowHeight: 0,
  windowWidth: 0,
})
