import { Field, SectionCard } from 'components/prompt-studio/shared';

const areaTypes = [
    { value: 'total-area', label: 'إجمالي مساحة (m²)' },
    { value: 'dimensions', label: 'أبعاد تقريبية (طول × عرض)' },
    { value: 'free-form', label: 'كتلة حرة (Free Form)' }
];

const freeFormShapes = ['مستطيل', 'مربع', 'حرف L', 'حرف U', 'دائري', 'عضوي (Organic)'];

function SelectControl({ label, value, options, onChange }) {
    return (
        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            <span>{label}</span>
            <select className="input w-full bg-white" value={value} onChange={(event) => onChange(event.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

function renderAreaFields(project, onChange) {
    if (project.areaDefinitionType === 'total-area') {
        return <Field label="إجمالي المساحة (m²)" placeholder="مثال: 250" type="number" value={project.totalArea} onChange={(value) => onChange('totalArea', value)} />;
    }

    if (project.areaDefinitionType === 'dimensions') {
        return (
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="الطول (m)" placeholder="مثال: 20" type="number" value={project.approximateLength} onChange={(value) => onChange('approximateLength', value)} />
                <Field label="العرض (m)" placeholder="مثال: 12" type="number" value={project.approximateWidth} onChange={(value) => onChange('approximateWidth', value)} />
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <SelectControl
                label="شكل الكتلة"
                value={project.freeFormShape}
                options={freeFormShapes.map((shape) => ({ value: shape, label: shape }))}
                onChange={(value) => onChange('freeFormShape', value)}
            />
            <Field
                label="وصف بسيط للشكل (اختياري)"
                placeholder="مثال: كتلة عضوية بانحناءات ناعمة من جهة الحديقة"
                value={project.freeFormShapeDescription}
                onChange={(value) => onChange('freeFormShapeDescription', value)}
            />
        </div>
    );
}

export function ProjectTab({ project, onChange }) {
    return (
        <SectionCard title="Project" description="تعريف المشروع بطريقة واضحة ومرنة بدون تعقيد.">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="نوع المشروع" placeholder="Villa / Office / Cultural ..." value={project.projectType} onChange={(value) => onChange('projectType', value)} />
                <Field label="نوع المبنى (اختياري)" placeholder="Residential / Mixed-use ..." value={project.buildingType} onChange={(value) => onChange('buildingType', value)} />
                <Field label="الموقع / سياق الموقع" placeholder="Urban corner, coastal plot ..." value={project.siteContext} onChange={(value) => onChange('siteContext', value)} />
                <Field label="الستايل" placeholder="Modern / Minimal / Vernacular ..." value={project.style} onChange={(value) => onChange('style', value)} />
                <Field label="الطابع البيئي" placeholder="محلي / عالمي / هجين ..." value={project.environmentalCharacter} onChange={(value) => onChange('environmentalCharacter', value)} />
                <Field label="المواد" placeholder="Concrete, stone, wood, glass ..." value={project.materials} onChange={(value) => onChange('materials', value)} />
            </div>

            <Field label="ملاحظات إضافية" placeholder="أي توجيهات خاصة للمشروع..." value={project.notes} onChange={(value) => onChange('notes', value)} />

            <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <SelectControl label="نوع تعريف المساحة" value={project.areaDefinitionType} options={areaTypes} onChange={(value) => onChange('areaDefinitionType', value)} />
                {renderAreaFields(project, onChange)}
            </div>
        </SectionCard>
    );
}
