import LinkComponents from "./LinkComponents"

export default function Footer(){
    const Data = [
        {
            link: "/",
            icon: "/images/logo/logo.svg"
        },
        {
            link:"/wallet/nfts",
            icon: "/assets/nfts.svg"
        },
        {
            link: "/wallet/browser",
            icon: "/assets/browser.svg"
        },
        {
            link: "/wallet/history",
            icon: "/assets/history.svg"
        },
        {
            link: "/wallet/setting",
            icon: "/assets/settings.svg"
        }
    ]
    return(
        <div className="bg-[#241a3f] px-5 flex flex-row justify-between items-center h-[10vh] sticky w-full z-10 bottom-0">
            <LinkComponents item={Data}/>
        </div>
    )
}