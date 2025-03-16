import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Message.css";


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
                heure: `${now.getHours}:${now.getMinutes}:${now.getSeconds}`
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
        </div>
    )
}

export default MessagePage