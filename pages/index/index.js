// index.js
let house = 
    [{'index': 1, 'location': '梨园大道二巷一号'},
    {'index': 22, 'location': '松柏路14巷3号'},
    {'index': 99999, 'location': 'hello world, good night, good bye!!!'},
    {'index': 100, 'location': '松柏路22巷6号'},
    ];
let btn = ['add', 'search', 'edit', 'delete'];

Page({
  data: {
    house: house,
    display: 'hide',
    btn: btn,
    tappedButton: '',
  },

  tap: function (evt) {
    wx.navigateTo({
      url: `../tem/tem?id=${evt.currentTarget.id}`,
    })
    console.log(evt);
  },

  longPress: function (evt) {
    console.log('long press');
    console.log(evt.detail);
  },

  showInput: function (evt) {
    this.setData({
      tappedButton: evt.detail.tb,
      display: 'show'
    })
  },

  hideInput: function (evt) {
    this.setData({
      tappedButton: '',
      display: 'hide'
    })
  },
})