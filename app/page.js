import Image from 'next/image';
import avatar from '../public/home.jpg';
import Link from 'next/link';


export default async function Home() {
    
    let data = await getdata()

    return (
        <>
            <h1>{data}</h1>
            <Link href={'/kanban'}>kanban</Link>
            <div className='content'><Image alt="home" src={avatar} placeholder="blur" /></div>
        </>
    )
}

async function getdata() {
    return "testData"
}