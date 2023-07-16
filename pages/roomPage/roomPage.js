// pages/roomPage/roomPage.js
const room_detail = [
  [
     "su",
     "18689327160",
     "2020-01-01",
     "1200", 
     "1200",
  ],
  [
    "2020-01-01", "200",
    "2020-02-01", "205",
    "5",
    "25",
  ],
  [
    "2020-01-01", "200",
    "2020-02-01", "300",
    "2",
    "200",
  ],
  {
    "垃圾费用": "20",
    "备注": "hello world"
  },
  ["0-4", "1-3", "2-3", "3-垃圾费用"]
]


Page({
  data: {
    houseIndex: "",
    roomIndex: "",
    tenantMessage: room_detail[0],
    waterBill: room_detail[1],
    electricityBill: room_detail[2],
    sundry: room_detail[3],
  },

  onLoad(options) {
    this.setData({houseIndex: options.hid, roomIndex: options.rid});
  },

  handleRoomTap: function() {
    console.log("go back");
    wx.navigateBack();
  }
})