interface Props {
    firstName: string | undefined;
    lastName: string | undefined;
}

export default function FullName({ firstName, lastName }: Props) {
    return (
        <h1 className="text-white text-xs font-thin tracking-widest">
            <span className="font-bold">User:</span>
            {` ${firstName ? firstName : ""} ${lastName ? lastName : ""}`}
        </h1>
    );
}
