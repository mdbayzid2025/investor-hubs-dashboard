'use client'; // ← remove this line (not needed in plain React / Vite / CRA)

import { AlertCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


export default function OTPVerifyPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(180);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [resetKey, setResetKey] = useState(0);

    // Get email from cookie
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    };

    const email = getCookie('verify-email') || '';

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, resetKey]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (index: number, value: string): void => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: any): void => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const pasteData = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6)
            .split('');

        if (pasteData.length > 0) {
            const newOtp = [...otp];
            pasteData.forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);

            const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleVerify = async (e: any) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length < 6) {
            setError('Please enter the complete verification code.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {


            // const response = aw;
            // if (response.success) {
            //     console.log("response ", response);
            //     setIsLoading(false);
            // }
        } catch (err: any) {
            toast.error(err?.data?.message);
            setIsLoading(false);// ← replace with toast if you have one
        } finally {

        }
    };

    const handleResend = async () => {
        if (!email) {
            alert('No email found. Please try login again.');
            return;
        }

        try {
            const res = await fetch('/api/auth/resend-otp', {   // ← change to your real endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });

            const response = await res.json();

            if (response.success) {
                alert(response.message || 'New code sent!');
                setResetKey((k) => k + 1);
                setTimeLeft(180);
                setIsExpired(false);
                setOtp(['', '', '', '', '', '']);
                setError('');
                setTimeout(() => inputRefs.current[0]?.focus(), 100);
            } else {
                throw new Error(response.message);
            }
        } catch (err: any) {
            alert(err.message || 'Failed to resend code');
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center px-6 py-12 bg-linear-to-b from-[#0F0F0F] to-black text-white font-sans">
            <div className="w-full max-w-xl">
                <div className="text-center mb-10">
                    <img src="/logo.png" alt="" className="w-36 mx-auto" />
                    <h1 className="text-xl font-serif text-white mb-3">Security Verification</h1>
                    <p className="text-gray-400 text-sm md:text-base px-4">
                        We've sent a 6-digit verification code to <br />
                        <span className="text-primary font-medium">{email || 'your email'}</span>
                    </p>
                </div>

                <div className="bg-[#141414] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />

                    <form onSubmit={handleVerify} className="space-y-8">
                        <div className="space-y-4">
                            <label className="block text-center text-xs uppercase tracking-widest text-gray-500 font-semibold">
                                Enter Verification Code
                            </label>
                            <div className="flex justify-between gap-2 md:gap-3" onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        disabled={isExpired || isLoading}
                                        maxLength={1}
                                        className={`w-full h-14 md:h-16 text-center text-2xl font-bold ${isExpired ? 'opacity-50' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* EXPIRED STATE */}
                        {isExpired ? (
                            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>This code has expired</AlertDescription>
                                </Alert>

                                <Button
                                    variant="outline"
                                    onClick={handleResend}
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Resend New Code
                                </Button>
                            </div>
                        ) : (
                            <>
                                {/* VERIFY BUTTON */}
                                <Button
                                    type="submit"
                                    className="w-full bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                                    disabled={isLoading || otp.includes('')}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                                            Verifying...
                                        </span>
                                    ) : (
                                        'Verify Code'
                                    )}
                                </Button>

                                {/* TIMER + RESEND */}
                                <div className="flex items-center justify-between text-xs md:text-sm">
                                    <div className="flex items-center text-gray-400">
                                        Code expires in:
                                        <span
                                            className={`ml-2 font-mono font-bold ${timeLeft < 30
                                                ? 'text-red-400 animate-pulse'
                                                : 'text-primary'
                                                }`}
                                        >
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={handleResend}
                                        disabled={timeLeft > 120}
                                        className="
                                        text-primary hover:text-[#E4C77D]
                                        hover:bg-transparent
                                        text-xs md:text-sm
                                        p-0 h-auto
                                        disabled:text-gray-600
                                    "
                                    >
                                        Resend
                                    </Button>
                                </div>
                            </>
                        )}

                        {/* ERROR MESSAGE */}
                        {error && !isExpired && (
                            <div className="text-xs text-red-500 text-center animate-shake">
                                {error}
                            </div>
                        )}

                        {/* BACK BUTTON */}
                        <div className="mt-10 pt-6 border-t border-white/10 text-center">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => window.history.back()}
                                className="
                                inline-flex items-center
                                text-gray-400 hover:text-primary
                                hover:bg-white/5
                                transition-colors group
                            "
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Back to Sign In
                            </Button>
                        </div>
                    </form>
                </div>

            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
        </div>
    );
}