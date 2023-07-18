// index.js
let house = 
    [
    {'index': 1, 'location': 'hahahaha'},
    {'index': 22, 'location': 'generator and iterator'},
    {'index': 99999, 'location': 'hello world, good night, good bye!!!'},
    {'index': 100, 'location': 'proxy confuse people'},
    ];
let button = ["green_addhouse", "yellow_searchinfo", "blue_edithouse", "red_removehouse"];
// getApp return global context
var app = getApp();
console.log(`global this: ${this}`);

Page({
  data: {
    house: house,
    button: button,
    status: "",
    focus: "",
  },

  handleHouseTap: function(evt) {
    if (this.data.status === "removehouse") {
      console.log("house remove");
    } else if (this.data.status === "edithouse") {
      console.log("house edit");
    } else {
      const data = evt.target.dataset;
      wx.navigateTo({
        url: `../housePage/housePage?index=${data.index}&location=${data.location}`,
      })
    }
  },

  handleAddHouse: function(evt) {
    console.log("add house");
    this.setData({
      status: evt.type,
    })
  },

  handleSearchInfo: function(evt) {
    console.log("search info");
    this.setData({
      status: evt.type,
    })
  },

  handleEditHouse: function(evt) {
    console.log("edit house");
    this.setData({
      status: evt.type,
    })
  },

  handleRemoveHouse: function(evt) {
    console.log("remove house");
    this.setData({
      status: evt.type,
    })
  },

  handleFocus: function(evt) {
    let focus = "";
    const status = this.data.status;
    if (status === "edithouse" || status === "removehouse") {
      focus = "focus";
    }
    this.setData({
      focus: focus
    })
  },

  handleUnfocus: function(evt) {
    this.setData({
      status: "",
      focus: ""
    })
  },
})