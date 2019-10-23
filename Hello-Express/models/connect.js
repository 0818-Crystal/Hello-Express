var mongoose = require("mongoose");
var url =
  "mongodb+srv://root:124578963@cluster0-leeke.mongodb.net/zao_yi?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true }).then(
  () => {
    console.log("ready to use");
  },
  err => {
    console.log("err：" + err);
  }
);

module.exports = mongoose;
