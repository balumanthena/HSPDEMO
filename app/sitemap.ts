import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://stork-hospital.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static Routes
    const routes = [
        '',
        '/doctors',
        '/specializations',
        '/blog',
        '/videos',
        '/about',
        '/contact',
        '/diagnostics',
        '/book',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Simple dynamic fetch - if fails, just returns static
    let dynamicRoutes: MetadataRoute.Sitemap = [];

    if (supabase) {
        try {
            // Fetch Blogs
            const { data: blogs } = await supabase.from('blogs').select('slug, created_at').eq('status', 'published');
            if (blogs) {
                blogs.forEach(blog => {
                    dynamicRoutes.push({
                        url: `${BASE_URL}/blog/${blog.slug}`,
                        lastModified: new Date(blog.created_at),
                        changeFrequency: 'monthly',
                        priority: 0.7,
                    });
                });
            }

            // Fetch Doctors
            const { data: doctors } = await supabase.from('doctors').select('id');
            if (doctors) {
                doctors.forEach(doc => {
                    dynamicRoutes.push({
                        url: `${BASE_URL}/doctors/${doc.id}`,
                        lastModified: new Date(),
                        changeFrequency: 'monthly',
                        priority: 0.6,
                    });
                });
            }
        } catch (e) {
            // Ignore errors, return static
        }
    }

    return [...routes, ...dynamicRoutes];
}
