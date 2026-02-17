import React from 'react'
import { Zap } from "lucide-react"
import Title from './Title';

const Features = () => {

    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id='features' className='flex flex-col items-center py-24 bg-zinc-950 px-6 scroll-mt-12'>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fuchsia-500 bg-fuchsia-500/10 rounded-lg px-5 py-2 mb-6 border border-fuchsia-500/20">
                <Zap size={14} fill="currentColor" />
                <span>The Workflow</span>
            </div>

            <Title title='Elevate your Profile' description="Build a market-ready resume using our enterprise-grade suite of AI tools designed for modern recruitment." />

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-20 max-w-7xl mx-auto">
                <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
                    <img className="max-w-xl w-full relative z-10 rounded-2xl shadow-2xl border border-zinc-800" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                </div>

                <div className="space-y-4 w-full max-w-lg" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"group cursor-pointer"}>
                        <div className={`p-8 border rounded-2xl transition-all duration-300 flex gap-6 ${!isHover ? 'bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5' : 'bg-transparent border-zinc-800 group-hover:bg-zinc-900/50 group-hover:border-indigo-500/50'}`}>
                            <div className="size-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                                <svg className="size-6 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Real-Time Score</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">Instantly see how your resume stacks up against industry benchmarks.</p>
                            </div>
                        </div>
                    </div>

                    <div className="group cursor-pointer">
                        <div className="p-8 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900/50 transition-all duration-300 rounded-2xl flex gap-6">
                            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                <svg className="size-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Privacy Shield</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">Your data is encrypted. We ensure 100% GDPR compliance for your personal info.</p>
                            </div>
                        </div>
                    </div>

                    <div className="group cursor-pointer">
                        <div className="p-8 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/50 transition-all duration-300 rounded-2xl flex gap-6">
                            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                                <svg className="size-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Multi-Format Export</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">Download your optimized resume in PDF, DocX, or JSON for various platforms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                * { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>
        </div>
    )
}

export default Features