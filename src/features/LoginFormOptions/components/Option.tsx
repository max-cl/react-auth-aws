interface Props {
    cssType: string;
    onClick: () => void;
    btnText: string;
}

export default function Option({ cssType, onClick, btnText }: Props) {
    return (
        <div className={`w-6/12 flex justify-center ${cssType}`}>
            <button onClick={onClick} className="w-full py-4 text-white uppercase tracking-widest outline-none">
                {btnText}
            </button>
        </div>
    );
}
