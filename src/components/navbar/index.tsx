import styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import IconClose from "../../icons/iconClose";
import IconMenu from "../../icons/iconMenu";
import { useState } from "react";
import Logo from "./components/logo";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className={`${styles.container}`}>
      <header
        style={{ gridArea: "header" }}
        className="shadow-md w-full bg-slate-600 fixed top-0 left-0 text-slate-200 z-20"
      >
        <div className="md:flex justify-between items-center py-4 px-7">
          <Logo title={"Gatos"}/>
          <div
            className="aspect-square w-7 absolute right-8 top-6 cursor-pointer md:-top-7 transition-all duration-500 ease-in"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <IconMenu /> : <IconClose />}
          </div>
          <ul
            className={`md:flex md:pb-0 pb-4 absolute md:static left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              !openMenu
                ? "top-[-490px] md:opacity-100 opacity-0"
                : "top-[72px] opacity-100 md:bg-slate-600 bg-slate-500"
            }`}
          >
            <li
              className="md:ml-8 text-xl md:my-0 my-5"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <NavLink className="hover:text-slate-400 duration-500" to="/">
                Inicio
              </NavLink>
            </li>
            <li
              className="md:ml-8 text-xl md:my-0 my-5"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <NavLink
                className="hover:text-slate-400 duration-500"
                to="/curiosidades"
              >
                Mis curiosidades
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
      <div style={{ gridArea: "outlet" }} className="mt-[72px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
