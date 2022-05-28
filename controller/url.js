const DBurls = require("../models/url");
const User = require("../models/users");
const getALL = async (req, res) => {
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  if (req.user) {
    const id = req.user.id;
    try {
      const user = await User.findById(id);

      let urls = await user.populate("urls");
      let totalClick = 0;
      urls.urls.forEach((url) => {
        totalClick += url.clicks;
      });
      console.log("rclciks", redclick);
      res.render("dashbord", {
        totalClick: totalClick,
        urls: urls ? urls.urls : [],
        host: fullUrl,
        user: req.user,
      });
    } catch (error) {
      res.send(error.message);
    }
  } else {
    res.render("index", {});
  }
};

const addONE = async (req, res) => {
  const id = req.user.id;
  const fullURL = req.body.fullURL;
  if (id && fullURL) {
    try {
      const createdUrl = await DBurls.create({
        fullURL,
      });
      const user = await User.findById(id);
      user.urls.push(createdUrl._id);
      user.save();
      req.flash("success_msg", "Created success");
      res.redirect("/");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  }
};

const deleteONE = async (req, res) => {
  const id = req.user.id;
  console.log(id);
  const urlID = req.params.id;
  if (id && urlID) {
    try {
      await DBurls.findByIdAndDelete(urlID);
      const user = await User.findById(id);
      user.urls.filter((url) => {
        return url._id != urlID;
      });
      user.save();
      req.flash("success_msg", "delete success");
      res.redirect("/");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  }
};

const getOne = async (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(`/${shortURL}/`);
  if (shortURL != "favicon.ico") {
    try {
      // update url clicks
      const url = await DBurls.findOne({
        shortURL,
      });
      await DBurls.findOneAndUpdate(
        {
          shortURL: shortURL,
        },
        {
          clicks: url.clicks + 1,
        }
      );

      res.redirect(url.fullURL);
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/");
    }
  }
};

module.exports = {
  getALL,
  addONE,
  deleteONE,
  getOne,
};
