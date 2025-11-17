'use client'

import { singleAccountAction } from '@/Action/bankAction'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, Send } from 'lucide-react';

const page = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const router = useRouter()

    const [singleacc, setSingleacc] = useState(null)
    const [upiid, setUpiid] = useState(null)
    const [copied, setCopied] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [isBalanceRevealed, setIsBalanceRevealed] = useState(false);
    const [showPin, setShowPin] = useState(false);

    useEffect(() => {
        single()
    }, [])


    const { id } = useParams()
    const single = async () => {
        const oneacc = await singleAccountAction(id)
        setUpiid(oneacc.upiid);

        setSingleacc(oneacc)
    }


    // PIN
    
    const handleRevealBalance =async (data) => {
        const enteredPin = data.pin?.trim();
        const actualPin = singleacc.pin?.toString();
        
        if (enteredPin === actualPin) {
            setIsBalanceRevealed(true);
            setPinInput(''); // clear input
            

        } else {
            alert('Incorrect PIN');
        }
    };


    const handleHideBalance = () => {
        setIsBalanceRevealed(false);
        setPinInput('');
        setShowPin(false);
    };


    const pay = async () => {
        console.log("Pay");
        router.push(`./pay/${upiid}`)
    }

    const copyToClipboard = (text) => {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => {
                    console.error('Failed to copy text: ', err);
                });
        } else {
            console.warn('Clipboard API not available');
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="absolute inset-0 -z-10 h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
                <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/3 blur-3xl" />
            </div>

            <div className="mx-auto max-w-lg">

                {/* Header */}
                <div className="mb-8 ml-2">
                    <h1 className="text-3xl font-bold text-foreground">Account Details</h1>
                    <p className="mt-2 text-muted-foreground">Manage your account information securely</p>
                </div>

                {/* Main Account Card */}

                <div className="space-y-6">

                    {/* Bank Name Section */}

                    <div className="group relative rounded-2xl bg-gradient-to-br from-card to-card/50 p-6 border border-border glow-border card-elevated hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                            {singleacc &&
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Bank Name</p>
                                    <p className="mt-2 text-2xl font-bold text-foreground">{singleacc.bankname}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">{singleacc.type}</p>
                                </div>
                            }
                        </div>

                    </div>

                    {/* UPI ID Section */}

                    <div className="group relative rounded-2xl bg-gradient-to-br from-card to-card/50 p-6 border border-border glow-border card-elevated hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">UPI ID</p>
                                {singleacc && <>
                                    <p>{singleacc.upiid}</p>
                                </>}
                            </div>
                            <button
                                onClick={() => copyToClipboard(singleacc.upiid)}
                                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                            >
                                {copied ? <span className="text-xs font-semibold">Copied!</span> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Balance Section with PIN Protection */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 border-2 border-primary/40 glow-border-lg card-elevated">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Balance</p>

                        {!isBalanceRevealed ? (
                            <div className="mt-6 space-y-4">
                                {/* PIN Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Enter PIN to reveal balance</label>
                                    <div className="flex gap-2 mt-2">
                                        <div className="relative flex-1">
                                            <input
                                                type={showPin ? 'text' : 'password'}
                                                value={pinInput}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 4) setPinInput(value);
                                                }}
                                                placeholder="••••"
                                                maxLength={4}
                                                className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-center tracking-widest text-lg font-semibold"
                                            />
                                            <button
                                                onClick={() => setShowPin(!showPin)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors "
                                            >
                                                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <Button
                                            onClick={() => handleRevealBalance({ pin: pinInput })}
                                            disabled={pinInput.length !== 4}
                                            className="px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg glow-blue transition-all duration-300"
                                        >
                                            Show
                                        </Button>
                                    </div>
                                </div>

                                {/* Demo Hint */}
                                <p className="text-xs text-muted-foreground italic">Demo PIN: 1234</p>
                            </div>
                        ) : (
                            <div className="mt-6 space-y-4">
                                {/* Revealed Balance */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-5xl font-bold text-primary">₹{singleacc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">Available Balance</p>
                                    </div>
                                    <button
                                        onClick={handleHideBalance}
                                        className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                                    >
                                        <EyeOff size={24} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Button */}
                    <Button
                        onClick={pay}
                        className="w-full py-6 px-4 bg-gradient-to-r from-primary via-primary to-primary/80 hover:shadow-2xl hover:shadow-primary/40 text-white font-bold text-lg rounded-xl glow-blue card-elevated transition-all duration-300 transform hover:scale-105"
                    >
                        <Send size={20} className="mr-2" />
                        Send Money
                    </Button>

                    {/* Security Note */}
                    <div className="rounded-lg bg-card/30 border border-border p-4">
                        <p className="text-xs text-muted-foreground text-center">
                            🔒 Your balance is protected. PIN is required to view sensitive information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
