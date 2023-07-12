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
    focusIndex: {
      type: Number,
    },
    tappedButton: {
      type: String,
    },
  },

  data: {
    expand: false,
    translateY: 0,
    expandHeight: 100,
    buttonsMove: 0
  },

  lifetimes: {
    created: function() {
      // console.log("created:", this);
    },
    attached: function() {
      const expandHeight = Math.floor((this.properties.rooms.length + 3) / 4) * 100;
      this.setData({expandHeight: Math.max(100, expandHeight)});
    }
  },

  methods: {
    handleExpandFloor: function() {
      // disable the expand button when the floor focused
      if (this.data.index === this.properties.focusIndex) {
        return;
      }
      this.setData({
        expand: !this.data.expand,
      });
    },

    handleFocus: function(evt) {
      if (this.properties.focusIndex === this.data.index) {
        return;
      }
      // when the focus floor appear on the lower half of screen
      // move them to the upper half to mitigate keyboard collapsing
      const detailY = Math.floor(evt.detail.y);
      let translateY = 0, buttonsMove = this.data.expandHeight;
      if (detailY > halfWindowHeight) {
        // convert px to rpx
        translateY = px2rpx(halfWindowHeight-detailY, windowWidth);
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
