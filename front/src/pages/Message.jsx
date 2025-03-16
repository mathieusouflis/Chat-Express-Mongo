import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Message.css"

const socket = io("ws://localhost:4865")

const MessagePage = () => {
    const [messages, setMessages] = useState([])
    const [userNumber, setUserNumber] = useState(0)

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((old) => [...old, data])
        })

        socket.on("total_user", (data) => {
            setUserNumber(data)
        })

        return () => {
            socket.off("message")
            socket.off("total_user")
        }
    }, [])

    const handleMessage = (e) => {  
        e.preventDefault()

        const name = e.target[0].value.trim()
        const message = e.target[1].value.trim()
        const now = new Date()
        
        if(name !== "" && message !== ""){
            const data = {
                name,
                message,
                date: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
                heure: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
            }
            
            setMessages((old) => [...old, data])
            
            socket.emit("message", data)
        }
        
        e.target[1].value = ""
    }
    
    return (
        <div className="container">
        <p><strong>{userNumber}</strong> Utilisateur.s connécté.s</p>
        <form onSubmit={handleMessage}>
            <div className="form-section">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className="button" />
            </div>
            {
                messages.map((message, index) => <div key={index} className="message">
                    <span><strong>{message.name}</strong></span>
                    <p>{message.message}</p>
                    <p>{message.date} {message.hours}</p>
                </div>)
            }
            <div className="form-section">
                <label htmlFor="message">Message</label>
                <input type="text" name="message" id="message" />
                <input type="submit" value="Send" className="button" />
            </div>
        </form>
        <a href="http://localhost:5173/la-fameuse-page-des-supers-logs-fait-par-laurent">La page des logs</a>
        </div>
    )
}

export default MessagePage