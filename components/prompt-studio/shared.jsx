export function SectionCard({ title, description, children }) {
    return (
        <section className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
            <header className="space-y-1.5">
                <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">{title}</h2>
                {description && <p className="text-sm text-neutral-600">{description}</p>}
            </header>
            {children}
        </section>
    );
}

export function Field({ label, placeholder, value = '', onChange, type = 'text' }) {
    return (
        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            <span>{label}</span>
            <input
                className="input w-full bg-white"
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
            />
        </label>
    );
}

export function SelectField({ label, options }) {
    return (
        <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
            <span>{label}</span>
            <select className="input w-full bg-white" defaultValue="">
                <option value="" disabled>
                    اختر خياراً
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
