const router=require("express").Router()
const fetch=require('node-fetch');
const fs = require('fs');
const template = require('../template');

router.post('/',async(req,res)=>{
  try {
    const tweet=req.body.tweet
    const user=req.body.user

    const starter=template.templateStart
    const image=template.addImage(user.profile_image_url)
    const userDetails=template.addUser(user.name,user.username)
    const text=template.addText(tweet.text)
    const mets=template.addMets(tweet.created_at,user.location)
    const{retweet_count,reply_count,like_count}=tweet.public_metrics
    const stats=template.addStats(reply_count,retweet_count,like_count)
    const end=template.templateEnd


    fs.writeFile(`${tweet.id}.html`,starter,async()=>{
      fs.appendFile(`${tweet.id}.html`,image,async()=>{
        fs.appendFile(`${tweet.id}.html`,userDetails,async()=>{
          fs.appendFile(`${tweet.id}.html`,text,async()=>{
            fs.appendFile(`${tweet.id}.html`,mets,async()=>{
              fs.appendFile(`${tweet.id}.html`,stats,async()=>{
                fs.appendFile(`${tweet.id}.html`,end,async()=>{
                  console.log('File created');
                })
              })
            })
          })
        })
      })
    })

    try {
      fetch(`http://localhost:5000/screenshot/shot`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:tweet.id
        })
      }).then(async response=>{
        const resp=await response.json()
        res.send(resp)
      })
    }
    catch (e) {
      console.log(e.message);
      res.send(e.message)
    }


  } catch (e) {
    console.log(e.message);
  }
})






module.exports = router;
