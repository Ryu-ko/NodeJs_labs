const express = require("express");
const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;
const env = require("dotenv");

env.config();

const app = express();
const port = 5000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      profileFields: ["id", "displayName", "name", "picture.type(large)"],
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, {
        id: profile.id,
        displayName: profile.displayName,
        picture: profile.photos
          ? profile.photos[0].value
          : "/img/faces/unknown-user-pic.jpg",
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/login", (req, res) => {
  res.send(` <div style="text-align: center; padding-top: 50px ; margin-left: 32%; margin-top: 130px; background-color: #CCFFFF; width: 500px; height: 200px; border-radius: 10px;">
  <h1 style="font-size: 24px; color: #0033CC;margin-bottom: 30px;">Войти с помощью Facebook</h1>
  <a style="display: inline-block; width: 100px; padding: 10px 20px; background-color: #FF66FF; color: #fff; text-decoration: none; border-radius: 5px;" href="/auth/facebook">Войти</a>
</div>`);
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/resource");
  }
);

app.get("/resource", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.send(
      ` <div style="text-align: center; margin-top: 100px;">
      <img src='${user.picture}' style="width: 200px; height: 200px"/>
      <h1 style="font-size: 24px;color: #0033CC; margin-bottom: 20px;">Добро пожаловать, ${user.displayName}</h1>
      <p>Authenticated User ID: ${user.id}</p>
      <a style="display: inline-block; width: 100px; padding: 10px 20px; background-color: #FF66FF; color: #fff; text-decoration: none; border-radius: 5px;" href="/logout">Выйти</a>
    </div>`
    );
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

const main = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
