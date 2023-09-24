interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function ContainerPage({ children }: Props) {
    return <section className="h-[calc(100dvh_-_80px)] flex items-center justify-center">{children}</section>;
}
