'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { EyeIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const page = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const router = useRouter()

    const [singleacc, setSingleacc] = useState(null)
    const [showbalance, setshowbalance] = useState(false)
    const [isPin, setIsPin] = useState(false)
    const [wrongPIN, setwrongPIN] = useState(false)

    useEffect(() => {
        single()
    }, [])


    const { id } = useParams()
    const single = async () => {
        const oneacc = await singleAccountAction(id)
        console.log(oneacc);

        setSingleacc(oneacc)
    }

    const togglepin = async () => {
        setIsPin(true)
    }

    const verifyPIN = async (data) => {
        console.log(data.pin);
        console.log(singleacc.pin);
        if (data.pin == singleacc.pin) {
            setshowbalance(true)
            setIsPin(false)
        }
        else {
            setwrongPIN(true)
        }
    }

    const pay = async () => {
        console.log("Pay");
        router.push(`./pay/${id}`)
    }
    return (
        <div>
            {singleacc && <>
                <p>{singleacc.bankname}</p>
                <p>{singleacc.upiid}</p>

                {showbalance ? <p>{singleacc.balance}</p> : <>xxxx</>}
                <EyeIcon onClick={togglepin} />
            </>}

            <Dialog open={isPin} onOpenChange={setIsPin} >

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter security PIN</DialogTitle>
                        <DialogDescription>
                            <div>

                                <form onSubmit={handleSubmit(verifyPIN)}>

                                    <input {...register("pin", { required: true })} />
                                    {errors.pin && <span>This field is required</span>}
                                    {wrongPIN && <p>Enter Correct PIN</p>}
                                    <input type="submit" />
                                </form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Button onClick={pay}>Pay</Button>
        </div>
    )
}

export default page
