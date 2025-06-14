import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import Logo from "../assets/images/logo.svg"
import { Search, Menu, PencilLine } from "lucide-react"
import { useEffect, useState } from "react"
import UserPhoto from "@/assets/images/profile.svg"

export const Navbar = () => {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (token ? setIsToken(true) : setIsToken(false))
  }, []);

  return (
    <header className="fixed z-50 top-0 w-full border-b border-neutral-300 border-0.25">
      <div className="flex-between w-full custom-container h-16 lg:h-20" >
          <div className="flex-between w-37 h-9">
            <Logo />
            <p className="text-neutral-950 font-semibold text-display-xs ">Your Logo</p>
          </div>
          <div className="relative hidden lg:flex lg:flex-between">
            <input 
              type="search" 
              placeholder="Search" 
              className="h-12 w-93.25 border border-neutral-300 rounded-xl pl-12 text-sm font-regular text-neutral-500"  
            />
            <Search className="absolute top-1/2 translate-y-[-50%] right-1/2 translate-x-[-600%] size-6 cursor-pointer text-neutral-500" />
          </div>

          { isToken
            ? (
              <div className="flex-between gap-6">
                <Link 
                  to="/post" 
                  className="hidden lg:flex justify-center items-center gap-0.5 text-sm font-semibold text-primary-300 underline underline-offset-3 border-r border-neutral-300 br-[1px] pr-6 h-6 cursor-pointer"
                >
                  <PencilLine />
                  <p>Write Post</p>
                </Link>
                <button className="flex-between gap-3 cursor-pointer">
                  <UserPhoto className="size-10 rounded-full"/>
                  <p className="hidden lg:block text-sm font-medium text-neutral-900">Username</p>
                </button>
              </div>
          ) : (
            <>
              <div className="flex-between gap-6 lg:hidden">
                <Search className="size-6 cursor-pointer lg:hidden" />
                <Menu className="size-6 cursor-pointer lg:hidden" />
              </div>
              <div className="hidden lg:flex justify-center items-center">
                <Link 
                  to="/auth/login" 
                  className="text-sm font-semibold text-primary-300 underline underline-offset-3 border-r border-neutral-300 br-[1px] pr-6 h-6 cursor-pointer"
                >
                  Login
                </Link>
                <Button asChild className="ml-6 px-16">
                  <Link to="/auth/register">Register</Link>
                </Button>
              </div>
            </>
            
          )}
          
      </div>
    </header>
  )
}