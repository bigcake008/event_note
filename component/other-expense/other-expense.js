// component/sundry/sundry.js
import { inputBehavior } from "../../public/module/form-behavior";

Component({
  behaviors: [
    inputBehavior,
  ],

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
    newExpenseKey: "",
    newExpenseValue: "",
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

    handleChangeExpense: function(evt) {
      console.log(evt);
      if (evt.target.id === "expense-key") {
        this.setData({
          newExpenseKey: evt.detail.value,
        });
      } else {
        this.setData({
          newExpenseValue: evt.detail.value,
        });
      }
    },

    handleAddExpense: function() {
      if (this.properties.status === "addexpense" && this.data.newExpenseKey !== "") {
        this.triggerEvent(
          "additem",
          {
            key: this.data.newExpenseKey,
            value: Number(this.data.newExpenseValue),
          },
          {bubbles: true},
        );

      }
      this.setData({
        newExpenseKey: "",
        newExpenseValue: "",
      });
      this.triggerEvent( 
        "addexpense",
        {},
        {bubbles: true},
      );
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
