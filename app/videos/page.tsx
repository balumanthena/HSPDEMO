import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

            <div className="bg-white pt-32 pb-16 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-2 block">Patient Education</span>
                    <h1 className="text-4xl font-bold text-text-primary mb-6">Video Library</h1>
                    <p className="max-w-3xl mx-auto text-text-muted text-lg">
                        Visual guides and expert insights to help you make informed health decisions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video: any) => {
                        const videoId = getYouTubeId(video.youtube_url);
                        return (
                            <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
                                <div className="relative w-full pb-[56.25%] bg-black">
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

                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-3 w-fit">
                                        {video.category || 'General Health'}
                                    </span>
                                    <h3 className="text-xl font-bold text-text-primary mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-text-muted text-sm line-clamp-3">
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
