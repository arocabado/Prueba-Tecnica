import { useId } from "react";

interface Props {
  label: string;
  icon: JSX.Element;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Buscar = ({ label, value, icon, onChange }: Props) => {
  const id = useId();
  return (
    <div className="flex h-10 relative w-full">
      <input
        id={id}
        type="text"
        className="peer h-full w-full rounded-lg pl-2 pr-10 py-2 bg-slate-600 text-slate-100 hover:border-2 hover:border-solid hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`absolute text-slate-50 text-md p-2 peer-focus:-top-7 peer-focus:text-sm transition-all duration-300 ${
          value ? "-top-7 text-sm" : "top-0"
        }`}
      >
        {label}
      </label>
      <label
        htmlFor={id}
        className="absolute right-0 h-full aspect-square border-none p-2 text-slate-100 cursor-pointer"
      >
        {icon}
      </label>
    </div>
  );
};

export default Buscar;
