'use client'
import { BankAction } from '@/Action/bankAction'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hook/userhook'
import { EyeOff } from 'lucide-react'
import { Eye } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

const page = () => {

  const [showPin, setShowPin] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { email } = useCurrentUser()

  const onSubmit = async (user) => {
    await BankAction({ ...user, email })
    router.back("/")
  }

  return (

    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </Button>
            </a>
            <h1 className="text-2xl font-bold text-foreground">Add Bank Account</h1>
          </div>
        </div>
      </div>

      {/* Main Form Card */}

      <div className="mx-auto max-w-2xl px-6 py-12">

        <div className="overflow-hidden rounded-2xl border border-glow-border bg-card/50 backdrop-blur-sm">
          <div className="glow-border absolute inset-0 rounded-2xl opacity-50"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6 p-8">

            {/* Bank Name */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Bank Name
              </label>
              <input  {...register("bankname", { required: true })}
                placeholder="e.g., HDFC Bank, ICICI Bank"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {errors.bankname && <span className='text-red-600'>*This field is required*</span>}
            </div>

            {/* UPI ID */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                UPI ID
              </label>
              <input {...register("upiid", { required: true })}
                placeholder="e.g., yourname@upi"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <p className="text-xs text-muted-foreground">
                Your UPI ID is used for payment transfers
              </p>
              {errors.upiid && <span className='text-red-600'>*This field is required*</span>}
            </div>

            {/* Account Type */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Account Type
              </label>
              <select name='type' {...register("type", { required: true })}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Select account type</option>
                <option value='Savings'>Saving Account</option>
                <option value='Current'>Current Account</option>
                <option value='Salary'>Salary Account</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Choose the type of bank account you want to add
              </p>
              {errors.type && <span className='text-red-600'>*This field is required*</span>}
            </div>

            {/* Set PIN */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Account PIN
              </label>
              <div className="relative">
                <input {...register("pin", { required: true })}
                  type={showPin ? 'text' : 'password'}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPin ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use only numbers. This PIN will be required to access your account.
              </p>
            </div>
            {errors.pin && <span className='text-red-600 '>*This field is required*</span>}

            {/* Amount */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Initial Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary">
                  ₹
                </span>
                <input
                  {...register("balance", { required: true })}
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full rounded-xl border border-border bg-input pl-8 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The amount you want to add to this account initially
              </p>
            </div>
            {errors.balance && <span className='text-red-600'>*This field is required*</span>}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative mt-8 w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>Add Bank Account</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>

          </form>
        </div>

        {/* Security Info */}
        <div className="mt-8 rounded-xl border border-border bg-card/30 p-4">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-0.5 text-primary">🔒</span>
            <span>Your account information is encrypted and secured. Your PIN is never shared.</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default page
