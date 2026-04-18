'use client';

import { useState } from 'react';
import { SectionCard } from 'components/prompt-studio/shared';

const shapeOptions = ['L', 'U', 'rectangle', 'organic'];

const initialForm = {
    project: '',
    style: '',
    area: '',
    shape: 'rectangle',
    floors: '',
    mood: ''
};

export function GenerationTab() {
    const [form, setForm] = useState(initialForm);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [copyState, setCopyState] = useState('idle');
    const [isLoading, setIsLoading] = useState(false);

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    }

    async function handleGenerate(event) {
        event.preventDefault();
        setError('');
        setResult('');
        setCopyState('idle');
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate-prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error || 'Failed to generate prompt.');
            }

            setResult(payload.prompt || '');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopy() {
        if (!result) {
            return;
        }

        try {
            await navigator.clipboard.writeText(result);
            setCopyState('copied');
        } catch {
            setCopyState('failed');
        }
    }

    return (
        <SectionCard title="Generation" description="Generate a professional architectural AI prompt using OpenAI GPT.">
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleGenerate}>
                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Project</span>
                    <input className="input w-full bg-white" value={form.project} onChange={(event) => updateField('project', event.target.value)} placeholder="Villa / Tower / Mixed-use" required />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Style</span>
                    <input className="input w-full bg-white" value={form.style} onChange={(event) => updateField('style', event.target.value)} placeholder="Modern / Minimal / Brutalist" required />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Area (optional)</span>
                    <input className="input w-full bg-white" value={form.area} onChange={(event) => updateField('area', event.target.value)} placeholder="e.g. 250 m²" />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Shape</span>
                    <select className="input w-full bg-white" value={form.shape} onChange={(event) => updateField('shape', event.target.value)}>
                        {shapeOptions.map((shape) => (
                            <option key={shape} value={shape}>
                                {shape}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Floors</span>
                    <input className="input w-full bg-white" value={form.floors} onChange={(event) => updateField('floors', event.target.value)} placeholder="e.g. 2" required />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                    <span>Mood</span>
                    <input className="input w-full bg-white" value={form.mood} onChange={(event) => updateField('mood', event.target.value)} placeholder="Cinematic / Calm / Dramatic" required />
                </label>

                <div className="sm:col-span-2">
                    <button type="submit" className="btn" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>

            {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
            ) : null}

            <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-neutral-800">Generated Prompt</h3>
                    <button
                        type="button"
                        className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
                        onClick={handleCopy}
                        disabled={!result}
                    >
                        Copy
                    </button>
                </div>

                <pre className="whitespace-pre-wrap rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800">
                    {result || 'Your generated architectural prompt will appear here.'}
                </pre>

                {copyState === 'copied' ? <p className="text-xs text-green-700">Copied to clipboard.</p> : null}
                {copyState === 'failed' ? <p className="text-xs text-red-700">Copy failed. Please copy manually.</p> : null}
            </div>
        </SectionCard>
    );
}
