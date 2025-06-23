import Camera from "@/assets/images/camera.svg";
import UserPhoto from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfileDialog_data } from '@/constants/userProfileDialog_data';
import { DialogFormDataType } from "@/pages/UserProfile_page";

type UserProfileDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
  dialogFormData: DialogFormDataType;
};

export const UserProfile_dialog = ({ 
  isOpenDialog, 
  setIsOpenDialog, 
  dialogFormData,
}: UserProfileDialogProps )=> {
  return (
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
  )
}
