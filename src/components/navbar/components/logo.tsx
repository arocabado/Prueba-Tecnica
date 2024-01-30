import { NavLink } from "react-router-dom";
import IconCat from "../../../icons/iconCat";

interface Props {
  title:string
}

const Logo = ({title}: Props) => {
  return (
    <NavLink
      className="font-bold text-2xl cursor-pointer flex items-center gap-1 hover:text-slate-400 duration-500"
      to="/"
    >
      <div className="aspect-square w-10" role="Title">
        <IconCat />
      </div>
      <p role="pTitle">{title}</p>
    </NavLink>
  );
};

export default Logo;
