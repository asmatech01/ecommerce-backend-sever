// // models/order.js

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the user who placed the order (for authenticated users)
// },
//   sessionId: {
//     type: String, // Session ID for guest users
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product', // Reference to the product in the order
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   total: {
//     type: Number,
//     required: true,
//   },
//   shippingInfo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'UserAddress', // Reference to the shipping information
//   },
//   orderStatus: [
//     {
//       type: {
//         type: String,
//         enum: ["ordered", "packed", "shipped", "delivered"],
//         default: "ordered",
//       },
//       date: {
//         type: Date,
//       },
//       isCompleted: {
//         type: Boolean,
//         default: false,
//       },
//     },
//   ],
//   // Add any other fields as needed
// },
// { timestamps: true }
// );

// module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   shippingInfo: {
//     email: {
//         type: String,
//         // required: true
//     },
//     name: {
//       type : String,
//       // required: true
//     },
//     city: {
//       type: String,
//       // required: true,
//     },
//     address: {
//       type: String,
//       // required: true,
//     },
//     // state: {
//     //   type: String,
//     //   required: true,
//     // },

//     // country: {
//     //   type: String,
//     //   required: true,
//     // },
//     // pinCode: {
//     //   type: Number,
//     //   required: true,
//     // },
//     phoneNumber: {
//       type: Number,
//       // required: true,
//     },
//   },
//   orderItems: [
//     {
//       name: {
//         type: String,
//         // required: true,
//       },
//       price: {
//         type: Number,
//         // required: true,
//       },
//       quantity: {
//         type: Number,
//         // required: true,
//       },
//       image: {
//         type: String,
//         // required: true,
//       },
//       product: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Product",
//         // required: true,
//       },
//     },
//   ],
//   // user: {
//   //   type: mongoose.Schema.ObjectId,
//   //   ref: "User",
//   //   required: true,
//   // },
//   // paymentInfo: {
//   //   id: {
//   //     type: String,
//   //     required: true,
//   //   },
//   //   status: {
//   //     type: String,
//   //     required: true,
//   //   },
//   // },
//   // paidAt: {
//   //   type: Date,
//   //   required: true,
//   // },
//   itemsPrice: {
//     type: Number,
//     // required: true,
//     default: 0,
//   },
//   // taxPrice: {
//   //   type: Number,
//   //   required: true,
//   //   default: 0,
//   // },
//   shippingCharge: {
//     type: Number,
//     // required: true,
//     default: 0,
//   },
//   totalPrice: {
//     type: Number,
//     // required: true,
//     default: 0,
//   },
//   orderStatus: {
//     type: String,
//     // required: true,
//     default: "Processing",
//   },
//   deliveredAt: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      image: {
        type: String,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the product in the order
      },
    },
  ],
  itemsPrice: {
    type: Number,
    default: 0,
  },
  shippingCharge: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderStatus: [
    {
      type: {
        type: String,
        enum: ["ordered", "packed", "shipped", "delivered"],
        default: "ordered",
      },
      date: {
        type: Date,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
