'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Send, Lock, X, Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PayAction } from '@/Action/bankAction';

export default function PaymentPage() {
  const [errormsg, setErrormsg] = useState(null);
  const [ispay, setIspay] = useState(true);
  const [paymentsuccess, setPaymentsuccess] = useState(false);
  const [ispin, setIspin] = useState(false);
  const [storePIN, setStorePIN] = useState(null);
  const [bankdata, setBankdata] = useState(null);

  // Additional states for form inputs
  const [recipientUPI, setRecipientUPI] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAmount, setShowAmount] = useState(true);
  const [showPINModal, setShowPINModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [successData, setSuccessData] = useState({ upi: '', amount: '', bankName: '' });
  

  const handleVerifyPIN = (data) => {
    if (data.pin ===  pin.pin) {
      setPinError('');
      setIspin(true);
      setErrormsg(null);
      setShowPINModal(false);
      setPin('');
      processPayment();
    } else {
      setErrormsg('Incorrect PIN. Please try again.');
      setPinError('Incorrect PIN. Please try again.');
      setIspin(false);
      setPin('');
    }
  };

  const processPayment = async() => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIspay(false);
      setPaymentsuccess(true);
      setSuccessData({
        upi: recipientUPI,
        amount: amount,
        bankName: bankdata?.bankName || 'Recipient Bank'
      });
    }, 2000);
  };

  const handlePayment = () => {
    if (recipientUPI && amount) {
      setIspay(true);
      setShowPINModal(true);
    }
  };

  const isValid = recipientUPI.includes('@') && parseFloat(amount) > 0;

  if (paymentsuccess) {
    return (
      <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col">
        <div className="absolute inset-0 -z-10 h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-green-500/5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-green-500/3 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-lg flex-1 flex flex-col justify-center items-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse"></div>
              <div className="relative p-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500/30">
                <Check size={48} className="text-green-400" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground text-center mb-8">Your money has been sent successfully</p>

          {/* Transaction Details Card */}
          <div className="w-full rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border-2 border-green-500/30 p-8 mb-8">
            <div className="space-y-6">
              {/* Amount Sent */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Amount Sent</p>
                <p className="text-4xl md:text-5xl font-bold text-green-400">
                  ₹{parseFloat(successData.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-green-500/20"></div>

              {/* Recipient UPI */}
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Sent To</p>
                <div className="bg-background/50 rounded-xl p-4 border border-green-500/20">
                  <p className="text-lg font-mono font-semibold text-foreground text-center">{successData.upi}</p>
                </div>
              </div>

              {/* Transaction ID */}
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Transaction ID</p>
                <p className="text-sm font-mono text-muted-foreground text-center">TXN{Date.now().toString().slice(-8)}</p>
              </div>

              {/* Timestamp */}
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Date & Time</p>
                <p className="text-sm text-muted-foreground text-center">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3 mb-8">
            <Link href="/" className="block w-full">
              <Button className="w-full py-6 px-4 bg-gradient-to-r from-primary via-primary to-primary/80 hover:shadow-2xl hover:shadow-primary/40 text-white font-bold text-lg rounded-xl glow-blue card-elevated transition-all duration-300">
                <Home size={20} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <button
              onClick={() => {
                setPaymentsuccess(false);
                setRecipientUPI('');
                setAmount('');
                setStorePIN(null);
                setIspin(false);
              }}
              className="w-full py-4 px-4 bg-card hover:bg-card/80 text-foreground font-semibold rounded-xl border-2 border-border transition-all duration-300"
            >
              Send Another Payment
            </button>
          </div>

          {/* Thank You Footer */}
          <div className="w-full text-center border-t border-border pt-6 mt-6">
            <p className="text-lg font-semibold text-foreground mb-2">Thank You!</p>
            <p className="text-sm text-muted-foreground">
              We appreciate your trust in our secure payment system.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="absolute inset-0 -z-10 h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-lg">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/accounts/1">
            <button className="p-2 rounded-lg bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Send Money</h1>
            <p className="mt-1 text-muted-foreground">Transfer funds via UPI</p>
          </div>
        </div>

        {/* Error Message */}
        {errormsg && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border-2 border-destructive/30">
            <p className="text-sm text-destructive font-semibold">{errormsg}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Recipient UPI Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Recipient UPI ID</label>
            <input
              type="text"
              value={recipientUPI}
              onChange={(e) => setRecipientUPI(e.target.value)}
              placeholder="user@bank"
              className="w-full px-4 py-4 rounded-xl bg-card/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            />
            <p className="text-xs text-muted-foreground">Enter the UPI ID of the recipient</p>
          </div>

          {/* Amount Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Amount to Send</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary">₹</span>
              <input
                type={showAmount ? 'text' : 'password'}
                value={amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  if (value === '' || !isNaN(parseFloat(value))) {
                    setAmount(value);
                  }
                }}
                placeholder="0.00"
                className="w-full px-4 py-4 pl-10 rounded-xl bg-card/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-lg font-semibold"
              />
              <button
                onClick={() => setShowAmount(!showAmount)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showAmount ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Enter the amount you want to send</p>
          </div>

          {/* Transaction Summary */}
          {recipientUPI && amount && (
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Transaction Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-mono font-semibold text-foreground">{recipientUPI}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-2xl font-bold text-primary">₹{parseFloat(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-primary/30">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="font-semibold text-foreground">Free</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={!isValid || isProcessing}
            className="w-full py-6 px-4 bg-gradient-to-r from-primary via-primary to-primary/80 hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl glow-blue card-elevated transition-all duration-300 transform hover:scale-105"
          >
            <Send size={20} className="mr-2" />
            {isProcessing ? 'Processing...' : 'Send Money'}
          </Button>

          {/* Security Note */}
          <div className="rounded-lg bg-card/30 border border-border p-4">
            <p className="text-xs text-muted-foreground text-center">
              🔒 This transaction is secured with end-to-end encryption. Your funds are safe.
            </p>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPINModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border-2 border-primary/30 p-8 max-w-sm w-full glow-blue-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Lock size={24} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Verify PIN</h2>
              </div>
              <button
                onClick={() => {
                  setShowPINModal(false);
                  setPin('');
                  setPinError('');
                  setIspay(false);
                }}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">Enter your 4-digit PIN to confirm the payment</p>

            {/* PIN Input */}
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
                  setPin(e.target.value);
                  setPinError('');
                  setStorePIN(e.target.value);
                }
              }}
              placeholder="••••"
              maxLength="4"
              className="w-full px-4 py-4 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-center text-3xl tracking-widest font-semibold mb-4"
            />

            {/* Error Message */}
            {pinError && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="text-sm text-destructive">{pinError}</p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowPINModal(false);
                  setPin('');
                  setPinError('');
                  setIspay(false);
                }}
                className="flex-1 py-3 px-4 bg-card hover:bg-card/80 text-foreground rounded-xl border-2 border-border transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyPIN}
                disabled={pin.length !== 4}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary via-primary to-primary/80 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
              >
                Verify
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">Demo PIN: 1234</p>
          </div>
        </div>
      )}
    </main>
  );
}
