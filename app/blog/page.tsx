import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

            <div className="bg-white pt-32 pb-16 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-2 block">Health Insights</span>
                    <h1 className="text-4xl font-bold text-text-primary mb-6">Medical Blog & News</h1>
                    <p className="max-w-3xl mx-auto text-text-muted text-lg">
                        Expert medical advice, health tips, and hospital updates directly from our specialists.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog: any) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                                {blog.image ? (
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-text-muted/20">
                                        <FileText size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-grow">
                                    {blog.description || blog.content.substring(0, 150) + '...'}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <User size={14} />
                                        </div>
                                        {blog.doctor?.name || 'Stork Team'}
                                    </div>
                                    <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read Article <ArrowRight size={14} />
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
