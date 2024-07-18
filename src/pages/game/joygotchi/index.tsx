import { Silkscreen as FontSilkscreen} from "next/font/google"

const Silkscreen = FontSilkscreen({
    subsets: ["latin"],
    weight:"400",
})

const Joygotchi = () =>{
    return(
        <div className={`${Silkscreen.className} flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8]  md:w-[380px] h-full">
                <div className="p-3">
                    <div className="flex flex-row justify-between items-center">
                        <button>
                            <img width={35} src="/assets/menu_game.svg" alt="menu" />
                        </button>
                        <button>
                            <img width={35} src="/assets/handbag.png" alt="handbag" />
                        </button>
                    </div>
                    <div className="mt-14 px-14">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row gap-2">
                                <img width={25} src="/assets/heart.png" alt="heart" />
                                <img width={25} src="/assets/heart.png" alt="heart" />
                                <img width={25} src="/assets/heart.png" alt="heart" />
                            </div>
                            <div className="flex flex-row gap-2">
                                <img width={25} src="/assets/status.png" alt="status" />
                                <img width={25} src="/assets/status.png" alt="status" />
                                <img width={25} src="/assets/status.png" alt="status" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="w-full h-[250px] rounded-md relative">
                                <img width={120} className="w-full h-full rounded-md" src="/assets/background/screen_pet.png" alt="screen" />
                                <img width={100} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="/assets/pet/pet.png" alt="pet" />
                                <img width={45} className="absolute top-2/3 right-2/3 " src="/assets/items/food.png" alt="item" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="w-full h-[150px] relative">
                                <img width={120} height={120} className="w-full h-full" src="/assets/background/frame.png" alt="frame" />
                                <div className="absolute top-8 left-0 w-full">
                                    <div className="flex flex-row gap-3 px-14 justify-between w-full items-center">
                                        <img width={10} height={10} className="w-[12px] h-[20px]" src="/assets/arrow_left.png" alt="arrow_left" />
                                        <img width={45} src="/assets/items/food.png" alt="item" />
                                        <img width={10} height={10} className="w-[12px] h-[20px]"  src="/assets/arrow_right.png" alt="arrow_right" />
                                    </div>
                                </div>
                                <div className="absolute top-1/2 mt-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <small className="text-sm">Chicken</small>
                                </div>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <button>
                                        <img width={75} src="/assets/button/feed.png" alt="button" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="mt-4 w-full h-full relative">
                    <img width={200} height={100} className="w-full h-[108px]" src="/assets/background/frame_bottom.png" alt="frame" />
                    <div className="absolute top-2 left-0">
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