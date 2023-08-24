interface Props {
    children: React.ReactNode;
}

export default function ContainerPage({ children }: Props) {
    return <section className="h-[calc(100dvh_-_80px)] flex items-center justify-center">{children}</section>;
}
