'use client'
import { getUserTransactionsAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownLeft, ArrowRight, ArrowLeft } from 'lucide-react'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)

  const { email } = useCurrentUser() // Email retrieved using hook

  useEffect(() => {
    fetchUserTransactions()
  }, [email])

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

  return (
    <div className='mb-10'>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              size="sm"
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">All Transactions</h1>
          </div>
        </div>
      </header>

      {/* Transactions List */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
            <p className="text-sm text-muted-foreground">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
            </p>
          </div>

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
              transactions.map((tx, index) => {
                // Same logic as home page:
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
                  <div key={tx.id} className={`flex items-center justify-between py-4 ${index !== transactions.length - 1 ? 'border-b border-border/50' : ''} hover:bg-muted/30 transition-colors rounded-lg px-2`}>
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
          </div>

          {transactions.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                All transactions are displayed above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
