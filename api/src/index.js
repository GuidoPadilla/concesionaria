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
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Ruta para inscribirse a la concesionaria
app.get('/api/inscribirse', (req, res) => {
    // Implementación para inscribirse
    res.send('Inscripción exitosa');
});
// Ruta para pedir una cotización de un carro
app.post('/api/cotizar', (req, res) => {
    // Implementación para cotizar un carro
    res.send('Cotización enviada');
});
// Ruta para enganchar un carro
app.post('/api/enganchar', (req, res) => {
    // Implementación para enganchar un carro
    res.send('Carro enganchado correctamente');
});
app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
