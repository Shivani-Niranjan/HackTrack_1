"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import routes from "./routes/events";
const login_1 = __importDefault(require("./routes/login"));
const create_1 = __importDefault(require("./routes/create"));
const studentsList_1 = __importDefault(require("./routes/studentsList"));
const staffsList_1 = __importDefault(require("./routes/staffsList"));
const hackathonList_1 = __importDefault(require("./routes/hackathonList"));
const mentor_1 = __importDefault(require("./routes/mentor"));
// import display from "./routes/display";
const display_1 = __importDefault(require("./routes/display"));
const app = (0, express_1.default)();
const port = 5001;
// app.use("/api/v1/doctors", doctorRoutes); // for express
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/hacktrack/login', login_1.default);
app.use('/hacktrack/create', create_1.default);
app.use('/hacktrack/studentsList', studentsList_1.default);
app.use('/hacktrack/staffsList', staffsList_1.default);
app.use('/hacktrack/hackathonList', hackathonList_1.default);
app.use('/hacktrack/mentor', mentor_1.default);
app.use('/hacktrack/display', display_1.default);
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
