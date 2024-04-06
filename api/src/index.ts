import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

let clients: any[] = [];

app.use(bodyParser.json());
app.use(cors());


app.post('/api/signup', (req: Request, res: Response) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }


    if (clients.some(client => client.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const newClient = { name, email, phone, address };
    clients.push(newClient);

    res.status(201).json({ message: 'Signup successful', client: newClient });
});



app.post('/api/quote', (req, res) => {

    res.send('Cotización enviada');
});


app.post('/api/hook', (req, res) => {

    res.send('Carro enganchado correctamente');
});

app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
