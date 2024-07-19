import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Image from "next/image"
import Link from "next/link"


export default function Browser(){
    return(
        <div className="w-full flex justify-between flex-col bg-[#180E35]">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5">
                    <div className="mt-2">
                        <h5 className="text-white font-semibold text-xl">Digital nomads</h5>
                        <div className="mt-3">
                            <Link href="/digital/potlock" className="flex flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <Image height={20} width={30} src="/assets/potlock.png" className="py-6" alt="potlock" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">Potlock</span>
                                    <small className="text-[#ffffff9e]">PotLock is the portal for public goods, non-profits, and communities to raise funds transparently through our global donor network.</small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h5 className="text-white font-semibold text-xl">Social</h5>
                        <div className="mt-3">
                            <Link href="/social/post" className="flex flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <Image height={20} width={30} src="/assets/near-social.png" className="py-6" alt="near-social" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">Near Social</span>
                                    <small className="text-[#ffffff9e]">Near Social started with a centralized social network based on mastodon.social.</small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                            <Link href="/social/blunt" className="flex mt-2 flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <Image height={20} width={30} src="/assets/blunt-dao.png" className="py-4" alt="bluntdao" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">BluntDao</span>
                                    <small className="text-[#ffffff9e]">BluntDAO is the the biggest IRL onboarding movement to Web3 via Proof of Sesh through local IRL OGs.</small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h5 className="text-white font-semibold text-xl">NFT</h5>
                        <div className="mt-3">
                            <Link href="/wallet/nfts/mint" className="flex flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <Image height={20} width={30} src="/assets/genadrop.svg" className="py-6" alt="genadrop" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">Genadrop</span>
                                    <small className="text-[#ffffff9e]">From the leading blockchains, creative groups, and DAOs, GenaDrop is supported by the industry&#39;s best</small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                            <Link href="/wallet/nfts/mint" className="flex mt-2 flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <img height={20} width={30} src="https://www.mintbase.xyz/favicon.ico" className="py-6" alt="mintbase" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">MintBase</span>
                                    <small className="text-[#ffffff9e]">Mintbase is a global platform and marketplace - like Amazon. The only fully automated Minter + Marketplace on NEAR </small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                        </div>
                    </div>
                    {/* <div className="mt-8">
                        <h5 className="text-white font-semibold text-xl">GameFi</h5>
                        <div className="mt-3">
                            <Link href="/game/joygotchi" className="flex flex-row gap-5 px-3 w-full py-2 items-center bg-black bg-opacity-35 rounded-lg hover:bg-opacity-50">
                                <Image height={20} width={30} src="/assets/joygotchi.svg" className="py-6" alt="ref-finance" />
                                <div className="flex flex-col text-white">
                                    <span className="font-semibold">Joy GotChi</span>
                                    <small className="text-[#ffffff9e]">Engage in a variety of fun mini-games to keep your Joy Gotchi entertained and active.</small>
                                </div>
                                <Image width={15} height={15} src="/assets/arrow-right.svg" alt="arrow"/>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer/>
        </div>
    )
}