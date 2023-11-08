// controllers/orderController.js

const Order = require("../models/orderSchema");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const { Readable } = require("stream");

// exports.createOrder = async (req, res) => {
//   try {
//     const { order } = req.body; // Assuming the order data is sent as part of the request body

//     // Create a new order instance based on the Mongoose schema
//     const newOrder = new Order({
//       shippingInfo: {
//         email: order.shippingInfo.email,
//         name: order.shippingInfo.name,
//         city: order.shippingInfo.city,
//         address: order.shippingInfo.address,
//         phoneNumber: order.shippingInfo.phoneNumber,
//       },
//       orderItems: order.orderItems,
//       totalPrice: order.totalPrice,
//       shippingCharge: order.shippingCharge,
//       // Add other fields as needed
//     });

//     // Save the new order to the database
//     await newOrder.save();

//     res.status(201).json({ message: 'Order created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.createOrder = async (req, res) => {
//   try {
//     const { order } = req.body; // Assuming the order data is sent as part of the request body
//     console.log(req.body)
//     // console.log(order)
//     // Create a new order instance based on the Mongoose schema
//     const newOrder = new Order({
//       shippingInfo: {
//         email: order.shippingInfo.email,
//         name: order.shippingInfo.name,
//         city: order.shippingInfo.city,
//         address: order.shippingInfo.address,
//         phoneNumber: order.shippingInfo.phoneNumber,
//       },
//       orderItems: order.orderItems,
//       totalPrice: order.totalPrice,
//       shippingCharge: order.shippingCharge,
//       // Add other fields as needed
//     });

//     // Save the new order to the database
//     await newOrder.save();

//     // Read the HTML template from a file
//     const templatePath = path.resolve(__dirname, "invoice-template.html");
//     const htmlTemplate = fs.readFileSync(templatePath, "utf8");

//     // Define data to replace placeholders in the template
//     const data = {
//       orderId: "._id,", // Use the actual order ID
//       customerName: ".shippingInfo.name",
//       // Add more data as needed
//     };

//     // Create a PDF using pdf-creator-node
//     // const pdfOptions = {
//     //   format: "A3",
//     //   orientation: "portrait",
//     //   border: "10mm",
//     //   header: {
//     //     height: "45mm",
//     //     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
//     //   },
//     //   footer: {
//     //     height: "28mm",
//     //     contents: {
//     //       first: "Cover page",
//     //       2: "Second page", // Any page number is working. 1-based index
//     //       default:
//     //         '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//     //       last: "Last Page",
//     //     },
//     //   },
//     // };

//    // Create a PDF using pdf-creator-node
//    const document = {
//     html: htmlTemplate, // Pass the template as a string
//     data, 
//     type: 'stream', // Set the type to 'stream' to send data as a stream
//   };

//       // Create a PDF using pdf-creator-node
//     var pdfOptions = {
//       format: "A3",
//       orientation: "portrait",
//       border: "10mm",
//       header: {
//           height: "45mm",
//           contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
//       },
//       footer: {
//           height: "28mm",
//           contents: {
//               first: 'Cover page',
//               2: 'Second page', // Any page number is working. 1-based index
//               default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//               last: 'Last Page'
//           }
//       }
//   };

//   const pdfStream = await pdf.create(document, pdfOptions);
// // Log the PDFStream for debugging
// const chunks = [];
// pdfStream.on('data', (chunk) => {
//   chunks.push(chunk);
// });

// pdfStream.on('end', () => {
//   const pdfData = Buffer.concat(chunks);
//   console.log("PDF Data:", pdfData.toString());
// });

//   // Send the PDF as a downloadable attachment
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

//   // Pipe the PDF stream to the response
//   pdfStream.pipe(res.status(200));
//   // console.log(pdfStream)
//   // console.log(newOrder ,res)
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//     console.error(error);
//   }
// };

exports.createOrder = async (req, res) => {
  try {
    const { order } = req.body; // Assuming the order data is sent as part of the request body

    // Create a new order instance based on the Mongoose schema
    const newOrder = new Order({
      shippingInfo: {
        email: order.shippingInfo.email,
        name: order.shippingInfo.name,
        city: order.shippingInfo.city,
        address: order.shippingInfo.address,
        phoneNumber: order.shippingInfo.phoneNumber,
      },
      orderItems: order.orderItems,
      totalPrice: order.totalPrice,
      shippingCharge: order.shippingCharge,
      // Add other fields as needed
    });

    // Save the new order to the database
    await newOrder.save();

    // Read the HTML template from a file
    const templatePath = path.resolve(__dirname, 'invoice-template.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Define data to replace placeholders in the template
    const data = {
      orderId: "dfadfadfadfasdfasdf",
      customerName: "order.shippingInfo.name",
      // Add more data as needed
    };

    // Create a PDF using pdf-creator-node
    var pdfOptions = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      header: {
          height: "45mm",
          contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
      },
      footer: {
          height: "28mm",
          contents: {
              first: 'Cover page',
              2: 'Second page', // Any page number is working. 1-based index
              default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
              last: 'Last Page'
          }
      }
  };

    const document = {
      html: htmlTemplate, // Pass the template as a string
      data,
      path: './invoice.pdf', // You can save it to a file
      type: '',
    };

    // const result = await pdf.create(document, pdfOptions);
    // console.log(result)
    const pdfFile = pdf.create(document, pdfOptions)
.then(Path => {
    // res.sendFile(Path.filename)
    var file = fs.createReadStream(Path.filename);
    var stat = fs.statSync(Path.filename);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res)
 })
.catch(error => {
    console.error(error)
});

// Send the generated PDF to the client as an attachment
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log({ message: error });
  }
};

// Retrieve order details
// exports.getOrderDetails = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     // const userId = req.user._id;

//     const order = await Order.findOne({ _id: orderId });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({ order });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.getAllOrders = async (req, res) => {
  try {
    // const userId = req.user._id;

    const order = await Order.find();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     // const userId = req.user._id;
//     const { orderStatus } = req.body;

//     // const order = await Order.findOne({ _id: orderId, user: userId });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Update the order status array (for example, marking "packed" as completed)
//     const updatedOrderStatus = order.orderStatus.map((status) => {
//       if (status.type === orderStatus.type) {
//         return {
//           ...status,
//           date: new Date(), // Update the date when the status was marked as completed
//           isCompleted: true,
//         };
//       }
//       return status;
//     });

//     order.orderStatus = updatedOrderStatus;

//     await order.save();
//     res.status(200).json({ message: 'Order status updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // List user's order history
// exports.listUserOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const orders = await Order.find({ user: userId });

//     if (!orders) {
//       return res.status(404).json({ message: 'No orders found' });
//     }

//     res.status(200).json({ orders });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
