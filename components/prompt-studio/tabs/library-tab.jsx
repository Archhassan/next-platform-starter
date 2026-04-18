import { Field, SectionCard } from 'components/prompt-studio/shared';

export function LibraryTab() {
    return (
        <SectionCard title="Library" description="إدارة البرومبتات المحفوظة: حفظ، تعديل، حذف، وبحث (UI فقط).">
            <div className="flex flex-wrap gap-3">
                <button type="button" className="btn">
                    حفظ
                </button>
                <button
                    type="button"
                    className="rounded-sm border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
                >
                    تعديل
                </button>
                <button
                    type="button"
                    className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                    حذف
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                <Field label="بحث" placeholder="ابحث بالاسم أو المحرك أو الستايل..." />
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-600">
                    التخزين المستهدف: <strong>localStorage</strong>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-100 text-neutral-700">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Engine</th>
                            <th className="px-4 py-3">Updated</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="border-t border-neutral-200">
                                <td className="px-4 py-3">Modern Villa Prompt {item}</td>
                                <td className="px-4 py-3">ComfyUI</td>
                                <td className="px-4 py-3">2026-04-17</td>
                                <td className="px-4 py-3 text-primary">عرض / تعديل / حذف</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
}
