import {Request, Response, Router} from "express";
import {addDays} from "date-fns";
import {errors} from "./errors";

export const videoRouter = Router({})

const videos: Array<myVideo> = []

type myVideo = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null | number
    createdAt: string
    publicationDate: string
    availableResolutions: Array<string>
}

videoRouter.get('/', (req: Request, res: Response) => {


    res.status(200).send(videos)
}) // gets videos

videoRouter.post('/', (req: Request, res: Response) => {     //creating new video

    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions

// checking for errors

    const errorMessage = errors(title,author,availableResolutions)

    if (errorMessage.length > 0) {
        res.status(400).send({errorsMessages: errorMessage})
        return
    }  // sending error messages to user

    const dateNow = new Date()

    const newVideo: myVideo = {
        // id: videos.length + 1,
        id: +dateNow,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: addDays(dateNow, 1).toISOString(),
        availableResolutions: availableResolutions
    }

    videos.push(newVideo)
    res.status(201).send(newVideo)
    return

})  //creating new video

videoRouter.get('/:videoId', (req: Request, res: Response) => {

    const id = +req.params.videoId

    const videoById = videos.find(p => p.id === id)
    if (videoById) {
        res.status(200).send(videoById)
        return
    } else {
        res.send(404)
        return
    }


})   // gets video by id

videoRouter.put('/:videoId', (req: Request, res: Response) => {

    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions
    const canBeDownloaded = req.body.canBeDownloaded
    const minAgeRestriction = req.body.minAgeRestriction
    const publicationDate = req.body.publicationDate

    // checking for errors
    const errorMessage = errors(title,author,availableResolutions)

    if (errorMessage.length > 0) {
        res.status(400).send({errorsMessages: errorMessage})
        return
    }  // sending error messages to user

    const id = +req.params.videoId

    let videoById = videos.find(p => p.id === id)  //had a error: 'p' implicitly has an 'any' type - I found solution on google to set 'noimplicitAny: false in tsconfigson. But did not get what did I do
    if (videoById) {
        let videoIndex = videos.indexOf(videoById)

        if (videoById) {
            videos[videoIndex].title = title
            videos[videoIndex].author = author
            videos[videoIndex].canBeDownloaded = canBeDownloaded
            videos[videoIndex].minAgeRestriction = minAgeRestriction
            videos[videoIndex].publicationDate = publicationDate
            videos[videoIndex].availableResolutions = availableResolutions
        }
        res.status(204).send(videos)
        return
    } else {
        res.send(404)
        return
    }


})   //updating video by id

videoRouter.delete('/:videoId', (req: Request, res: Response) => {

    const id = +req.params.videoId

    // if (typeof id === "number"){}

    const videoById = videos.find(p => p.id === id)
    if (videoById) {
        videos.splice(videos.indexOf(videoById), 1)
        res.send(204)
        return
    } else {
        res.send(404)
        return
    }
})   // delete by id

videoRouter.delete('/', (req: Request, res: Response) => {
    videos.length = 0
    return res.sendStatus(204)
})  // delete all data
