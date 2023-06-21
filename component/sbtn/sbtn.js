// component/sbtn/sbtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnType: {
      type: String,
    },
    tappedBtn: {
      type: String,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    highlight: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('showinput', {tb: this.data.btnType})
    }
  },

  observers: {
    'tappedBtn': function(tb) {
      // console.log(tb);
      this.setData({
        highlight: tb == this.data.btnType? tb: ''
      })
    }
  }
})
