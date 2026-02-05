import { NextRequest, NextResponse } from 'next/server';

// Perplexity AI Configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const { name, composition } = await request.json();

    if (!name || !composition) {
      return NextResponse.json(
        { error: 'Product name and composition are required' },
        { status: 400 }
      );
    }

    // Use Perplexity AI if API key is available, otherwise use simulation
    let generatedData;
    
    console.log('🔍 Checking Perplexity API Key:', PERPLEXITY_API_KEY ? '✅ Found' : '❌ Not Found');
    
    if (PERPLEXITY_API_KEY) {
      console.log('🤖 Using Perplexity AI with web search for:', name);
      generatedData = await generateWithPerplexity(name, composition);
    } else {
      console.warn('⚠️  PERPLEXITY_API_KEY not found. Using simulated generation. Add your API key to .env.local for real AI-powered search.');
      generatedData = await simulateAIGeneration(name, composition);
    }

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error('❌ AI generation error:', error);
    // Fallback to simulation if API fails
    const generatedData = await simulateAIGeneration('Unknown Product', 'Unknown Composition');
    return NextResponse.json(generatedData);
  }
}

async function generateWithPerplexity(name: string, composition: string) {
  const prompt = `You are a pharmaceutical expert. Research and provide comprehensive information about this medication in simple, easy-to-understand language for general patients (not medical professionals).

Product Name: ${name}
Composition: ${composition}

Please search the web and provide ACCURATE, FACTUAL information in this EXACT JSON format:

{
  "shortDescription": "One simple sentence describing what this medicine is for",
  "manufacturer": "Elite Drug",
  "features": ["Easy to use", "Proven effectiveness", "Well-tolerated", "Quality tested"],
  "details": {
    "about": "A simple 2-3 paragraph explanation of what this medicine is, what it contains, and what each ingredient does in plain English. Explain how each ingredient helps.",
    "uses": [
      {"title": "Primary Use", "description": "Main condition this treats in simple terms"},
      {"title": "Additional Benefits", "description": "Other benefits in everyday language"},
      {"title": "Prevention", "description": "How it helps prevent symptoms from getting worse"}
    ],
    "benefits": [
      "6 clear benefits patients will notice",
      "Use simple language",
      "Focus on practical effects",
      "Include things like 'fast relief' or 'convenient dosing'",
      "Mention safety and effectiveness",
      "Keep it relatable"
    ],
    "howItWorks": "Explain in simple terms how each ingredient in the composition works. Use plain English, short sentences. Example: 'Ingredient A blocks histamine which causes sneezing and itching. Ingredient B reduces inflammation in airways making breathing easier.' Break down each ingredient clearly.",
    "directions": [
      "Take as prescribed by doctor",
      "Typical dosage instructions",
      "With or without food",
      "Best time to take",
      "What to do if you miss a dose",
      "How long to continue"
    ],
    "storage": [
      "Room temperature storage",
      "Keep in original container",
      "Protect from moisture/light",
      "Keep away from children",
      "Check expiry date"
    ],
    "warnings": [
      "Use under medical supervision",
      "Tell doctor about other medicines",
      "Report side effects",
      "Pregnancy/breastfeeding caution",
      "Avoid alcohol if applicable",
      "Driving/machinery caution if relevant",
      "Regular checkups if needed",
      "Don't share medicine"
    ],
    "glossary": {
      "title": "Understanding Your Medicine",
      "content": "Simple explanation of what each ingredient in the composition does, in everyday language that anyone can understand"
    }
  }
}

CRITICAL INSTRUCTIONS:
- Search the web for ACCURATE medical information about ${composition}
- Use SIMPLE language that any patient can understand
- Explain what each ingredient does in plain English
- Be specific about this exact medication
- Return ONLY valid JSON, no additional text
- Make it conversational and friendly
- Focus on what patients need to know`;

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: 'You are a pharmaceutical expert that researches medications and explains them in simple, patient-friendly language. Always search the web for accurate information. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more accurate, factual responses
      max_tokens: 6000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Perplexity API error:', error);
    throw new Error(`Perplexity API failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Extract JSON from response (Perplexity might wrap it in markdown)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('No JSON found in Perplexity response:', content);
    throw new Error('Invalid response format from Perplexity');
  }

  const generatedData = JSON.parse(jsonMatch[0]);
  return generatedData;
}

// Fallback simulation when API key is not available
async function simulateAIGeneration(name: string, composition: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Parse composition to extract active ingredients
  const ingredients = composition.split(/[+,]/).map(i => i.trim());
  const primaryIngredient = ingredients[0];

  // Create simple, user-friendly descriptions for each ingredient
  const ingredientExplanations = ingredients.map(ingredient => {
    const cleanName = ingredient.replace(/\d+mg|\d+mcg|\d+IU/gi, '').trim();
    return `${ingredient} - helps treat the condition effectively`;
  }).join(', and ');

  return {
    shortDescription: `A combination medication containing ${composition} for effective treatment`,
    manufacturer: 'Elite Drug',
    features: [
      'Easy to use',
      'Proven effectiveness',
      'Well-tolerated by most patients',
      'Quality tested',
    ],
    details: {
      about: `${name} is a combination medication that contains ${composition}.\n\n${ingredients.length > 1 ? `This medicine combines ${ingredients.length} active ingredients that work together:\n\n${ingredients.map((ing, idx) => {
        const cleanName = ing.replace(/\d+mg|\d+mcg|\d+IU/gi, '').trim();
        return `${idx + 1}. ${ing} - This ingredient helps by targeting specific symptoms and providing relief.`;
      }).join('\n\n')}` : `${primaryIngredient} is the active ingredient that provides therapeutic benefits.`}\n\nThis combination is effective for treating various symptoms and is commonly prescribed by doctors for managing the condition.`,
      
      uses: [
        {
          title: 'Primary Use',
          description: `${name} is mainly used for treating conditions that respond well to ${primaryIngredient}. It helps relieve symptoms and improve your overall comfort.`
        },
        {
          title: 'Additional Benefits',
          description: `This medicine may also help with related symptoms and can support your body's natural healing process when used as directed.`
        },
        {
          title: 'Prevention',
          description: `When taken regularly as prescribed, ${name} may help prevent symptoms from getting worse and keep your condition under control.`
        },
      ],
      
      benefits: [
        'Fast-acting relief from symptoms',
        'Long-lasting effects throughout the day',
        'Convenient once or twice daily dosing',
        'Well-researched and proven safe',
        'Helps you feel better and resume normal activities',
        'Trusted by doctors and patients',
      ],
      
      howItWorks: `${name} works by using ${ingredients.length > 1 ? 'a combination of active ingredients' : 'its active ingredient'} to help your body.\n\n${ingredients.length > 1 ? `Here's how each ingredient helps:\n\n${ingredients.map((ing, idx) => {
        const cleanName = ing.replace(/\d+mg|\d+mcg|\d+IU/gi, '').trim();
        return `• ${ing}: Works to reduce symptoms and provide relief`;
      }).join('\n')}` : `${primaryIngredient} works by targeting the source of your symptoms and helping your body heal.`}\n\nThe ingredients are carefully balanced to work together for the best results while keeping side effects minimal.`,
      
      directions: [
        'Take this medicine exactly as your doctor prescribed',
        'Follow the dosage instructions on the label',
        'Can usually be taken with or without food (check with your doctor)',
        'Swallow tablets whole with water - do not crush or chew',
        'Try to take it at the same time each day',
        'Do not stop taking this medicine suddenly without talking to your doctor',
        'If you miss a dose, take it as soon as you remember (unless it\'s almost time for the next dose)',
      ],
      
      storage: [
        'Store at room temperature (below 25°C or 77°F)',
        'Keep in the original bottle or packaging',
        'Store in a dry place away from moisture',
        'Keep away from direct sunlight and heat',
        'Keep out of reach of children',
        'Do not use after the expiration date printed on the package',
      ],
      
      warnings: [
        'Only use this medicine if prescribed by your doctor',
        'Tell your doctor about all other medicines you are taking',
        'Report any unusual side effects to your doctor right away',
        'Not safe during pregnancy or breastfeeding unless your doctor says it\'s okay',
        'Avoid drinking alcohol while taking this medicine',
        'May cause drowsiness - be careful when driving or using machinery',
        'Your doctor may want to check on you regularly while you take this',
        'Do not share this medicine with others',
      ],
      
      glossary: {
        title: 'Understanding Your Medicine',
        content: `${name} contains ${composition}. ${ingredients.length > 1 ? 'Here\'s what each ingredient does in simple terms:\n\n' + ingredients.map((ing, idx) => {
          const cleanName = ing.replace(/\d+mg|\d+mcg|\d+IU/gi, '').trim();
          return `• ${ing}: This ingredient helps your body by providing relief from symptoms and supporting healing.`;
        }).join('\n\n') : `${primaryIngredient} is designed to help your body fight the condition and feel better.`}\n\nThe medicine is carefully formulated to be both safe and effective when used as directed by your healthcare provider.`,
      },
    },
  };
}
