import { PublicKey, KeyPair, KeyPairEd25519 } from "@near-js/crypto";
import { SignInOptions } from "./types";
import { actionCreators } from "@near-js/transactions";
import { createAction } from "@/helper/action";
import { AddKeyAction, AddKeyPermission } from "@/helper/types";
import { connectAccount } from "./SDK";

export async function AddKey({
    accountId,
    privateKey,
    contractId,
    methodNames,
    allowance
}:SignInOptions) {
    try{
        const signerAccount = await connectAccount(accountId, privateKey)
        const accessKey = KeyPair.fromRandom("ed25519");
        const permission: AddKeyPermission = { receiverId: contractId as string, methodNames, allowance };
        const actions: AddKeyAction = {
            type: "AddKey",
            params: {
                publicKey: accessKey.getPublicKey().toString(),
                accessKey: { permission },
            },
        };
        const action = createAction(actions);
        const result = await signerAccount.signAndSendTransaction({
            actions: [action],
            receiverId: accountId,
        });
        return result;
    }catch(error){
        console.log("error",error)
    }
}
