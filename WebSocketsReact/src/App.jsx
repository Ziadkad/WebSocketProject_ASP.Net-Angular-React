import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState('')
  const [data, setData] = useState([])
  const socket = new WebSocket("ws://10.5.235.99:8181")
  // Connection opened

  const sendMessage = (e)=>{
    
      socket.send("ziad a envoye : " +  msg)

  }
  

  useEffect(()=>
    {socket.addEventListener("message", event => {
    setData(data => [...data, event.data]);
  });
  },[])
  // Listen for messages
 
  return (
    <>
        <input type='text' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <p>{data}</p>
        <button type='button' onClick={sendMessage}>Send</button>
        <ul>
          {data.map((item)=>{
            <li>
                {item}
            </li>
          })}

        </ul>
    </>
  )
}

export default App
