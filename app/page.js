import Image from 'next/image';
import avatar from '../public/home.jpg';
import Link from 'next/link';


export default function Home() {

    return (
        <>
            <Link href={'/kanban'}>kanban</Link>
            <div className='content'><Image alt="home" src={avatar} placeholder="blur" /></div>
        </>
    );
}