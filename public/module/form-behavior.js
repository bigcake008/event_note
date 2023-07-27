const inputBehavior = Behavior({
  data: {
    focusIndex: "",
  },

  methods: {
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
  }
});

const pickerBehavior = Behavior({
  data: {
    highlightPicker: "",
  },

  methods: {
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

});

export {
  inputBehavior,
  pickerBehavior,
}