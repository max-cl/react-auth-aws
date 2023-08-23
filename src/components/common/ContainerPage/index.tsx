interface Props {
    children: React.ReactNode;
}

export default function ContainerPage({ children }: Props) {
    return <main className="h-[calc(100dvh_-_80px)] flex items-center justify-center">{children}</main>;
}
