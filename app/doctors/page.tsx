import { supabase } from "@/lib/supabase";
import DoctorsClient from "./DoctorsClient";
import { Doctor } from "@/components/ui/DoctorCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Find a Specialist | Stork Multispecialty Hospital',
    description: 'Meet our team of experienced doctors and specialists across various medical departments.',
};

const MOCK_DOCTORS: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Wilson', specialization: 'Cardiology', experience: 15, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 5.0, nextAvailable: 'Today, 2:00 PM' },
    { id: '2', name: 'Dr. James Chen', specialization: 'Pediatrics', experience: 10, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop', availability: 'Busy', rating: 4.8, nextAvailable: 'Tomorrow, 10:00 AM' },
    { id: '3', name: 'Dr. Emily Brooks', specialization: 'Gynecology', experience: 12, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 4.9, nextAvailable: 'Today, 5:30 PM' },
    { id: '4', name: 'Dr. Michael Ross', specialization: 'Orthopedics', experience: 18, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.7, nextAvailable: 'Today, 11:00 AM' },
    { id: '5', name: 'Dr. Anita Roy', specialization: 'Dermatology', experience: 8, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.6, nextAvailable: 'Tomorrow, 9:00 AM' },
    { id: '6', name: 'Dr. Robert Fox', specialization: 'General Surgery', experience: 22, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.9, nextAvailable: 'Today, 4:00 PM' },
];

export const revalidate = 60;

async function getDoctors() {
    if (!supabase) return MOCK_DOCTORS;

    try {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .order('name');

        if (error || !data || data.length === 0) return MOCK_DOCTORS;
        return data as Doctor[];
    } catch (e) {
        return MOCK_DOCTORS;
    }
}

export default async function DoctorsPage() {
    const doctors = await getDoctors();
    return <DoctorsClient initialDoctors={doctors} />;
}
