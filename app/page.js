'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            let res = await fetch('/api/tasks')
            let resJson = await res.json()
            console.log(resJson);
            setTimeout(() => {
                setTasks(resJson)
            }, "1000");
            
        }

        getTasks()
    }, []);


    return (
        <div className='m-5'>
            <ol className="list-group list-group-numbered">
                {
                    tasks.map((task, key) =>
                        <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className='col'>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{task.name}</div>
                                    {task.description}
                                </div>
                                <button type='button'
                                    className='btn btn-primary'
                                    onClick={() => {
                                        console.log('Нажали кнопку Закрыть');
                                        let curTasks = [...tasks]
                                        curTasks[0].name = 'Денис API'
                                        setTasks(curTasks)
                                    }
                                    }>Закрыть</button>
                            </div>
                            <div className='col'>
                                <span className="badge bg-primary rounded-pill">14</span>
                            </div>
                        </li>)
                }

            </ol>
        </div>
    )
}