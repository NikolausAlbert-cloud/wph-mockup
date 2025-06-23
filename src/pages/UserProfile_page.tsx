import { useEffect, useState } from 'react'
import UserPhoto from "@/assets/images/logo.svg";
import Camera from "@/assets/images/camera.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

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
import { UserProfilePost_changePass } from '@/components/userProfile.tsx/UserProfilePost_changePass';
import { fetchUserData } from '@/redux/slices/getUserDataSlice';

export const UserProfile_page = () => {
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ activeTab, setActiveTab ] = useState("tab-0");
  const dispatch: AppDispatch = useDispatch();
  const { fetchUserData_status: status, data: userData, error } = useSelector((state: RootState) => state.user);

  const [dialogFormData, setDialogFormData] = useState({
    name: "",
    job: "",
  });

  useEffect(() => {
    setDialogFormData({
      name: userData.name,
      job: userData.job,
    });
  }, [userData]);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading....</p>
  }

  if (status === "failed") {
    return <p>Error in fetching user data</p>
  }

  return (
    <div className="mt-20 md:mt-32 flex-center flex-col gap-4 md:gap-5">
      <p>{error}</p>
      <div className="clamped-container h-19 md:h-28 px-4 md:px-6 py-3.5 md:py-4 flex-between border border-neutral-300 rounded-2xl">
        <div className="flex-between gap-3">
          <div>
            <UserPhoto className="size:12.5 md:size-20"/>
          </div>
          <div>
            <p className="text-sm md:text-lg font-bold text-neutral-900">{ dialogFormData.name }</p>
            <p className="text-sm md:text-md font-regular text-neutral-900">{ dialogFormData.job }</p>
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
                        <Input id={item.subtitle} name={item.subtitle} defaultValue={i === 0 ? dialogFormData.name : dialogFormData.job } className="text-sm font-regular text-neutral-950"/>
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
      <div className="clamped-container">
        {activeTab === "tab-0" ? (
          <UserProfilePost_empty />
        ) : activeTab === "tab-1" ? (
          <UserProfilePost_changePass />
        ) : (
          <UserProfilePost />
        )}
      </div>
    </div>
  )
}
