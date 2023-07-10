// app.js
App({
  onLaunch: function() {
    // use window height as initial glass height
    const info = wx.getWindowInfo();
    this.windowHeight = info.windowHeight;
  },
  // value setting here can be accessed by other pages with calling getApp
  windowHeight: 0
})
