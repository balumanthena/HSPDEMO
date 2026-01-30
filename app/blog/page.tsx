import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from '@/components/ui/PageHeader';
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Health Blog | Stork Multispecialty Hospital',
    description: 'Latest health tips, medical news, and expert advice from our doctors.',
};

// Fallback data
const MOCK_BLOGS = [
    {
        id: '1',
        title: 'Understanding Early Signs of Heart Disease',
        slug: 'early-signs-heart-disease',
        content: 'Start of the article...',
        description: 'Learn about the silent symptoms that could indicate cardiovascular issues and when to see a doctor.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop',
        created_at: '2024-03-15T00:00:00Z',
        doctor: { name: 'Dr. Sarah Wilson' }
    },
    {
        id: '2',
        title: 'Essential Guidelines for Post-Partum Care',
        slug: 'post-partum-care-guide',
        content: 'Start of the article...',
        description: 'A comprehensive guide for new mothers on recovery, nutrition, and mental health after delivery.',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&auto=format&fit=crop',
        created_at: '2024-03-10T00:00:00Z',
        doctor: { name: 'Dr. Emily Brooks' }
    },
    {
        id: '3',
        title: 'Pediatric vaccinations: What Parents Need to Know',
        slug: 'pediatric-vaccination-schedule',
        content: 'Start of the article...',
        description: 'Keep track of your child’s immunization schedule with our updated guide for 2024.',
        image: 'https://images.unsplash.com/photo-1584515933487-98db75f637b4?w=800&auto=format&fit=crop',
        created_at: '2024-03-05T00:00:00Z',
        doctor: { name: 'Dr. James Chen' }
    }
];

export const revalidate = 60; // Revalidate every minute

async function getBlogs() {
    if (!supabase) return MOCK_BLOGS;

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*, doctor:doctors(name)')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            // console.warn('Supabase error or no data, using mocks:', error);
            return MOCK_BLOGS;
        }
        return data;
    } catch (e) {
        return MOCK_BLOGS;
    }
}

export default async function BlogListingPage() {
    const blogs = await getBlogs();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <PageHeader
                title="Medical Blog"
                highlight="& Insights"
                description="Expert medical advice, latest health tips, and hospital updates directly from our specialists."
            />

            <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-12 md:-mt-24 mb-12 md:mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog: any) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                                {blog.image ? (
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-300">
                                        <FileText size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg flex items-center gap-1.5">
                                    <Calendar size={12} className="text-secondary" />
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors font-serif">
                                    {blog.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">
                                    {blog.description || blog.content.substring(0, 150) + '...'}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User size={14} />
                                        </div>
                                        {blog.doctor?.name || 'Stork Team'}
                                    </div>
                                    <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <ArrowRight size={18} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
