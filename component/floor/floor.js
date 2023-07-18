// component/floor.js
import { px2rpx } from "../../public/module/convert";

const { shared, timing, Easing } = wx.worklet;
const app = getApp();
const halfWindowHeight = Math.floor(app.windowHeight / 2);
const windowWidth = app.windowWidth;

Component({
  // child component get property from their parent, which can also be modified by this.setData
  // this.properties is parent communicate to child
  // this.triggerEvent() is child communicate to parent
  properties: {
    rooms: {
      type: Array,
    },
    index: {
      type: Number,
    },
    status: {
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
  },

  lifetimes: {
    attached: function() {
      // shared value are synchronous between JS and UI thread
      // when top.value changed, this.applyAnimatedStyle will invoke the updater function
      // which is a worklet function running in UI thread 
      const top = shared(0);
      // calculate expand height from rooms.length, at least 100rpx
      const expandHeight = Math.floor((this.properties.rooms.length + 3) / 4) * 100;
      this.setData({expandHeight: Math.max(100, expandHeight)});
      this.top = top;
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
      };
      // reset top.value when focused
      this.top.value = 0;
      // when the focus floor appear on the lower half of screen
      // move them to the upper half to mitigate keyboard collapsing
      const detailY = Math.floor(evt.detail.y);
      let translateY = 0, top = this.data.expandHeight;
      if (detailY > halfWindowHeight) {
        // convert px to rpx
        translateY = px2rpx(halfWindowHeight-detailY, windowWidth) - 100;
        top += translateY;
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
      });
      // use worklet function to animate the btn_group with the floor
      this.applyAnimatedStyle(
        ".btn_group", 
        () => {
          "worklet";
          return {
            top: this.top.value + "rpx",
          };
        },
        {immediate: false},
      );
      // changing top.value to a target value with a timing function
      this.top.value = timing(
        top, 
        {duration: 500, 
          // default value of css transition-timing-function
          // animate the btn_group and the floor synchronously
          easing: Easing.cubicBezier(0.25, 0.1, 0.25, 1.0)}
      );
    },

    handleAddRoom: function(evt) {
      this.setData({status: evt.type});
    },

    handleRemoveRoom: function(evt) {
      this.setData({status: evt.type});
    },

    handleEditRoom: function(evt) {
      this.setData({status: evt.type});
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
      // clean up the updater(worklet running in UI thread) when focus changed
      this.clearAnimatedStyle(".btn_group", []);
      console.log("focus changed");
    }
  }

})
