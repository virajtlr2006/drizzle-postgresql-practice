'use client'
import { BankAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from "react-hook-form"

const page = () => {

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
    <form onSubmit={handleSubmit(onSubmit)}>

      <input {...register("bankname", { required: true })} />
      {errors.bankname && <span>This field is required</span>}

      <input {...register("upiid", { required: true })} />
      {errors.upiid && <span>This field is required</span>}

      <input {...register("pin", { required: true })} />
      {errors.pin && <span>This field is required</span>}

      <input {...register("balance", { required: true })} />
      {errors.balance && <span>This field is required</span>}

      <select name='type' {...register("type", { required: true })}>
        <option value='Savings'>Saving Account</option>
        <option value='Current'>Current Account</option>
        <option value='Salary'>Salary Account</option>
      </select>
      <input type="submit" />
    </form>
  )
}

export default page
