import Footer from "@/components/Footer";

export default function ShowNFT(){
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <div className="flex w-full items-center bg-[#180E35] py-3 px-4 border-b border-[#20114f] justify-center sticky top-0 z-50">
                    <h1 className="text-xl text-center text-[#bdbdbd]">huunhanz.near</h1>
            </div>
            <div className="p-5 h-[85vh]">
                <div className="flex flex-row justify-between items-center">
                    <label className="text-xl text-white font-semibold">My Collectibles</label>
                    <img width={18} src="/images/svg/redo.svg" alt="icon_loading" />
                </div>
                <div className="flex mt-3 text-white text-[0.7rem] flex-row gap-5">
                    <div className="pl-2 pr-1 py-1 gap-3 rounded-md flex flex-row items-center bg-[#2f2649]">
                        <p>Total NFTs</p>
                        <p className="px-4 text-white py-1 rounded-tr-md rounded-br-md bg-[#180E35]">2</p>
                    </div>
                    <div className="pl-2 pr-1 py-1 gap-3 rounded-md flex flex-row items-center bg-[#2f2649]">
                        <p>Total Floor Price</p>
                        <p className="px-4 text-white py-1 rounded-tr-md rounded-br-md bg-[#180E35]">0Ⓝ</p>
                    </div>
                </div>
                <div className="mt-5 flex flex-row gap-3 flex-wrap">
                    <div className="flex flex-col items-start relative">
                        <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                        <div className="px-1 py-2 text-[0.7rem] absolute ml-5 bottom-0 flex flex-row items-center bg-[#2f2649] gap-2">
                            <label className="text-[#b5afff]">Title NFT</label>
                            <p className="text-[#b5afff]">1</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start relative">
                        <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                        <div className="px-1 py-2 text-[0.7rem] absolute ml-5 bottom-0 flex flex-row items-center bg-[#2f2649] gap-2">
                            <label className="text-[#b5afff]">Title NFT</label>
                            <p className="text-[#b5afff]">1</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start relative">
                        <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                        <div className="px-1 py-2 text-[0.7rem] absolute ml-5 bottom-0 flex flex-row items-center bg-[#2f2649] gap-2">
                            <label className="text-[#b5afff]">Title NFT</label>
                            <p className="text-[#b5afff]">1</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}