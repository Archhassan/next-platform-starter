import { SectionCard } from 'components/prompt-studio/shared';

function SummaryRow({ label, value }) {
    return (
        <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="text-neutral-500">{label}</span>
            <span className="font-medium text-neutral-800">{value || '—'}</span>
        </div>
    );
}

function getAreaSummary(project) {
    if (project.areaDefinitionType === 'total-area') {
        return project.totalArea ? `إجمالي مساحة: ${project.totalArea} m²` : 'إجمالي مساحة';
    }

    if (project.areaDefinitionType === 'dimensions') {
        const length = project.approximateLength || '?';
        const width = project.approximateWidth || '?';
        return `أبعاد تقريبية: ${length}m × ${width}m`;
    }

    const shape = project.freeFormShape || 'كتلة حرة';
    return project.freeFormShapeDescription ? `${shape} (${project.freeFormShapeDescription})` : `كتلة حرة: ${shape}`;
}

function SummaryCard({ title, children }) {
    return (
        <section className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
            <div className="space-y-2">{children}</div>
        </section>
    );
}

export function PreviewPanel({ setup, project, sceneControl }) {
    return (
        <SectionCard title="Live Preview" description="ملخص مباشر يتحدث فورًا مع أي تغيير داخل التبويبات.">
            <div className="space-y-4">
                <SummaryCard title="Setup Summary">
                    <SummaryRow label="نوع العمل" value={setup.workType} />
                    <SummaryRow label="نوع العملية" value={setup.operationType} />
                    <SummaryRow label="البيئة" value={setup.environmentType} />
                    <SummaryRow label="المحرك" value={setup.engine} />
                </SummaryCard>

                <SummaryCard title="Project Summary">
                    <SummaryRow label="نوع المشروع" value={project.projectType} />
                    <SummaryRow label="الكتلة/المساحة" value={getAreaSummary(project)} />
                    <SummaryRow label="الستايل" value={project.style} />
                    <SummaryRow label="المواد" value={project.materials} />
                    <SummaryRow label="الموقع/السياق" value={project.siteContext} />
                </SummaryCard>

                <SummaryCard title="Scene Summary">
                    <SummaryRow label="زاوية الكاميرا" value={sceneControl.cameraAngle} />
                    <SummaryRow label="نوع اللقطة" value={sceneControl.shotType} />
                    <SummaryRow label="الإضاءة" value={sceneControl.lightingTime} />
                    <SummaryRow label="Mood" value={sceneControl.mood} />
                    <SummaryRow label="نسبة الأبعاد" value={sceneControl.aspectRatio} />
                    <SummaryRow label="الجودة" value={sceneControl.sceneQuality} />
                </SummaryCard>
            </div>
        </SectionCard>
    );
}
