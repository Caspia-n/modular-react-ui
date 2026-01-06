import { NextRequest, NextResponse } from 'next/server';
import { getLlamaClient } from '../load-model/route';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, options = {} } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'prompt is required' },
        { status: 400 }
      );
    }

    const client = getLlamaClient();
    if (!client || !client.isReady()) {
      return NextResponse.json(
        { error: 'Model not loaded. Please load a model first.' },
        { status: 400 }
      );
    }

    const result = await client.infer(prompt, options);

    return NextResponse.json({ 
      success: true, 
      result,
      isReady: client.isReady()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        isReady: false
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = getLlamaClient();
    
    return NextResponse.json({ 
      isReady: client?.isReady() || false,
      hasClient: !!client,
      mode: 'mock'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        isReady: false,
        hasClient: false,
        mode: 'mock'
      },
      { status: 500 }
    );
  }
}