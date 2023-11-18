let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/Ptyxiakh');

let db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to database'));
db.once('open', () => console.log('Connected to database'));

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

Counter.create({ _id: 'userId', sequence_value: 0 })
    .then(() => {
        console.log('Counter initialized');
    })
    .catch((err) => {
        console.error('Counter initialization error:', err);
    });


app.post('/sign_up', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;

    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: 'userId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const data = {
            'UID': counter.sequence_value,
            'name': name,
            'email': email,
            'password': pass
        };

        await db.collection('Users').insertOne(data);
        console.log('Record inserted successfully');
        res.redirect('signup_success.html');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error saving data to MongoDB');
    }
});


app.get('/', (req, res) => {
    res.set({
        'Allow-access-Allow-Origin': '*'
    })
    return res.redirect('home.html');
}).listen(3000);

console.log('listening on port 3000');