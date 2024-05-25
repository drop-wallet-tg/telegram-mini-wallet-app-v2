export default function ConnectedApps(){
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <div className="flex w-full items-center bg-[#180E35] py-3 px-4 border-b border-[#20114f] justify-center sticky top-0 z-50">
                <h1 className="text-xl text-center text-[#bdbdbd]">huunhanz.near</h1>
            </div>
            <div className="mt-1 p-5">
                <div className="flex flex-row items-center text-center">
                    <img className="" src="/images/icon/Arrow.svg" width={30} alt="arrow" />
                    <label className="text-lg text-white font-semibold m-auto">Connected Apps</label>
                </div>
                <div className="border mt-5 border-[#363636] shadow-sm rounded-md p-5">
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="text-white font-medium">social.near</p>
                        <button type="button">
                            <span
                                className="text-primary py-1 px-3 text-xs border border-red-600 rounded-full hover:bg-gray-gray1 mb-2 mr-2">
                                <span className="lg:inline leading-5 text-red-600">Deauthorize</span>
                            </span>
                        </button>
                        <div className="w-full bg-[#2f2649] p-3 break-words mt-2 rounded-lg">
                            <span className="text-[#bdbdbdb9] text-sm">ed25519:pX9bMzbdWviLpzwAwhEKRkFRbYbXWYKZHahmKbQ9wr8</span>
                        </div>
                        <hr className="w-full h-[0.1px] border-t border-gray-200 mt-2"/>
                        <div className="flex w-full flex-col">
                            <div className="flex flex-row justify-between items-center">
                                <span>Gas Fee Allowance</span>
                                <span>0.25 NEAR</span>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <span>Gas Fee Allowance</span>
                                <span>0.25 NEAR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}