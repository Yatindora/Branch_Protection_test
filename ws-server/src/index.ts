import {WebSocketServer , WebSocket , RawData} from "ws"
import { messageQueue } from "./queue/queue.js"

const wss = new WebSocketServer({port : 3002} , ()=>{
    console.log("WS Connected Successfully🎉🎉🎉")
})

wss.on("connection" ,(ws : WebSocket)=>{
    ws.send("Just Joined😎")
    ws.on("message" ,async (ev : RawData)=>{
        const data = ev.toLocaleString()
        console.log(data);
        let obj 
        try {
            obj = JSON.parse(data)
        } catch (error) {
            console.log(error);
            ws.send("Invalid object" +  error)
        }
        

        if(obj.type==="chat"){
            // {
            //     type : "chat",
            //     payload  : {
            //         message : ""
            //     }
            // }

            console.log("Messing incomming is"  + obj.payload.message);
            await messageQueue.add("chat-message" , {
                message : obj.payload.message,
                createdAt : Date.now().toLocaleString()
            })
            console.log("Job sended");
    
        }

    })
})