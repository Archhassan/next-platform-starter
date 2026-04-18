export function BrandingHeader() {
    return (
        <header className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-xs font-semibold uppercase text-neutral-500"
                        aria-label="Logo placeholder"
                    >
                        Logo
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Architectural Prompt Studio</h1>
                        <p className="text-sm text-neutral-600">Build structured architecture prompts quickly for image and video engines.</p>
                    </div>
                </div>

                <p className="text-sm font-medium text-neutral-500">Created by Hassan Tmim</p>
            </div>
        </header>
    );
}
