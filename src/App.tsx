import { Amplify } from "aws-amplify";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/contexts/Auth";
import RoutesApp from "@/routes";

import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

function App() {
    return (
        <>
            <Toaster position="top-center" />
            <AuthProvider>
                <RoutesApp />
            </AuthProvider>
        </>
    );
}

export default App;
