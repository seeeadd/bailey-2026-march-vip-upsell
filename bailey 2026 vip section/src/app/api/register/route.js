import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // ═══════════════════════════════════════════════
    // TODO: Replace with FEA Create API integration
    // ═══════════════════════════════════════════════
    //
    // Option 1: FEA Create Webhook
    // const feaRes = await fetch('https://app.feacreate.com/api/webhook/YOUR_WEBHOOK_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, tag: 'challenge-registration' }),
    // });
    //
    // Option 2: FEA Create API with API key
    // const feaRes = await fetch('https://app.feacreate.com/api/v1/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.FEA_CREATE_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     first_name: name,
    //     email: email,
    //     tags: ['challenge-secrets', 'ai-challenge'],
    //   }),
    // });
    //
    // ═══════════════════════════════════════════════

    console.log('📧 New registration:', { name, email });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      redirect: '/vip',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
