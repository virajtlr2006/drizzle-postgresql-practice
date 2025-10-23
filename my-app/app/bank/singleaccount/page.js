'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { useCurrentUser } from '@/hook/userhook'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [singleaccount, setSingleaccount] = useState(null)

    const { email } = useCurrentUser()

    useEffect(() => {
        getSingleAccount()
    }, [email])


    const getSingleAccount = async () => {
        if (!email) return
        const single = await singleAccountAction(email)
        console.log(single);
        
        setSingleaccount([single])
    }

    return (
        <div>
            {singleaccount && singleaccount.map((s)=> 
            <>
            {s.upiid}
            </>
            )}
        </div>
    )
}

export default page
