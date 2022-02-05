const DBurls = require("../models/url");
const User = require('../models/users')
const getALL = async(req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.user) {
        const id = req.user.id;
        try {

            const user = await User.findById(id)

            let urls = await user.populate('urls')
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
            res.send(error.message);
        }
    } else {
        res.render("index", {});
    }
};

const addONE = async(req, res) => {
    const id = req.user.id;
    const fullURL = req.body.fullURL
    if (id && fullURL) {
        try {
            const createdUrl = await DBurls.create({
                fullURL
            })
            const user = await User.findById(id)
            user.urls.push(createdUrl._id)
            user.save()
            req.flash('success_msg', 'Created success')
            res.redirect('/')
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/')
        }
    }
};

const deleteONE = async(req, res) => {
    const id = req.user.id;
    console.log(id);
    const urlID = req.params.id
    if (id && urlID) {
        try {
            await DBurls.findByIdAndDelete(urlID)
            const user = await User.findById(id)
            user.urls.filter((url) => {
                return url._id != urlID
            })
            user.save()
            req.flash('success_msg', 'delete success')
            res.redirect('/')
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/')
        }
    }
};

const getOne = async(req, res) => {
    const shortURL = req.params.shortURL;
    if (shortURL != "favicon.ico") {
        console.log("git one", shortURL);
        try {
            const urls = await DBurls.findOne({
                shortURL
            });
            console.log(urls)
                // update url clicks
                // urls.urls.map((url) => {
                //     return url.shortURL === shortURL ? {
                //         ...url,
                //         shortURL: url.shortURL + 1
                //     } : url
                // })
                // urls.save();
            res.redirect(urls.fullURL);
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