interface Props {
    title: string;
}

export default function TitleForm({ title }: Props) {
    return (
        <div className="pb-2">
            <h1 className="text-white font-thin tracking-widest text-center uppercase">{title}</h1>
        </div>
    );
}
