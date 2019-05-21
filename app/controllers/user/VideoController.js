const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const Video = require('../../models/Video');

class VideoController {
    /**
     * Get list video
     * */
    async index(req, res) {
        try {
            const skip = req.params.skip ? req.params.skip : 0;
            const limit = req.params.limit ? req.params.limit : 20;
            const videos = await Video.find({}, null, {skip, limit});
            console.log(videos);
            res.json(videos);
        } catch (e) {
            res.json({
                status: e.code,
                message: e.message
            });
        }
    }

    /**
     * Create and upload new video
     * */
    async create(req, res) {
        const title = req.body.title;
        const description = req.body.description;
        const file = req.file;
        const thumbnailPath = '/uploads/thumbnails/' + moment().format('MM-YYYY') + 'thumbnail-' + file.filename + '.png';
        console.log(title, description, file);
        ffmpeg(file.path).screenshots({
            timestamps: ['00:00:01'],
            filename: 'thumbnail-' + file.filename + '.png',
            folder: global.appRoot + '/public/uploads/thumbnails/' + moment().format('MM-YYYY'),
            size: '320x240'
        });
        try {
            const video = await Video.create({
                title,
                description,
                video: '/uploads/videos/' + moment().format('MM-YYYY') + '/' + file.filename,
                thumbnail: thumbnailPath
            });
            res.json({
                id: video._id,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
                status: video.status,
                video: video.video,
                size: file.size,
                mimetype: file.mimetype
            });
        } catch (e) {
            res.json({
                status: e.code,
                message: e.message
            });
        }
    }
}

module.exports = new VideoController();