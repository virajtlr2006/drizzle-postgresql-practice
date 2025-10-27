'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { bankTable } from '@/db/schema'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';


const page = () => {

    const upiid = useParams();

    useEffect(() => {
        singleAccount()
    }, [])

    const singleAccount = async () => {
        const a = await singleAccountAction(upiid)
        console.log(a);

    }
    return (
        <div>
            Singleaccount
        </div>
    )
}

export default page
