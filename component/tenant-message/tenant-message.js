// component/tenant-message/tenant-message.js
Component({
  properties: {
    value: {
      type: Array,
    }
  },

  data: {
    name: "",
    phone: "",
    inDate: "",
    deposit: "",
    rental: "",
    expand: false,
  },

  options: {
    styleIsolation: "apply-shared", 
  },

  lifetimes: {
    attached: function() {
      this.setData({
        name: this.properties.value[0],
        phone: this.properties.value[1],
        inDate: this.properties.value[2],
        deposit: this.properties.value[3],
        rental: this.properties.value[4],
      })
    }
  },

  methods: {
    handleExpandUnit: function() {
      this.setData({expand: !this.data.expand});
    }
  }
})
