// pages/tem.js
const floors = [
                 {
                  index: 5,
                  rooms: ["501", "5A", "505", "506"],
                }, 
                {
                  index: 4,
                  rooms: ["401", "403", "405", "406", "407", "408", "409", "413", "416"],
                },
                {
                  index: 3,
                  rooms: ["301", "302", "303",  "305", "306", "307", "308", "309", "313"],
                },
                {
                  index: 2,
                  rooms: ["201", "202", "203", "205", "206", "207", "208", "209", "213"],
                },
                {
                  index: 1,
                  rooms: ["102", "106", "107", "108", "109", "113"],
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