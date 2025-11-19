'use client'
import { userallAccountAction, getUserTransactionsAction } from '@/Action/bankAction'
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
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Zap } from 'lucide-react'
const page = () => {

  //Stored data of useraccount
  const [useraccounts, setuseraccounts] = useState(null)
  const [totalbalance, setTotalbalance] = useState(0)
  const [isBalance, setIsBalance] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)

  const { email } = useCurrentUser() //Email retrived using hook


  useEffect(() => {
    Userallaccount()
    fetchUserTransactions()
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

  const fetchUserTransactions = async () => {
    if (!email) return
    setIsLoadingTransactions(true)
    try {
      const userTransactions = await getUserTransactionsAction(email)
      console.log('User transactions received in frontend:', userTransactions)
      setTransactions(userTransactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setIsLoadingTransactions(false)
    }
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

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  // Format amount helper
  const formatAmount = (amount, isUserSender) => {
    const sign = isUserSender ? '-' : '+'
    return `${sign}₹${amount}`
  }

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
              {isLoadingTransactions ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">Loading transactions...</div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">No transactions found</div>
                </div>
              ) : (
                transactions.slice(0, 6).map((tx, index) => {
                  // Simple logic: 
                  // If user UPI ID is in sender → RED (debit/sent)
                  // If user UPI ID is in receiver → BLUE (credit/received) 
                  const isUserSender = tx.type == "Debit";
                  const isDebit = isUserSender; // If user is sender = debit (red)
                  const Icon = isDebit ? ArrowUpRight : ArrowDownLeft
                  
                  // Determine the "from" and "to" display
                  let fromDisplay, toDisplay;
                  if (isDebit) {
                    // User is sending money
                    fromDisplay = "You";
                    toDisplay = tx.otherPartyName || tx.receiver_upiid;
                  } else {
                    // User is receiving money  
                    fromDisplay = tx.otherPartyName || tx.sender_upiid;
                    toDisplay = "You";
                  }

                  return (
                    <div key={tx.id} className={`flex items-center justify-between py-4 ${index !== Math.min(transactions.length, 6) - 1 ? 'border-b border-border/50' : ''} hover:bg-muted/30 transition-colors rounded-lg px-2`}>
                      <div className="flex items-center gap-4">
                        <div className={`rounded-full p-3 ${isDebit ? 'bg-destructive/10' : 'bg-primary/10'} shadow-sm`}>
                          <Icon className={`h-5 w-5 ${isDebit ? 'text-destructive' : 'text-primary'}`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-semibold ${isDebit ? 'text-destructive' : 'text-primary'}`}>{fromDisplay}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className={`font-semibold ${isDebit ? 'text-primary' : 'text-destructive'}`}>{toDisplay}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            UPI: {isDebit ? tx.receiver_upiid : tx.sender_upiid} • {isDebit ? 'Money sent' : 'Money received'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tx.date}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold text-lg ${isDebit ? 'text-destructive' : 'text-primary'}`}>
                          {isDebit ? '- ₹' : '+ ₹'}{tx.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              
              {transactions.length > 0 && (
                <div className="pt-4 border-t border-border/30 text-center">
                  <a href="/transactions">
                    <Button
                      variant="ghost"
                      className="text-sm text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      View All Transactions →
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page
