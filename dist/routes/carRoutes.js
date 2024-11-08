"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carController_1 = require("../controllers/carController");
const router = express_1.default.Router();
router.post('/create', carController_1.createCar);
router.get('/list', carController_1.listCars);
exports.default = router;
