const express=require('express')
const app=express()

const PORT=process.env.port||3000

const http=require('http').createServer(app)

http.listen(PORT, ()=>{
    console.log('listenting to port')
})

app.use(express.static(__dirname + '/Client'));

app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/Index.html')

})

// socket connection make

const oi=require('socket.io')(http)

oi.on('connection',(socket)=>{
    console.log('connection established')

    socket.on('message',(msg)=>{
        //console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})