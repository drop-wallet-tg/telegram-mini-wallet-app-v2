import { Silkscreen as FontSilkscreen} from "next/font/google"

const Silkscreen = FontSilkscreen({
    subsets: ["latin"],
    weight:"400",
})

const Joygotchi = () =>{
    return(
        <div className={`${Silkscreen.className} flex flex-col justify-center items-center w-full h-screen bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] md:w-[380px] h-full">
                <div className="border-b border-gray-300 h-20 w-full bg-[#2d3c53] relative">
                    <div className="flex flex-row justify-between sm px-5 py-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <img width={25} src="/assets/gotchi/coin.png" alt="coin" />
                                <p className="text-[#fff]">0.01</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <img width={25} src="/assets/gotchi/credit_card.png" alt="coin" />
                                <p className="text-[#fff]">19000</p>
                            </div>
                        </div>
                        <p className="text-[#fff] text-xl mt-2">Pet #231</p>
                        <div className="flex flex-row gap-4 h-8 mt-5">
                            <img width={30} src="/assets/gotchi/internet.png" alt="coin" />
                            <img width={25} src="/assets/gotchi/wallet.png" alt="coin" />
                        </div>
                    </div>
                    <div className="px-3 py-2 w-[150px] rounded-full text-center absolute top-2/3 left-1/3  h-10 bg-[#f48f59]">
                        <span>0h:57m:35s</span>
                    </div>
                </div>
                <div className="p-3">
                    <div className="mt-2">
                        <div className="w-full h-[250px] rounded-md flex justify-center flex-row relative">
                            <img width={60} className="w-[300px] sm:w-full h-full rounded-md" src="/assets/background/screen_pet.png" alt="screen" />
                            <img width={150} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="/assets/pet/pet.png" alt="pet" />
                            {/* <p className="text-[#fff] font-semibold absolute top-3/4 mt-3 left-1/2 transform -translate-x-1/2 ">Pet Name</p> */}
                        </div>
                    </div>
                    <div className="mt-2 bg-[#a9c6e4] w-full flex-row flex justify-between rounded-lg px-3 py-4">
                        <div className="flex flex-col text-center">
                            <p className="text-xl">0 ETH</p>
                            <span className="text-[#00000088]">REWARDS</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">6</p>
                            <span className="text-[#00000088]">LEVEL</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">NICE</p>
                            <span className="text-[#00000088]">STATUS</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">1</p>
                            <span className="text-[#00000088]">STAR</span>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-row w-full justify-center gap-5">
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                        <div className="bg-[#a9c6e4] p-3 w-12 h-12 rounded-lg">
                            <img width={30} src="/assets/gotchi/star.png" alt="star" />
                        </div>
                    </div>
                    <div className="mt-3 bg-[#a9c6e4] w-full max-h-36 rounded-lg px-3 py-4">
                        <div className="flex flex-row justify-between w-full">
                            <p>USE 1 SUNLIGHT</p>
                            <p>10 $SEED</p>
                        </div>
                        <div className="flex flex-row justify-center w-full mt-2">
                            <p className="text-[#00000088]">50 PTS & 12 HOURS TOD</p>
                        </div>
                        <div className="flex flex-row justify-center w-full mt-2">
                            <button className="bg-[#2f3b53] w-48 h-10 rounded-lg">
                                <span className="text-[#fff] font-semibold">BUY</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-2 w-full relative">
                    <img width={200} height={100} className="w-full h-[108px]" src="/assets/background/frame_bottom.png" alt="frame" />
                    <div className="absolute top-2 left-0 flex justify-center w-full">
                        <div className="flex flex-row gap-2 px-1 items-center">
                            <img width={60} className="w-[65px] h-[65px]" src="/assets/button/home.png" alt="button" />
                            <img width={60} className="w-[65px] h-[65px]" src="/assets/button/backpack.png" alt="button" />
                            <img width={90} height={90} className="w-[90px] h-[90px]" src="/assets/button/attack.png" alt="button" />
                            <img width={60} className="w-[65px] h-[65px]" src="/assets/button/house.png" alt="button" />
                            <img width={60} className="w-[65px] h-[65px]" src="/assets/button/training.png" alt="button" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Joygotchi;   