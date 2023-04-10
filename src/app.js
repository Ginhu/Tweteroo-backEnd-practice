import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
const users = []
const tweets = []


app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body

    if (!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    users.push({username, avatar})
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body
    const userSignedUp = users.find((el)=>el.username === username)

    if(!username || !tweet || typeof(username) !== "string" || typeof(tweet) !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    
    if (!userSignedUp) {
        return res.status(401).send("UNAUTHORIZED")
    } else {
        tweets.push({username, tweet})
        res.status(201).send("OK")
    }
})

app.get("/tweets", (req, res)=>{
    const tweetsGet = []
    const page = req.query.page

    for (let i = tweets.length-1; i>tweets.length-11; i--) {

        if(tweets.length === 0) {
            break
        }

        const username = tweets[i].username
        const tweet = tweets[i].tweet
        const avatarFind = users.find(el=>el.username===username)
        const avatar = avatarFind.avatar

        tweetsGet.push({username, avatar, tweet})

        if(i === 0) {
            break
        } 
    }

    res.status(200).send(tweetsGet)
})

app.get("/tweets/:username", (req, res)=> {
    const {username} = req.params
    const tweetsGet = tweets.filter((el) => el.username === username)
    const tweetsGetUsername = []

    for (let i = 0; i<tweetsGet.length; i++) {

        if (tweetsGet.length === 0) {
            break
        }
        const avatarFind = users.find(el=>el.username===username)
        const avatar = avatarFind.avatar
        

        const tweet = tweetsGet[i].tweet
        tweetsGetUsername.push({username, avatar, tweet})
    }

    res.status(200).send(tweetsGetUsername)
}) 


const PORT = 5000
app.listen(PORT, ()=>console.log("Server ON"))