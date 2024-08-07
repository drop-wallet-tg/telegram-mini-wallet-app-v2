"use client"
import Header from "@/components/Header";
import Link from "next/link"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk"

const ResetPassword = () =>{
    const [question, setQuestion] = useState<string|null>(null)
    const [currentAnswer, setCurrentAnswer] = useState<string|null>(null)
    const [answer, setAnswer] = useState<string|null>(null)
    const [password, setPassword] = useState<string|null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isDisabled, setIsDisable] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        WebApp.CloudStorage.getItems(["question","answer","passwordScreen"],(err,rs:any)=>{
            setQuestion(rs.question)
            setAnswer(rs.answer)
            setPassword(rs.passwordScreen)
        })
    },[])

    const changeCurrentAnswer = (event:any)=>{
        const currentAnswer = event.target.value;
        if(currentAnswer.length > 0){
            setIsDisable(false)
            setCurrentAnswer(currentAnswer)
        }else{
            setCurrentAnswer("")
        }
    }

    const onReset = () =>{
        if(currentAnswer === answer){
            setIsCorrect(true)
            setShowPassword(true)
        }else{
            setError("<b>Answer was incorrect</b>")
            setTimeout(() => {
                setError(null)
            }, 1300);
        }
    }

    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <Header/>
            {
                error&&(
                    <div className="absolute w-full top-16 left-0">
                        <div className="bg-red-200 px-4 py-2 my-4 w-2/3 rounded-md text-lg flex gap-2 items-center mx-auto max-w-lg">
                            <img width={18} src="/assets/icon/error.svg" alt="icon" />
                            <div className="text-[#E32636] text-sm" dangerouslySetInnerHTML={{__html:error as string}}/>
                        </div>
                    </div>
                )
            }
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href={`${isCorrect?"/home":"/"}`}>
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Reset Password</label>
                </div>
                <div className="mt-12 text-white">
                    <h2 className="text-white font-bold text-2xl">Password hint</h2>
                    <span className="text-sm text-[#8a8989]">You need to answer the question to get the password</span>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <input value={question as string} disabled type="text" className={` w-full px-5 py-3 bg-black bg-opacity-30 rounded-full outline-none placeholder:text-[#9191918a]`} placeholder="Question" />
                        </div>
                        <input value={currentAnswer as string} onChange={changeCurrentAnswer} type="text" className={` w-full px-5 py-3 bg-black bg-opacity-30 rounded-full outline-none placeholder:text-[#9191918a]`} placeholder="Answer" />
                    </div>
                </div>
                {showPassword&&(
                    <div className="mt-5 text-white">
                        <span>Your password is: <strong className="font-bold">{password}</strong></span>
                    </div>
                )

                }
                <div className="mt-10">
                    <button onClick={onReset} disabled={isDisabled}  className="px-3 py-2 w-full rounded-full bg-[#411EDF] mt-4 hover:bg-opacity-85 disabled:bg-opacity-55 disabled:text-[#c2c2c2] text-[#fff] ">
                        <span className="font-semibold">Reset password</span>
                    </button>
                </div>
            </div>
            {status&&(
                <div className="bg-[#ACE1AF] px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                    <svg viewBox="0 0 24 24" className="text-[#00A86B] w-5 h-5 sm:w-5 sm:h-5 mr-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-[#00A86B] text-sm" dangerouslySetInnerHTML={{__html:status as string}}/>
                </div>
            )}
        </div>
    )
}

export default ResetPassword;