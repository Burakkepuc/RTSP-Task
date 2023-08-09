const express = require('express');
const {createCanvas, loadImage} = require('canvas');
const fs = require('fs');
const path = require('path');
const RtspStream = require('node-rtsp-stream');

const app = express();
const port = 3000;

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true},
  })
);

const rtspUrl =
  'http://47.51.131.147/-wvhttp-01-/GetOneShot?image_size=1280x720&frame_count=1000000000';

let rtspStream;

app.get('/stream_start', (req, res) => {
  if (!rtspStream) {
    rtspStream = new RtspStream({
      name: 'rtsp-stream',
      streamUrl: rtspUrl,
      wsPort: 9999,
      ffmpegOptions: {
        '-stats': '',
        '-r': 30,
        '-q:v': 4,
      },
    });
    res.send('RTSP akışı başlatıldı.');
  } else {
    res.send('RTSP akışı zaten başlatıldı.');
  }
});

app.get('/stream_end', (req, res) => {
  if (rtspStream) {
    rtspStream.stop();
    rtspStream = null;
    res.send('RTSP akışı durduruldu.');
  } else {
    res.send('RTSP akışı zaten durduruldu.');
  }
});

// Diğer endpoint'leri buraya ekleyebilirsiniz

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
