// component/sundry/sundry.js

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
    expand: false,
    expandHeight: 100,
    removeIndex: [],
  },

  options: {
    styleIsolation: "apply-shared", 
  },

  lifetimes: {
    attached: function() {
      const length = this.properties.value.length;
      const expandHeight = length * 90 + 215;
      const removeIndex = new Array(length).fill(false);
      this.setData({
        expandHeight: expandHeight,
        removeIndex: removeIndex,
      });
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

    handleAddExpense: function() {
      this.triggerEvent(
        "addexpense",
        {},
        {bubbles: true},
      )
    },

    handleRemoveExpense: function() {
      if (this.properties.status === "removeexpense") {
        this.triggerEvent(
          "removeitem",
          {removeIndex: this.data.removeIndex},
          {bubbles: true},
        )
      }
      this.triggerEvent(
        "removeexpense",
        {},
        {bubbles: true},
      )
    },

    handleRemoveItem: function(evt) {
      if (this.properties.status !== "removeexpense") {
        return;
      }
      const index = evt.currentTarget.dataset.index;
      const removeIndex = this.data.removeIndex;
      removeIndex[index] = !removeIndex[index];
      this.setData({
        removeIndex,
      });
    },
  },

  observers: {
    "value": function() {
      const expandHeight = this.properties.value.length * 90 + 215;
      this.setData({
        expandHeight,
      });
    },
    "status": function() {
      const removeIndex = new Array(this.properties.value.length).fill(false);
      this.setData({
        removeIndex,
      });
    }
  }
})
