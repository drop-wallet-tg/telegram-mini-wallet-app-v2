import Footer from "../Footer"
import "./styles.module.css"
export default function Home(){
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <div className="">
                {/* Top Header */}
                <div className="flex w-full items-center bg-[#180E35] py-3 px-4 border-b border-[#20114f] justify-center sticky top-0 z-50">
                    <h1 className="text-xl text-center text-[#bdbdbd]">huunhanz.near</h1>
                </div>
                {/* Container Top */}
                <div className="relative">
                    <div className="flex items-center overflow-y-scroll scroll-smooth flex-col mt-5 justify-center">
                        <div className="text-center flex flex-row gap-2 items-center">
                            <span className="text-sm text-[#716D9C]">Available Balance</span>
                            <img src="./images/svg/info.svg"/>
                        </div>
                        <div className="text-center mt-1">
                            <h2 className="text-[60px] text-white font-semibold">$100, 000</h2>
                        </div>
                        <div className="mt-5">
                            <ul className="flex flex-row text-[#f2f1ff95] justify-between items-center gap-7">
                                <li className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" alt="icon" />
                                        <img width={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="/images/svg/home.svg" alt="icon" />
                                    </div>
                                    <a href="/wallet/send">Send</a>
                                </li>
                                <li className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" alt="icon" />
                                        <img width={20}  src="/images/svg/add.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <a href="/wallet/mint">Mint NFT</a>
                                </li>
                                <li className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" alt="icon" />
                                        <img width={20} src="/images/svg/x.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <a href="/wallet/vibe">Vibe</a>
                                </li>
                                <li className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" alt="icon" />
                                        <img width={20} src="/images/svg/post.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <a href="/social/post">Post</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Container Top */}
                    <div className="mt-5">
                        <div className="mt-3 px-4 py-2">
                            <div className="flex flex-row justify-between items-center">
                                <label className="text-lg text-[#716D9C]">My Assets</label>
                                <img width={20} src="/images/svg/redo.svg" alt="icon_loading" />
                            </div>
                            <div className="h-[13vh] flex flex-row justify-between items-center px-5 mt-3 rounded-lg w-full bg-[#2f2649]">
                                <div className="flex flex-row gap-3">
                                    <img src="/images/logo/icon_near.svg" width={45} alt="logo" />
                                    <div className="flex flex-col justify-between items-start">
                                        <p className="text-[#716D9C]">NEAR</p>
                                        <small className="text-[#1d5cb0]">39.9 NEAR</small>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className="text-white">$88.70</p>
                                    <div className="flex flex-row gap-1.5">
                                        <img src="/images/icon/icon_up.svg" alt="icon"/>
                                        <small className="text-[#26a269]">8.7%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 px-4 py-2">
                            <div className="flex flex-row justify-between items-center">
                                <label className="text-lg text-[#716D9C]">My Assets</label>
                                <div className="flex flex-row gap-2">
                                    <label className="text-[#b5afff]">Total NFTs</label>
                                    <p className="text-[#b6afff78]">8</p>
                                    <img width={20} src="/images/svg/redo.svg" alt="icon_loading" />
                                </div>
                            </div>
                            <div className="mt-3 flex flex-row gap-5 w-full">
                                <div className="flex flex-col items-start">
                                    <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                                    <div className="px-1 py-2">
                                        <label className="mt-2 text-[#b5afff]">Title NFT</label>
                                        <p className="text-[#b5afff]">1</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                                    <div className="px-1 py-2">
                                        <label className="mt-2 text-[#b5afff]">Title NFT</label>
                                        <p className="text-[#b5afff]">1</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                                    <div className="px-1 py-2">
                                        <label className="mt-2 text-[#b5afff]">Title NFT</label>
                                        <p className="text-[#b5afff]">1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <Footer/>
            </div>
        </div>
    )
}



