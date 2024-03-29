import Image from "next/image";
import logo from "../public/kanbanlogo.png"
import profile from "../public/profile.svg"
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" href={"/"}>
                        <Image alt="logo" src={logo} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" href={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={"/"}>Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={"/kanban"}>Kanban</Link>
                            </li>
                        </ul>
                        <Image alt="profile" src={profile} width={40} height={40} />
                    </div>
                </div>
            </nav>
        </>
    );
}