import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from '@/components/ui/PageHeader';
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { PlayCircle } from "lucide-react";

export const metadata: Metadata = {
    title: 'Health Education Videos | Stork Multispecialty Hospital',
    description: 'Watch expert talks, health tips, and hospital tours from our medical specialists.',
};

// Fallback data
const MOCK_VIDEOS = [
    {
        id: '1',
        title: 'Why Regular Cardiac Checkups Matter',
        youtube_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        category: 'Cardiology',
        description: 'Dr. Sarah Wilson explains the importance of preventative heart care and what to expect during a checkup.'
    },
    {
        id: '2',
        title: 'Maternity Ward Tour',
        youtube_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        category: 'Facilities',
        description: 'Take a virtual tour of our state-of-the-art maternity wing, designed for comfort and safety.'
    },
    {
        id: '3',
        title: 'Tips for Managing Childhood Asthma',
        youtube_url: 'https://www.youtube.com/watch?v=FjHNT-0G7zM',
        category: 'Pediatrics',
        description: 'Expert advice on identifying triggers and managing asthma symptoms in children.'
    }
];

export const revalidate = 60;

function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function getVideos() {
    if (!supabase) return MOCK_VIDEOS;

    try {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) return MOCK_VIDEOS;
        return data;
    } catch (e) {
        return MOCK_VIDEOS;
    }
}

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <PageHeader
                title="Video"
                highlight="Library"
                description="Visual guides, expert talks, and hospital tours to help you make informed health decisions."
            />

            <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-12 md:-mt-24 mb-12 md:mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video: any) => {
                        const videoId = getYouTubeId(video.youtube_url);
                        return (
                            <div key={video.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:scale-[1.02]">
                                <div className="relative w-full pb-[56.25%] bg-slate-900">
                                    {videoId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title}
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white/50">
                                            <PlayCircle size={48} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 w-fit">
                                        {video.category || 'General Health'}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-primary transition-colors font-serif">
                                        {video.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
