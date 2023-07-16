// component/sundry/sundry.js
Component({
  properties: {
    value: {
      type: Object,
    }
  },

  data: {
    expand: false,
    expandHeight: 100,
  },

  options: {
    styleIsolation: "apply-shared", 
  },

  lifetimes: {
    attached: function() {
      let expandHeight = Object.keys(this.properties.value).length * 80 + 140;
      this.setData({
        expandHeight: expandHeight,
      });
    }
  },

  methods: {
    handleExpandUnit: function() {
      this.setData({expand: !this.data.expand});
    }
  }
})
