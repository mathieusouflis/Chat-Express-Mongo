import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {

    const socket = io("http://localhost:4865");


    socket.on("logs", (data) => {
      setLogs(data); 
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Logs des messages</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <span>
              {log.date} {log.heure} - {log.name} : {log.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPage;

