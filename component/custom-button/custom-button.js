// component/sbtn/sbtn.js
Component({
  properties: {
    buttonName: {
      type: String,
    },
    status: {
      type: String,
    },
  },

  data: {
    highlight: "",
    backgroundColor: "",
    event: "",
  },

  lifetimes: {
    attached: function() {
      const [backgroundColor, event] = this.properties.buttonName.split("_")
      this.setData({backgroundColor: backgroundColor, event: event});
    }
  },

  methods: {
    handleTap: function() {
      this.triggerEvent(
        this.data.event, 
        {},
        {bubbles: true});
    },
  },

  observers: {
    // highlight the tapped button
    'status': function(s) {
      this.setData({
        highlight: s == this.data.event ? this.data.backgroundColor : ""
      })
    }
  }
})
