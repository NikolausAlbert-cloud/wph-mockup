import { PencilLine } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export const UserProfilePost = () => {
  return (
    <div className="flex-between w-200">
      <p className="text-xl font-semibold text-neutral-900">Post</p>
      <Button className="w-45.5">
        <PencilLine className="size-5"/>
        <span className="pl-2">Write Post</span>
      </Button>
    </div>
  )
}
