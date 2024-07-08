import dynamic from "next/dynamic"

const PotLock = dynamic(()=>import("@/components/PotLock"),{ssr:false})

const PotLockPage = () =>{
    return(
        <PotLock/>
    )
}

export default PotLockPage;