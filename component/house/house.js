// component/house/house.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    houseNumber: {
      type: String,
    },
    houseName: {
      type: String,
    },
    selected: {
      type: Boolean,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  lifetimes: {
    attached() {
      this.setUpdatePerformanceListener({withDataPaths: true}, (res) => console.log);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    longPress: function() {
      this.triggerEvent('houseselected', this.data)
    }
  }
})
