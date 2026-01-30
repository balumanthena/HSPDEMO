export interface NavItem {
    label: string;
    href?: string;
    subItems?: NavItem[];
}

export interface DepartmentNavItem {
    title: string;
    slug: string;
    dropdown?: NavItem[];
}

export const NAV_DATA: DepartmentNavItem[] = [
    {
        title: "Gynecology & OBS",
        slug: "gynecology-obstetrics",
        dropdown: [
            {
                label: "OBS",
                subItems: [
                    { label: "Prenatal Care" },
                    { label: "High-Risk Pregnancy Management" },
                    { label: "Labor and Delivery" },
                    { label: "Postpartum Care" },
                    { label: "Antepartum and Intrapartum Monitoring" }
                ]
            },
            {
                label: "Gynecology",
                subItems: [
                    { label: "Uterine Fibroids" },
                    { label: "Endometriosis" },
                    { label: "Hysterectomy" },
                    { label: "MTP / Family Planning" },
                    { label: "Ectopic Pregnancy" },
                    { label: "C-Section" },
                    { label: "Painless Delivery" },
                    { label: "Vaginal Surgery" }
                ]
            },
            {
                label: "Cosmetic Gynecology",
                subItems: [
                    { label: "Vaginal Tightening" },
                    { label: "Labiaplasty" },
                    { label: "Hymenoplasty" }
                ]
            }
        ]
    },
    {
        title: "General / Laparoscopic Surgery",
        slug: "general-laparoscopic-surgery",
        dropdown: [
            { label: "Hernia" },
            { label: "Gallstones" },
            { label: "Appendicitis" },
            { label: "Inguinal Hernia" }
        ]
    },
    {
        title: "Orthopedics",
        slug: "orthopedics",
        dropdown: [
            { label: "Total Knee Replacement" },
            { label: "ACL Tear" },
            { label: "Meniscus Tear" },
            { label: "Hip Replacement Surgery" },
            { label: "Spine Surgery" },
            { label: "Shoulder Dislocation" },
            { label: "Shoulder Replacement" },
            { label: "Rotator Cuff Repair" },
            { label: "Arthroscopy Surgery" },
            { label: "Knee Arthroscopy" },
            { label: "Shoulder Arthroscopy" }
        ]
    },
    {
        title: "Urology",
        slug: "urology",
        dropdown: [
            { label: "Circumcision" },
            { label: "Stapler Circumcision" },
            { label: "Kidney Stones" },
            { label: "Hydrocele" },
            { label: "ESWL" },
            { label: "RIRS" },
            { label: "PCNL" },
            { label: "URSL" },
            { label: "Enlarged Prostate" },
            { label: "Frenuloplasty Surgery" },
            { label: "Balanitis" },
            { label: "Balanoposthitis" },
            { label: "Paraphimosis" },
            { label: "Foreskin Infection" },
            { label: "Prostatectomy" },
            { label: "Phimosis" }
        ]
    },
    {
        title: "Proctology",
        slug: "proctology",
        dropdown: [
            { label: "Anal Fissure" },
            { label: "Anal Fistula" },
            { label: "Piles" },
            { label: "Rectal Prolapse" },
            { label: "Pilonidal Sinus" },
            { label: "Perianal Abscess" }
        ]
    },
    {
        title: "Vascular",
        slug: "vascular-surgery",
        dropdown: [
            { label: "Varicose Veins" },
            { label: "Varicocele" },
            { label: "DVT" },
            { label: "Diabetic Foot Ulcer" }
        ]
    },
    {
        title: "GI Surgery & Weight Loss",
        slug: "gi-surgery-weight-loss",
        dropdown: [
            { label: "Bariatric Surgery" },
            { label: "Intragastric Balloon" }
        ]
    },
    {
        title: "ENT",
        slug: "ent",
        dropdown: [
            { label: "Tympanoplasty" },
            { label: "Adenoidectomy" },
            { label: "Sinus Surgery" },
            { label: "Septoplasty" },
            { label: "Mastoidectomy" },
            { label: "FESS Surgery" },
            { label: "Thyroidectomy" },
            { label: "Tonsillectomy" },
            { label: "Stapedectomy" },
            { label: "Myringotomy" },
            { label: "Throat Surgery" },
            { label: "Ear Surgery" },
            { label: "Vocal Cord Polyps" },
            { label: "Nasal Polyps" },
            { label: "Turbinate Reduction" }
        ]
    },
    {
        title: "General Medicine",
        slug: "general-medicine",
        dropdown: [
            { label: "Management of Infections" },
            { label: "Metabolic and Endocrine Disorders" },
            { label: "Respiratory Conditions" },
            { label: "Gastrointestinal Issues" },
            { label: "Mental Health" },
            { label: "Chronic Disease Management" }
        ]
    },
    {
        title: "Pain Management",
        slug: "pain-management",
        dropdown: [
            { label: "Back Pain" },
            { label: "Knee Pain" },
            { label: "Neck Pain" },
            { label: "Shoulder Pain" },
            { label: "Headache / Migraine" },
            { label: "Hip Pain" },
            { label: "Foot / Ankle Pain" },
            { label: "Elbow Pain" },
            { label: "Sports Pain" }
        ]
    }
];
