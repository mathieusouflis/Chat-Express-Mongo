import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const MessagePage = () => {
    const [messages, setMessages] = useState([])
    const socket = io("ws:localhost:4865")

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((old) => [...old, data])
        })

        return socket.off("message")
    }, [socket])

    const handleMessage = (e) => {  
        e.preventDefault()

        const username = e.target[0].value
        const message = e.target[1].value
        const now = new Date()
        
        const data = {
            username,
            message,
            date: now.getDate(),
            hours: now.getTime()
        }
        
        setMessages((old) => [...old, data])
        
        socket.emit("message", data)
        
        e.target[1].value = ""
    }
    
    return (
        <>
        <form onSubmit={handleMessage}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            {
                messages.map((message) => <div>
                    <span>{message.name}</span>
                    <p>{message.message}</p>
                    <p>{message.date} {message.hours}</p>
                </div>)
            }
            <label htmlFor="message">Message</label>
            <input type="text" name="message" id="message" />
            <input type="submit" value="Send" />
        </form>
        </>
    )
}

export default MessagePage