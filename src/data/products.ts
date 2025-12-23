import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'telmiget-ln',
    name: 'Telmiget LN Tablet',
    shortDescription: 'Advanced medication for hypertension and heart-related chest pain management with dual action formula.',
    price: 59,
    mrp: 59,
    category: 'Cardiovascular',
    isPrescription: true,
    composition: 'Cilnidipine 10mg + Telmisartan 40mg',
    manufacturer: 'LIVIDUS PHARMACEUTICALS PVT LTD',
    consumeType: 'ORAL',
    expiryDate: '23-12-2026',
    features: [
      'Blood pressure control',
      'Cardiovascular protection',
      'Kidney protection',
    ],
    images: {
      main: '/images/products/telmiget-ln-main.svg',
      gallery: [
        '/images/products/telmiget-ln-1.svg',
        '/images/products/telmiget-ln-2.svg',
        '/images/products/telmiget-ln-3.svg',
      ],
    },
    details: {
      about: `Telmiget LN Tablet is used in the treatment of hypertension (high blood pressure) and heart-related chest pain (angina). Hypertension is a lifelong or chronic condition in which the force exerted by the blood against the artery walls becomes so high that it leads to heart disease. Angina is chest pain caused by reduced blood flow to the heart.

Telmiget LN Tablet is composed of Cilnidipine and Telmisartan. This medicine, together, helps lower elevated blood pressure and the workload placed on the heart. It also blocks the action of certain substances responsible for tightening the blood vessels. Thus, it reduces the chance of having a heart attack or stroke in the future.

Not everyone who is taking Telmiget LN Tablet will get these side effects. Sometimes, Telmiget LN Tablet may cause common side effects like a sore back, diarrhoea, a congested feeling, a spinning sensation, and soreness in the sinus. Most of these side effects of Telmiget LN Tablet do not require medical attention and gradually resolve on their own over time. However, if the side effects persist, contact your doctor.

You can take Telmiget LN Tablet with food or without food. It should be swallowed as a whole with a glass of water. Do not chew, bite, crush, or break it. Your doctor will advise you on how often you should take your tablets based on your medical condition. It is always important to complete your treatment course for better results.

Inform your doctor if you are allergic to Telmiget LN Tablet. Patients suffering from kidney problems may be required to undergo regular blood creatinine and potassium levels tests, as Telmiget LN Tablet affects electrolyte levels in our body, which can be monitored. Don't stop taking Telmiget LN Tablet without your doctor's advice. Suddenly stopping the use of Telmiget LN Tablet may cause changes in your heart rhythm and blood pressure, cause chest pain, or a heart attack. Your doctor will gradually lower your dose to help prevent these symptoms. Drinking plenty of fluids while taking this medicine is advised to overcome dry mouth and extreme thirst.`,
      uses: [
        {
          title: 'Hypertension Management',
          description: 'Telmiget LN Tablet is used to manage hypertension (high blood pressure), by reducing the risk of heart-related issues and complications.',
        },
        {
          title: 'Cardiovascular Protection',
          description: 'Telmiget LN Tablet provides cardiovascular protection by lowering blood pressure, reducing the risk of heart attacks and strokes.',
        },
        {
          title: 'Diabetic Patient Care',
          description: 'Telmiget LN Tablet can also provide diabetic care, by protecting kidney function and controlling blood pressure levels effectively.',
        },
        {
          title: 'Improving Blood Circulation',
          description: 'Telmiget LN Tablet improves blood circulation, by benefiting various organ functions and overall health.',
        },
        {
          title: 'Reduced Sympathetic Activity',
          description: 'Telmiget LN Tablet reduces sympathetic activity, making it suitable for patients with tachycardia (rapid heart rate) by preventing excessive nervous system activation.',
        },
        {
          title: 'Kidney Protection',
          description: 'Telmiget LN Tablet helps to protect kidney function, particularly in patients with hypertension and diabetes.',
        },
      ],
      benefits: [
        'Telmiget LN Tablet is composed of Cilnidipine and Telmisartan, prescribed to treat hypertension.',
        'Cilnidipine blocks the activities of the calcium channels present in the heart\'s blood vessels. As a result, the blood vessels widen, and supply to the heart increases, lowering the blood pressure and the workload on the heart.',
        'Telmisartan works by blocking the action of certain substances responsible for tightening the blood vessels. It allows the blood to flow more smoothly and makes the heart more efficient at pumping blood.',
        'This medicine helps reduce the chance of having a heart attack or stroke in the future.',
      ],
      howItWorks: 'Telmiget LN Tablet is composed of Cilnidipine and Telmisartan, prescribed to treat hypertension. Cilnidipine blocks the activities of the calcium channels present in the blood vessels of the heart. As a result, the blood vessels widen, and supply to the heart increases, lowering the elevated blood pressure and the workload placed on the heart. Telmisartan works by blocking the action of certain substances that are responsible for tightening the blood vessels. It allows the blood to flow more smoothly and makes the heart more efficient at pumping blood throughout the body. Thus, it reduces the chance of having any heart attack or stroke in the future.',
      directions: [
        'Telmiget LN Tablet can be taken with or without food, as advised by your doctor.',
        'It is usually taken once daily at the same time each day or as prescribed by your doctor.',
        'Swallow Telmiget LN Tablet as a whole with a glass of water.',
        'Do not crush, chew, or break it.',
      ],
      storage: [
        'Store in a cool and dry place away from sunlight.',
        'Keep out of sight and reach of children.',
        'Non cold chain - To be stored in cool places at 10°C to 25°C or below 30°C.',
      ],
      warnings: [
        'Avoid taking Telmiget LN Tablet if you are allergic to any of its components.',
        'This medicine should be taken with caution in patients with congestive heart failure, liver disease, peripheral oedema (swelling of hands/legs), cardiogenic shock (when heart suddenly can not pump sufficient blood), recent MI (myocardial infarction) or acute unstable angina (chest pain), severe aortic stenosis (when heart valves become diseased).',
        'You should monitor your blood pressure regularly to make sure the Telmiget LN Tablet is working efficiently.',
        'Prolonged intake of Telmiget LN Tablet can lead to a lowering of blood pressure (hypotension).',
        'Don\'t stop taking Telmiget LN Tablet without consulting your doctor. Suddenly stopping the use of Telmiget LN Tablet may cause changes in your heart rhythm and blood pressure, cause chest pain, or a heart attack. Your doctor will gradually lower your dose to help prevent these symptoms.',
      ],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '2',
    slug: 'diagnostic-imaging',
    name: 'Diagnostic Imaging System',
    shortDescription: 'Advanced imaging technology providing crystal-clear diagnostic images with reduced radiation exposure.',
    price: 0,
    mrp: 0,
    category: 'Diagnostic Equipment',
    isPrescription: false,
    features: [
      'High-resolution imaging',
      'AI-powered analysis',
      'Cloud integration',
    ],
    images: {
      main: '/images/products/diagnostic-main.svg',
      gallery: [],
    },
    details: {
      about: 'State-of-the-art diagnostic imaging system designed for medical professionals.',
      uses: [],
      benefits: [],
      howItWorks: 'State-of-the-art diagnostic imaging system designed for medical professionals.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '3',
    slug: 'paracetamol-500',
    name: 'Paracetamol 500mg Tablet',
    shortDescription: 'Effective pain relief and fever reducer for adults and children. Fast-acting formula for quick relief.',
    price: 25,
    mrp: 25,
    category: 'Pain Relief',
    isPrescription: false,
    features: [
      'Reduces fever quickly',
      'Relieves mild to moderate pain',
      'Safe for most age groups',
    ],
    images: {
      main: '/images/products/paracetamol-main.svg',
      gallery: [
        '/images/products/paracetamol-1.svg',
        '/images/products/paracetamol-2.svg',
        '/images/products/paracetamol-3.svg',
      ],
    },
    details: {
      about: 'Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce high temperature.',
      uses: [],
      benefits: [],
      howItWorks: 'Paracetamol works by blocking the production of certain chemical messengers in the brain that cause pain and fever.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '4',
    slug: 'amoxicillin-capsules',
    name: 'Amoxicillin 500mg Capsules',
    shortDescription: 'Broad-spectrum antibiotic for treating bacterial infections. Effective against respiratory tract infections.',
    price: 120,
    mrp: 120,
    category: 'Antibiotics',
    isPrescription: true,
    features: [
      'Treats bacterial infections',
      'Broad-spectrum coverage',
      'Well-tolerated formula',
    ],
    images: {
      main: '/images/products/amoxicillin-main.svg',
      gallery: [
        '/images/products/amoxicillin-1.svg',
        '/images/products/amoxicillin-2.svg',
        '/images/products/amoxicillin-3.svg',
      ],
    },
    details: {
      about: 'Amoxicillin is a penicillin antibiotic that fights bacteria in the body.',
      uses: [],
      benefits: [],
      howItWorks: 'Amoxicillin works by stopping the growth of bacteria by preventing them from forming protective cell walls.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '5',
    slug: 'vitamin-d3-tablets',
    name: 'Vitamin D3 1000 IU Tablets',
    shortDescription: 'Essential vitamin supplement for bone health and immune system support. Daily wellness supplement.',
    price: 180,
    mrp: 180,
    category: 'Supplements',
    isPrescription: false,
    features: [
      'Supports bone health',
      'Boosts immune system',
      'Improves calcium absorption',
    ],
    images: {
      main: '/images/products/vitamin-d3-main.svg',
      gallery: [
        '/images/products/vitamin-d3-1.svg',
        '/images/products/vitamin-d3-2.svg',
        '/images/products/vitamin-d3-3.svg',
      ],
    },
    details: {
      about: 'Vitamin D3 helps regulate calcium and phosphate in the body, essential for healthy bones and teeth.',
      uses: [],
      benefits: [],
      howItWorks: 'Vitamin D3 works by helping the body absorb calcium and phosphate from food, which are essential for maintaining healthy bones and teeth.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '6',
    slug: 'omeprazole-capsules',
    name: 'Omeprazole 20mg Capsules',
    shortDescription: 'Proton pump inhibitor for treating acid reflux and heartburn. Long-lasting relief from stomach acid.',
    price: 85,
    mrp: 85,
    category: 'Gastrointestinal',
    isPrescription: true,
    features: [
      'Reduces stomach acid',
      'Treats acid reflux',
      'Heals stomach ulcers',
    ],
    images: {
      main: '/images/products/omeprazole-main.svg',
      gallery: [
        '/images/products/omeprazole-1.svg',
        '/images/products/omeprazole-2.svg',
        '/images/products/omeprazole-3.svg',
      ],
    },
    details: {
      about: 'Omeprazole reduces the amount of acid your stomach makes and is used for heartburn and acid reflux.',
      uses: [],
      benefits: [],
      howItWorks: 'Omeprazole works by blocking the proton pumps in the stomach that produce acid, thereby reducing stomach acid production.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '7',
    slug: 'metformin-tablets',
    name: 'Metformin 500mg Tablets',
    shortDescription: 'First-line medication for type 2 diabetes management. Controls blood sugar levels effectively.',
    price: 95,
    mrp: 95,
    category: 'Diabetes Care',
    isPrescription: true,
    features: [
      'Controls blood sugar',
      'Improves insulin sensitivity',
      'Supports weight management',
    ],
    images: {
      main: '/images/products/metformin-main.svg',
      gallery: [
        '/images/products/metformin-1.svg',
        '/images/products/metformin-2.svg',
        '/images/products/metformin-3.svg',
      ],
    },
    details: {
      about: 'Metformin is an oral diabetes medicine that helps control blood sugar levels.',
      uses: [],
      benefits: [],
      howItWorks: 'Metformin works by decreasing glucose production in the liver, reducing sugar absorption in the intestines, and improving insulin sensitivity.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '8',
    slug: 'cetirizine-tablets',
    name: 'Cetirizine 10mg Tablets',
    shortDescription: 'Antihistamine for relief from allergies and hay fever. Non-drowsy formula for daytime use.',
    price: 45,
    mrp: 45,
    category: 'Allergy Relief',
    isPrescription: false,
    features: [
      'Relieves allergy symptoms',
      'Non-drowsy formula',
      '24-hour protection',
    ],
    images: {
      main: '/images/products/cetirizine-main.svg',
      gallery: [
        '/images/products/cetirizine-1.svg',
        '/images/products/cetirizine-2.svg',
        '/images/products/cetirizine-3.svg',
      ],
    },
    details: {
      about: 'Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, and sneezing.',
      uses: [],
      benefits: [],
      howItWorks: 'Cetirizine works by blocking histamine, a substance in the body that causes allergic symptoms like itching, swelling, and runny nose.',
      directions: [],
      storage: [],
      warnings: [],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
  {
    id: '9',
    slug: 'biotin-methylfolate-combo',
    name: 'Her 9',
    shortDescription: 'Essential nutrient combination for treating nutritional deficiencies and supporting overall health, energy, and nerve function.',
    price: 257,
    mrp: 257,
    category: 'Nutritional Supplements',
    isPrescription: false,
    composition: 'Biotin + L-Methyl Folate Calcium + Methylcobalamin + Pyridoxal-5-phosphate',
    manufacturer: 'Eningor Pharmaceuticals',
    consumeType: 'ORAL',
    expiryDate: '12-2026',
    features: [
      'Supports energy production',
      'Promotes healthy hair and skin',
      'Aids nerve and brain health',
    ],
    images: {
      main: '/images/products/biotin-combo-main.svg',
      gallery: [
        '/images/products/biotin-combo-1.svg',
        '/images/products/biotin-combo-2.svg',
        '/images/products/biotin-combo-3.svg',
      ],
    },
    details: {
      about: `Biotin + L-Methyl Folate Calcium + Methylcobalamin + Pyridoxal-5-phosphate is used in the treatment of nutritional deficiencies.

This is a combination of essential nutrients used to support overall health by addressing common vitamin deficiencies. Biotin helps convert food into energy and supports healthy hair and skin. L-methyl folate calcium assists in the production of red blood cells and supports brain and nerve health. Methylcobalamin, a form of vitamin B12, is important for maintaining nerve function and producing healthy blood. Pyridoxal-5-phosphate, the active form of vitamin B6, aids in metabolism and supports nerve communication.

Together, these ingredients improve energy levels, promote nerve and brain health, and help fill nutritional gaps. Most side effects do not require any medical attention and disappear as your body adjusts to the medicine. Consult your doctor if they persist or if you're worried about them.`,
      uses: [
        {
          title: 'Nutritional Deficiency Treatment',
          description: 'Used to treat and prevent various vitamin deficiencies, particularly B vitamins and biotin deficiencies that can affect overall health.',
        },
        {
          title: 'Energy Production Support',
          description: 'Helps convert food into usable energy, reducing fatigue and improving overall vitality and stamina.',
        },
        {
          title: 'Nerve and Brain Health',
          description: 'Supports nerve function and brain health through essential B vitamins, improving cognitive function and nerve communication.',
        },
        {
          title: 'Red Blood Cell Production',
          description: 'Assists in the production of healthy red blood cells, preventing anemia and improving oxygen transport throughout the body.',
        },
        {
          title: 'Hair and Skin Health',
          description: 'Promotes healthy hair growth and skin condition through biotin supplementation.',
        },
      ],
      benefits: [
        'Biotin helps convert food into energy and supports healthy hair and skin.',
        'L-methyl folate calcium assists in the production of red blood cells and supports brain and nerve health.',
        'Methylcobalamin (vitamin B12) maintains nerve function and produces healthy blood.',
        'Pyridoxal-5-phosphate (active vitamin B6) aids in metabolism and supports nerve communication.',
        'Together, these ingredients improve energy levels, promote nerve and brain health, and help fill nutritional gaps.',
      ],
      howItWorks: 'Biotin + L-Methyl Folate Calcium + Methylcobalamin + Pyridoxal-5-phosphate is a combination of essential nutrients that work synergistically. Biotin helps convert food into energy and supports healthy hair and skin. L-methyl folate calcium assists in the production of red blood cells and supports brain and nerve health. Methylcobalamin, a form of vitamin B12, is important for maintaining nerve function and producing healthy blood. Pyridoxal-5-phosphate, the active form of vitamin B6, aids in metabolism and supports nerve communication. Together, these ingredients improve energy levels, promote nerve and brain health, and help fill nutritional gaps.',
      directions: [
        'It can be taken with or without food, but maintaining a consistent routine can help with better absorption.',
        'Take as directed by your doctor or as per the recommended dosage on the package.',
        'Swallow the tablet/capsule whole with water.',
        'Do not exceed the recommended dosage.',
      ],
      storage: [
        'Store in a cool, dry place, away from direct sunlight and moisture.',
        'Keep out of reach of children.',
        'Store at room temperature (below 30°C).',
      ],
      warnings: [
        'Do not share this supplement with others, even if they have similar symptoms, as dosage and needs may vary.',
        'If you have a fever or any serious illness, consult your doctor before taking this supplement.',
        'Consult your doctor if you are pregnant, planning to conceive, or breastfeeding.',
        'If you experience any unusual symptoms or side effects persist, contact your healthcare provider.',
        'This supplement is not a substitute for a balanced diet and healthy lifestyle.',
        'Most side effects do not require any medical attention and disappear as your body adjusts to the medicine.',
        'Generally well-tolerated when taken as directed.',
        'Mild gastrointestinal discomfort may occur in some cases.',
        'A balanced diet and healthy lifestyle can enhance the effectiveness in managing nutritional deficiencies.',
        'Maintain a consistent routine for taking the supplement to ensure better absorption.',
      ],
      glossary: {
        title: 'High Blood Pressure (Hypertension)',
        content: `It is the measurement of the force that our heart uses to pump blood to all parts of the body. Hypertension is a chronic condition when blood pressure is too high. This condition can lead to hardened arteries (blood vessels), decreasing the blood and oxygen flow to the heart. Raised blood pressure can cause chest pain (angina) and heart attack (when the blood supply to the heart is blocked). Additionally, high blood pressure also causes brain damage (stroke) and kidney failure.

High blood pressure can be diagnosed with the help of a blood pressure monitor or sphygmomanometer. Systolic pressure is the pressure when the heart pumps blood out. On the other hand, diastolic pressure is the pressure when your heart is at the resting stage between heartbeats. If your blood pressure is 140/90 mm of Hg, it means the systolic pressure is 140 mm of Hg, and the diastolic pressure is 90 mm of Hg. Ideal blood pressure should be between 90/60 mmHg and 120/80 mmHg.`,
      },
    },
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getAllProductSlugs = (): string[] => {
  return products.map(product => product.slug);
};
