const express=require("express")
const cors = require('cors');

const app=express()


app.use(cors())
app.use(express.json())

app.use('/save_tweet',require('./routes/save_tweet'))
app.use('/createTweet',require('./routes/createTweet'))
app.use('/screenshot',require('./routes/screenshot'))
app.use('/render',require('./routes/render'))

app.listen(5000,()=>{
  console.log('Server Running Good on Port 5000');
})
