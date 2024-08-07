import dynamic from "next/dynamic"

const ResetPassword = dynamic(()=>import("@/components/Wallet/Setting/ResetPassword"),{ssr:false})

const ResetPasswordPage = () =>{
    return(
        <ResetPassword/>
    )
}

export default ResetPasswordPage;