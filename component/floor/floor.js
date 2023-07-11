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
      // disable the expand button when the floor focused
      if (this.data.index === this.data.focusIndex) {
        return;
       }
      this.setData({expand: !this.data.expand});
    },

    handleFocus: function(evt) {
      // component event is not bubblie by default
      this.triggerEvent("focus", this.data.index, 
                         {bubbles: true});
      this.setData({expand: true});
    },

    handleAddRoom: function(evt) {
      this.setData({tappedButton: evt.type});
    },

    handleRemoveRoom: function(evt) {
      this.setData({tappedButton: evt.type});
    },

    handleEditRoom: function(evt) {
      this.setData({tappedButton: evt.type});
    },

    handleRoomTap: function(evt) {
      if (this.data.index === this.data.focusIndex) {
        console.log("floor focus");
      } else {
        console.log("tap room")
        const data = evt.currentTarget.dataset;
        this.triggerEvent("roomtap", data, {bubbles: true});
      }
    }
  }
})
