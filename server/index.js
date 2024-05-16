const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./router/roomRouter');

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

const {configureDB} = require("./config/mongo");
configureDB();

const {oAuthRouter} = require("./router/oauthRouter");
app.use("/", oAuthRouter);

app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

app.use('/rooms', routes);

app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})
