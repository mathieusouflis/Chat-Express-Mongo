import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Message.css";


const MessagePage = () => {
    const [messages, setMessages] = useState([])
    const socket = io("ws:localhost:4865")

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((old) => [...old, data])
        })

        socket.off("message")
    }, [socket])

    const handleMessage = (e) => {  
        e.preventDefault()

        const username = e.target[0].value.trim()
        const message = e.target[1].value.trim()
        const now = new Date()
        
        if(username !== "" && message !== ""){
            const data = {
                username,
                message,
                date: now.getDate(),
                hours: now.getTime()
            }
            
            setMessages((old) => [...old, data])
            
            socket.emit("message", data)
        }
        
        e.target[1].value = ""
    }
    
    return (
        <>
        <form onSubmit={handleMessage}>
            <div className="form-section">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            {
                messages.map((message) => <div className="message">
                    <span>{message.name}</span>
                    <p>{message.message}</p>
                    <p>{message.date} {message.hours}</p>
                </div>)
            }
            <div className="form-section">
                <label htmlFor="message">Message</label>
                <input type="text" name="message" id="message" />
                <input type="submit" value="Send" />
            </div>
        </form>
        </>
    )
}

export default MessagePage