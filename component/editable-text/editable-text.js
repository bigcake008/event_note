// component/editable-text/editable-text.js
Component({
  properties: {
    text: {
      type: String,
    }
  },

  data: {
    showInput: false,
  },

  methods: {
    handleShowInput: function() {
      this.setData({showInput: true});
    },
    handleBlur: function() {
      console.log("textarea blur");
      this.setData({showInput: false});
    },
  }
})
