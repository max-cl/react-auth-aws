import TitleForm from "@/components/TitleForm";
import ContainerPage from "@/components/common/ContainerPage";
import ChangeUserPasswordForm from "@/features/ChangeUserPasswordForm";

export default function ChangeUserPassword() {
    return (
        <ContainerPage>
            <div className="card w-96 px-4 py-4 shadow-md bg-black">
                <TitleForm title="Change Password" />
                <ChangeUserPasswordForm />
            </div>
        </ContainerPage>
    );
}
