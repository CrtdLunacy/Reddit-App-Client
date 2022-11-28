import express from 'express'
import ReactDOM from 'react-dom/server'
import { App } from '../App.tsx'
import { indexTemplate } from './indexTemplate'
const app = express();
import axios from 'axios';
import compression from 'compression';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000;

app.use('/static', express.static('./dist/client'));
app.use(compression());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

app.get('/auth', (req, res) => {
    axios.post(
            'https://www.reddit.com/api/v1/access_token',
            `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.CURRENT_URL}`, {
                auth: { username: process.env.CLIENT_ID, password: process.env.SECRET },
                headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            }
        )
        .then(({ data }) => {
            res.send(
                indexTemplate(ReactDOM.renderToString(App()), data['access_token']),
            );
        })
        .catch(console.log)

})

app.get('*', (req, res) => {
    res.send(
        indexTemplate(ReactDOM.renderToString(App())),
    );
});


app.listen(PORT, () => {
    console.log(`server started on port http://localhost:${PORT}`)
});