const Router = require("express");
const router = new Router();
const hotelRouter = require("./hotelRouter");
const roomsRouter = require("./roomRouter");
const userRouter = require("./userRouter");
const serviceRouter = require("./serviceRouter");
const infoRouter = require("./infoRouter");
const infoItemRouter = require("./infoItemRouter");
const imagesRouter = require("./imagesRouter");
const newsRouter = require("./newsRouter");
const reviewRouter = require("./reviewRouter");
const servicePriceListRouter = require("./servicePriceListRouter");
const dataTypeRouter = require("./dataTypeRouter");
const feedbackRouter = require("./feedbackRouter");

router.use("/hotels", hotelRouter);
router.use("/rooms", roomsRouter);
router.use("/user", userRouter);
router.use("/service", serviceRouter);
router.use("/info", infoRouter);
router.use("/image", imagesRouter);
router.use("/news", newsRouter);
router.use("/review", reviewRouter);
router.use("/servicePriceList", servicePriceListRouter);
router.use("/infoItem", infoItemRouter);
router.use("/dataTypes", dataTypeRouter);
router.use("/feedback", feedbackRouter);

module.exports = router;
