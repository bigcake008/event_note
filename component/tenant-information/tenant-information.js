// component/tenant-message/tenant-message.js

Component({
  properties: {
    value: {
      type: Array,
    },
    status: {
      type: String,
    },
  },

  data: {
    highlightPicker: false,
    focusIndex: "",
    key: ["姓名", "电话", "押金", "租金"],
    inputType: ["text", "number", "digit", "digit"],
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

    handlePickerTap: function() {
      if (this.properties.status !== "editinfo") {
        return;
      }
      this.setData({
        highlightPicker: true,
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
        highlightPicker: false,
      });
      this.triggerEvent(
        "unfocus",
        {},
        {bubbles: true},
        );
    },

    handleCancel: function() {
      this.setData({
        highlightPicker: false,
      });
      this.triggerEvent(
        "unfocus",
        {},
        {bubbles: true},
        );
    },

  },
})
