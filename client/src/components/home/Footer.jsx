import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-zinc-950 pt-32 pb-16 px-6 md:px-16 lg:px-24 xl:px-40 border-t border-zinc-900">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <a href="#">
                            <img src='/logo2.png' alt='logo' className='h-10 w-auto brightness-200' />
                        </a>
                        <p className="text-zinc-500 max-w-xs text-sm leading-relaxed font-medium">
                            Architecting the future of recruitment through AI-powered optimization and professional design.
                        </p>
                        <div className="flex items-center gap-5 text-zinc-400">
                            {/* Icons with dark styling */}
                            <a href="#" className="hover:text-indigo-500 transition-colors">
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="hover:text-indigo-500 transition-colors">
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                            <li><a href="/" className="hover:text-indigo-400 transition">Design Engine</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">AI Scoring</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Templates</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Job Search</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                            <li><a href="/" className="hover:text-indigo-400 transition">About</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Careers</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Blog</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Press Kit</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                            <li><a href="/" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Terms of Service</a></li>
                            <li><a href="/" className="hover:text-indigo-400 transition">Cookie Settings</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-xs font-semibold tracking-wider uppercase">
                    <p>© 2026 ResumeOS Intelligence. All rights reserved.</p>
                    <p>Designed for the next generation of talent.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer