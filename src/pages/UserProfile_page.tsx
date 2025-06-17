import { useEffect, useState } from 'react'
import UserPhoto from "@/assets/images/profile.svg";
import Camera from "@/assets/images/camera.svg";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserProfileDialog_data } from '@/constants/userProfileDialog_data';

export const UserProfile_page = () => {
  const [ name, setName ] = useState("");
  const [ job, setJob ] = useState("");
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
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
    <div className="custom-contentContainer mt-32 flex-center">
      <div className=" w-200 px-6 py-4 flex-between border border-neutral-300 rounded-2xl">
        <div className="flex-between gap-3">
          <div>
            <UserPhoto className="size-20"/>
          </div>
          <div>
            <p className="text-lg font-bold text-neutral-900">{ name }</p>
            <p className="text-md font-regular text-neutral-900">{ job }</p>
          </div>
        </div>
        <div>
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <form className="p-6">
              <DialogTrigger asChild>
                <p className="text-sm font-semibold text-primary-300 underline underline-offset-3 cursor-pointer">
                  Edit Profile
                </p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl-bold text-neutral-950">Edit Profile</DialogTitle>
                  <div className="relative flex-center cursor-pointer">
                    <UserPhoto className="size-20" />
                    <Camera className="absolute left-1/2 translate-x-[58%] top-1/2 translate-y-[87.5%] size-6" />
                  </div>
                </DialogHeader>
                <div className="grid gap-4">
                  {UserProfileDialog_data.map((item, i) => {
                    return (
                      <div className="grid gap-3" key={i}>
                        <Label htmlFor={item.subtitle} className="text-sm-semibold text-neutral-950">{item.title}</Label>
                        <Input id={item.subtitle} name={item.subtitle} defaultValue={i === 0 ? name : job } className="text-sm-regular text-neutral-950"/>
                      </div>
                    )
                  })}
                </div>
                <DialogFooter>
                  <Button className="text-sm-semibold text-neutral-25 w-full">Update</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
