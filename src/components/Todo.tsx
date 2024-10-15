import lupa from "@assets/lupa.svg";
import SelectAll from "./ui/SelectAll";
import detective from "@assets/detective.png";
import moon from "@assets/moon.svg";

export const Todo = () => {
  return (
    <div className="pt-10 flex flex-col justify-center items-center">
      <h1 className="uppercase font-medium text-2xl mb-[18px]">todo list</h1>
      <div className="flex gap-4 mb-[30px]">
        <div className="relative">
          <input
            placeholder="Search note..."
            className=" text-purple rounded-[5px] border border-purple py-[10px] px-4 
            w-full max-w-[563px]
             focus:outline-none focus:ring-2
               transition duration-200 ease-in-out"
            type="text"
          />
          <img className=" absolute right-4 top-[10px]" src={lupa} alt="" />
        </div>
        <SelectAll></SelectAll>
        <button className="bg-purple p-2 rounded-[5px]">
          <img className="" src={moon} alt="" />
        </button>
      </div>
      <div className=" grid gap-5 justify-items-center">
        <img src={detective} alt="" />
        <span className="text-black text-xl">Empty...</span>
      </div>
    </div>
  );
};
