const CartItems = require("../models/cartItems");
const Books = require("../models/books");
const mongoose = require("mongoose");

exports.checkoutBook = async (req, res) => {
  try {
    const bookId = req.query?.bookId;
    const purchaseQty = Number(
      req.query?.purchaseQty ? req.query.purchaseQty : 1
    );
    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({ error: "Book does not exist" });
    }
    const book = await Books.findOne({ _id: bookId })
      .select({
        _id: 1,
        title: 1,
        MRP: 1,
        price: 1,
        editionYear: 1,
        author: 1,
        sellerName: 1,
        qty: 1,
        photos: { $slice: 1 },
      })
      .exec();
    book._doc.bookId = book._doc._id;
    delete book._doc._id;
    book._doc.photo = book._doc.photos.length > 0 ? book._doc.photos[0] : "";
    delete book._doc.photos;
    const shippingCharges = 40 * purchaseQty;
    const itemsSubtotal = book.price * purchaseQty;
    const orderTotal = shippingCharges + itemsSubtotal;
    res.json({
      item: book,
      totalItems: purchaseQty,
      shippingCharges,
      itemsSubtotal,
      orderTotal,
    });
  } catch (error) {
    console.log("Error occurred in /checkoutBook", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.checkoutCart = async (req, res) => {
  try {
    const cartItems = await CartItems.find({ userId: req.auth._id }).exec();
    let itemsSubtotal = 0;
    const cartList = await Promise.all(
      cartItems.map(async ({ _id, bookId, createdAt, purchaseQty }) => {
        const book = await Books.findOne({ _id: bookId })
          .select({
            _id: 1,
            title: 1,
            MRP: 1,
            price: 1,
            editionYear: 1,
            author: 1,
            sellerName: 1,
            qty: 1,
            photos: { $slice: 1 },
          })
          .exec();
        book._doc.bookId = book._doc._id;
        delete book._doc._id;
        book._doc.photo =
          book._doc.photos.length > 0 ? book._doc.photos[0] : "";
        delete book._doc.photos;
        itemsSubtotal += book.price;
        return { ...book._doc, _id, purchaseQty, createdAt };
      })
    );
    const totalItems = cartList.length;
    const shippingCharges = totalItems * 40;
    const orderTotal = itemsSubtotal + shippingCharges;
    const obj = {
      items: cartList,
      totalItems,
      shippingCharges,
      itemsSubtotal,
      orderTotal,
    };
    res.json(obj);
  } catch (error) {
    console.log("Error occurred in /checkoutCart", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};