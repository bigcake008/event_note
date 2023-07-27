// component/tenant-message/tenant-message.js
import { inputBehavior, pickerBehavior } from "../../public/module/form-behavior"

Component({
  behaviors: [
    inputBehavior,
    pickerBehavior,
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
  },
})
