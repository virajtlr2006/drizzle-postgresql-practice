'use client'
import { userallAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect } from 'react'

const page = () => {

    const {email} = useCurrentUser()

    useEffect(() => {
        Userallaccount()
    }, [email])
     

    const Userallaccount = async () => {
      
        userallAccountAction(email)
        console.log(email)

    }
  return (
    <div>
      user all accounts
    </div>
  )
}

export default page
