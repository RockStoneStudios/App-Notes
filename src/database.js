const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
     useUnifiedTopology : true,
     useNewUrlParser : true
}).then(db=>console.log("DataBase is connected"))
  .catch(err=> console.log(err));