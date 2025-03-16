import React, { useState, useEffect } from "react";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
        try {
            const response = await fetch("http://localhost:4865/messages", {
              headers: {
                "Content-Type": "application/json",
              }
            });

            const data = await response.json()
            setLogs(data);
        } catch (error) {
            console.log("Erreur lors de la récupération des logs :", error);
        }
    };
    fetchLogs();
    }, []);

    const deleteLog = async (id) => {
        try {
            await fetch(`http://localhost:4865/messages/${id}`, {
                method: "DELETE"
            });
            setLogs(logs.filter((log) => log._id !== id));
        } catch (error) {
            console.log("Erreur lors de la suppression du log :", error);
        }
    }

  return (
    <div>
      <h1>Logs des messages</h1>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            <span>
              {log.date} {log.heure} - {log.name} : {log.message}
            </span>
            <button onClick={() => deleteLog(log._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <a href="http://localhost:5173/">La page des messages</a>
    </div>
  );
};

export default LogsPage;

