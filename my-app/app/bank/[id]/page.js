'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { EyeIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
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

const page = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [singleacc, setSingleacc] = useState(null)
    const [showbalance, setshowbalance] = useState(false)
    const [isPin, setIsPin] = useState(false)

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
        console.log(data);
        
    }
    return (
        <div>
            {singleacc && <>
                <p>{singleacc.bankname}</p>

                {showbalance && <p>{singleacc.balance}</p>}
                <EyeIcon onClick={togglepin} />
            </>}

            <Dialog open={isPin} onOpenChange={setIsPin} >

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter security PIN</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(verifyPIN)}>

                                <input {...register("pin", { required: true })} />
                                {errors.pin && <span>This field is required</span>}

                                <input type="submit" />
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default page
