type InputType = "text" | "password";

interface Props {
    type?: InputType;
    placeholder: string;
    isDisabled?: boolean;
    name: string;
    onChange: () => void;
}

export default function Input({ type = "text", placeholder, isDisabled = false, name, onChange }: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered bg-gray-600 text-white text-sm font-thin tracking-widest"
            disabled={isDisabled}
            name={name}
            onChange={onChange}
        />
    );
}
