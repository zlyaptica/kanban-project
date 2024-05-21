import Image from "next/image";
import logo from "../public/kanbanlogo.png";
import Link from "next/link";
import { navigateToHome } from "@/app/actions";
import { HeaderNav } from "./HeaderNav";

export default async function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          <Image alt="logo" src={logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <HeaderNav/>
      </div>
    </nav>
  );
}
