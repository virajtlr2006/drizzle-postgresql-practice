'use client'
import { useCurrentUser } from '@/hook/userhook'
import React from 'react'

const page = () => {
const {email,imageUrl,fullName} = useCurrentUser()

  return (
    <div>
      {email}
      {fullName}
    </div>
  )
}

export default page
