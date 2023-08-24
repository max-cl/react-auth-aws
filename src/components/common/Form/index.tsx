interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    children: React.ReactNode;
    cssCustom?: string;
}

export default function Form({ onSubmit, children, cssCustom = "" }: Props) {
    return (
        <form onSubmit={onSubmit} className={`card-body bg-gray-700 rounded-md ${cssCustom}`}>
            <>{children}</>
        </form>
    );
}
