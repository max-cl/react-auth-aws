export default function ErrorMessage({ message }: { message: string | null }) {
    return <>{message && <p className="text-center text-sm font-thin  tracking-widest text-error">{message}</p>}</>;
}
