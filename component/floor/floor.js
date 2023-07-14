// component/floor.js
const app = getApp();
const halfWindowHeight = Math.floor(app.windowHeight / 2);
const windowWidth = app.windowWidth;
import { px2rpx } from "../../public/module/convert";

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
    tappedButton: {
      type: String,
    },
    focus: {
      type: Boolean,
    },
  },

  data: {
    expand: false,
    translateY: 0,
    expandHeight: 100,
    buttonsMove: 0
  },

  lifetimes: {
    attached: function() {
      // calculate expand height from rooms.length, at least 100rpx
      const expandHeight = Math.floor((this.properties.rooms.length + 3) / 4) * 100;
      this.setData({expandHeight: Math.max(100, expandHeight)});
    }
  },

  methods: {
    handleExpandFloor: function() {
      // disable the expand button when the floor focused
      if (this.data.focus) {
        return;
      }
      this.setData({
        expand: !this.data.expand,
      });
    },

    handleFocus: function(evt) {
      if (this.data.focus) {
        return;
      }
      // when the focus floor appear on the lower half of screen
      // move them to the upper half to mitigate keyboard collapsing
      const detailY = Math.floor(evt.detail.y);
      let translateY = 0, buttonsMove = this.data.expandHeight;
      if (detailY > halfWindowHeight) {
        // convert px to rpx
        translateY = px2rpx(halfWindowHeight-detailY, windowWidth) - 100;
        buttonsMove += translateY;
      }
      // component event is not bubblie by default
      this.triggerEvent(
        "focus", 
        {index: this.data.index},
        {bubbles: true}
        );
      this.setData({
        expand: true, // always expand the floor when focused
        focus: true,
        translateY: translateY,
        buttonsMove: buttonsMove
      });
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
      if (this.data.focus) {
        console.log("floor focus");
      } else {
        console.log("tap room")
        const data = evt.currentTarget.dataset;
        this.triggerEvent("roomtap", data, {bubbles: true});
      }
    }
  },

  observers: {
    // previously focus floor driven by focusIndex(parent's property), which causing extra calculation, this can be avoided by using this.setData() to change focus(also paret's property) in each child
    "focusIndex": function() {
      console.log("focusIndex changed");
    },
    "focus": function() {
      console.log("focus changed");
    }
  }

})
