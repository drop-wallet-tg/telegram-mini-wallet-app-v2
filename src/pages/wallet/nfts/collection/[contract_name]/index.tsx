import dynamic from "next/dynamic"
import { useRouter } from "next/router"
const Information = dynamic(()=>import("@/components/Wallet/NFT/View/Information"),{ssr:false})

export default function ViewCollection(){
    const router = useRouter()
    const params = router.query.contract_name;
    return(
        <Information params={params as string}/>
    )
}