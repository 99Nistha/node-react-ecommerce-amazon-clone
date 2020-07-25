"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get("/", _util.isAuth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var orders;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _orderModel["default"].find({}).populate('user');

          case 2:
            orders = _context.sent;
            res.send(orders);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/mine", _util.isAuth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var orders;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _orderModel["default"].find({
              user: req.user._id
            });

          case 2:
            orders = _context2.sent;
            res.send(orders);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/:id", _util.isAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var order;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _orderModel["default"].findOne({
              _id: req.params.id
            });

          case 2:
            order = _context3.sent;

            if (order) {
              res.send(order);
            } else {
              res.status(404).send("Order Not Found.");
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var order, deletedOrder;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _orderModel["default"].findOne({
              _id: req.params.id
            });

          case 2:
            order = _context4.sent;

            if (!order) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return order.remove();

          case 6:
            deletedOrder = _context4.sent;
            res.send(deletedOrder);
            _context4.next = 11;
            break;

          case 10:
            res.status(404).send("Order Not Found.");

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/", _util.isAuth, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var newOrder, newOrderCreated;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            newOrder = new _orderModel["default"]({
              orderItems: req.body.orderItems,
              user: req.user._id,
              shipping: req.body.shipping,
              payment: req.body.payment,
              itemsPrice: req.body.itemsPrice,
              taxPrice: req.body.taxPrice,
              shippingPrice: req.body.shippingPrice,
              totalPrice: req.body.totalPrice
            });
            _context5.next = 3;
            return newOrder.save();

          case 3:
            newOrderCreated = _context5.sent;
            res.status(201).send({
              message: "New Order Created",
              data: newOrderCreated
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.put("/:id/pay", _util.isAuth, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var order, updatedOrder;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _orderModel["default"].findById(req.params.id);

          case 2:
            order = _context6.sent;

            if (!order) {
              _context6.next = 13;
              break;
            }

            order.isPaid = true;
            order.paidAt = Date.now();
            order.payment = {
              paymentMethod: 'paypal',
              paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
              }
            };
            _context6.next = 9;
            return order.save();

          case 9:
            updatedOrder = _context6.sent;
            res.send({
              message: 'Order Paid.',
              order: updatedOrder
            });
            _context6.next = 14;
            break;

          case 13:
            res.status(404).send({
              message: 'Order not found.'
            });

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;