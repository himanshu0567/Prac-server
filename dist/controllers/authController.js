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
exports.getUserLanguage = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma"));
const jwtUtils_1 = require("../utils/jwtUtils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, language } = req.body;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        const message = req.t('User_already_exists');
        res.status(400).json({ message });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            language,
        },
    });
    res.status(201).json({ data: { message: req.t('User_registered_successfully'), user: { id: user.id, email: user.email, name: user.name, language: user.language } } });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        const message = req.t('Invalid_credentials');
        res.status(401).json({ message });
        return;
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        const message = req.t('Invalid_credentials');
        res.status(401).json({ message });
        return;
    }
    const token = (0, jwtUtils_1.generateToken)(email);
    res.status(200).json({ data: { token, user: { id: user.id, email: user.email, name: user.name, language: user.language } } });
});
exports.login = login;
const getUserLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.user.email;
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (user) {
        res.json({ language: user.language });
    }
    else {
        const message = req.t('User_not_found');
        res.status(401).json({ message });
    }
});
exports.getUserLanguage = getUserLanguage;
