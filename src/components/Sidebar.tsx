import Account from "./Account";

export default function Sidebar({account,isShow,setIsShow}:{account:string,isShow:boolean,setIsShow:any}){
    const DataAccount = JSON.parse(localStorage.getItem("accounts") as string)??[];
    function strucate(str: string){
        let account;
        if(str){
            if(str.length > 30){
                const format = str.replace(".near","");
                account = format.slice(0,3)+'...'+format.slice(-3);
            }else{
                account = str;
            }
        }
        return account as string;
    }

    // const DataAccount = [
    //     {
    //         name:"nhanzzz.near",
    //         privateKey: "ed25519:KaADukwkqm55JSUKLH7zxkbEvJ3GN75oAtL3rBzwWvJdtNE6T2WUWqM9vBPDke1YCJ5TBbfhFzrszYqpP1hAE13"
    //     },
    //     {
    //         name:"hnazzz.near",
    //         privateKey: "ed25519:2TVLPgnhwahxvA7RZxoVMNrwoXuxyKenr5zN8HLPnYYSSgNXLdZnUQzkyhFCGR85juy9NEKVuq2ZG95eamDdyYRA"
    //     },
    //     {
    //         name:"8d6a281d6f530ad969196534364240e0d536b43c7059ae15e8550bb2af6d871d",
    //         privateKey: "ed25519:65jfL25QqEHj9mhr5dNu63YXmHEowbQcqsyTJwRAAkQTBiZGKwo7qsg8fRzRSbWVsVW457VjbXCxbnzTtV9vcjue"
    //     },
    // ]

    return(
        isShow&&(
            <div className="fixed z-50 h-screen bg-black bg-opacity-50 w-full top-0 start-0 bottom-0 transition-all duration-300 transform  overflow-hidden lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                <div className="bg-[#180E35] border-e border-[#180E35] pt-7 pb-10 w-64 h-screen relative rounded-r-lg">
                    <div className="absolute top-2 right-2">
                        <button onClick={()=>setIsShow(false)}>
                            <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#ffffff"></path> </g></svg>
                        </button>
                    </div> 
                    <div className="flex flex-col mt-6 gap-3 items-center px-2">
                        <div className="h-30 w-30 rounded-full p-3 bg-[#ffffff1a]">
                            <img width={55} src="/images/logo/logo.svg" alt="icon" />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            <label className="text-white font-semibold text-2xl">{strucate(account).includes(".near")?strucate(account).replace(".near",""):strucate(account)}</label>
                            <small className="text-[#bdbdbd] font-semibold text-sm">{strucate(account)}</small>
                        </div>
                    </div>  
                    <div className="flex flex-col gap-3 px-5 mt-7">
                        <Account data={DataAccount}/>
                    </div> 
                    <div className="absolute z-50 bottom-8 border-t border-gray-100 border-opacity-20 pt-10 w-full items-center justify-center flex">
                        <div className="flex flex-col gap-7">
                            <button onClick={()=>location.replace("/wallet/import-wallet")} className="rounded-full before:ease relative h-12 w-56 overflow-hidden border border-blue-500 bg-blue-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 hover:before:-translate-x-40">
                                <div className="flex flex-row items-center px-5">
                                    <img width={33} src="/assets/add.svg" alt="add" />
                                    <div className="m-auto">
                                        <span className="relative z-10 font-semibold text-lg">Add Wallet</span>
                                    </div>
                                </div>
                            </button>
                            <button onClick={()=>location.replace("/wallet/setting")} className="rounded-full before:ease relative h-12 w-56 overflow-hidden border border-gray-500 bg-gray-500 bg-opacity-20 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40">
                                <div className="flex flex-row items-center px-5">
                                    <img width={23} src="/assets/setting.svg" alt="add" />
                                    <div className="m-auto">
                                        <span className="relative z-10 font-semibold text-lg">Setting</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>        
                </div>
            </div>
        )
    )
}