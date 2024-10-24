const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')


const app = express()
const PORT = 4000

app.use(cors())
app.use(body_parser.json())

app.use("/api/manage",require('./routes/profile.routes'))
app.use("/api/manage",require('./routes/vehicle.routes'))
app.use("/api/manage",require('./routes/service.routes'))
app.use("/api/manage",require('./routes/bills.routes'))

app.listen(PORT,()=>{
    console.log("app is listen on the http://localhost:4000")
})