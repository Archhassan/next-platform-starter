import { SectionCard } from 'components/prompt-studio/shared';

const workTypes = ['Image', 'Video'];
const operationTypes = ['Text to Image', 'Image to Image', 'Video to Video', 'Frame to Frame'];
const environmentTypes = ['Local', 'Web'];
const engines = ['ComfyUI', 'Midjourney', 'Gemini (Nano Banana)', 'Freepik', 'Kling', 'Vidu'];

function SetupSelect({ label, value, options, onChange }) {
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

export function SetupTab({ setup, onChange }) {
    return (
        <SectionCard title="Setup" description="واجهة مرتبة لاختيار الإعدادات الأساسية وربطها بالـ state.">
            <div className="grid gap-4 sm:grid-cols-2">
                <SetupSelect
                    label="نوع العمل"
                    value={setup.workType}
                    options={workTypes}
                    onChange={(value) => onChange('workType', value)}
                />

                <SetupSelect
                    label="نوع العملية"
                    value={setup.operationType}
                    options={operationTypes}
                    onChange={(value) => onChange('operationType', value)}
                />

                <SetupSelect
                    label="نوع البيئة"
                    value={setup.environmentType}
                    options={environmentTypes}
                    onChange={(value) => onChange('environmentType', value)}
                />

                <SetupSelect
                    label="المحرك"
                    value={setup.engine}
                    options={engines}
                    onChange={(value) => onChange('engine', value)}
                />
            </div>
        </SectionCard>
    );
}
