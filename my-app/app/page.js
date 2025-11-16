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
import { Button } from '@/components/ui/button'
import { Send, Plus, QrCode, Eye } from 'lucide-react'

import { SquareArrowOutUpRight } from 'lucide-react'

import { getTypeIcon } from '.'
import { EyeIcon } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { IndianRupee } from 'lucide-react'
import { ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react'

const page = () => {

  //Stored data of useraccount
  const [useraccounts, setuseraccounts] = useState(null)
  const [totalbalance, setTotalbalance] = useState(0)
  const [isBalance, setIsBalance] = useState(false)

  const { email } = useCurrentUser() //Email retrived using hook


  useEffect(() => {
    Userallaccount()
  }, [email])


  const Userallaccount = async () => {
    if (!email) return
    const accounts = await userallAccountAction(email) //Data send to backend
    console.log(accounts);

    setuseraccounts(accounts);
    let balance = 0
    accounts.map((b) => balance = balance + b.balance)
    setTotalbalance(balance)
  }

  const togglebalance = async () => {
    setIsBalance(!isBalance)
  }

  // Quick Actions
  const actions = [
    { image: Send, name: 'Send Money' },
    { image: Plus, name: 'Add Funds' },
    { image: QrCode, name: 'Scan' },
    { image: Eye, name: 'View Details' },
  ]

  // Recent Transactions
  const transactions = [
    {
      id: 1,
      type: 'sent',
      name: 'Sarah Mitchell',
      description: 'Payment transfer',
      amount: '-$250.00',
      time: '2 hours ago',
      icon: ArrowUpRight,
    },
    {
      id: 2,
      type: 'received',
      name: 'Tech Corp Inc',
      description: 'Salary deposit',
      amount: '+$3,500.00',
      time: '1 day ago',
      icon: ArrowDownLeft,
    },
    {
      id: 3,
      type: 'sent',
      name: 'Electric Company',
      description: 'Utility payment',
      amount: '-$145.32',
      time: '2 days ago',
      icon: Zap,
    },
    {
      id: 4,
      type: 'received',
      name: 'Freelance Project',
      description: 'Project payment',
      amount: '+$800.00',
      time: '3 days ago',
      icon: ArrowDownLeft,
    },
    {
      id: 5,
      type: 'sent',
      name: 'Coffee Shop',
      description: 'Purchase',
      amount: '-$12.50',
      time: '4 days ago',
      icon: ArrowUpRight,
    },
    {
      id: 6,
      type: 'sent',
      name: 'Streaming Service',
      description: 'Subscription',
      amount: '-$15.99',
      time: '5 days ago',
      icon: ArrowUpRight,
    },
  ]

  return (


    <div className='mb-10'>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">FinX</h1>
        </div>
      </header>

      {/* Current Total Blanace  */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-8 glow-blue-lg mt-10 mx-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Current Balance</p>
          <div className='mt-5'>
            <h2 className="text-6xl font-bold text-white sm:text-7xl ">
              <span className="bg-gradient-to-r from-primary to-[#00d4ff] bg-clip-text text-transparent flex ">{isBalance ? <EyeIcon className='text-white h-20 w-20' onClick={togglebalance} /> : <EyeOff className='text-white h-20 w-20' onClick={togglebalance} />}
                <div className='ml-10'>
                  {isBalance ? <div className="bg-gradient-to-r from-primary to-[#00d4ff] bg-clip-text text-transparent flex  ">
                    <IndianRupee className='text-white h-20 w-20' />
                    {totalbalance}
                  </div> : <div>
                    XXXX</div>}
                </div>
              </span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Available to spend</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10 mx-10">
        {actions.map((action) => {
          const Icon = action.image
          return (
            <Button
              key={action.name}
              className="group relative h-24 flex-col gap-2 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 text-foreground shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:glow-blue"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                <div className="rounded-lg bg-primary/20 p-3 group-hover:bg-primary/30">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-semibold">{action.name}</span>
              </div>
            </Button>
          )
        })}
      </div>


      {/* Linked Bank Accounts */}
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className="lg:col-span-1">
          <div className="space-y-4 ml-10 mt-10">
            <h3 className="text-lg font-bold text-foreground">Linked Accounts</h3>

            <div className="space-y-3 flex flex-col gap-5 ">

              {
                useraccounts && useraccounts.map((a) => {
                  const Type = getTypeIcon.find((i) => i.name == a.type)
                  return <a href={`/bank/${a.id}`} key={a.id}>
                    <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-card/80 p-4 shadow-lg transition-all duration-300 hover:border-primary/40 hover:glow-blue ">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 space-y-3 ">
                        <div className="flex items-start justify-between ">
                          <div className="flex items-center gap-3 ">
                            <div className="text-3xl">{Type.image}</div>
                            <div>
                              <p className="text-sm text-muted-foreground">{a.bankname}</p>
                              <p className="font-semibold text-foreground">{a.type} ************</p>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </a>
                }
                )
              }
            </div>



            {/* Add Bank Account Button */}
            <button className="w-full rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 mb-5">
              <a href='/bank/new'>
                <div className="flex items-center justify-center gap-2 text-primary">

                  <Plus className="h-5 w-5" />
                  <span className="font-semibold">Add Bank Account</span>

                </div>
              </a>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}

        <div className="lg:col-span-2">
          <div className="space-y-4 mr-10 mt-10">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>

            <div className="space-y-2 rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-card/80 p-6 shadow-lg">
              {transactions.map((tx, index) => {
                const Icon = tx.icon
                const isOutgoing = tx.type === 'sent'

                return (
                  <div key={tx.id} className={`flex items-center justify-between py-4 ${index !== transactions.length - 1 ? 'border-b border-border/50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${isOutgoing ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                        <Icon className={`h-5 w-5 ${isOutgoing ? 'text-destructive' : 'text-primary'}`} />
                      </div>

                      <div>
                        <p className="font-semibold text-foreground">{tx.name}</p>
                        <p className="text-xs text-muted-foreground">{tx.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold ${isOutgoing ? 'text-destructive' : 'text-primary'}`}>
                        {tx.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page
