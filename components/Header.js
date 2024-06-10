import Image from "next/image";
import logo from "../public/kanbanlogo.png";
import Link from "next/link";
import { HeaderNav } from "./HeaderNav";

export default async function Header() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          <Image alt="logo" src={logo} />
        </Link>
        <HeaderNav />
      </div>
    </nav>
  );
}
