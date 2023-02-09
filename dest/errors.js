"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
function errors(title, author, availableResolutions) {
    let videoResolutions;
    (function (videoResolutions) {
        videoResolutions[videoResolutions["P144"] = 0] = "P144";
        videoResolutions[videoResolutions["P240"] = 1] = "P240";
        videoResolutions[videoResolutions["P360"] = 2] = "P360";
        videoResolutions[videoResolutions["P480"] = 3] = "P480";
        videoResolutions[videoResolutions["P720"] = 4] = "P720";
        videoResolutions[videoResolutions["P1080"] = 5] = "P1080";
        videoResolutions[videoResolutions["P1440"] = 6] = "P1440";
        videoResolutions[videoResolutions["P2160"] = 7] = "P2160";
    })(videoResolutions || (videoResolutions = {}));
    const errors = [];
    if (typeof title != 'string' || title.length > 40) {
        errors.push({
            message: "Incorrect title",
            field: "title"
        });
    } //error message for title
    if (typeof author != "string" || author.length > 20) {
        errors.push({
            message: "Incorrect author",
            field: "author"
        });
    } //error message for author
    if (!(availableResolutions in videoResolutions)) {
        errors.push({
            message: "Incorrect resolution",
            field: "availableResolutions"
        });
    } //error message for resolution
    return errors;
}
exports.errors = errors;
