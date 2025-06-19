import { useEffect, useState } from 'react'
import UserPhoto from "@/assets/images/profile.svg";
import Camera from "@/assets/images/camera.svg";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserProfileDialog_data } from '@/constants/userProfileDialog_data';
import { userProfileTab_data } from '@/constants/userProfileTab_data';
import { UserProfilePost } from '@/components/userProfile.tsx/UserProfilePost';
import { UserProfilePost_empty } from '@/components/userProfile.tsx/UserProfilePost_empty';

export const UserProfile_page = () => {
  const [ name, setName ] = useState("");
  const [ job, setJob ] = useState("");
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ activeTab, setActiveTab ] = useState("tab-0");
  const dataUser = useSelector((state:RootState) => state.user);
  console.log("userProfile: ", dataUser)

  type parsedUserStorageProps = {
    id: string;
    name: string;
    job: string;
  };

  useEffect(() => {
    let parsedUserStorage: parsedUserStorageProps | null = null;
    if ( dataUser.userStorage && typeof dataUser.userStorage === "string" ) {
      try {
        parsedUserStorage = JSON.parse(dataUser.userStorage);
      } catch (e) {
        console.error("Error parsing userStorage from redux: ", e)
      }
    } else if ( dataUser.userStorage && typeof dataUser.userStorage === "object" ) {
      parsedUserStorage = dataUser.userStorage;
    }

    if (parsedUserStorage) {
      setName(parsedUserStorage.name);
      setJob(parsedUserStorage.job);
    } else {
      setName("");
      setJob("");
    }
  }, [dataUser]);

  return (
    <div className="mt-20 md:mt-32 flex-center flex-col gap-4 md:gap-5">
      <div className="clamped-container h-19 md:h-28 px-4 md:px-6 py-3.5 md:py-4 flex-between border border-neutral-300 rounded-2xl">
        <div className="flex-between gap-3">
          <div>
            <UserPhoto className="size:12.5 md:size-20"/>
          </div>
          <div>
            <p className="text-sm md:text-lg font-bold text-neutral-900">{ name }</p>
            <p className="text-sm md:text-md font-regular text-neutral-900">{ job }</p>
          </div>
        </div>
        <div>
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <form >
              <DialogTrigger asChild>
                <p className="text-xs md:text-sm font-semibold text-primary-300 underline underline-offset-3 cursor-pointer">
                  Edit Profile
                </p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <div className="flex-start">
                    <DialogTitle className="text-md font-bold md:text-xl-bold text-neutral-950">
                      Edit Profile
                    </DialogTitle>
                  </div>
                  <div className="relative flex-center cursor-pointer">
                    <UserPhoto className="size-20" />
                    <Camera className="absolute left-1/2 translate-x-[58%] top-1/2 translate-y-[87.5%] size-6" />
                  </div>
                </DialogHeader>
                <div className="grid gap-4">
                  {UserProfileDialog_data.map((item, i) => {
                    return (
                      <div className="grid gap-3" key={i}>
                        <Label htmlFor={item.subtitle} className="text-sm font-semibold text-neutral-950">{item.title}</Label>
                        <Input id={item.subtitle} name={item.subtitle} defaultValue={i === 0 ? name : job } className="text-sm font-regular text-neutral-950"/>
                      </div>
                    )
                  })}
                </div>
                <DialogFooter>
                  <Button className="text-sm font-semibold text-neutral-25 w-full h-10 md:h-11">Update</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex-start clamped-container">
      {userProfileTab_data.map((item, i) => {
        return (
          <div 
          key={i} 
          onClick={() => setActiveTab(`tab-${i}`)}
          className={`flex-center flex-row h-11 w-44.5 cursor-pointer text-xs md:text-sm font-regular border-b ${activeTab === `tab-${i}` ? "text-primary-300 font-semibold border-primary-300 border-b-3" : "text-neutral-950 border-neutral-300"}`}>
            <p>{ item.title }</p>
          </div>
        )
      })}
      </div>
      {activeTab === "tab-0" ? (
        <UserProfilePost_empty />
      ) : activeTab === "tab-1" ?(
        <UserProfilePost />
      ) : (
        <p>Hello</p>
      )}
    </div>
  )
}
