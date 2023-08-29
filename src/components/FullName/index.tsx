interface Props {
    firstName?: string;
    lastName?: string;
}

export default function FullName({ firstName, lastName }: Props) {
    return (
        <>
            {firstName && lastName ? (
                <h1 className="text-white text-xs font-thin tracking-widest">
                    <span className="font-bold">User:</span>
                    {` ${firstName} ${lastName}`}
                </h1>
            ) : null}
        </>
    );
}
