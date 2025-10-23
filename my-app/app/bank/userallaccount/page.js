'use client'
import { userallAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect } from 'react'

const page = () => {

  const { email } = useCurrentUser()

  const Userallaccount = async () => {
    if(!email) return

    await userallAccountAction(email)
    console.log(email)

  }

  useEffect(() => {
      Userallaccount()
  }, [email])


  return (
    <div>
      user all accounts
    </div>
  )
}

export default page
