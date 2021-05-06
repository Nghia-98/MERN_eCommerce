import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: string, require: true },
        qty: { type: Number, require: true },
        image: { type: string, require: true },
        price: { type: Number, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: string, require: true },
      city: { type: string, require: true },
      postalCode: { type: string, require: true },
      country: { type: string, require: true },
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: { type: tring },
      status: { type: string },
      update_time: { type: string },
      email_address: { type: string },
    },
    taxPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
