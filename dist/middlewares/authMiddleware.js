"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(403);
        return;
    }
    jsonwebtoken_1.default.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.body.user = user;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
