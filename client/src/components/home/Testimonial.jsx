import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-8 rounded-3xl mx-4 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 transition-all duration-300 w-80 shrink-0">
            <div className="flex gap-4">
                <img className="size-12 rounded-xl object-cover ring-2 ring-zinc-800" src={card.image} alt="User" />
                <div className="flex flex-col">
                    <p className="font-bold text-white text-sm">{card.name}</p>
                    <span className="text-xs text-indigo-400 font-medium">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm py-6 text-zinc-400 leading-relaxed font-medium italic">"The AI suggestions were incredibly accurate. It highlighted achievements I hadn't even thought to include. Highly recommended!"</p>
            <div className="flex gap-1 text-indigo-500">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="size-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-zinc-950 py-24 border-y border-zinc-900">
            <div id='testimonials' className='flex flex-col items-center px-6 scroll-mt-12'>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 rounded-lg px-5 py-2 mb-6 border border-indigo-500/20">
                    <BookUserIcon className='size-4 stroke-indigo-500' />
                    <span>User Stories</span>
                </div>
                <Title title="Success stories only" description="Discover how candidates across the globe are securing positions at top-tier tech companies using our platform." />
            </div>

            <div className="mt-16">
                <div className="marquee-row w-full overflow-hidden relative py-5">
                    <div className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-r from-zinc-950 to-transparent"></div>
                    <div className="marquee-inner flex transform-gpu min-w-[200%]">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-l from-zinc-950 to-transparent"></div>
                </div>

                <div className="marquee-row w-full overflow-hidden relative py-5 mt-4">
                    <div className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-r from-zinc-950 to-transparent"></div>
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%]">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-l from-zinc-950 to-transparent"></div>
                </div>
            </div>

            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            .marquee-inner { animation: marqueeScroll 35s linear infinite; }
            .marquee-reverse { animation-direction: reverse; }
        `}</style>
        </div>
    )
}

export default Testimonial