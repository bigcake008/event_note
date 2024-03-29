// pages/tem.js
const floors = [
                {
                  index: 10,
                  rooms: ["1001", "1002", "1003", "1004", "1005"]
                },               {
                  index: 9,
                  rooms: ["901", "902", "903"]
                },               {
                  index: 8,
                  rooms: ["800", "801"]
                },
                {
                  index: 7,
                  rooms: ["702", "701"]
                },
                {
                  index: 6,
                  rooms: ["601", "602", "606", "608"]
                },
                 {
                  index: 5,
                  rooms: ["501", "502", "5a"]
                }, 
                {
                  index: 4,
                  rooms: ["401", "402"]
                },
                {
                  index: 3,
                  rooms: ["301", "302"]
                },
                {
                  index: 2,
                  rooms: ["201", "202", "203", "204", "205", "206", "207", "208"               ]
                },
                {
                  index: 1,
                  rooms: ["101", "102", "103", "104", "105", "106", "107", "108"               ]
                }
              ];
var app = getApp();

Page({

  data: {
    index: "",
    location: "",
    floors: floors,
    glassHeight: 0,
    tappedButton: "",
    focusIndex: 0,
  },

  onLoad(options) {
    this.setData({
      index: options.index,
      location: options.location,
    })
  },

  handleAddFloor: function(evt) {
    const n = this.data.floors.length;
    this.data.floors.unshift({
                              index: n+1, 
                              sign: `counter_${n+1}`, 
                              rooms: []
                              });
    this.setData({
      floors: this.data.floors
    })
  },

  handleRemoveFloor: function(evt) {
    this.data.floors.shift();
    this.setData({
      floors: this.data.floors
    })
  },
  
  handleShowInput: function(evt) {
    this.setData({
      glassHeight: app.windowHeight,
      // focusIndex: evt.detail,
    })
  },

  handleHideInput: function(evt) {
    this.setData({
      glassHeight: 0,
      tappedButton: "",
    })
  },

  handleRoomTap: function(evt) {
    const hid = this.data.index;
    const rid = evt.detail.index;
    wx.navigateTo({
      url: `../roomPage/roomPage?hid=${hid}&rid=${rid}`,
    })
  },

  handleFocusFloor: function(evt) {
    let focusIndex = evt.detail;
    if (this.data.focusIndex === focusIndex) {
      focusIndex = 0;
    }
    this.setData({focusIndex: focusIndex, 
                  glassHeight: 0,
                  tappedButton: ""
                });
  }

})