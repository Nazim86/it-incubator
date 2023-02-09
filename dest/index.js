"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_1 = require("./videos");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use('/videos', videos_1.videoRouter);
app.use('/testing/all-data', videos_1.videoRouter); // using router for delete all
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});
