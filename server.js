const app = require("./app.js");
const connect = require("./db.js");

app.listen(5000, async function () {
  try {
    await connect();
    console.log("listening 5000");
  } catch (err) {
    console.log(err);
  }
}); 