import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
const users = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body
    users.push({username, avatar})
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body
    const userSignedUp = users.find((el)=>el.username === username)
    
    if (!userSignedUp) {
        return res.send("UNAUTHORIZED")
    } else {
        tweets.push({username, tweet})
        res.send("OK")
    }
})


const PORT = 5000
app.listen(PORT, ()=>console.log("Server ON"))