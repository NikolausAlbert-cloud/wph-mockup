import { PencilLine } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export const UserProfilePost = () => {
  return (
    <div className="flex flex-col-reverse md:justify-between md:items-center md:flex-row-reverse clamped-container">
      <p className="text-lg md:text-xl font-bold text-neutral-900 max-md:border-t max-md:border-neutral-300 max-md:pt-4">Post</p>
      <Button className="w-full md:w-45.5 max-md:mb-4">
        <PencilLine className="size-5 "/>
        <span className="pl-2 text-sm font-semibold text-neutral-25">
          Write Post
        </span>
      </Button>
    </div>
  )
}
