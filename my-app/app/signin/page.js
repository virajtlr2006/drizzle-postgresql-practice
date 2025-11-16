'use client'

import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const page = () => {
    return (
        <div>
            <SignedOut>
                <SignInButton />
                <SignUpButton>
                    <button>
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default page
