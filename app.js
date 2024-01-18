const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
var cookieParser = require('cookie-parser')
const auth = require("./routes/auth")
const path = require("path")
const app = express()
const corsOptions = {
    origin: "https://youtube-clone-4rpc.onrender.com/", //included origin as true
    headers: ["Content-Type"],
    credentials: true, //included credentials as true
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(require("./routes/user"))
app.use(auth)
app.use(require("./routes/video"))
app.use(require("./routes/comment"))
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
dotenv.config()
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("conncted to mongodb");
}).catch((error)=>{
console.log(error);
})
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("success");
})