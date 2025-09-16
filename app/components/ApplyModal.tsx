"use client";
import { useEffect, useRef, useState } from "react";

type ApplyModalProps = {
    ctaLabel?: string;
};

export default function ApplyModal({ ctaLabel = "Apply Now" }: ApplyModalProps) {
    const [open, setOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
    const nameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (open) {
            const onKey = (e: KeyboardEvent) => {
                if (e.key === "Escape") setOpen(false);
            };
            window.addEventListener("keydown", onKey);

            setTimeout(() => nameRef.current?.focus(), 0);
            return () => window.removeEventListener("keydown", onKey);
        }
    }, [open]);

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
        setOpen(false);
    }

    return (
        <>
            <button type="button" className="btn-primary focus-ring" onClick={() => setOpen(true)}>
                {ctaLabel}
            </button>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="apply-title"
                        className="relative z-10 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                    >
                        <h2 id="apply-title" className="text-lg font-semibold text-gray-900">Apply for this job</h2>
                        <form onSubmit={onSubmit} className="mt-4">
                            <table className="w-full table-fixed">
                                <tbody className="text-sm text-gray-700">
                                    <tr>
                                        <th className="w-1/3 bg-gray-50 p-3 text-left font-medium">Full name</th>
                                        <td className="p-3">
                                            <input
                                                ref={nameRef}
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 focus-ring"
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
                                        <th className="bg-gray-50 p-3 text-left font-medium">Email</th>
                                        <td className="p-3">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 focus-ring"
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
                </div>
            )}
        </>
    );
}


