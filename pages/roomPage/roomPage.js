const room_detail = [
  [
     "su",
     "18689327160",
     "1200",
     1200,
     "2020-01-01",
  ],
  [
    "2020-01-01", 200,
    "2020-02-01", 205,
    5,
  ],
  [
    "2020-01-01", 200,
    "2020-02-01", 300,
    2,
  ],
  [["租金", 1200, true], ["水费", 25, true], ["电费", 200, true]], 
  [["垃圾费用", 20, true], ["管理费", 0, true], ["网费", 20, true]],
  "hello world, goodbye, hello again, farewell, see you,my lovely friend! enjoy your dinner, be my guest, no worry, hahaha",
];

const { shared } = wx.worklet;

Component({
  properties: {
    houseIndex: {
      type: String,
    },
    roomIndex: {
      type: String,
    }
  },

 data: {
    tenantInformation: room_detail[0],
    waterBill: room_detail[1],
    electricityBill: room_detail[2],
    basicExpense: room_detail[3],
    otherExpense: room_detail[4],
    expense: room_detail[3].concat(room_detail[4]),
    remark: room_detail[5],
    totalExpense: 0,
    showExpense: false,
    showTextArea: false,
    status: "",
    cover: false,
  },

  methods: {
    onLoad: function() {
      let totalExpense = this.data.expense.reduce((a, c) => {
        return c[2] ? a + c[1] : a;
      }, 0);
      this.setData({totalExpense: totalExpense});
    },

    handleRoomTap: function() {
      wx.navigateBack();
    },

    handleShowExpense: function() {
      this.setData({showExpense: !this.data.showExpense});
    },
    
    handleEditExpense: function(evt) {
      let id = evt.target.dataset.id;
      if (id <= 2) {
        const basicExpense = this.data.basicExpense;
        basicExpense[id][2] = !basicExpense[id][2];
        this.setData({
          basicExpense: basicExpense,
        });
      } else {
        id -= 3;
        const otherExpense = this.data.otherExpense;
        otherExpense[id][2] = !otherExpense[id][2];
        this.setData({
          otherExpense: otherExpense,
        });
      }
    },

    handleEditInfo: function(evt) {
      const status = this.data.status === "editinfo" ? "" : "editinfo";
      this.setData({
        status: status,
      });
    },

    handleAddExpense: function(evt) {
      const status = this.data.status === "addexpense" ? "" : "addexpense";
      this.setData({
        status: status,
      });
    },

    handleRemoveExpense: function(evt) {
      const status = this.data.status === "removeexpense" ? "" : "removeexpense";
      this.setData({
        status: status,
      });
    },

    handleRemoveItem: function(evt) {
      const removeIndex = evt.detail.removeIndex;
      const otherExpense = this.data.otherExpense.filter((_, idx) => !removeIndex[idx]);
      this.setData({
        otherExpense: otherExpense,
      })
    },

    handleFocus: function() {
      this.setData({
        cover: true,
      });
    },

    handleUnfocus: function() {
      this.setData({
        cover: false,
      });
    },

    handleFocusTextArea: function() {
      this.setData({
        showTextArea: true,
        cover: true,
      });
    },

    handleBlurTextArea: function() {
      this.setData({
        showTextArea: false,
        cover: false,
      });
    },

    handleChangeData: function(evt) {
      const key = evt.detail.key.split("-");
      let value = evt.detail.value;
      // suppose you want to this.setData({key: value})
      // you can't determine the 'key' dynamically
      // the 'key' can only be static
      switch (key[0]) {
        case "0":
          if (key[1] === "3") {
            this.setData({
              "tenantInformation[3]": Number(value),
            })
          } else {
            const tenantInformation = this.data.tenantInformation;
            tenantInformation[key[1]] = value;
            this.setData({tenantInformation: tenantInformation});
          }
         break;
        case "1":
          const waterBill = this.data.waterBill;
          waterBill[key[1]] = value;
          // todo factional bug
          const waterExpense = (waterBill[3] - waterBill[1]) * waterBill[4];
          if (waterExpense !== waterBill[5]) {
            this.data.basicExpense[1][1] = waterExpense;
            this.setData({basicExpense: this.data.basicExpense});
          }
          this.setData({waterBill: waterBill});
          break;
        case "2":
          const electricityBill = this.data.electricityBill;
          electricityBill[key[1]] = value;
          const electricityExpense = (electricityBill[3] - electricityBill[1]) * electricityBill[4];
          if (electricityExpense !== electricityBill[5]) {
            this.data.basicExpense[2][1] = electricityExpense;
            this.setData({basicExpense: this.data.basicExpense});
          }
          this.setData({electricityBill: electricityBill});
          break;
        case "4":
          const otherExpense = this.data.otherExpense;
          if (key[2] === "1") {
            value = Number(value);
          }
          otherExpense[key[1]][key[2]] = value;
          this.setData({otherExpense: otherExpense});
          break;
      }
    },
  },

  observers: {
    "tenantInformation[3]": function() {
      const rental = this.data.tenantInformation[3];
      if (rental !== this.data.basicExpense[0][1]) {
        this.data.basicExpense[0][1] = rental;
        this.setData({
          basicExpense: this.data.basicExpense,
        })
      }
    },

    "basicExpense, otherExpense": function() {
      const expense = this.data.basicExpense.concat(this.data.otherExpense);
      const totalExpense = expense.reduce((a, c) => {
        return c[2] ? a + c[1] : a;
      }, 0);
      this.setData({
        expense,
        totalExpense,
      });
    }
  }

})