import { useAuth } from "@/hooks/useAuth";
import Option from "./components/Option";

interface Props {
    isLoginForm: boolean;
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginFormOptions({ isLoginForm, setIsLoginForm }: Props) {
    const { resetError } = useAuth();

    return (
        <div className="flex">
            <Option
                cssType={isLoginForm ? "bg-gray-700 rounded-md rounded-bl-none rounded-br-none" : "bg-black"}
                onClick={() => {
                    resetError();
                    setIsLoginForm(true);
                }}
                btnText="Login"
            />
            <Option
                cssType={isLoginForm ? "bg-black" : "bg-gray-700 rounded-md rounded-bl-none rounded-br-none"}
                onClick={() => {
                    resetError();
                    setIsLoginForm(false);
                }}
                btnText="Sign Up"
            />
        </div>
    );
}
