import { useAuth } from "@/hooks/useAuth";

interface Props {
    isLoginForm: boolean;
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginFormOptions({ isLoginForm, setIsLoginForm }: Props) {
    const { resetError } = useAuth();

    return (
        <div className="flex">
            <div
                className={`w-6/12 flex justify-center ${
                    isLoginForm ? "bg-gray-700 rounded-md rounded-bl-none rounded-br-none" : "bg-black "
                }`}
            >
                <button
                    onClick={() => {
                        resetError();
                        setIsLoginForm(true);
                    }}
                    className="w-full py-4 text-white uppercase tracking-widest outline-none"
                >
                    Login
                </button>
            </div>
            <div
                className={`w-6/12 flex justify-center ${
                    isLoginForm ? "bg-black" : "bg-gray-700 rounded-md rounded-bl-none rounded-br-none"
                }`}
            >
                <button
                    onClick={() => {
                        resetError();
                        setIsLoginForm(false);
                    }}
                    className="w-full py-4 text-white uppercase tracking-widest outline-none"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
