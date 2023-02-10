export function errors(title,author,availableResolutions, canBeDownloaded = undefined, minAgeRestriction = undefined) {

    const videoResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']


    type errorMessageType = {
        message: string
        field: string
    }

    const errors: errorMessageType[] = []

    if (typeof title !== 'string' || title.length > 40) {
        errors.push({
            message: "Incorrect title",
            field: "title"
        })
    } //error message for title

    if (typeof author !== "string" || author.length > 20) {

        errors.push({
            message: "Incorrect author",
            field: "author"
        })
    }  //error message for author

    for(let i=0; i < availableResolutions.length; i++) {
        if(!(videoResolutions.includes(availableResolutions[i]))){
            errors.push({
                message: "Incorrect resolution",
                field: "availableResolutions"
            })
            break
        }
    }

    if(canBeDownloaded && typeof canBeDownloaded !== "boolean") {
        errors.push({
            message: "Incorrect canBeDownloaded",
            field: "canBeDownloaded"
        })
    }

    if(minAgeRestriction && (typeof minAgeRestriction !== "number" || minAgeRestriction<1 || minAgeRestriction>18)) {
        errors.push({
            message: "Incorrect minAgeRestriction",
            field: "minAgeRestriction"
        })
    }

   //error message for resolution
return errors
}
