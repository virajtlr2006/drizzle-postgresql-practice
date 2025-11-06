'use client'
import { PayAction } from "@/Action/bankAction";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function App() {

  const router = useRouter()

  //Error is stored in state
  const [errormsg, setErrormsg] = useState(null)
  //Payment details
  const [ispay, setIspay] = useState(true)
  //Payment succes or not
  const [paymentsuccess, setPaymentsuccess] = useState(false)
  // Pin correct or not
  const [ispin, setIspin] = useState(false)
  //Pin stored
  const [storePIN, setStorePIN] = useState(null)
  //Bankdata of a user who is recieving
  const [bankdata, setBankdata] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { id } = useParams()


  const onSubmit = async (data) => {
    setBankdata(data);
    setIspin(true)
    setIspay(false)

  }

  const onPay = async (params) => {
    console.log("pay")
    try {
      const pay = await PayAction(id, bankdata.recieverupiid, bankdata.amount, storePIN);
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
    <div>
      {/* Enter the upiid of a reciever and amount to be sent  */}
      {ispay && <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input {...register("recieverupiid", { required: true })} />
          {errors.recieverupiid && <span>This field is required</span>}

          <input {...register("amount", { required: true })} />
          {errors.amount && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>}


      {/* Enter PIN to make payment successful */}
      {ispin && <div>
        <input placeholder="PIN" onChange={(e) => setStorePIN(e.target.value)}></input>
        <Button onClick={onPay}>Pay</Button>

      </div>}

      {/* Details of a payment */}
      {paymentsuccess && <div>
        <p>{bankdata.amount}</p>
        <p>To {bankdata.recieverupiid}</p>
        <p>
          Payment Success
          {/* Redirect to a home page */}
          <Button onClick={() => router.back()}>Go to Home</Button>
        </p>
      </div>}

      {/* Shows error for incorrect PIN ,UpiID and for an insufficient balance */}
      {errormsg && <p>{errormsg}</p>}
    </div>
  )
}