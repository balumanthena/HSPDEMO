
export interface Department {
    slug: string;
    title: string;
    overview: string;
    services: string[];
    facilities: string[];
    whyChooseUs: { title: string; description: string }[];
    iconName?: string;
}

export const DEPARTMENTS: Department[] = [
    {
        slug: 'cosmetic-plastic-surgery',
        title: 'Cosmetic & Plastic Surgery',
        iconName: 'Sparkles',
        overview: 'Stork Hospital’s Department of Cosmetic & Plastic Surgery is dedicated to enhancing your appearance and restoring function with precision and artistry. Our team of board-certified plastic surgeons combines medical expertise with aesthetic sensibility to deliver natural-looking results. Whether purely cosmetic or reconstructive following trauma or illness, we approach every procedure with the highest standards of safety, privacy, and personalized care. We believe in empowering patients through transformative treatments that boost confidence and improve quality of life.',
        services: [
            'Rhinoplasty (Nose Reshaping)',
            'Liposuction & Body Contouring',
            'Breast Augmentation & Reduction',
            'Facelifts & Anti-aging Treatments',
            'Reconstructive Surgery (Trauma/Burn)',
            'Scar Revision Therapy'
        ],
        facilities: [
            'State-of-the-art modular operation theaters',
            'Advanced 3D imaging for result simulation',
            'Private, discreet recovery suites',
            'Dedicated post-operative care units'
        ],
        whyChooseUs: [
            { title: 'Expert Surgeons', description: 'Board-certified specialists with global training in aesthetic procedures.' },
            { title: 'Safety First', description: 'Strict adherence to international safety protocols and sterilization standards.' },
            { title: 'Personalized Plans', description: 'Customized treatment plans tailored to your unique anatomical goals.' }
        ]
    },
    {
        slug: 'emergency-trauma-critical-care',
        title: 'Emergency, Trauma & Critical Care',
        iconName: 'Siren',
        overview: 'Our Emergency, Trauma & Critical Care department functions as the heartbeat of Stork Hospital, operating 24/7 to provide immediate life-saving interventions. Equipped to handle medical emergencies, severe trauma, and critical conditions, our rapid response team includes emergency physicians, trauma surgeons, and intensivists. We prioritize the "Golden Hour" in trauma care, ensuring rapid stabilization and advanced management for strokes, cardiac arrests, and accident victims. Your survival and recovery are our absolute priority.',
        services: [
            '24/7 Emergency Room (ER) Services',
            'Level 1 Trauma Care for Accidents',
            'Cardiac Emergency Management (Heart Attacks)',
            'Stroke Management (Thrombolysis)',
            'Poisoning & Overdose Management',
            'Pediatric Emergency Care'
        ],
        facilities: [
            'Advanced Life Support (ALS) Ambulances',
            'Dedicated Trauma Resuscitation Bays',
            '24/7 Catheterization Lab availability',
            'Integrated Ventilator Support Systems'
        ],
        whyChooseUs: [
            { title: 'Rapid Response', description: 'Immediate triage and treatment initiation within minutes of arrival.' },
            { title: 'Multidisciplinary Team', description: 'Instant access to specialists across cardiology, neurology, and surgery.' },
            { title: 'Advanced Monitoring', description: 'High-tech vital monitoring systems for critical patients.' }
        ]
    },
    {
        slug: 'ent',
        title: 'ENT (Ear, Nose & Throat)',
        iconName: 'Ear',
        overview: 'The Department of ENT at Stork Hospital offers comprehensive diagnosis and treatment for disorders affecting the ear, nose, throat, head, and neck. From chronic sinusitis and hearing loss to complex head and neck cancers, our specialists utilize advanced endoscopic and microscopic technologies for precise interventions. We cater to both pediatric and adult patients, ensuring that sensory functions and respiratory health are restored effectively. Our focus is on minimally invasive techniques to ensure faster recovery and minimal discomfort.',
        services: [
            'Functional Endoscopic Sinus Surgery (FESS)',
            'Micro-Ear Surgery (Tympanoplasty, Mastoidectomy)',
            'Tonsillectomy & Adenoidectomy',
            'Hearing Loss Assessment & Aids',
            'Vertigo & Balance Disorder Clinics',
            'Voice & Swallowing Disorders Therapy'
        ],
        facilities: [
            'Advanced Audiology & Speech Therapy Lab',
            'Video Laryngoscopy & Endoscopy Units',
            'Sleep Study Laboratory (Polysomnography)',
            'Microdebriders & Coblation Technology'
        ],
        whyChooseUs: [
            { title: 'Precision Surgery', description: 'Use of latest microscopes and endoscopes for delicate structures.' },
            { title: 'Comprehensive Care', description: 'Integrated audiology and speech therapy support.' },
            { title: 'Pediatric Expertise', description: 'Specialized care for children with recurrent ENT infections.' }
        ]
    },
    {
        slug: 'general-laparoscopic-surgery',
        title: 'General & Laparoscopic Surgery',
        iconName: 'Scalpel',
        overview: 'Our General & Laparoscopic Surgery department is at the forefront of minimally invasive surgical care. We treat a wide spectrum of abdominal and general surgical conditions, ranging from hernias and appendicitis to complex intestinal disorders. Our surgeons are experts in laparoscopic techniques, which result in smaller incisions, less pain, and quicker recovery times compared to traditional open surgery. We describe our approach as patient-centric, focusing on safety, efficacy, and returning you to your daily life as soon as possible.',
        services: [
            'Laparoscopic Cholecystectomy (Gallbladder)',
            'Hernia Repairs (Inguinal, Umbilical, Incisional)',
            'Appendectomy',
            'Thyroid & Parathyroid Surgery',
            'Hydrocele & Varicocele Surgery',
            'Trauma & Emergency Surgeries'
        ],
        facilities: [
            'High-definition Laparoscopic Towers',
            'Harmonic Scalpel & Ligasure Technology',
            'Modern Post-Surgical ICUs',
            'Day Care Surgery Suites'
        ],
        whyChooseUs: [
            { title: 'Minimally Invasive', description: 'Focus on keyhole surgery for faster healing and minimal scarring.' },
            { title: 'Experienced Team', description: 'Senior surgeons with thousands of successful procedures.' },
            { title: 'Cost-Effective', description: 'Reduced hospital stay due to advanced surgical techniques.' }
        ]
    },
    {
        slug: 'general-medicine',
        title: 'General Medicine',
        iconName: 'Activity',
        overview: 'Stork Hospital’s General Medicine department provides comprehensive primary care and management for a wide range of acute and chronic illnesses. Our team of experienced physicians is dedicated to early diagnosis, effective treatment, and preventive care to ensure long-term health and wellness for adult patients. We serve as the first point of contact for complex undifferentiated symptoms, coordinating care across specialties to ensure a holistic treatment plan tailored to your specific needs.',
        services: [
            'Management of Diabetes & Hypertension',
            'Infectious Disease Treatment (Dengue, Malaria, Typhoid)',
            'Respiratory Infection Management',
            'Preventive Health Checkups',
            'Geriatric (Elderly) Care',
            'Lifestyle Disease Counseling'
        ],
        facilities: [
            '24/7 Medical ICU Support',
            'Advanced Diagnostic Laboratory',
            'Integrated Electronic Health Records',
            'Private & General Wards'
        ],
        whyChooseUs: [
            { title: 'Holistic Approach', description: 'Treating the whole patient, not just individual symptoms.' },
            { title: 'Round-the-Clock Care', description: '24/7 availability of senior physicians for emergencies.' },
            { title: 'Collaborative Network', description: 'Seamless referral to specialized departments when needed.' }
        ]
    },
    {
        slug: 'gi-surgery-weight-loss',
        title: 'GI Surgery & Weight Loss',
        iconName: 'Scale',
        overview: 'The Department of GI Surgery & Weight Loss offers advanced surgical solutions for gastrointestinal disorders and obesity. We specialize in bariatric surgery, helping patients achieve sustainable weight loss and remission of metabolic comorbidities like type 2 diabetes. Additionally, our team handles complex surgeries of the liver, pancreas, and gastrointestinal tract. We are committed to transforming lives through metabolic wellness and expert surgical intervention, supported by a multidisciplinary team of dietitians and counselors.',
        services: [
            'Bariatric Surgery (Sleeve Gastrectomy, Bypass)',
            'Colorectal Surgery',
            'Liver & Pancreatic Resections',
            'Gastroesophageal Reflux Surgery',
            'GI Cancer Surgeries',
            'Nutritional Counseling'
        ],
        facilities: [
            'Dedicated Bariatric OTS',
            'Specialized Bariatric Patient Equipment',
            'Advanced GI Endoscopy Suite',
            'Metabolic Wellness Clinic'
        ],
        whyChooseUs: [
            { title: 'Metabolic Remission', description: 'Proven track record in reversing diabetes through weight loss surgery.' },
            { title: 'Comprehensive Support', description: 'Lifelong nutritional and lifestyle support post-surgery.' },
            { title: 'Expert Surgeons', description: 'Fellowship-trained bariatric and GI surgeons.' }
        ]
    },
    {
        slug: 'gynecology-obstetrics',
        title: 'Gynecology & Obstetrics',
        iconName: 'Baby',
        overview: 'Our Center for Gynecology & Obstetrics is designed to support women through every stage of life, from adolescence and maternity to menopause. We provide world-class prenatal and postnatal care, focusing on the safety of both mother and child. Our gynecologists also treat a wide range of reproductive health issues using medical and surgical approaches. With a compassionate team and patient-friendly environment, we ensure a comfortable and safe experience for all your women’s health needs.',
        services: [
            'Prenatal & Antenatal Care',
            'Normal & High-Risk Deliveries',
            'Infertility Treatments (IUI/IVF Support)',
            'Laparoscopic Hysterectomy & Myomectomy',
            'Menopause Management',
            'PCOS & Hormonal Disorder Clinics'
        ],
        facilities: [
            'Luxury Labor, Delivery, Recovery (LDR) Suites',
            'Level 3 Neonatal ICU (NICU)',
            'Fetal Medicine & Ultrasound Unit',
            '24/7 Obstetrics Emergency Team'
        ],
        whyChooseUs: [
            { title: 'Mother & Child Safety', description: 'Top-tier safety protocols for high-risk pregnancies.' },
            { title: 'Comfort & Privacy', description: 'Private birthing suites designed for a homelike experience.' },
            { title: 'Comprehensive Care', description: 'Full spectrum of services from conception to delivery and beyond.' }
        ]
    },
    {
        slug: 'neurosurgery',
        title: 'Neurosurgery',
        iconName: 'Brain',
        overview: 'The Department of Neurosurgery at Stork Hospital deals with the diagnosis and surgical treatment of disorders of the brain, spine, and peripheral nerves. Our highly skilled neurosurgeons utilize cutting-edge technology to perform complex procedures for tumors, trauma, and vascular disorders. We are dedicated to preserving neurological function and ensuring the best possible quality of life. From minimally invasive spine surgeries to complex craniotomies, our focus is on precision and patient safety.',
        services: [
            'Brain Tumor Surgeries',
            'Spine Surgery (Discectomy, Fusion)',
            'Head Injury & Trauma Managment',
            'Stroke & Aneurysm Coiling/Clipping',
            'Pediatric Neurosurgery',
            'Functional Neurosurgery (Epilepsy, Parkinson’s)'
        ],
        facilities: [
            'Neuro-Navigation Systems',
            'High-Powered Operating Microscopes',
            'Neuro-ICU with ICP Monitoring',
            'Stereotactic Radiosurgery Capabilities'
        ],
        whyChooseUs: [
            { title: 'Precision Technology', description: 'Advanced navigation tools for millimeter-perfect surgery.' },
            { title: '24/7 Neuro Trauma', description: 'Immediate response team for head and spine injuries.' },
            { title: 'Rehabilitation Support', description: 'Integrated neuro-rehab for faster functional recovery.' }
        ]
    },
    {
        slug: 'oncology',
        title: 'Oncology',
        iconName: 'Ribbon',
        overview: 'Stork Hospital’s Oncology Department provides compassionate, comprehensive cancer care including prevention, diagnosis, and treatment. We offer a multidisciplinary approach, combining surgical, medical, and preventative oncology to fight cancer effectively. Our team works closely with patients to develop personalized treatment plans, ensuring support not just physically but emotionally as well. We are committed to evidence-based protocols and the latest therapeutic advancements to improve survival rates and quality of life.',
        services: [
            'Surgical Oncology (Tumor Removal)',
            'Medical Oncology (Chemotherapy, Immunotherapy)',
            'Cancer Screening Programs',
            'Palliative & Supportive Care',
            'Hematology-Oncology',
            'Genetic Counseling'
        ],
        facilities: [
            'Day Care Chemotherapy Suites',
            'Tumor Board for Case Review',
            'Advanced PET-CT Diagnosis Coordination',
            'Dedicated Bio-Safety Cabinets'
        ],
        whyChooseUs: [
            { title: 'Tumor Board Review', description: 'Every case reviewed by a panel of experts for the best plan.' },
            { title: 'Patient-Centric Care', description: 'Chemotherapy suites designed for comfort and privacy.' },
            { title: 'Holistic Support', description: 'Nutritional and psychological counseling for cancer warriors.' }
        ]
    },
    {
        slug: 'orthopedics',
        title: 'Orthopedics',
        iconName: 'Bone',
        overview: 'The Orthopedics Department focuses on the care of the musculoskeletal system, improving mobility and relieving pain. We specialize in joint replacement surgeries, sports medicine, not complex trauma management. Using minimally invasive arthroscopic techniques and durable implants, we aim to get you back on your feet quickly. From fractures to arthritis, our team of orthopedic surgeons and physiotherapists works in unison to ensure complete functional recovery.',
        services: [
            'Total Knee & Hip Replacement',
            'Arthroscopic (Keyhole) Sports Surgery',
            'Complex Trauma & Fracture Fixation',
            'Spine Surgery & Deformity Correction',
            'Pediatric Orthopedics',
            'Rheumatology & Arthritis Care'
        ],
        facilities: [
            'Laminar Airflow Operation Theaters',
            'Digital C-Arm X-Ray Systems',
            'Bone Mineral Densitometry (BMD)',
            'In-house Physiotherapy & Rehab Center'
        ],
        whyChooseUs: [
            { title: 'Joint Preservation', description: 'Focus on saving natural joints whenever possible.' },
            { title: 'Rapid Recovery', description: 'Advanced pain management protocols for early mobilization.' },
            { title: 'Sports Medicine Experts', description: 'Specialized care for athletic injuries and rapid return-to-sport.' }
        ]
    },
    {
        slug: 'pain-management',
        title: 'Pain Management',
        iconName: 'Zap',
        overview: 'Chronic pain can debilitate lives, but our Pain Management department offers hope through advanced interventional therapies. We treat long-standing pain conditions such as back pain, neuralgia, and cancer pain without always resorting to major surgery. Our specialists use nerve blocks, radiofrequency ablation, and medication management to reduce suffering and improve function. We believe that no one should live in pain, and personalized care is our promise.',
        services: [
            'Interventional Nerve Blocks',
            'Radiofrequency Ablation',
            'Epidural Steroid Injections',
            'Cancer Pain Management',
            'Sciatica & Spondylosis Treatment',
            'Palliative Pain Care'
        ],
        facilities: [
            'Fluoroscopy-Guided Procedure Suites',
            'Day Care Pain Clinic',
            'Advanced Neural Stimulation Tech'
        ],
        whyChooseUs: [
            { title: 'Non-Surgical Focus', description: 'Minimally invasive options to avoid major surgery.' },
            { title: 'Immediate Relief', description: 'Many procedures offer significant pain reduction same-day.' },
            { title: 'Chronic Care', description: 'Long-term management strategies for complex pain syndromes.' }
        ]
    },
    {
        slug: 'proctology',
        title: 'Proctology',
        iconName: 'UserCog', // Using a generic user/medical icon for now
        overview: 'Our Department of Proctology specializes in diseases of the colon, rectum, and anus. We offer advanced laser treatments for conditions like piles, fissures, and fistulas, ensuring painless procedures and rapid recovery. Unlike traditional surgery, our modern laser techniques result in minimal bleeding and almost no hospital downtime. We prioritize patient dignity and comfort, treating sensitive conditions with the utmost professionalism and care.',
        services: [
            'Laser Surgery for Piles (Hemorrhoids)',
            'Fissure & Fistula Treatment',
            'Pilonidal Sinus Surgery',
            'Rectal Prolapse Repair',
            'Colorectal Cancer Screening',
            'Constipation Management'
        ],
        facilities: [
            'Advanced Diode Laser Systems',
            'Video Proctoscopy Units',
            'Private Procedure Rooms',
            'Day Care Surgery Facilities'
        ],
        whyChooseUs: [
            { title: 'Painless Laser Tech', description: 'State-of-the-art laser treatment for minimal pain and faster healing.' },
            { title: 'Day Care Procedures', description: 'Go home the same day after most treatments.' },
            { title: 'Expert Proctologists', description: 'Specialized surgeons with vast experience in anorectal disorders.' }
        ]
    },
    {
        slug: 'pulmonology',
        title: 'Pulmonology',
        iconName: 'Wind',
        overview: 'Stork Hospital’s Pulmonology department provides expert care for diseases of the respiratory system. From asthma and COPD to complex lung infections and sleep disorders, our chest physicians use advanced diagnostic tools to help you breathe easier. We also provide critical care support for patients with respiratory failure. Our goal is to improve lung health through accurate diagnosis, medication, rehabilitation, and lifestyle counseling.',
        services: [
            'Asthma & Allergy Management',
            'COPD & Bronchitis Treatment',
            'Interventional Bronchoscopy',
            'Pneumonia & TB Treatment',
            'Sleep Apnea Diagnosis & Therapy',
            'Pulmonary Rehabilitation'
        ],
        facilities: [
            'Endobronchial Ultrasound (EBUS)',
            'Advanced Pulmonary Function Tests (PFT)',
            'Sleep Lab (Polysomnography)',
            'Respiratory ICU'
        ],
        whyChooseUs: [
            { title: 'Advanced Diagnostics', description: 'Cutting-edge tools to diagnose lung conditions accurately.' },
            { title: 'Critical Care Excellence', description: 'Expert management of acute respiratory failure.' },
            { title: 'Breath Clinics', description: 'Specialized clinics for asthma and smoking cessation.' }
        ]
    },
    {
        slug: 'urology',
        title: 'Urology',
        iconName: 'Droplet',
        overview: 'The Urology department offers advanced medical and surgical care for diseases of the urinary tract and male reproductive system. We treat kidney stones, prostate issues, and urinary infections using the latest laser and lithotripsy technologies. Our team is skilled in minimally invasive endoscopic procedures, ensuring patient comfort and efficacy. Whether it is men’s health or stone management, we provide confidential, expert care.',
        services: [
            'Laser Kidney Stone Removal (RIRS/URSL)',
            'Prostate Surgery (TURP/Laser)',
            'Urinary Tract Infection Treatment',
            'Uro-Oncology (Kidney/Bladder Cancer)',
            'Male Infertility & Andrology',
            'Pediatric Urology'
        ],
        facilities: [
            'Holmium Laser for Stones',
            'Urodynamics Laboratory',
            'ESWL (Lithotripsy) Unit',
            'Advanced Endourology Suite'
        ],
        whyChooseUs: [
            { title: 'Stone Specialists', description: 'High success rates in non-invasive kidney stone removal.' },
            { title: 'Minimal Invasiveness', description: 'Endoscopic procedures utilizing natural urinary passages.' },
            { title: 'Men’s Health Focus', description: 'Dedicated and private consultation for sensitive issues.' }
        ]
    },
    {
        slug: 'vascular-surgery',
        title: 'Vascular Surgery',
        iconName: 'Activity', // Reuse Activity or heart related
        overview: 'Our Vascular Surgery department deals with disorders of the arteries and veins outside the heart and brain. We specialize in treating varicose veins, deep vein thrombosis (DVT), and peripheral arterial disease. Utilizing both open surgery and endovascular (catheter-based) techniques, we restore blood flow and prevent serious complications like gangrene. Our focus is on limb salvage and improving circulation for a healthier active life.',
        services: [
            'Varicose Veins Laser Treatment (EVLT)',
            'Deep Vein Thrombosis (DVT) Management',
            'Peripheral Bypass Surgery',
            'Dialysis Access (AV Fistula) Creation',
            'Angioplasty & Stenting',
            'Diabetic Foot Care'
        ],
        facilities: [
            'Hybrid Cath Lab',
            'Vascular Doppler Ultrasound',
            'Diabetic Foot Clinic',
            'Lymphedema Therapy Unit'
        ],
        whyChooseUs: [
            { title: 'Limb Salvage Experts', description: 'Dedicated to preventing amputations through revascularization.' },
            { title: 'Minimally Invasive', description: 'Laser and catheter treatments for faster recovery.' },
            { title: 'Comprehensive Vascular Care', description: 'From cosmetic vein treatment to complex arterial bypasses.' }
        ]
    }
];
