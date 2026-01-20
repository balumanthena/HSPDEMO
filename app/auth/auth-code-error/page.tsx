'use client';

import { FileWarning } from 'lucide-react';
import Link from 'next/link';

export default function AuthCodeError() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileWarning size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h1>
                <p className="text-gray-500 mb-8">
                    The sign-in link is invalid or has expired. Please try signing in again.
                </p>
                <Link
                    href="/admin/login"
                    className="inline-block w-full bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors font-medium"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
