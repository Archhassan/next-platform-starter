'use client';

import { useState } from 'react';
import { BrandingHeader } from 'components/prompt-studio/branding-header';
import { PreviewPanel } from 'components/prompt-studio/preview-panel';
import { GenerationTab } from 'components/prompt-studio/tabs/generation-tab';
import { LibraryTab } from 'components/prompt-studio/tabs/library-tab';
import { ProjectTab } from 'components/prompt-studio/tabs/project-tab';
import { SceneControlTab } from 'components/prompt-studio/tabs/scene-control-tab';
import { SetupTab } from 'components/prompt-studio/tabs/setup-tab';

const tabs = [
    { id: 'setup', label: 'Setup' },
    { id: 'project', label: 'Project' },
    { id: 'scene-control', label: 'Scene Control' },
    { id: 'generation', label: 'Generation' },
    { id: 'library', label: 'Library' }
];

export function PromptStudioPage() {
    const [activeTab, setActiveTab] = useState('setup');

    const [setup, setSetup] = useState({
        workType: 'Image',
        operationType: 'Text to Image',
        environmentType: 'Local',
        engine: 'ComfyUI'
    });

    const [project, setProject] = useState({
        projectType: '',
        buildingType: '',
        siteContext: '',
        style: '',
        environmentalCharacter: '',
        materials: '',
        notes: '',
        areaDefinitionType: 'total-area',
        totalArea: '',
        approximateLength: '',
        approximateWidth: '',
        freeFormShape: 'مستطيل',
        freeFormShapeDescription: ''
    });

    const [sceneControl, setSceneControl] = useState({
        cameraAngle: 'Front',
        shotType: 'Exterior',
        lightingTime: 'Morning',
        mood: 'Dramatic',
        aspectRatio: '16:9',
        sceneQuality: 'High'
    });

    function updateSetup(field, value) {
        setSetup((current) => ({
            ...current,
            [field]: value
        }));
    }

    function updateProject(field, value) {
        setProject((current) => ({
            ...current,
            [field]: value
        }));
    }

    function updateSceneControl(field, value) {
        setSceneControl((current) => ({
            ...current,
            [field]: value
        }));
    }

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-8">
            <BrandingHeader />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
                <section className="space-y-5">
                    <section className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                            isActive
                                                ? 'border-primary bg-primary text-primary-content'
                                                : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {activeTab === 'setup' ? <SetupTab setup={setup} onChange={updateSetup} /> : null}
                    {activeTab === 'project' ? <ProjectTab project={project} onChange={updateProject} /> : null}
                    {activeTab === 'scene-control' ? <SceneControlTab sceneControl={sceneControl} onChange={updateSceneControl} /> : null}
                    {activeTab === 'generation' ? <GenerationTab /> : null}
                    {activeTab === 'library' ? <LibraryTab /> : null}
                </section>

                <aside className="lg:sticky lg:top-6">
                    <PreviewPanel setup={setup} project={project} sceneControl={sceneControl} />
                </aside>
            </div>
        </main>
    );
}
