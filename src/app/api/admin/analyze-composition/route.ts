import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { composition, productName, name } = body;
    
    // Use name if productName is not provided
    const actualProductName = productName || name;

    // Validate required fields
    if (!actualProductName || !composition) {
      console.error('❌ Missing required fields:', { actualProductName, composition });
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: 'Both product name and composition are required',
          received: { name: actualProductName, composition }
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error('❌ PERPLEXITY_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Perplexity API key not configured' },
        { status: 500 }
      );
    }

    console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');
    console.log('🔍 Analyzing composition for:', actualProductName);
    console.log('📋 Composition:', composition);
    console.log('🤖 Using model: sonar-pro');
    console.log('📊 Max tokens: 3500');

    const prompt = `You are a senior pharmaceutical consultant. Analyze this medicine and provide detailed information.

Product: ${actualProductName}
Composition: ${composition}

Return ONLY valid JSON (no markdown, no code blocks). ALL fields must be filled:

{
  "category": "Select ONE: Diabetes Care, Cardiovascular, Gastro & Digestive, Liver Care, Bone & Joint Health, Kidney Care, Derma Care, Respiratory Care, Pain Management, Women's Health, Vitamin Supplements, Neuropathic Pain, Antibiotics",
  
  "shortDescription": "Write 3-4 sentences (80-100 words): therapeutic class, primary uses, mechanism, target patients.",
  
  "about": "Write 4-5 paragraphs (400-450 words total):
Para 1 (90w): Introduction, therapeutic class
Para 2 (90w): Each ingredient - name, role
Para 3 (90w): Drug family, mechanism
Para 4 (90w): Pharmacokinetics basics
Para 5 (90w): Applications and safety",
  
  "isPrescription": true/false,
  
  "consumeType": "Select ONE: Tablet, Capsule, Syrup, Injection, Powder, Drops, Cream, Ointment, Gel",
  
  "usage": "Write 150-180 words:
DOSAGE: Standard dose, timing
SCHEDULE: Frequency
DURATION: Treatment length
SPECIAL POPULATIONS: Key adjustments
MISSED DOSE: Brief instructions
OVERDOSE: Main symptoms",
  
  "sideEffects": "Write 120-150 words:
VERY COMMON (>10%): 3-4 effects with management
COMMON (1-10%): 4-5 effects
UNCOMMON (0.1-1%): 2-3 effects
RARE (<0.1%): 1-2 serious events",
  
  "precautions": "Write 180-220 words:
CONTRAINDICATIONS: 4-5 key conditions
DRUG INTERACTIONS: 6-8 main interactions
DISEASE PRECAUTIONS: 4-5 conditions
PREGNANCY: Category and basic guidance
LIFESTYLE: Key points
MONITORING: Main tests
STORAGE: Basic requirements",
  
  "benefits": "List 10-12 benefits (120-140 words), brief format:
'Increases hemoglobin 1-2 g/dL in 6-8 weeks'
'Reduces fatigue within 2-3 weeks'
Include main outcomes and timeframes.",
  
  "howItWorks": "Write 200-250 words:
MOLECULAR (80w): Key targets and mechanism
TISSUE EFFECTS (50w): Organs affected
SYSTEMIC (50w): Body response
TIMELINE (30w): Absorption to peak effect"
}

CRITICAL: Return ONLY the JSON object. Start with { and end with }. NO code blocks. Fill ALL fields. Keep content CONCISE to fit in response limit.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [
            {
              role: 'system',
              content: 'You are a pharmaceutical expert. You MUST respond with ONLY valid JSON. Do NOT include any markdown formatting, code blocks, or explanatory text. Start your response with { and end with }. Return pure JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 3500,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeout);

      clearTimeout(timeout);

      console.log('📡 API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Perplexity API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          productName: actualProductName,
          composition: composition
        });
        
        let errorMessage = 'Perplexity API request failed';
        let errorDetails = `Status: ${response.status} - ${response.statusText}`;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
          errorDetails = JSON.stringify(errorJson, null, 2);
        } catch (e) {
          // Text response, not JSON
          if (errorText) {
            errorDetails = errorText.substring(0, 500);
          }
        }
        
        // Return error instead of fallback so user knows it failed
        return NextResponse.json(
          { 
            error: errorMessage,
            details: errorDetails,
            message: 'API request failed. Check console for details.',
            status: response.status
          },
          { status: 500 }
        );
      }

      const data = await response.json();
      console.log('✅ API Response received');
      console.log('📝 Response has choices:', !!data.choices);
      
      const aiResponse = data.choices[0].message.content;
      console.log('📄 AI Response length:', aiResponse.length, 'characters');
      console.log('🔍 First 200 chars:', aiResponse.substring(0, 200));
      console.log('🔍 Last 200 chars:', aiResponse.substring(Math.max(0, aiResponse.length - 200)));

      // Check if response seems complete (should end with })
      const trimmed = aiResponse.trim();
      if (!trimmed.endsWith('}')) {
        console.error('⚠️ Response appears truncated - does not end with }');
        console.error('Last 500 chars:', trimmed.substring(Math.max(0, trimmed.length - 500)));
        return NextResponse.json(
          { 
            error: 'AI response was truncated',
            details: 'The AI response exceeded the token limit. Response length: ' + aiResponse.length + ' characters',
            suggestion: 'Try again or simplify the product composition'
          },
          { status: 500 }
        );
      }

      // Parse the JSON response
      let parsedData;
      try {
        // Clean the response - remove markdown code blocks if present
        let cleanedResponse = aiResponse.trim();
        
        // Remove markdown code blocks
        cleanedResponse = cleanedResponse.replace(/```json\s*/gi, '');
        cleanedResponse = cleanedResponse.replace(/```\s*/g, '');
        
        // Try to extract JSON from the response
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(cleanedResponse);
        }
        
        console.log('✅ JSON parsed successfully');
      } catch (parseError: any) {
        console.error('❌ Failed to parse AI response');
        console.error('Parse error:', parseError.message);
        console.error('AI Response:', aiResponse);
        return NextResponse.json(
          { 
            error: 'Invalid JSON format from AI',
            details: parseError.message,
            rawResponse: aiResponse.substring(0, 1000) + (aiResponse.length > 1000 ? '...' : '')
          },
          { status: 500 }
        );
      }

      console.log('✅ Successfully analyzed composition');
      console.log('📦 Parsed data keys:', Object.keys(parsedData));
      console.log('📝 About length:', parsedData.about?.length || 0, 'chars');
      console.log('📝 Usage length:', parsedData.usage?.length || 0, 'chars');
      console.log('📝 Benefits length:', parsedData.benefits?.length || 0, 'chars');
      console.log('📝 Side Effects length:', parsedData.sideEffects?.length || 0, 'chars');
      console.log('📝 Precautions length:', parsedData.precautions?.length || 0, 'chars');
      console.log('📝 How It Works length:', parsedData.howItWorks?.length || 0, 'chars');
      
      return NextResponse.json({
        success: true,
        ...parsedData,
      });

    } catch (fetchError: any) {
      clearTimeout(timeout);
      
      if (fetchError.name === 'AbortError') {
        console.error('❌ Request timeout after 60 seconds');
        return NextResponse.json(
          { 
            error: 'Request timeout',
            details: 'The AI took too long to respond. Please try again.',
            message: 'Request timed out after 60 seconds'
          },
          { status: 504 }
        );
      }
      
      console.error('❌ Fetch Error:', {
        message: fetchError.message,
        stack: fetchError.stack
      });
      return NextResponse.json(
        { 
          error: fetchError.message || 'Failed to connect to AI service',
          details: 'Network error or service unavailable',
          message: 'Failed to fetch AI analysis'
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('❌ Perplexity AI Error:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json(
      { 
        error: error.message || 'Failed to analyze composition',
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}
