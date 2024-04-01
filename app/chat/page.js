'use client'

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000/");

const Response = async (msg)=>{ 
    await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify(msg),
    headers: {
      'Content-Type': 'application/json'
    }
  })}
export default function Chat() {

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function getdata() {
            let res = await fetch('/api/chat')
            let resJson = await res.json()
            console.log("srem0",resJson);
            setMessages(current => [...current, ...resJson])
        };
        // Create a socket connection
        getdata()
        socket.connect()
        // Listen for incoming messages
        socket.on('connect', () => {
            console.log(socket.id)
            getdata()
        });
        socket.on('broadcastNewMessage', (msg)=>{
            setMessages(current => [...current, msg])
        }) 

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(()=>{
        
    })

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    }
    const handleBtnClick = () => {
        if (newMessage != '') {
            let Msg = {
                'user': 'Kostya',
                'text': newMessage
            }
            socket.emit("newMessage", Msg)
            setMessages(current => [...current, Msg])
            setNewMessage('');
            Response(Msg)
        }
    }

    return (
        <div className='m-5'>
            <ol className="list-group list-group-numbered">
                {

                    messages.map((message, key) =>
                        <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className='col'>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{message.user}</div>
                                    {message.text}
                                </div>
                            </div>
                        </li>)

                }

            </ol>
            <div>
                <textarea value={newMessage} onChange={handleChange}></textarea>
            </div>
            <div>
                <button type="button" onClick={handleBtnClick}>отправить</button>
            </div>



        </div>
    )
}