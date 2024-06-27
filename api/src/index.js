const { submitTransaction}=require('../helper/utils/meta-transactions');
const {SignedDelegate }=require("@near-js/transactions");
const {SCHEMA} =require('../helper/utils/types/near-schema');
const { deserialize }=require('borsh');
const dotenv = require("dotenv");
dotenv.config();
// near call mainnet create_account '{"new_account_id": "kurodenjiro699.near", "new_public_key": "ed25519:"}' --deposit 0.00182 --accountId kurodenjiro.near
async function releyTransaction(delegate) {
  try {
    //const result = await relay(delegate)
    const deserializeDelegate = deserialize(
      SCHEMA,
      SignedDelegate,
      Buffer.from(new Uint8Array(delegate))
    );
    console.log("deserializeDelegate: ",deserializeDelegate)
    const result = await submitTransaction({
      delegate: deserializeDelegate,
      network: process.env.NEXT_PUBLIC_NETWORK_ID,
    });
    console.log("result",result)
    return {result};
  } catch (error) {
    return error;
  }

}
module.exports={
  releyTransaction,
}