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


      <input type="submit" />
    </form>
  )
}

export default page
