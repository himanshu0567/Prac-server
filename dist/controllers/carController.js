"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCars = exports.createCar = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const translationService_1 = require("../utils/translationService");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, name, description, price } = req.body;
    try {
        const { hindi: name_hi, spanish: name_es } = yield (0, translationService_1.translateToLanguages)(name);
        const { hindi: description_hi, spanish: description_es } = yield (0, translationService_1.translateToLanguages)(description);
        const car = yield prisma_1.default.car.create({
            data: {
                image,
                name_en: name,
                name_hi,
                name_es,
                description_en: description,
                description_hi,
                description_es,
                price,
            },
        });
        res.status(201).json(car);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating car' });
    }
});
exports.createCar = createCar;
const listCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.language || 'en';
    const selectFields = {
        image: true,
        price: true,
        [`name_${language}`]: true,
        [`description_${language}`]: true,
    };
    try {
        const cars = yield prisma_1.default.car.findMany({ select: selectFields });
        res.status(200).json(cars.map(car => (Object.assign(Object.assign({}, car), { name: car[`name_${language}`], description: car[`description_${language}`] }))));
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching cars' });
    }
});
exports.listCars = listCars;
