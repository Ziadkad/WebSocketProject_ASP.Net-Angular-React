import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function Appa() {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl] = useState('ws://10.5.235.99:8181');
  const [messageHistory, setMessageHistory] = useState([]);
  const [msg, setMsg] = useState('');

  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);


  const handleClickSendMessage = useCallback(() => sendMessage("Ziad React a envoye : "+msg),[msg]);



  return (
    <div>
    <input type='text' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
      <button  type='button'
        onClick={handleClickSendMessage}
      >
        Send
      </button>
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>{message ? message.data : null}</li>
        ))}
      </ul>
    </div>
  );
}
