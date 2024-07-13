import Link from "next/link"
import Header from "@/components/Header"

const Security = () =>{
    return(
        <div className="w-full flex justify-between flex-col bg-[#180E35]">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5">
                    <div className="flex flex-row items-center text-center">
                        <Link href="/wallet/setting">
                            <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                        </Link>
                        <label className="text-lg text-white font-bold m-auto">Security and Recovery</label>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-8 gap-7">
                        <Link href={"/wallet/setting/security/view_secret_phrase"} className="flex group flex-row items-center justify-between w-full px-5">
                            <div className="flex flex-row gap-10">
                                <img width={30} src="/assets/view.svg" alt="icon" />
                                <div className="flex flex-col">
                                    <p className="text-white font-semibold group-hover:text-[#ffffffbd]">View Secret Phrase</p>
                                    <small className="text-[#ffffff9c]">Extract your wallet's secret phrase</small>
                                </div>
                            </div>
                            <img width={10} src="/assets/arrow-right.svg" alt="icon-right" />
                        </Link>
                        <Link href={"/wallet/setting/security/export_private_key"} className="group flex flex-row items-center justify-between w-full px-5">
                            <div className="flex flex-row gap-10">
                                <img width={30} src="/assets/key.svg" alt="icon" />
                                <div className="flex flex-col">
                                    <p className="text-white font-semibold group-hover:text-[#ffffffbd]">Export Private Key</p>
                                    <small className="text-[#ffffff9c]">Export your wallet's private key</small>
                                </div>
                            </div>
                            <img width={10} src="/assets/arrow-right.svg" alt="icon-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Security;