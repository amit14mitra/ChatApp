const socket=io()

let name;

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')

do{
    name = prompt('Enter a name: ')
    console.log(name)
}while(name==null)

textarea.addEventListener('keyup',(event)=>{
    
    if(event.key === 'Enter'){
        sendMessage(event.target.value)
    }
})

function sendMessage(text){
    let textmsg = {
        nm:name,
        msg:text.trim()
    }

    appendText(textmsg,'outgoing')

    //sending msg to server

    socket.emit('message',textmsg)
    
    scrollToBottom()

}

function appendText(textmsg,status){
    
    let main=document.createElement('div')
    main.classList.add(status,'message')

    let text= `
    <h4>${textmsg.nm}</h4>
    <p>${textmsg.msg}</p>
    `
    main.innerHTML=text
    messageArea.appendChild(main)

    document.getElementById("textarea").value='';

} 
//Receiving the server message

socket.on('message',(msg)=>{
    //console.log(msg)
    appendText(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}