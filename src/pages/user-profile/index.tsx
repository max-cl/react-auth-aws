import TitleForm from "@/components/TitleForm";
import ContainerPage from "@/components/common/ContainerPage";
import UserProfileForm from "@/features/UserProfileForm";

export default function UserProfile() {
    return (
        <ContainerPage>
            <div className="card w-96 px-4 py-4 shadow-md bg-black">
                <TitleForm title="User Profile" />
                <UserProfileForm />
            </div>
        </ContainerPage>
    );
}
