'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [singleacc, setSingleacc] = useState(null)

    useEffect(() => {
        single()
    }, [])


    const { id } = useParams()
    const single = async () => {
        const oneacc = await singleAccountAction(id)
        setSingleacc(oneacc)
    }

    return (
        <div>
            {singleacc && <>
            <p>{singleacc.bankname}</p>
            </>}
        </div>
    )
}

export default page
