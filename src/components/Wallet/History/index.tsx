import Footer from "@/components/Footer";

export default function History(){
    const truncateString = (string = '', maxLength = 50) => 
    string.length > maxLength 
        ? `${string.substring(0, maxLength)}…`
        : string
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <div className="flex w-full items-center bg-[#180E35] py-3 px-4 border-b border-[#20114f] justify-center sticky top-0 z-50">
                <h1 className="text-xl text-center text-[#bdbdbd]">huunhanz.near</h1>
            </div>
            <div className="p-5 mt-5 h-[85vh]">
                <div className="flex flex-row justify-between items-center">
                    <label className="text-md text-[#bdbdbd] font-semibold">2024-05-21</label>
                    <img width={17} src="/images/svg/redo.svg" alt="icon_loading" />
                </div>
                <div className="h-[16vh] flex flex-col justify-between px-5 mt-3 rounded-lg w-full bg-[#2f2649]">
                    <div className="flex flex-row gap-5 mt-4">
                        <img width={35} src="/images/logo/logo.svg" alt="icon" />
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-semibold">Mint</p>
                            <small className="text-[#bdbdbd]">from metor-points.near</small>
                        </div>
                    </div>
                    <div className="text-sm text-[#bdbdbd9c] mt-2 mb-2 flex flex-row justify-between">
                        <small>{truncateString("5Y8PyTRkP8qr13pVUk56s83hX463CLEDRcyaC4hNrBFL",10)}</small>
                        <small>2024-05-21 21:06</small>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}