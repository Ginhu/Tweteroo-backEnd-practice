import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
const users = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.params
    users.push({username, avatar})
    res.send("OK")
})


const PORT = 5000
app.listen(PORT, ()=>console.log("Server ON"))