import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { Car, HookedCar, Quote, User } from "./models"
import cors from 'cors';

const app: Application = express();
const port = 3000;
const { cars } = require('./car-mock-data');

let users: User[] = [{ name: "Ejemplo", email: "ejemplo@mail.com", password: "ejemplo", hooked_cars: null }];
let quotes: Quote[] = []

app.use(bodyParser.json());
app.use(cors());

app.get('/api/cars', (req, res) => {
    res.json(cars);
});

app.get('/api/cars/:id', (req: Request, res: Response) => {
    const carId = Number(req.params.id);
    const car: Car | undefined = cars.find((c: Car) => c.id === carId);

    if (!car) {
        return res.status(404).json({ error: 'Carro no encontrado' });
    }

    res.status(200).json(car);
});

app.post('/api/signup', (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Por favor provea todos los campos necesarios' });
    }

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'Este correo ya esta registrado' });
    }

    const newUser: User = { name, email, password, hooked_cars: null };
    users.push(newUser);

    res.status(201).json({ message: 'Registro correcto', user: newUser });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user || user?.password !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Login correcto', user });
});



app.post('/api/quote', (req: Request, res: Response) => {
    const { paymentMethod, numberOfPayments, phoneNumber, carId } = req.body;

    if (!carId || !paymentMethod || !numberOfPayments || !phoneNumber) {
        return res.status(400).json({ error: 'Por favor provea todos los campos necesarios' });
    }

    const quote: Quote = {
        paymentMethod,
        numberOfPayments,
        phoneNumber,
        carId
    };

    quotes.push(quote);

    console.log("Quotes", quotes)

    res.status(200).json({ message: 'Cotización hecha de forma exitosa', quote });
});

app.post('/api/hook', (req, res) => {
    const { email, carId } = req.body;

    const client = users.find(c => c.email === email);
    if (!client) {
        return res.status(404).json({ error: 'Cliente no existente' });
    }

    if (client.hooked_cars && client.hooked_cars.some((hookedCar: HookedCar) => hookedCar.id === carId)) {
        return res.status(400).json({ error: 'Este carro ya ha sido enganchado por este cliente' });
    }

    const car = cars.find((c: Car) => c.id === carId);
    if (!car) {
        return res.status(404).json({ error: 'Carro no encontrado' });
    }

    if (car.availableQuantity === 0) {
        return res.status(400).json({ error: 'No hay existencia del carro solicitado' });
    }

    car.availableQuantity--;

    const hookedCar: HookedCar = { clientId: client.email, id: car.id };

    if (!client.hooked_cars) {
        client.hooked_cars = [];
    }
    client.hooked_cars.push(hookedCar);

    res.status(200).json({ message: 'Carro enganchado correctamente' });
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
