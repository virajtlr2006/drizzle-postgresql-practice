'use client'
import { deleteBankAction } from '@/Action/bankAction'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onDelete = async (upiid) => {
    await deleteBankAction(upiid)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onDelete)}>

        <input {...register("upiid", { required: true })} />
        {errors.upiid && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

export default page
