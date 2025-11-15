'use client'
import { userallAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

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
    
    <div className='bg-gray-50 min-h-screen  '>
      <div className='mx-auto'>
        <Card className=' bg-gray-50'>
          <CardHeader>
            <div className='flex mt-10 '>
              <div className='mx-56 mt-4'>
                <CardTitle className='font-bold text-3xl '>Manage Bank Accounts</CardTitle>
                <CardDescription>View,add or remove your linked bank accounts.</CardDescription>
              </div>
              <div className='flex mt-4'>

                <a  href='bank/new'>
                  <Button className='bg-blue-500 rounded-full my-2 text-white ml-15' variant="outline"><Plus/>Add Bank Account</Button>
                </a>
              </div>
            </div>

          </CardHeader>
          <CardContent className='mx-55 ' >
            <p>{
              useraccounts && useraccounts.map((a) =>
                <a href={`/bank/${a.id}`} key={a.id}>
                  <div className='mt-5 bg-white rounded-lg '>
                    <div className='text-base  text-[#0d151c] dark:text-slate-50 border-2 border-blue-100 rounded-lg '>
                      <div className='flex'>
                        <img className='h-10 w-10 my-auto ml-2' src='https://imgs.search.brave.com/pAC-QyiR9hJYLNmmXQqpW1elukxXYOVGiqy9GHd_IFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDIv/NzgzLzY0NS9zbWFs/bC9iYW5rLWdseXBo/LWludmVydGVkLWlj/b24tdmVjdG9yLmpw/Zw'/>
                      <div className='ml-10 py-3'>
                        <p className='font-bold'>{a.bankname}</p>
                        <p className='text-muted-foreground text-sm'>Saving Accounts ************</p>
                      </div>
                      <SquareArrowOutUpRight className='ml-120 my-auto'/>
                      </div>
                    </div>
                  </div>
                </a>)
            }</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page
