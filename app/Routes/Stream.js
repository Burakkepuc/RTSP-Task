import express from 'express';
import StreamController from '../Controllers/Stream';

const app = express();

app.get('/start', StreamController.startStream);
app.get('/stop', StreamController.stopStream);
app.get('/capture', StreamController.captureImage)
export default app;
