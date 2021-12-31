const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const weatherCode = require("./utils/weathercode");
const hbs = require("hbs");
const app = express();
const port = 3000;

// *Define Path for Express Config
const publicAccess = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

//* Setting up register Partials
hbs.registerPartials(partialPaths);

// *Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//* Setup static Directory to serve
app.use(express.static(publicAccess));

// * Responding to request & Dynamic template via HBS

//* API Endpoints...
app.get("", (req, res) => {
  res.render("weather", {
    name: "shahbaz Khan",
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    name: "Shahbaz",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address of location you want to see weather.",
    });
  }

  //* Default parameters exists.
  geocode(req.query.address, (error, { lon, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    } else {
      weatherCode(lon, lat, (error, result) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({
            currentTemperature: result.currentTemperature,
            location,
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "Help not found , go to Contact Section. Thanks!.",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    error: "Page not found! please go to homepage.",
  });
});

//* Express functions for responding
// app.get("/about", (req, res) => res.send("<h1>About page!</h1>"));
// app.get("/weather", (req, res) =>
//   res.send({
//     location: "Karachi",
//     temperature: 24,
//   })
// );
// app.get("/search", (req, res) => res.send("<h1>Search Page!</h1>"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
