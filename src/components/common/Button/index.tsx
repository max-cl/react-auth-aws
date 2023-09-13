type ButtonType = "button" | "submit";

interface Props {
    type?: ButtonType;
    isLoading: boolean;
    btnText: string;
    onClick?: () => Promise<void> | void;
}

export default function Button({
    type = "submit",
    isLoading,
    btnText,
    onClick = () => {
        return;
    },
}: Props) {
    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick}
            className="tracking-widest btn btn-primary disabled:opacity-100"
        >
            {isLoading ? "Loading..." : btnText}
        </button>
    );
}
