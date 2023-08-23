import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface Props {
    to: string;
    linkText: string;
}

export default function LinkBack({ to, linkText }: Props) {
    const { resetError } = useAuth();

    return (
        <div className="p-2">
            <Link to={to} onClick={resetError} className="text-white text-xs font-thin border-b">
                {linkText}
            </Link>
        </div>
    );
}
