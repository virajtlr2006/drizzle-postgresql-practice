'use client'
import { useCurrentUser } from '@/hook/userhook'
import React from 'react'

const page = () => {
const {email,imageUrl,fullName} = useCurrentUser()

  return (
    <div>
      {email}
      <img src={imageUrl}/>
      {fullName}
    </div>
  )
}

export default page
