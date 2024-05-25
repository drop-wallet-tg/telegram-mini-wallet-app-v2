import Footer from "../Footer";

export default function CreateWallet(){
    return(
        <div className="w-full min-h-screen flex justify-between flex-col bg-[#180E35]">
            <div className="flex flex-col px-3 w-full justify-center items-center mt-[6rem]">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <img width={160} src="/images/logo/logo.svg" alt="logo" />
                    <label className="text-2xl font-semibold text-[#cac9d5] mt-2">New Wallet</label>
                    <p className="text-normal w-2/3 text-center text-[#716D9C]">Choose how you'd like to set up your wallet</p>
                </div>
                <div className="mt-20 w-full flex flex-col justify-center items-center">
                    <button className="px-6 py-3 bg-[#2775CA] w-3/4 rounded-3xl text-[#ffffff83]">Create a new wallet</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}