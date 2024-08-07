"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function CreateWalletSucess(){
    const params = useSearchParams();
    const hash = params.get("hash")
    ? params.get("hash")
    : "";
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <div className="p-5">
                <div className="flex flex-col px-3 w-full justify-center items-center mt-[6rem]">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <img width={140} src="/images/logo/logo.svg" alt="logo" />
                        <p className="text-lg mt-3 w-full text-center text-[#716D9C]">✅ Account Creation Successfull</p>
                        <div className="text-center">
                            <p className="text-sm text-[#716D9C]">Transaction Hash:</p>
                            <Link href={`https://nearblocks.io/txns/${hash}`} target="_blank" className="text-sm text-[#ffffffa9]">{hash}</Link>
                        </div>
                    </div>
                    <div className="mt-20 w-full flex flex-col justify-center items-center">
                        <Link href="/home" className="px-6 py-3 text-center bg-[#2775CA] w-3/4 rounded-3xl text-white hover:bg-[#4f95e1] font-semibold">HOME</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}