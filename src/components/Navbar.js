"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 bg-black/50 backdrop-blur-lg border-b border-white/10 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white">
                    SongAI
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-gray-300">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/song-generate" className="hover:text-white transition">Generate</Link>
                    <Link href="/about" className="hover:text-white transition">About</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            {open && (
                <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
                    <div className="flex flex-col p-4 space-y-4 text-gray-300">
                        <Link href="/" onClick={() => setOpen(false)} className="hover:text-white">Home</Link>
                        <Link href="/songs" onClick={() => setOpen(false)} className="hover:text-white">Generate</Link>
                        <Link href="/about" onClick={() => setOpen(false)} className="hover:text-white">About</Link>
                        <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-white">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
