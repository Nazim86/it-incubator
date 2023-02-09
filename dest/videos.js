"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const errors_1 = require("./errors");
exports.videoRouter = (0, express_1.Router)({});
const videos = [];
exports.videoRouter.get('/', (req, res) => {
    res.status(200).send(videos);
}); // gets videos
exports.videoRouter.post('/', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    // checking for errors
    const errorMessage = (0, errors_1.errors)(title, author, availableResolutions);
    if (errorMessage.length > 0) {
        res.status(400).send({ errorsMessages: errors_1.errors });
        return;
    } // sending error messages to user
    const dateNow = new Date();
    const newVideo = {
        // id: videos.length + 1,
        id: +dateNow,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: (0, date_fns_1.addDays)(dateNow, 1).toISOString(),
        availableResolutions: availableResolutions
    };
    videos.push(newVideo);
    res.status(201).send(videos);
    return;
}); //creating new video
exports.videoRouter.get('/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const videoById = videos.find(p => p.id === id);
    if (videoById) {
        res.status(200).send(videoById);
        return;
    }
    else {
        res.send(404);
        return;
    }
}); // gets video by id
exports.videoRouter.put('/:videoId', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;
    // checking for errors
    const errorMessage = (0, errors_1.errors)(title, author, availableResolutions);
    if (errorMessage.length > 0) {
        res.status(400).send({ errorsMessages: errors_1.errors });
        return;
    } // sending error messages to user
    const id = +req.params.videoId;
    let videoById = videos.find(p => p.id === id); //had a error: 'p' implicitly has an 'any' type - I found solution on google to set 'noimplicitAny: false in tsconfigson. But did not get what did I do
    if (videoById) {
        let videoIndex = videos.indexOf(videoById);
        if (videoById) {
            videos[videoIndex].title = title;
            videos[videoIndex].author = author;
            videos[videoIndex].canBeDownloaded = canBeDownloaded;
            videos[videoIndex].minAgeRestriction = minAgeRestriction;
            videos[videoIndex].publicationDate = publicationDate;
            videos[videoIndex].availableResolutions = availableResolutions;
        }
        res.status(204).send(videos);
        return;
    }
    else {
        res.send(404);
        return;
    }
}); //updating video by id
exports.videoRouter.delete('/:videoId', (req, res) => {
    const id = +req.params.videoId;
    // if (typeof id === "number"){}
    const videoById = videos.find(p => p.id === id);
    if (videoById) {
        videos.splice(videos.indexOf(videoById), 1);
        res.send(204);
        return;
    }
    else {
        res.send(404);
        return;
    }
}); // delete by id
exports.videoRouter.delete('/', (req, res) => {
    videos.length = 0;
    return res.sendStatus(204);
}); // delete all data
