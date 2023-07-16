// component/bill/bill.js
Component({
  properties: {
    prefix: {
      type: String,
    },
    value: {
      type: Array,
    }
  },

  data: {
    expand: false,
    preDate: "",
    preUsage: "",
    curDate: "",
    curUsage: "",
    rate: "",
    cost: "",
  },

  options: {
    styleIsolation: "apply-shared", 
  },

  lifetimes: {
    attached: function() {
      this.setData({
        preDate: this.properties.value[0],
        preUsage: this.properties.value[1],
        curDate: this.properties.value[2],
        curUsage: this.properties.value[3],
        rate: this.properties.value[4],
        cost: this.properties.value[5],
      })
    }
  },

  methods: {
    handleExpandUnit: function() {
      this.setData({expand: !this.data.expand});
    }
  }
})