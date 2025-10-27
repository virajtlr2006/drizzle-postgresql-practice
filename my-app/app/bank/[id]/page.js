'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    useEffect(() => {
        single()
    }, [])


    const { id } = useParams()
    const single = async () => {
        await singleAccountAction(id)
    }

    return (
        <div>
            {id}
        </div>
    )
}

export default page
