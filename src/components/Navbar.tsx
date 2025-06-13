import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import Logo from "../assets/images/logo.svg"
import Magnifier from "../assets/images/magnify-glass.svg"


export const Navbar = () => {
  return (

      <nav className="flex-between w-full h-20 bg-white">
        <div className=" flex-between gap-[9.6px]">
          <Logo className="h-9" />
          <p>Your Logo</p>
        </div>
        <div className="relative flex-between">
          <input 
            type="search" 
            placeholder="Search" 
            className="h-12 w-93 border border-neutral-300 rounded-xl pl-12 text-sm font-regular text-neutral-500" 
          />
          <Magnifier className="absolute left-[18px] w-[4.5]  aspect-square cursor-pointer" />
        </div>
        <div className=" flex-between">
          <Link to="/auth/login" 
            className="text-sm font-semibold text-primary-300 underline underline-offset-3 border-r border-neutral-300 br-[1px] pr-6 h-6 cursor-pointer"
          >Login</Link>
          <Button asChild className="ml-6 px-16">
            <Link to="/auth/register">Register</Link>
          </Button>
        </div>
      </nav>

  )
}