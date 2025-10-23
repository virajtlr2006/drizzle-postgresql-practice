'use client'
import { userallAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [useraccounts, setuseraccounts] = useState(null)

  const { email } = useCurrentUser()

  useEffect(() => {
    Userallaccount()
  }, [email])


  const Userallaccount = async () => {
    if (!email) return
    const accounts = await userallAccountAction(email)
    setuseraccounts(accounts);
  }


  return (
    <div>
      {useraccounts && useraccounts.map((a) =>
        <a key={a._id}>
          <p>{a.bankname}</p>
        </a>)}
    </div>
  )
}

export default page
