
import { NextResponse } from 'next/server';
import { TranslationServiceClient } from '@google-cloud/translate';

export async function POST(req: Request) {
  const body = await req.json();
  const q = body.q;
  const target = body.target || 'en';
  if (!q) return NextResponse.json({ error: 'Missing q' }, { status: 400 });

  const client = new TranslationServiceClient();
  const parent = `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`;
  const contents = Array.isArray(q) ? q : [q];

  const [response] = await client.translateText({ parent, contents, mimeType: 'text/plain', targetLanguageCode: target });
  const translations = (response.translations || []).map(t => t.translatedText ?? '');
  return NextResponse.json({ translations });
}
