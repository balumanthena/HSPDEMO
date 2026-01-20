import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Fallback data for individual blogs (matching the listing page MOCK_BLOGS)
const MOCK_BLOG_DETAILS: Record<string, any> = {
    'early-signs-heart-disease': {
        id: '1',
        title: 'Understanding Early Signs of Heart Disease',
        content: `
      <p class="mb-4">Heart disease remains one of the leading causes of health complications worldwide. Early detection is key to managing and treating cardiovascular issues effectively.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Common Warning Signs</h2>
      <p class="mb-4">While chest pain is the most well-known symptom, there are other subtler signs you shouldn't ignore:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Shortness of breath during light activity</li>
        <li>Irregular heatbeats or palpitations</li>
        <li>Swelling in the legs, ankles, or feet</li>
        <li>Extreme fatigue or weakness</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">When to See a Doctor</h2>
      <p class="mb-4">If you experience persistent discomfort or any of the above symptoms, consult a cardiologist immediately. Regular check-ups are also vital for prevention.</p>
    `,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop',
        created_at: '2024-03-15T00:00:00Z',
        doctor: { name: 'Dr. Sarah Wilson', specialization: 'Cardiology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop' },
        seo_title: 'Early Signs of Heart Disease - Stork Hospital',
        seo_description: 'Learn about the silent symptoms that could indicate cardiovascular issues and when to see a doctor.'
    },
    'post-partum-care-guide': {
        id: '2',
        title: 'Essential Guidelines for Post-Partum Care',
        content: '<p>Content for post-partum care...</p>',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1200&auto=format&fit=crop',
        created_at: '2024-03-10T00:00:00Z',
        doctor: { name: 'Dr. Emily Brooks', specialization: 'Gynecology', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop' },
        seo_title: 'Post-Partum Care Guide - Stork Hospital',
        seo_description: 'A comprehensive guide for new mothers on recovery, nutrition, and mental health after delivery.'
    }
};

export const revalidate = 60;

type Props = {
    params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
    if (!supabase) return MOCK_BLOG_DETAILS[slug] || null;

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*, doctor:doctors(name, specialization, image)')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error || !data) return MOCK_BLOG_DETAILS[slug] || null;
        return data;
    } catch (e) {
        return MOCK_BLOG_DETAILS[slug] || null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return { title: 'Article Not Found' };

    return {
        title: blog.seo_title || blog.title,
        description: blog.seo_description || blog.content.substring(0, 160),
        openGraph: {
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.content.substring(0, 160),
            images: blog.image ? [blog.image] : [],
            type: 'article',
            publishedTime: blog.created_at,
            authors: [blog.doctor?.name || 'Stork Hospital'],
        }
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return notFound();

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <article className="pt-32 pb-16">
                {/* Header Section */}
                <div className="container mx-auto px-4 md:px-6 mb-12">
                    <Link href="/blog" className="inline-flex items-center text-primary font-medium mb-8 hover:underline">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary leading-tight mb-8 max-w-4xl">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-text-muted border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-3">
                            {blog.doctor?.image ? (
                                <Image src={blog.doctor.image} alt={blog.doctor.name} width={48} height={48} className="rounded-full object-cover border border-gray-200" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User size={24} />
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-text-primary text-sm">{blog.doctor?.name || 'Stork Team'}</p>
                                <p className="text-xs text-text-muted">{blog.doctor?.specialization || 'Medical Specialist'}</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar size={18} />
                            {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Clock size={18} />
                            5 min read
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {blog.image && (
                    <div className="container mx-auto px-4 md:px-6 mb-16">
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6">
                    <div
                        className="max-w-3xl mx-auto prose prose-lg prose-blue text-text-muted prose-headings:font-serif prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-blue-700 transition-colors"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>

            <Footer />
        </main>
    );
}
