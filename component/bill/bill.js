// component/bill/bill.js
import { inputBehavior, pickerBehavior } from "../../public/module/form-behavior";

Component({
  behaviors: [
    inputBehavior,
    pickerBehavior,
  ],

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

    handleSmile: function() {
      this.setData({smile: true});
    },

  }
})