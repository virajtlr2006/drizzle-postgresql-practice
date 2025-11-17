'use client'
import { PayAction } from "@/Action/bankAction";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Eye, EyeOff, CheckCircle, ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function App() {

  const router = useRouter()

  const [errormsg, setErrormsg] = useState(null)
  const [ispay, setIspay] = useState(true)
  const [paymentsuccess, setPaymentsuccess] = useState(false)
  const [ispin, setIspin] = useState(false)
  const [storePIN, setStorePIN] = useState(null)
  const [bankdata, setBankdata] = useState(null)
  const [dateandtime, setdateandtime] = useState(null)

  useEffect(() => {
    const date = new Date()
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    setdateandtime({ date: formattedDate, time: formattedTime })
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { id } = useParams()

  const [showPin, setShowPin] = useState(false);

  const onSubmit = async (data) => {
    setBankdata(data);
    setIspin(true)
    setIspay(false)
  }

  const onPay = async (params) => {
    console.log("pay")
    try {
      console.log(storePIN)
      const newdate = new Date()
      const pay = await PayAction(id , bankdata.recieverupiid, bankdata.amount, storePIN,newdate);
      setPaymentsuccess(true)
      setIspay(false)
      setIspin(false)
    } catch (error) {
      setErrormsg(error.message)
      setIspin(false)
      setIspay(false)
      setPaymentsuccess(false)

    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enter the upiid of a reciever and amount to be sent  */}
      {ispay && <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">Send Money</h1>
            <p className="text-muted-foreground">Enter recipient details and amount</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient UPI ID</label>
              <input
                {...register("recieverupiid", { required: "UPI ID is required" })}
                placeholder="user@bank"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground glow-border"
              />
              {errors.recieverupiid && <span className="text-destructive text-sm mt-1 block">{errors.recieverupiid.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                {...register("amount", { required: "Amount is required" })}
                placeholder="0.00"
                type="number"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground glow-border"
              />
              {errors.amount && <span className="text-destructive text-sm mt-1 block">{errors.amount.message}</span>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 rounded-lg transition-all glow-blue"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>}


      {/* Enter PIN to make payment successful */}
      {ispin && <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button onClick={() => setIspay(true)} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-gradient-to-br from-card to-secondary border border-border/50 rounded-2xl p-8 card-elevated">
            <h2 className="text-2xl font-bold mb-2">Confirm Payment</h2>
            <p className="text-muted-foreground mb-6">Enter your PIN to confirm this transaction</p>

            <div className="relative mb-6">
              <label className="block text-sm font-medium mb-2">Transaction PIN</label>
              <div className="relative">
                <input
                  placeholder="••••"
                  type={showPin ? "text" : "password"}
                  onChange={(e) => setStorePIN(e.target.value)}
                  value={storePIN || ""}
                  maxLength="4"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground glow-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-11 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-2">Transaction Details</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">{bankdata?.recieverupiid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-primary">₹{bankdata?.amount}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={onPay}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 rounded-lg transition-all glow-blue"
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>}

      {/* Details of a payment */}
      {paymentsuccess && <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-card to-secondary border border-border/50 rounded-2xl p-8 text-center card-elevated">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
            <p className="text-muted-foreground mb-8">Your money has been sent</p>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-8">
              <p className="text-muted-foreground text-sm mb-2">Amount Sent</p>
              <p className="text-4xl font-bold text-primary mb-4">₹{bankdata?.amount}</p>

              <div className="border-t border-border pt-4 mb-4">
                <p className="text-muted-foreground text-sm mb-1">To</p>
                <p className="font-medium text-lg">{bankdata?.recieverupiid}</p>
              </div>

              {dateandtime && (
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">{dateandtime.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Clock size={16} />
                    <span className="text-sm font-medium">{dateandtime.time}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.back()}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 rounded-lg transition-all glow-blue"
              >
                Back to Account
              </Button>
              <Button
                onClick={() => {
                  router.push("/")
                }}
                variant="outline"
                className="w-full border-border hover:bg-secondary/50"
              >
                Go to Home
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground border-t border-border pt-6">
              Thank you for using our service. Your transaction is secure and protected.
            </p>
          </div>
        </div>
      </div>}

      {/* Shows error for incorrect PIN ,UpiID and for an insufficient balance */}
      {errormsg && <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/30 rounded-2xl p-8 card-elevated">
            <h2 className="text-2xl font-bold text-destructive mb-2">Payment Failed</h2>
            <p className="text-destructive/80 mb-6">{errormsg}</p>

            <Button
              onClick={() => {
                setErrormsg(null)
                setIspay(true)
                setIspin(false)
                setPaymentsuccess(false)
              }}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 rounded-lg transition-all glow-blue"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>}
    </div>
  )
}
