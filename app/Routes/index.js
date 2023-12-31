import express from 'express';
import path from 'path';
import fs from 'fs';
import General from '../Helpers/General';
const app = express();

const basename = path.basename(__filename);
const folderRoute = path.dirname(__filename);

fs.readdir(folderRoute, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (file === basename) return;
      const routeName = path.parse(file).name.toLowerCase();
      if (routeName === 'auth')
        app.use(`/${routeName}`, require(`./${routeName}`).default);
      else
        app.use(
          `/${routeName}`,
          General.verifyToken,
          require(`./${routeName}`).default
        );
        // app.use(`/${routeName}`, require(`./${routeName}`).default);
    });
  }
});

export default app;
