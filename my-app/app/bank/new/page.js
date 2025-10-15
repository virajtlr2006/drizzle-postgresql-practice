'use client'
import { BankAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React from 'react'
import { useForm } from "react-hook-form"

const page = () => {
     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const {email} = useCurrentUser()

    const onSubmit = async (user) => {
    BankAction({...user,email})
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input {...register("bankname", { required: true })} />
      {errors.bankname && <span>This field is required</span>}

            <input {...register("pin", { required: true })} />
      {errors.pin && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}

export default page
