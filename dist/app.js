"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18n_1 = __importDefault(require("./i18n"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['*'],
}));
app.use(i18next_http_middleware_1.default.handle(i18n_1.default));
app.use((req, res, next) => {
    const lang = req.body.language || req.query.language || 'en';
    req.i18n.changeLanguage(lang).then(() => {
        next();
    }).catch(err => {
        console.error('Error changing language:', err);
        next(err);
    });
});
app.use('/auth', authRoutes_1.default);
app.use('/cars', carRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
