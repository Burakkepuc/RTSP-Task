import RtspStream from 'node-rtsp-stream';
import db from '../../src/models/index';
import path from 'path';
import fs from 'fs';
import { createCanvas } from 'canvas';

let rtspStream = null;

class StreamService {
  static async startStream(req) {
    if (!rtspStream) {
      // rtsp2 not working as expected
      const rtspUrl2 =  "rtsp://admin:admin123@212.125.30.226:50213/cam/realmonitor?channel=1&subtype=0"
      const rtspUrl =
        'http://47.51.131.147/-wvhttp-01-/GetOneShot?image_size=1280x720&frame_count=1000000000';

      rtspStream = new RtspStream({
        name: 'rtsp-stream',
        streamUrl: rtspUrl,
        wsPort: 9999,
      });
      db.SnapLogs.create({
        user_id:req.session.user_id,
        date: new Date(),
        is_captured:true,
      });

      return 'RTSP is started.';
    } else {
      return 'RTSP is already started.';
    }
  }

  static async stopStream() {
    if (rtspStream) {
      rtspStream.stop();
      rtspStream = null;
      return 'RTSP is stopped.';
    } else {
      return 'RTSP is already stopped';
    }
  }

   static async captureImage(req) {
    const snapshotDirectory = path.join(__dirname, '../../snapshot'); 

    if (!fs.existsSync(snapshotDirectory)) {
      fs.mkdirSync(snapshotDirectory, { recursive: true });
    }

    const imageFileName = `captured_${Date.now()}.png`;
    const imagePath = path.join(snapshotDirectory, imageFileName);

    const canvas = createCanvas(800, 600); // Canvas boyutlarını ayarlayın


     fs.createWriteStream(imagePath);
     canvas.createPNGStream();


    const relativePath = path.relative(__dirname, imagePath);
    await db.SnapLogs.create({ 
      user_id:req.session.user_id,
      date: new Date(),
      is_captured:true,
    });

    return {type:true,path: relativePath};
  }
}

export default StreamService;
