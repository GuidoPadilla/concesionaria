"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const { cars } = require('./car-mock-data');
let users = [{ name: "Ejemplo", email: "ejemplo@mail.com", password: "ejemplo", hooked_cars: null }];
let quotes = [];
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/cars', (req, res) => {
    res.json(cars);
});
app.get('/api/cars/:id', (req, res) => {
    const carId = Number(req.params.id);
    const car = cars.find((c) => c.id === carId);
    if (!car) {
        return res.status(404).json({ error: 'Carro no encontrado' });
    }
    res.status(200).json(car);
});
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Por favor provea todos los campos necesarios' });
    }
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'Este correo ya esta registrado' });
    }
    const newUser = { name, email, password, hooked_cars: null };
    users.push(newUser);
    res.status(201).json({ message: 'Registro correcto', user: newUser });
});
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user || (user === null || user === void 0 ? void 0 : user.password) !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.status(200).json({ message: 'Login correcto', user });
});
app.post('/api/quote', (req, res) => {
    const { paymentMethod, numberOfPayments, phoneNumber, carId } = req.body;
    if (!carId || !paymentMethod || !numberOfPayments || !phoneNumber) {
        return res.status(400).json({ error: 'Por favor provea todos los campos necesarios' });
    }
    const quote = {
        paymentMethod,
        numberOfPayments,
        phoneNumber,
        carId
    };
    quotes.push(quote);
    console.log("Quotes", quotes);
    res.status(200).json({ message: 'Cotización hecha de forma exitosa', quote });
});
app.post('/api/hook', (req, res) => {
    const { email, carId } = req.body;
    const client = users.find(c => c.email === email);
    if (!client) {
        return res.status(404).json({ error: 'Cliente no existente' });
    }
    if (client.hooked_cars && client.hooked_cars.some((hookedCar) => hookedCar.id === carId)) {
        return res.status(400).json({ error: 'Este carro ya ha sido enganchado por este cliente' });
    }
    const car = cars.find((c) => c.id === carId);
    if (!car) {
        return res.status(404).json({ error: 'Carro no encontrado' });
    }
    if (car.availableQuantity === 0) {
        return res.status(400).json({ error: 'No hay existencia del carro solicitado' });
    }
    car.availableQuantity--;
    const hookedCar = { clientId: client.email, id: car.id };
    if (!client.hooked_cars) {
        client.hooked_cars = [];
    }
    client.hooked_cars.push(hookedCar);
    res.status(200).json({ message: 'Carro enganchado correctamente' });
});
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
