const DBurls = require("../models/url");
const getALL = async(req, res) => {
    if (req.user) {
        try {
            // console.log(req.user.id)
            const urls = await DBurls.find({});
            if (urls) {
                res.render("dashbord", {
                    urls: urls,
                    host: "https://cuturll.herokuapp.com/",
                    user: req.user
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
        res.render("index", {
        
        });
    }
};
const addONE = async(req, res) => {
    const url = {
        fullURL: req.body.fullURL,
    };
    try {
        await DBurls.create(url);
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteONE = async(req, res) => {
    try {
        const id = req.params.id;
        const url = await DBurls.findOneAndDelete({
            _id: id,
        });
        if (!url) {
            res.status(404).send("url not exst");
        }
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getOne = async(req, res) => {
    const shortURL = req.params.shortURL;

    try {
        const url = await DBurls.findOne({
            shortURL: shortURL,
        });
        const clicks = url.clicks + 1;
        await DBurls.findByIdAndUpdate(url.id, {
            clicks: clicks,
        });
        res.redirect(url.fullURL);
    } catch (error) {
        res.send("there are no url with this shortURL");
    }
};

module.exports = {
    getALL,
    addONE,
    deleteONE,
    getOne,
};