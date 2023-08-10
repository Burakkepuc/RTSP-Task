import express from 'express';
import session from 'express-session';
import routes from './Routes';
import {sequelize} from '../src/models'
const app = express();
const port = 4000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.use('/', routes)



app.listen(port, () => {
  console.log(`RTSP app listening at http://localhost:${port}`);
});
