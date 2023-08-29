interface Props {
    message: string | null;
}

export default function ErrorMessage({ message }: Props) {
    return (
        <>{message ? <p className="text-center text-xs font-thin  tracking-widest text-error">{message}</p> : null}</>
    );
}
