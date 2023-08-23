type InputType = "text" | "password";

interface Props {
    type?: InputType;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isDisabled?: boolean;
}

export default function Input({ type = "text", placeholder, onChange, value, isDisabled = false }: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered bg-gray-600 text-white text-sm font-thin tracking-widest"
            onChange={onChange}
            value={value}
            disabled={isDisabled}
        />
    );
}
