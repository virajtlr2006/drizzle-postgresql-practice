'use client'
import { PayAction } from "@/Action/bankAction";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
export default function App() {

  const [errormsg, setErrormsg] = useState(null)
  const [ispay, setIspay] = useState(false)
  const [paymentsuccess, setPaymentsuccess] = useState(false)
  const [ispin, setIspin] = useState(true)
  const [storePIN, setStorePIN] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { id } = useParams()


  const onSubmit = async (data) => {
    console.log(data);
    try {
      const pay = await PayAction(id, data.recieverupiid, data.amount);
      setPaymentsuccess(true)
      setIspay(false)
    } catch (error) {
      setErrormsg(error.message)
    }
  }

  return (
    <div>
      {ispay && <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input {...register("recieverupiid", { required: true })} />
          {errors.recieverupiid && <span>This field is required</span>}

          <input {...register("amount", { required: true })} />
          {errors.amount && <span>This field is required</span>}

          {errormsg && <p>{errormsg}</p>}

          {ispin && <div>
            <input placeholder="PIN" onChange= {(e)=> setStorePIN(e.target.value)}></input> 
            </div>}

          <input type="submit" />
        </form>
      </div>}

      {paymentsuccess && <div>
        <p>Payment success</p>
        </div>}
    </div>
  )
}