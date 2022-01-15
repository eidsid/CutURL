const DBurls = require('../models/url')
const getALL = async(req, res) => {

    try {
        const urls = await DBurls.find({})
        if (urls) {
            res.send({
                urls: urls
            });
        } else {
            res.send('index', 'no Thing here')
        }
    } catch (error) {
        res.status(500).send('index', error.message)
    }
}
const addONE = async(req, res) => {

    const url = {
        fullURL: req.body.fullURL
    }
    try {
        await DBurls.create(url)
        res.send('add Success')

    } catch (error) {
        res.status(500).send(error.message)
    }
}
const deleteONE = async(req, res) => {

    try {
        const id = req.params.id
        const url = await DBurls.findOneAndDelete({
            _id: id
        })
        if (!url) {
            res.status(404).send("url not exst")
        }
        res.status(200).send('Delete success')

    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getOne = async(req, res) => {
    const id = req.params.id
    try {
        const url = await DBurls.findById({
            _id: id
        })
        res.send(url)
    } catch (error) {
        res.send('there are no url with this id')
    }
}

module.exports = {
    getALL,
    addONE,
    deleteONE,
    getOne
}