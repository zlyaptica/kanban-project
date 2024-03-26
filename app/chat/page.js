'use client'

import { useEffect, useState } from 'react';

export default function Chat() {

    useEffect(() => {
        console.log('Подключить WEB-сокеты');
    }, []);


    const [messages, setMessages] = useState([
        {
            'user': 'Igor',
            'text': 'hi, how are you?'
        },
        {
            'user': 'Kostya',
            'text': 'thanks, and you?'
        },
    ]);

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
        </div>
    )
}