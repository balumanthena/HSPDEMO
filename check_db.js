
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
let supabaseUrl, supabaseKey;
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = value;
            if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') supabaseKey = value;
        }
    });
} catch (e) {
    console.log('Error reading .env.local:', e.message);
}

if (!supabaseUrl || !supabaseKey) {
    console.log('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDepartments() {
    console.log('Checking departments table...');
    const { data, error } = await supabase
        .from('departments')
        .select('title, description, content'); // Checking for a content column

    if (error) {
        console.error('Error fetching departments:', error.message);
    } else {
        console.log('Count:', data.length);
        if (data.length > 0) {
            console.log('First row keys:', Object.keys(data[0]));
            console.log('First row title:', data[0].title);
        } else {
            console.log('No data found in departments table.');
        }
    }
}

checkDepartments();
