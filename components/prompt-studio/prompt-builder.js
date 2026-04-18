function compact(values) {
    return values.filter(Boolean);
}

function normalizeSentence(text) {
    return text.replace(/\s+/g, ' ').trim();
}

export function buildProjectDescription(project) {
    const primary = compact([
        project.projectType && `Project Type: ${project.projectType}`,
        project.buildingType && `Building Type: ${project.buildingType}`,
        project.siteContext && `Site Context: ${project.siteContext}`,
        project.style && `Style: ${project.style}`,
        project.environmentalCharacter && `Environmental Character: ${project.environmentalCharacter}`,
        project.materials && `Materials: ${project.materials}`
    ]);

    const areaPart = (() => {
        if (project.areaDefinitionType === 'total-area' && project.totalArea) {
            return `Area: approximately ${project.totalArea} m²`;
        }

        if (project.areaDefinitionType === 'dimensions' && (project.approximateLength || project.approximateWidth)) {
            const length = project.approximateLength || '?';
            const width = project.approximateWidth || '?';
            return `Area: approximately ${length}m × ${width}m`;
        }

        if (project.areaDefinitionType === 'free-form') {
            const shapeParts = compact([
                project.freeFormShape && `shape is ${project.freeFormShape}`,
                project.freeFormShapeDescription && project.freeFormShapeDescription
            ]);
            return shapeParts.length ? `Massing: ${shapeParts.join(', ')}` : '';
        }

        return '';
    })();

    const notesPart = project.notes ? `Notes: ${project.notes}` : '';

    return normalizeSentence(compact([...primary, areaPart, notesPart]).join('. '));
}

export function buildSceneModifiers(sceneControl) {
    return normalizeSentence(
        compact([
            `Camera Angle: ${sceneControl.cameraAngle}`,
            `Shot Type: ${sceneControl.shotType}`,
            `Lighting: ${sceneControl.lightingTime}`,
            `Mood: ${sceneControl.mood}`,
            `Aspect Ratio: ${sceneControl.aspectRatio}`,
            `Quality: ${sceneControl.sceneQuality}`
        ]).join(' | ')
    );
}

function buildEngineOutput({ setup, projectDescription, sceneModifiers }) {
    const setupContext = `Mode: ${setup.workType}, Operation: ${setup.operationType}, Environment: ${setup.environmentType}`;
    const basePrompt = normalizeSentence(`${projectDescription}. ${sceneModifiers}.`);

    if (setup.engine === 'ComfyUI') {
        return {
            type: 'comfyui',
            positivePrompt: normalizeSentence(`${basePrompt} ${setupContext}`),
            negativePrompt: 'low quality, blurry details, noisy textures, distorted geometry, bad composition',
            settings: 'CFG: [placeholder] | Steps: [placeholder] | Sampler: [placeholder]'
        };
    }

    if (setup.engine === 'Midjourney') {
        return {
            type: 'midjourney',
            prompt: basePrompt,
            parameters: `--ar ${setup.operationType === 'Video to Video' ? '16:9' : '3:2'} --stylize 250`
        };
    }

    if (setup.engine === 'Gemini (Nano Banana)') {
        return {
            type: 'gemini',
            prompt: basePrompt,
            instruction: `Generate a polished architectural prompt using this context. Keep it specific, cinematic, and material-aware. ${setupContext}`
        };
    }

    const isVideoMode =
        setup.workType === 'Video' ||
        setup.operationType === 'Video to Video' ||
        setup.engine === 'Kling' ||
        setup.engine === 'Vidu';

    if (isVideoMode) {
        return {
            type: 'video',
            motionPrompt: normalizeSentence(
                `${projectDescription}. Motion style: smooth cinematic motion, realistic environmental dynamics. ${sceneModifiers}`
            ),
            cameraMovement: 'Slow dolly-in with subtle orbit transition and stabilized aerial-to-eye-level blend.'
        };
    }

    return {
        type: 'generic',
        prompt: normalizeSentence(`${basePrompt} ${setupContext}`)
    };
}

export function buildGenerationPayload({ setup, project, sceneControl }) {
    const projectDescription = buildProjectDescription(project);
    const sceneModifiers = buildSceneModifiers(sceneControl);
    const output = buildEngineOutput({ setup, projectDescription, sceneModifiers });

    return {
        projectDescription,
        sceneModifiers,
        output,
        engine: setup.engine
    };
}
