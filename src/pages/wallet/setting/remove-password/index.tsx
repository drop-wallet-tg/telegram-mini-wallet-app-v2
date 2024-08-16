import dynamic from "next/dynamic"

const RemovePassword = dynamic(import("@/components/Wallet/Setting/RemovePassword"),{ssr:false})

const RemovePasswordPage = () =>{
    return(
        <RemovePassword/>
    )
}

export default RemovePasswordPage;