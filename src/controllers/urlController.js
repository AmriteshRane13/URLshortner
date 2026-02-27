const db = require("../config/db");
const sc = require("shortid");

exports.acceptURL = (req, res) => {
  const { originalURL } = req.body;
  const shortid = sc.generate();
  db.query(
    "INSERT INTO urls(originalURL, short_code) VALUES(?, ?)",
    [originalURL, shortid],
    (err, results) => {
      if (err) throw err;
      res.json({ shortURL: `http://localhost:3000/${shortid}` });
    }
  );
};

exports.shortURL = (req, res) => {
  const { short_code } = req.params;
  let query = "SELECT originalURL FROM urls WHERE short_code = ?";
  db.query(query, [short_code], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect(results[0].originalURL);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  });
};
