// pages/tem.js
const floors = [
                {
                  index: 10,
                  rooms: ["1001", "1002", "1003", "1004", "100000005"]
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
                  rooms: ["601", "602", "606", "608", "609", "610"]
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
    focusIndex: 0,
    focus: false,
    status: "",
  },

  onLoad(options) {
    this.setData({
      index: options.index,
      location: options.location,
    })
  },

  handleHouseTap: function() {
    console.log("house tapped");
    wx.navigateBack();
  },

  handleAddFloor: function(evt) {
    const n = this.data.floors.length;
    this.data.floors.unshift({
      index: n+1, 
      sign: `counter_${n+1}`, 
      rooms: []
    });
    this.setData({floors: this.data.floors});
  },

  handleRemoveFloor: function(evt) {
    this.data.floors.shift();
    this.setData({floors: this.data.floors});
  },
  
  handleRoomTap: function(evt) {
    const houseIndex = this.data.index;
    const roomIndex = evt.detail.index;
    wx.navigateTo({
      url: `../roomPage/roomPage?houseIndex=${houseIndex}&roomIndex=${roomIndex}`,
    });
  },

  handleFocus: function(evt) {
    this.setData({
      focusIndex: evt.detail.index,
    });
  },

  handleUnfocus: function() {
    this.setData({
      focusIndex: 0,
      status: "",
      focus: false,
    });
  }

})