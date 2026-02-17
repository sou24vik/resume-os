import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
    return (
        <div id='cta' className='w-full py-32 px-6 bg-zinc-950'>
            <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-fuchsia-700 p-1px">
                <div className="bg-zinc-950 rounded-[2.4rem] overflow-hidden relative py-16 md:py-24 px-10 md:px-20">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 size-96 bg-indigo-500/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 size-64 bg-fuchsia-500/10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-center md:text-left max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Ready to bypass the <span className="text-indigo-400">ATS filter?</span></h2>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed">Join 10,000+ candidates who have already leveled up their career. Your dream job is just one edit away.</p>
                        </div>

                        <Link to='/app' className="group flex items-center gap-3 rounded-2xl py-5 px-10 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold text-lg active:scale-95 shadow-xl shadow-indigo-600/20">
                            <span>Get Started Now</span>
                            <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallToAction