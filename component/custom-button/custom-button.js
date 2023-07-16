// component/sbtn/sbtn.js
Component({
  properties: {
    btnName: {
      type: String,
    },
    tappedBtn: {
      type: String,
    },
  },

  data: {
    highlight: "",
    btnType: ""
  },

  lifetimes: {
    attached: function() {
      const btnType = this.properties.btnName.split("_")[0];
      this.setData({btnType});
    }
  },

  methods: {
    handleTap: function() {
      this.triggerEvent(this.properties.btnName, 
                        {},
                        {bubbles: true});
    },
  },

  observers: {
    // highlight the tapped button
    'tappedBtn': function(tb) {
      this.setData({
        highlight: tb == this.properties.btnName ? this.data.btnType : ""
      })
    }
  }
})
