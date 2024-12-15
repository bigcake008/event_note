// index.js
let house = 
    [
    {'index': 1, 'location': 'HelloWorld'},
    {'index': 22, 'location': 'generator and iterator'},
    {'index': 99999, 'location': 'hello world, good night, good bye!!!'},
    {'index': 100, 'location': 'proxy confuse people'},
    ];
let btn = ["add_house", "search_info", "edit_house", "remove_house"];
// getApp return global context
var app = getApp();
console.log(`global this: ${this}`);

Page({
  data: {
    house: house,
    glassHeight: 0,
    btn: btn,
    tappedButton: "",
    focus: "",
  },

  handleHouseTap: function(evt) {
    if (this.data.tappedButton === "remove_house") {
      console.log("house remove");
    } else if (this.data.tappedButton === "edit_house") {
      console.log("house edit");
    } else {
      const data = evt.target.dataset;
      wx.navigateTo({
        url: `../housePage/housePage?index=${data.index}&location=${data.location}`,
      })
    }
  },

  // handleShowInput: function(evt) {
  //   console.log(evt);
  //   const detail = evt.detail;
  //   let focus = "";
  //   if (detail.bt === "remove" || detail.bt === "edit") {
  //     focus = "focus";
  //   }
  //   this.setData({
  //     tappedButton: detail.bn,
  //     displayInput: '',
  //     focus
  //   })
  // },

  handleAddHouse: function(evt) {
    console.log("add house");
    this.setData({
      tappedButton: evt.type,
    })
  },

  handleSearchInfo: function(evt) {
    console.log("search info");
    this.setData({
      tappedButton: evt.type,
    })
  },

  handleEditHouse: function(evt) {
    console.log("edit house");
    this.setData({
      tappedButton: evt.type,
    })
  },

  handleRemoveHouse: function(evt) {
    console.log("remove house");
    this.setData({
      tappedButton: evt.type,
    })
  },

  handleShowInput: function(evt) {
    let focus = "";
    const tb = this.data.tappedButton;
    if (tb === "edit_house" || tb === "remove_house") {
      focus = "focus";
    }
    this.setData({
      glassHeight: app.windowHeight,
      focus: focus
    })
  },

  handleHideInput: function(evt) {
    this.setData({
      tappedButton: "",
      glassHeight: 0,
      focus: ""
    })
  },
})