"use client"
import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Notification from "./ui/notification"

interface EditProfileProps{
  handleSubmit: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({handleSubmit}) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <ProfileForm handleSubmit={handleSubmit}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className=" border-none font-mono 
        bg-gradient-to-r hover:from-orange-300 hover:to-red-600">
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>
        <ProfileForm className="px-4" handleSubmit={handleSubmit}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
// Define the ProfileFormProps interface
interface ProfileFormProps {
  handleSubmit: () => void; // Ensure it's a function
}

// Use FormHTMLAttributes instead of ComponentProps
type CombinedProps = ProfileFormProps & React.FormHTMLAttributes<HTMLFormElement>;

function ProfileForm({ className, handleSubmit, ...props }: CombinedProps) {
  return (
    <form
      className={cn("grid items-start gap-4 relative", className)}
      onSubmit={handleSubmit}
      {...props} // Pass down other form props
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="Gordon Ramsay" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input defaultValue="" type="password" />
        <Label htmlFor="password">Re-enter password</Label>
        <Input defaultValue="" type="password" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
