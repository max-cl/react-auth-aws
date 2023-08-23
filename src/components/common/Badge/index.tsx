interface Props {
    badgeText: string;
}

export default function Badge({ badgeText }: Props) {
    return (
        <div className="w-full badge border-none bg-gray-600 text-white text-sm font-thin tracking-widest px-2 py-4">
            {badgeText}
        </div>
    );
}
