import { SectionCard } from 'components/prompt-studio/shared';

const cameraAngles = ['Front', 'Side', 'Top', 'Isometric', 'Wide angle', 'Close-up'];
const shotTypes = ['Exterior', 'Interior', 'Aerial', 'Street view'];
const lightingTimes = ['Morning', 'Noon', 'Sunset', 'Night'];
const moods = ['Dramatic', 'Calm', 'Cinematic', 'Bright', 'Moody'];
const aspectRatios = ['1:1', '16:9', '9:16', '3:2'];
const sceneQualities = ['Standard', 'High', 'Ultra'];

function SelectControl({ label, value, options, onChange }) {
    return (
        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            <span>{label}</span>
            <select className="input w-full bg-white" value={value} onChange={(event) => onChange(event.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

function PreviewItem({ label, value }) {
    return (
        <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
            <p className="text-xs text-neutral-500">{label}</p>
            <p className="text-sm font-semibold text-neutral-800">{value}</p>
        </div>
    );
}

export function SceneControlTab({ sceneControl, onChange }) {
    return (
        <SectionCard
            title="Scene Control"
            description="Quick Control لتعديل المشهد فقط (الكاميرا، اللقطة، الإضاءة...) بدون التأثير على بيانات المشروع."
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SelectControl
                    label="زاوية الكاميرا"
                    value={sceneControl.cameraAngle}
                    options={cameraAngles}
                    onChange={(value) => onChange('cameraAngle', value)}
                />

                <SelectControl
                    label="نوع اللقطة"
                    value={sceneControl.shotType}
                    options={shotTypes}
                    onChange={(value) => onChange('shotType', value)}
                />

                <SelectControl
                    label="وقت الإضاءة"
                    value={sceneControl.lightingTime}
                    options={lightingTimes}
                    onChange={(value) => onChange('lightingTime', value)}
                />

                <SelectControl
                    label="Mood"
                    value={sceneControl.mood}
                    options={moods}
                    onChange={(value) => onChange('mood', value)}
                />

                <SelectControl
                    label="نسبة الأبعاد"
                    value={sceneControl.aspectRatio}
                    options={aspectRatios}
                    onChange={(value) => onChange('aspectRatio', value)}
                />

                <SelectControl
                    label="جودة المشهد"
                    value={sceneControl.sceneQuality}
                    options={sceneQualities}
                    onChange={(value) => onChange('sceneQuality', value)}
                />
            </div>

            <div className="space-y-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
                <h3 className="text-sm font-semibold text-neutral-800">Preview</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <PreviewItem label="Camera Angle" value={sceneControl.cameraAngle} />
                    <PreviewItem label="Shot Type" value={sceneControl.shotType} />
                    <PreviewItem label="Lighting" value={sceneControl.lightingTime} />
                    <PreviewItem label="Mood" value={sceneControl.mood} />
                    <PreviewItem label="Aspect Ratio" value={sceneControl.aspectRatio} />
                    <PreviewItem label="Quality" value={sceneControl.sceneQuality} />
                </div>
            </div>
        </SectionCard>
    );
}
