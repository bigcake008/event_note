// component/bill/bill.js

Component({
  properties: {
    prefix: {
      type: String,
    },
    value: {
      type: Array,
    },
    cost: {
      type: Number,
    },
    status: {
      type: String,
    },
  },

  data: {
    expand: false,
    smile: false,
    highlightPicker: "",
    focusIndex: "",
  },

  options: {
    styleIsolation: "apply-shared", 
  },

  lifetimes: {
    attached: function() {
    }
  },

  methods: {
    handleExpandUnit: function() {
      this.setData({expand: !this.data.expand});
    },

    handleFocusInput: function(evt) {
      // only show input in editinfo status
      if (this.properties.status !== "editinfo") {
        return;
       }
      this.setData({
        focusIndex: evt.currentTarget.id,
      });
      this.triggerEvent(
        "focus",
        {},
        {bubbles: true},
      );
    },

    handleBlurInput: function(evt) {
      this.setData({
        focusIndex: "",
      });
      const value = evt.detail.value;
      if (value === "" || value === evt.target.dataset.value) {
        return;
      }
      this.triggerEvent(
        "changedata",
        {
          key: evt.target.dataset.key,
          value: value,
        },
        {bubbles: true},
      );
    },

    handleSmile: function() {
      this.setData({smile: true});
    },

    handlePickerTap: function(evt) {
      if (this.properties.status !== "editinfo") {
        return;
      }
      this.setData({
        highlightPicker: evt.currentTarget.id,
      });
      this.triggerEvent(
        "focus",
        {},
        {bubbles: true}
        );
    },

    handleChangeDate: function(evt) {
      this.triggerEvent(
        "changedata",
        {
          key: evt.target.dataset.key,
          value: evt.detail.value,
        },
        {bubbles: true},
      )
      this.setData({
        highlightPicker: "",
      });
      this.triggerEvent(
        "unfocus",
        {},
        {bubbles: true},
        );
    },

    handleCancel: function() {
      this.setData({
        highlightPicker: "",
      });
      this.triggerEvent(
        "unfocus",
        {},
        {bubbles: true},
        );
    },
  }
})