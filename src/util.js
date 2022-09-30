// Image resizing by manipulating the url.

export const smolImg = (imgPath, size) =>{
    const img = imgPath?.match(/media\/screenshots/)   //matching with 2 urls - /media or /screenshots
    ? imgPath?.replace("/media/screenshots", `/media/resize/${size}/-/screenshots`)
    : imgPath?.replace("/media/games/", `/media/resize/${size}/-/games/`);

    //imgPath has "?" in the end means it won't try to match or replace if imgPath is null.

    return img;
}