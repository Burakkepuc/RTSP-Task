import StreamService from "../Services/Stream";

class StreamController{
  static async startStream(req,res){
    try {
      const result = await StreamService.startStream(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }
  static async stopStream(req,res){
    try {
      const result = await StreamService.stopStream(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }
  static async captureImage(req,res){
    try {
      const result = await StreamService.captureImage(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }
}

export default StreamController;