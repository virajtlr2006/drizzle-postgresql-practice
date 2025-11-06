'use client'
import { userallAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect, useState } from 'react'

const page = () => {

  //Stored data of useraccount
  const [useraccounts, setuseraccounts] = useState(null)

  const { email } = useCurrentUser() //Email retrived using hook


  useEffect(() => {
    Userallaccount()
  }, [email])


  const Userallaccount = async () => {
    if (!email) return
    const accounts = await userallAccountAction(email) //Data send to backend
    setuseraccounts(accounts);
  }


  return (
    <div>
      {useraccounts && useraccounts.map((a) =>
        <a href={`/bank/${a.id}`} key={a.id}>
          <p>{a.bankname}</p>
        </a>)}
    </div>
  )
}

export default page
