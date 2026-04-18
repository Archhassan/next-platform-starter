import { NextResponse } from 'next/server';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';

function buildPrompt({ project, style, area, shape, floors, mood }) {
    return `You are a senior architectural visualization prompt engineer. Create one professional, production-ready prompt for AI image/video tools.

Project Inputs:
- Project: ${project}
- Style: ${style}
- Area: ${area || 'Not specified'}
- Shape: ${shape}
- Floors: ${floors}
- Mood: ${mood}

Requirements:
1) Return only the final prompt text (no bullets, no JSON, no commentary).
2) Make it vivid, cinematic, and architecturally accurate.
3) Include materials, lighting, composition, and realistic environmental details.
4) Keep the output concise but premium-quality.`;
}

function extractPromptText(data) {
    if (typeof data.output_text === 'string' && data.output_text.trim()) {
        return data.output_text.trim();
    }

    const items = Array.isArray(data.output) ? data.output : [];
    const segments = [];

    for (const item of items) {
        const content = Array.isArray(item?.content) ? item.content : [];
        for (const block of content) {
            if (typeof block?.text === 'string' && block.text.trim()) {
                segments.push(block.text.trim());
            }
        }
    }

    return segments.join('\n').trim();
}

export async function POST(request) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'OPENAI_API_KEY is not configured on the server.' }, { status: 500 });
        }

        const body = await request.json();
        const { project, style, area, shape, floors, mood } = body;

        if (!project || !style || !shape || !floors || !mood) {
            return NextResponse.json({ error: 'Missing required fields: project, style, shape, floors, mood.' }, { status: 400 });
        }

        const openaiResponse = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                input: buildPrompt({ project, style, area, shape, floors, mood })
            })
        });

        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            return NextResponse.json({ error: `OpenAI request failed: ${errorText}` }, { status: 502 });
        }

        const data = await openaiResponse.json();
        const prompt = extractPromptText(data);

        if (!prompt) {
            return NextResponse.json({ error: 'No prompt text returned from OpenAI.' }, { status: 502 });
        }

        return NextResponse.json({ prompt });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unexpected server error.' },
            { status: 500 }
        );
    }
}
