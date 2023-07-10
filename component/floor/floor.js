// component/floor.js
Component({
  // child component get property from their parent, which can also be modified by this.setData
  // properties is parent communicate to child
  // use this.triggerEvent for child communicate to parent
  properties: {
    rooms: {
      type: Array,
    },
    index: {
      type: Number,
    },
    focusIndex: {
      type: Number,
    },
    tappedButton: {
      type: String,
    },
  },

  data: {
    expand: false,
  },

  methods: {
    handleExpandFloor: function() {
      if (this.data.expand) {
        this.triggerEvent("hideinput", {}, {bubbles: true});
       }
      console.log("expand");
      this.setData({expand: !this.data.expand});
    },

    // handleShowInput: function(evt) {
    //   this.setData({tappedButton: evt.detail.tb});
    //   this.triggerEvent("showinput", this.data.index);
    // },

    handleShowButton: function(evt) {
      // component event is not bubblie by default
      this.triggerEvent("focusfloor", this.data.index, 
                         {bubbles: true});
      this.setData({expand: true});
    },

    handleAddRoom: function(evt) {
      this.setData({tappedButton: evt.type});
      this.triggerEvent("showinput", this.data.index,
                        {bubbles: true});
    },

    handleRemoveRoom: function(evt) {
      this.setData({tappedButton: evt.type});
      this.triggerEvent("showinput", this.data.index,
                        {bubbles: true})
    },

    handleEditRoom: function(evt) {
      this.setData({tappedButton: evt.type});
      this.triggerEvent("showinput", this.data.index,
                        {bubbles: true})
    },

    handleRoomTap: function(evt) {
      if (this.properties.tappedButton === "remove_room") {
        console.log("remove room");
      } else if (this.properties.tappedButton === "edit_room") {
        console.log("edit_room");
      } else {
        console.log("tap room")
        const data = evt.currentTarget.dataset;
        this.triggerEvent("roomtap", data, {bubbles: true});
      }
    }
  }
})
