const express = require("express");
const router = express.Router();

const resetRoutes = require("./reset");
const authRoutes = require("./auth");
const accountRoutes = require("./account");
const addressRoutes = require("./address");
const newsletterRoutes = require("./newsletter");
const messageRoutes = require("./message");
const websiteReviewRoutes = require("./websiteReview");
const sellerRoutes = require("./seller");
const sellerWalletRoutes = require("./sellerWallet");
const bookRoutes = require("./book");
const searchRoutes = require("./search");
const cartRoutes = require("./cart");
const wishlistRoutes = require("./wishlist");
const orderRoutes = require("./order");
const checkoutRoutes = require("./checkout");
const reviewRoutes = require("./review");
const tagRoutes = require("./tag");
const adminBookRoutes = require("./adminBook");
const adminMessageRoutes = require("./adminMessage");
const adminSellerRoutes = require("./adminSeller");
const adminUserRoutes = require("./adminUser");
const adminOrderRoutes = require("./adminOrder");
const adminWalletRoutes = require("./adminWallet");
const protectedRoutes = require("./protected");

router.use("/", resetRoutes);
router.use("/", authRoutes);
router.use("/", accountRoutes);
router.use("/", addressRoutes);
router.use("/", newsletterRoutes);
router.use("/", messageRoutes);
router.use("/", websiteReviewRoutes);
router.use("/", sellerRoutes);
router.use("/", bookRoutes);
router.use("/", searchRoutes);
router.use("/", sellerWalletRoutes);
router.use("/", cartRoutes);
router.use("/", wishlistRoutes);
router.use("/", orderRoutes);
router.use("/", checkoutRoutes);
router.use("/", reviewRoutes);
router.use("/", tagRoutes);
router.use("/", adminBookRoutes);
router.use("/", adminMessageRoutes);
router.use("/", adminSellerRoutes);
router.use("/", adminUserRoutes);
router.use("/", adminOrderRoutes);
router.use("/", adminWalletRoutes);
router.use("/", protectedRoutes);

module.exports = router;
