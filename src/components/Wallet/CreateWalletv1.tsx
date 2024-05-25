export default function CreateWalletv1(){
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <img src="/images/icon/Arrow.svg" alt="arrow" />
                    <label className="text-xl text-[#cac9d5] m-auto">Your Account Identity</label>
                </div>
                <p className="w-2/3 mt-8 text-[#b6afff92]">What would you like your custom Near wallet address to be?</p>
                <div className="mt-5 m-auto rounded-xl border border-[#B5AFFF] flex flex-row justify-between items-center">
                    <input type="text" className="w-full text-[#B5AFFF] px-4 py-3 rounded-tl-xl rounded-bl-xl bg-transparent focus:outline-none placeholder-[#b6afff4e]" placeholder="yourtelegramhandle"/>
                    <label className="bg-[#b6afffb7] rounded-br-xl rounded-tr-xl px-4 py-3">.near</label>
                </div>
                <div>
                    <div className="flex flex-row gap-5">
                        <img className="-mt-10" src="/images/icon/success.svg" alt="sucess" />
                        <div className="flex mt-10 flex-col">
                            <div className="text-sm text-[#b6afff65]">
                                <p>Your account ID</p>
                                <p>can contain any of the following:</p>
                            </div>
                            <ul className="text-sm ml-3 mt-3 text-[#B5AFFF] list-disc">
                                <li>Lowercase characters (a-z)</li>
                                <li>Digits (0-9)</li>
                                <li>Characters (_-) can be used as separators</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <img className="-mt-8" src="/images/icon/band.svg" alt="sucess" />
                        <div className="flex mt-10 flex-col">
                            <div className="text-sm text-[#b6afff65]">
                                <p>Your account ID cannot contain:</p>
                            </div>
                            <ul className="text-sm ml-3 mt-3 text-[#B5AFFF] list-disc">
                                <li>Characters "@" or "."</li>
                                <li>More than 64 characters (including .near)</li>
                                <li>Fewer than 2 characters</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex text-sm flex-col mt-10 gap-1">
                    <p className="text-[#b6afff65]">Prefer a traditional crypto wallet id?</p>
                    <p className="text-[#b6afffa5] underline">Use Implicit Account</p>
                </div>
                <div className="mt-8 w-full flex flex-col justify-center items-center">
                    <button className="px-6 py-3 bg-[#2775CA] w-3/4 rounded-3xl text-[#ffffffbb]">Continue</button>
                </div>
            </div>
        </div>
    )
}