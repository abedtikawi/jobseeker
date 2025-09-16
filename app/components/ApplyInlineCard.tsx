"use client";
import { useRef, useState } from "react";

export default function ApplyInlineCard({ open: controlledOpen, onOpenChange }: { open?: boolean; onOpenChange?: (v: boolean) => void }) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = (v: boolean) => {
        if (onOpenChange) onOpenChange(v);
        else setUncontrolledOpen(v);
    };
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const nameRef = useRef<HTMLInputElement | null>(null);

    function validate() {
        const next: { fullName?: string; email?: string } = {};
        if (!fullName.trim()) next.fullName = "Full name is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) next.email = "Email is required";
        else if (!emailRegex.test(email)) next.email = "Enter a valid email";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitted(true);
    }

    if (!open) {
        return (
            <button type="button" className="btn-primary focus-ring w-full text-[#1DB954]" onClick={() => { setOpen(true); setTimeout(() => nameRef.current?.focus(), 0); }}>
                Submit Application
            </button>
        );
    }

    if (submitted) {
        return (
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 shadow-sm font-mono text-black w-full overflow-hidden" role="status" aria-live="polite">
                <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.2 4.4-1.71-1.71a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.147-.089l3.787-5.029z" clipRule="evenodd" />
                    </svg>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-green-700">Application submitted</p>
                        <p className="text-sm text-green-700">We received your details.</p>
                        <dl className="mt-2 text-sm">
                            <div>
                                <dt className="text-gray-600">Full name</dt>
                                <dd className="font-medium break-all whitespace-pre-wrap max-w-full">{fullName}</dd>
                            </div>
                            <div className="mt-1">
                                <dt className="text-gray-600">Email</dt>
                                <dd className="font-medium break-all whitespace-pre-wrap max-w-full">{email}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm font-mono text-black w-full">
            <form onSubmit={onSubmit}>
                <table className="w-full table-fixed">
                    <tbody className="text-sm text-gray-700">
                        <tr>
                            <td className="p-3" colSpan={2}>
                                <label htmlFor="fullName" className="text-sm text-gray-700">Full name</label>
                                <input
                                    id="fullName"
                                    ref={nameRef}
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus-ring"
                                    placeholder="John Doe"
                                    aria-invalid={Boolean(errors.fullName)}
                                    aria-describedby={errors.fullName ? "err-name" : undefined}
                                />
                                {errors.fullName && (
                                    <p id="err-name" className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3" colSpan={2}>
                                <label htmlFor="email" className="text-sm text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus-ring"
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? "err-email" : undefined}
                                />
                                {errors.email && (
                                    <p id="err-email" className="mt-1 text-xs text-red-600">{errors.email}</p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-4 flex justify-end gap-2">
                    <button type="button" className="btn-primary focus-ring" onClick={() => setOpen(false)}>Cancel</button>
                    <button type="submit" className="btn-primary focus-ring">Submit</button>
                </div>
            </form>
        </div>
    );
}


