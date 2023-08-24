export default function ErrorMessage({ message }: { message: string | null }) {
    return <>{message && <p className="text-center text-xs font-thin  tracking-widest text-error">{message}</p>}</>;
    // return (
    //     <div>
    //         {message &&
    //             (message.includes("|") ? (
    //                 message.split("|").map((err, index) => (
    //                     <p key={index} className="text-left text-xs font-thin tracking-widest text-error">
    //                         - {err}
    //                     </p>
    //                 ))
    //             ) : (
    //                 <p className="text-center text-xs font-thin tracking-widest text-error">{message}</p>
    //             ))}{" "}
    //     </div>
    // );
}
