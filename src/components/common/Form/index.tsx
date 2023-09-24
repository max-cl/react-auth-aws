import { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    cssCustom?: string;
}

const Form = forwardRef<HTMLFormElement, Props>(({ onSubmit, children, cssCustom = "" }, ref) => {
    return (
        <form ref={ref} role="form" onSubmit={onSubmit} className={`card-body bg-gray-700 rounded-md ${cssCustom}`}>
            <>{children}</>
        </form>
    );
});

export default Form;
