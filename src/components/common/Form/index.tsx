interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    children: React.ReactNode;
}

export default function Form({ onSubmit, children }: Props) {
    return (
        <form onSubmit={onSubmit} className="card-body bg-gray-700 rounded-md rounded-tl-none">
            <>{children}</>
        </form>
    );
}
