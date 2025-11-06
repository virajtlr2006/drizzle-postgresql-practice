'use client'
import { PayAction } from "@/Action/bankAction";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form"
export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const {id} = useParams()


  const onSubmit = async (data) => {
    console.log(data);
    const pay = await PayAction(id,data.recieverupiid,data.amount);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input {...register("recieverupiid", { required: true })} />
      {errors.recieverupiid && <span>This field is required</span>}

      <input {...register("amount", { required: true })} />
      {errors.amount && <span>This field is required</span>}      

      <input type="submit" />
    </form>
  )
}