import logoImgUrl from "/logo.svg";

export default function Logo() {
    return (
        <div className="w-12 h-12 flex justify-center">
            <img width={40} height={40} src={logoImgUrl} alt="logo" />
        </div>
    );
}
