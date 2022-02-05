const DBurls = require("../models/url");
const Str = require('@supercharge/strings')

const getALL = async(req, res) => {

    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.user) {
        try {
            const urls = await DBurls.findOne({
                id: req.user.id
            });

            if (urls) {
                res.render("dashbord", {
                    urls: urls.urls,
                    host: fullUrl,
                    user: req.user,
                });
            } else {
                res.render("dashbord", {
                    urls: [],
                });
            }
        } catch (error) {
            res.status(500).send("index", error.message);
        }
    } else {
        res.render("index", {});
    }
};
const addONE = async(req, res) => {
    const id = req.user.id;
    if (id) {
        const randomPostId = await Str.random(20)
        const text = await Str.random(7);

        const url = {
            id: randomPostId,
            fullURL: req.body.fullURL,
            shortURL: text,
            clicks: 0,
        };
        try {
            const urlscollection = await DBurls.findOne({
                postsid: id
            });

            if (urlscollection) {
                const updatedUrls = urlscollection.urls.push(url)

                await DBurls.findOneAndUpdate({
                    postsid: id
                }, {
                    ...urlscollection,
                    urls: updatedUrls
                });
            } else {
                const urlscollection = {
                    postsid: id,
                    urls: [url],
                };
                await DBurls.create(urlscollection);
            }
            res.redirect("/");

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
const deleteONE = async(req, res) => {
    const postId = req.params.id;
    const id = req.user.id;
    try {
        const urlscollection = await DBurls.findOne({
            postsid: id
        });

        if (urlscollection) {
            urlscollection.urls = urlscollection.urls.filter((val) => {
                return val.id != postId
            })

            await DBurls.findOneAndUpdate({
                postsid: id
            }, {
                ...urlscollection
            });
        } else {
            console.log("not found")
        }
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getOne = async(req, res) => {
    const shortURL = req.params.shortURL;
    let userid = req.user.id;
    console, log(userid)
    if (userid) {
        try {
            const urlscollection = await DBurls.findOne({
                postsid: userid,
            });
            // console.log(urlscollection);
            const updateclick = urlscollection.urls.map((url) => {
                return url.shortURL === shortURL ? {
                    ...url,
                    shortURL: url.shortURL + 1
                } : url
            })

            // console.log(updateclick)

            res.redirect(url.fullURL);
        } catch (error) {
            res.send("there are no url with this shortURL");
        }
    }


};

module.exports = {
    getALL,
    addONE,
    deleteONE,
    getOne,
};