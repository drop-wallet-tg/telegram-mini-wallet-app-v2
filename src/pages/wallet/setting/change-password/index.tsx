import dynamic from "next/dynamic"

const ChangePassword = dynamic(()=>import("@/components/Wallet/Setting/ChangePassword"),{ssr:false})

const ChangePasswordPage = () =>{
    return(
        <ChangePassword/>
    )
}

export default ChangePasswordPage;