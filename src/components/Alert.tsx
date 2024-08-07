import Link from "next/link";

const Alert = () =>{
    return(
        <div className="flex flex-row bg-[#fbd38d29] text-white p-2 rounded-full w-full bg-opacity-60 justify-between items-center px-3">
            <div className="flex flex-row gap-2 items-center">
                <img width={25} src="/assets/icon/warning.svg" alt="icon" />
                <span className="font-semibold text-sm">Protect Your Wallet</span>
            </div>
            <Link href={"/wallet/setting/change-password"} className="bg-black bg-opacity-20 text-white h-8 flex items-center justify-center p-2 rounded-full">
                <small className="font-semibold">Set Password</small>
            </Link>
        </div>
    )
}

export default Alert;