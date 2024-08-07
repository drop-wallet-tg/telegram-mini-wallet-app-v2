const { KeyPair } = require('@near-js/crypto');
import { connects, getNearAccount} from '@/helper/meta-transaction';
const { InMemoryKeyStore } = require('@near-js/keystores');
const { actionCreators,encodeSignedDelegate } = require("@near-js/transactions");
const { generateSeedPhrase } = require('near-seed-phrase');
const axios = require("axios");
const BN = require("bn.js");
const formData = require("form-data");
const { Readable } = require("stream");
const {Big} = require('big.js');
const nearAPI = require("near-api-js");
const dotenv = require("dotenv");
import {
  ArweaveResponse,
  uploadFile,
  uploadReference,
} from "@mintbase-js/storage";


dotenv.config();


export const submitTransaction = async(delegate:any)=>{
  try{
    const {data} = await axios.post(
      "https://wallet.dropwallet.org/relay", {
      delegate: JSON.stringify(Array.from(encodeSignedDelegate(delegate)))
    }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }
    );
    return data;
  }catch(error){
    return error;
  }
  
}

export const MintBase = async({ accountId,privateKey,title, description,media }:{accountId: string, privateKey: string,title: string , description: string, media: ((false | File) & (false | File | undefined)) | null})=>{
  const keyStore = new InMemoryKeyStore();
    
  await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
  const signerAccount = await connects(accountId, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID);

  const reference = await uploadReference({
    title: title,
    description: description,
    media: media as unknown as File,
  });
  const file = uploadFile(media as unknown as File);

  

  const delegate =  await handleMint(
    reference.id,
    file,
  );

  async function handleMint(
    reference: string,
    media: Promise<ArweaveResponse>,
  ) {
  
    if (reference) {
      const args = {
        metadata: JSON.stringify({
          reference,
          media: (await media).id,
        }),
        nft_contract_id: process.env.CONTRACT_ADDRESS as string,
      };
      
      const action = actionCreators.functionCall(
        "mint",
        args,
        new BN("200000000000000"),
        new BN("10000000000000000000000")
      );
    
      const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 60,
        receiverId: process.env.NEXT_PUBLIC_NETWORK_ID == "mainnet" ? process.env.PROXY_ADDRESS: process.env.PROXY_ADDRESS ,
      });
      return delegate;
    }
  }
  return delegate;
}

export const signerAccount = async() =>{
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET: process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET , KeyPair.fromString( process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET: process.env.RELAYER_PRIVATE_KEY_NEAR_TESTNET ));
  const signerAccount = await connects(process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET as string : process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET as string , keyStore,process.env.NEXT_PUBLIC_NETWORK_ID );
  return signerAccount;
}

export const CreateAccount = async(accountId:any) => {
    console.log("accountid: ",accountId)
    const keyStore = new InMemoryKeyStore();
    await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET: process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET , KeyPair.fromString( process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET: process.env.RELAYER_PRIVATE_KEY_NEAR_TESTNET ));
    const signerAccount = await connects(process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET as string : process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_TESTNET as string , keyStore,process.env.NEXT_PUBLIC_NETWORK_ID );
    
    if(!signerAccount){
        throw new Error("Account not defined");
    }
    const {seedPhrase, publicKey, secretKey} = generateSeedPhrase()
    const gas = "200000000000000";
    const deposit = "0";
    const argsWithSocial = {
      new_account_id: accountId,
      options: {
          contract_bytes: null,
          full_access_keys: [
          publicKey
          ],
          limited_access_keys: [
          {
              allowance: "250000000000000",
              method_names: "",
              public_key: "ed25519:FQzxfWrjAy1C62hL4cc47cRpUdnrLinajj69yLjwB2DG",
              receiver_id: "social.near"
          }
          ]
      }
    }
    const action = actionCreators.functionCall(
        "create_account_advanced",
        argsWithSocial,
        new BN(gas),
        new BN(deposit)
    );
    const near = await getNearAccount(process.env.NEXT_PUBLIC_NETWORK_ID,keyStore,process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET as string)
    const signedDelegates = await near.signedDelegate({
        actions: [action],
        blockHeightTtl:60,
        receiverId: "near",
    });
    
    
    return {signedDelegates,privateKey: secretKey,seed:seedPhrase};
}
export const stateAccounts = async(accountId:string) => {
    try {
        const provider = new nearAPI.providers.JsonRpcProvider({ url: process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.RPC_MAINNET : process.env.RPC_TESTNET });
        let res = await provider.query({
            request_type: "view_account",
            finality: "final",
            account_id: accountId,
        });
        return res;
    } catch (error) {
        return error
    } 
}

export const getAccount = async(pub:string)=>{
  try{
    const account = (await fetch(`https://api.nearblocks.io/v1/kitwallet/publickey/${pub}/accounts`)).json();
    return account;
  }catch(error){
    return error;
  }
}

export async function getState(accountId:string) {
    const response = await stateAccounts(accountId);
    return {response};
}

export const getAmount = async(accountId:string) => {
    try {
        const provider = new nearAPI.providers.JsonRpcProvider({ url: process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.RPC_MAINNET : process.env.RPC_TESTNET });
        let res = await provider.query({
            request_type: "view_account",
            finality: "final",
            account_id: accountId,
        });
        return res.amount
    } catch (error) {
        return 0
    } 
}

export const viewMethod = async(data:any) => {
  try {
    const provider = new nearAPI.providers.JsonRpcProvider({ url: process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.RPC_MAINNET : process.env.RPC_TESTNET  });
    let res = await provider.query({
      request_type: 'call_function',
      account_id: data.contractId,
      method_name: data.method,
      args_base64: Buffer.from(JSON.stringify(data.args)).toString('base64'),
      finality: 'final',
    });
    return JSON.parse(Buffer.from(res.result).toString())
  } catch (error) {
    return 0
  } 
}

export const getToken = async(accountId:string) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.KITWALLET_MAINNET  : process.env.KITWALLET_TESTNET }/account/${accountId}/likelyTokensFromBlock?fromBlockTimestamp=0`); 
    const tokenPrice  = (await axios.get(`${process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet"  ? process.env.REFFINANCE_MAINNET  : process.env.REFFINANCE_TESTNET}`)).data;
    const contractData = data.list;
    const nearBalance =  await getAmount(accountId)
    let token  =[];
    const nearMetadata = {
    spec: 'ft-1.0.0',
    name: 'NEAR',
    symbol: 'NEAR',
    icon: "/assets/near.svg",
    reference: null,
    reference_hash: null,
    decimals: 24
    }
    const parsedNearBalance = Big(nearBalance)
        .div(Big(10).pow(nearMetadata.decimals))
        .toFixed(5);
        
    const nearUsdPrice = parseFloat(tokenPrice['wrap.near'].price);
    
    const nearBalanceInUsd = parseFloat(parsedNearBalance) * nearUsdPrice ;
    
    const contract = 'NEAR'
    if(nearBalanceInUsd){
    token.push({
        ...nearMetadata,
        balance: parsedNearBalance,
        nearUsdPrice,
        contract,
        balanceInUsd: nearBalanceInUsd ? nearBalanceInUsd.toFixed(2) : null,
    })  ;
    }
    
    for (let contract of contractData) {
    const ftMetadata = await viewMethod({contractId:contract,method:"ft_metadata" ,args:{}});
    
    const ftBalance = await viewMethod({contractId:contract,method:"ft_balance_of" ,args:{
        account_id: accountId,
        }});
    
    
    const parsedBalance  = ''
    if (ftBalance && ftMetadata) {
        Big(ftBalance)
        .div(Big(10).pow(ftMetadata.decimals))
        .toFixed(5);
    }
    
    let usdPrice = 0;
    let balanceInUsd = null;
    if( tokenPrice[contract]){
        usdPrice = parseFloat(tokenPrice[contract].price);
        balanceInUsd = parseFloat(parsedBalance) * usdPrice;
    }

    if( balanceInUsd){
    token.push({
        ...ftMetadata,
        balance: parsedBalance,
        usdPrice,
        contract,
        balanceInUsd: balanceInUsd ? balanceInUsd.toFixed(2) : null,
    })  ;
    }

    }
    return token;
}

export async function CheckBalance(accountId:string) {
    try {
        const token = await getToken(accountId);
        return token;
    } catch (error) {
        return error;
    }
}

export async function getNFT(accountId:string) {
    const operationsDoc = `
    query MyQuery {
        mb_views_nft_tokens(
        where: {owner: {_eq: "${accountId}"}}
        limit: 30
        order_by: {last_transfer_timestamp: desc}
        ) {
        token_id
        nft_contract_id
        nft_contract_name
        title
        description
        media
        last_transfer_receipt_id
        }
    }
    `;
    const result = await fetch(
        process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.MINTBASE_GRAP_MAINNET as string: process.env.MINTBASE_GRAP_TESTNET as string,
        {
            headers: {
                "mb-api-key": "omni-site",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
            query: operationsDoc,
            variables: {},
            operationName: "MyQuery"
            })
        }
        );



    const nftOwnedList = await result.json();

    let nft:any  = {};
    nftOwnedList.data.mb_views_nft_tokens.forEach((item:any)=> {

    if(nft[item.nft_contract_id]){
        nft[item.nft_contract_id].push(item);
    }else{
        nft[item.nft_contract_id]=[];
        nft[item.nft_contract_id].push(item);
    }

    });


    return {data:{nft:nft}};
}

export async function uploadIPFS(dt:any) {
    const JWT = process.env.JWT_PINATA_CLOUD;
    try {
        const response = await axios(dt, { responseType: 'arraybuffer' })
        const buffer64 = Buffer.from(response.data, 'binary');
        const stream = Readable.from(buffer64);
        const data = new formData();
        data.append('file', stream, {
        filepath: 'nft.jpg'
        })

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxBodyLength: Infinity,
          headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              Authorization: `Bearer ${JWT}`,
          }
        });
      //const { IpfsHash } = await res.json();
    return { data:{cid:res.data.IpfsHash }};
} catch (error) {
    return {error};
}
}

async function syncProfile(accountId:string,privateKey:string , tgUserName:string , tgName:string , tgUserBio:string , tgPicprofile:string , tgBackground:string) {
    const keyStore = new InMemoryKeyStore();

    await keyStore.setKey( process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore,  process.env.NEXT_PUBLIC_NETWORK_ID );
    
    const gas = "300000000000000";
    const deposit = "50000000000000000000000";

    const args = {
    data: {
    [accountId]: {
        profile: {
            name:  tgName,
            description: tgUserBio,
            linktree: {
                telegram: tgUserName,
            },
            image: {
                ipfs_cid: tgPicprofile
            },
            tags: {
                dropwallet: "",
                near: "",
                genadrop: ""
            }
            }
        }
    }

}

    const action = actionCreators.functionCall(
        "set",
        args,
        new BN(gas),
        new BN(deposit)
    );

    const delegate = await signerAccount.signedDelegate({
    actions: [action],
    blockHeightTtl: 60,
    receiverId:  process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.SOCIAL_NEAR_MAINNET  : process.env.SOCIAL_NEAR_TESTNET,
    });
    
    return delegate;
}

export async function connectAccount(accountId: string, privateKey: string){
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
  const signerAccount = await connects(accountId, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID);
  return signerAccount;
}

export async function transferToken(privateKey:string, accountId:string ,receiverId:string , amount:string , tokenContract:string) {
    const keyStore = new InMemoryKeyStore();
    
    await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID);
  
    if(tokenContract == 'NEAR'){
    //const newAmount = (parseInt(amount)-50000000000000000000).toLocaleString('fullwide', {useGrouping:false}) ;
      try {
        if(signerAccount){
          const tx = await signerAccount.sendMoney(receiverId,amount);
          return tx;
        }
      } catch (error) {
          return {error};
      }
    }else{
        const gas = "300000000000000";
        const deposit = "1";
        const args  = {
            amount: amount,
            receiver_id: receiverId,
        }
        const action = actionCreators.functionCall(
        "ft_transfer",
        args,
        gas,
        deposit
        );
        const deserializeDelegate = await signerAccount.signedDelegate({
            actions: [action],
            blockHeightTtl: 60,
            receiverId: tokenContract,
        });
        return deserializeDelegate;
    }
}

export async function getVibe(accountId:string,cid:string,privateKey:string,friendliness:string,energy:string,density:string,diversity:string,content:string) {
    const keyStore = new InMemoryKeyStore();
    const findHashtags = (searchText:any) =>{
      const regexp = /\B\#\w\w+\b/g
      const result = searchText.match(regexp) || [];
          return result;
      }
    await keyStore.setKey( process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore,  process.env.NEXT_PUBLIC_NETWORK_ID );
  
    const tags = findHashtags(content);
    const tagsArg = [];
    tagsArg.push( {
      key:"proofofvibes",
      value:{
          type:"social",
          path:`${accountId}/post/main`
      }
  })
  tagsArg.push( {
    key:"ProofOfVibes",
    value:{
    type:"social",
    path:`${accountId}/post/main`}
  })
  tagsArg.push(  {
    key:"Drop Wallet",
    value:{
        type:"social",
        path:`${accountId}/post/main`
    }
  })
    tags.forEach((element:any) => {
      tagsArg.push({
          key: element,
          value: {
              type: "social",
              path: `${accountId}/post/main`
          }
      })
    });
    const gas = "300000000000000";
    const deposit = "50000000000000000000000";
    let args  = {
        data: {
          [accountId]: {
            post: {
              main: JSON.stringify({
                type:"md",
                image:{
                    ipfs_cid:cid
                },
                text:`#ProofOfVibes #   @proofofvibes.near ${content} \n ## **Vibe-rating**  ❤️ **Friendliness:** ${friendliness}/10 ⚡️ **Energy:** ${energy}/10 🧊 **Density:** ${density}/10 🌈 **Diversity:** ${diversity}/10`,
                metadata:{
                    tastemaker:[]
                }
            }),
            rating: `${parseInt(friendliness)+parseInt(energy)+parseInt(density)+parseInt(diversity)}`,
            friendliness: `${friendliness}0`,
            energy: `${energy}0`,
            density: `${density}0`,
            diversity: `${diversity}0`
            },
            index: {
              post: JSON.stringify({key:"main",value:{type:"md"}}),
              hashtag: JSON.stringify(tagsArg),
              notify: JSON.stringify({
                key:"proofofvibes.near",
                value:{
                    type:"mention",
                    item:{
                        type:"social",
                        path:`${accountId}/post/main`
                    }
                }
            })
            }
          }
        }
      
    }
    const action = actionCreators.functionCall(
        "set",
        args,
        new BN(gas),
        new BN(deposit)
    );
    const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 600,
        receiverId:  process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet" ? process.env.SOCIAL_NEAR_MAINNET : process.env.SOCIAL_NEAR_TESTNET ,
    });
    return delegate;
}

export async function mintNFT(accountId:string,  title:string, description:string ,cid:string,privateKey:string,receiverNFT:string , tokenId:string) {

    const keyStore = new InMemoryKeyStore();
  
    await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID , accountId, KeyPair.fromString(privateKey));
  
    const signerAccount = await connects(accountId, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID);
   
  
    const gas = "300000000000000";
    const deposit = "10000000000000000000000";
    const data = JSON.stringify({
      "name": title,
      "description": description,
      "image": `ipfs://${cid}`,
      "image_integrity": "r+xt9t8/MXEvI5fg4JIcb4+iskjgljeb2KWafdaRHoU=",
      "image_mimetype": "image/png",
      "animation_url": "",
      "animation_url_integrity": "sha256-",
      "animation_url_mimetype": "",
      "properties": [
          {
              "trait_type": "File Type",
              "value": "image/png"
          }
      ]
  });
  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.JWT_PINATA_CLOUD}`
    },
    data: data
  };
    const ipfsJson = await axios(config);
     const args = {
          token_id: tokenId,
          metadata: {
            title: title,
            description: description,
            media: `https://gateway.pinata.cloud/ipfs/${cid}`,
            reference: `ipfs/${ipfsJson.data.IpfsHash}`,
          },
          receiver_id: receiverNFT
        }
        
    const action = actionCreators.functionCall(
        "nft_mint",
        args,
        new BN(gas),
        new BN(deposit)
    );

    const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 60,
        receiverId: process.env.NEXT_PUBLIC_NETWORK_ID == "mainnet" ? process.env.GENADROP_MAINNET: process.env.GENADROP_TESTNET ,
    });
    return delegate;
}

export async function postSocial(accountId:string,cid:string,privateKey:string,content:string) {
    const findHashtags = (searchText:string) =>{
      const regexp = /\B\#\w\w+\b/g
      const result = searchText.match(regexp) || [];
      return result;
    }
    const tags = findHashtags(content);
    const tagsArg:any = [];
    tags.forEach((element) => {
      tagsArg.push({
          key: element,
          value: {
              type: "social",
              path: `${accountId}/post/main`
          }
      })
    });
  
    const keyStore = new InMemoryKeyStore();
  
    await keyStore.setKey( process.env.NEXT_PUBLIC_NETWORK_ID , accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore,  process.env.NEXT_PUBLIC_NETWORK_ID );
    
    const gas = "300000000000000";
    const deposit = "30000000000000000000000";
    let args  = null
    if(cid){
      args  = {
        data:{
          [accountId]: {
            post: {
                main:JSON.stringify({
                    type: "md",
                    text: `${content} ![](https://ipfs.near.socail/ipfs/${cid})`,
                    image: {
                        ipfs_cid: cid
                    }
                })
            },
            index: {
                post: JSON.stringify( {
                    key: "main",
                    value: {
                        type: "md"
                    }
                }),
                hashtag:JSON.stringify(tagsArg)
            }
        }
        }
  
      }
    }else{
      args  = {
        data:{
          [accountId]: {
            post: {
                main:JSON.stringify({
                    type: "md",
                    text: content,
                })
            },
            index: {
                post: JSON.stringify( {
                    key: "main",
                    value: {
                        type: "md"
                    }
                }),
                hashtag:JSON.stringify(tagsArg)
            }
        }
        }
  
      }
    }
    
  
    const action = actionCreators.functionCall(
        "set",
        args,
        new BN(gas),
        new BN(deposit)
      );
  
      const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 600,
        receiverId:  process.env.NEXT_PUBLIC_NETWORK_ID  =="mainnet" ? process.env.SOCIAL_NEAR_MAINNET  : process.env.SOCIAL_NEAR_TESTNET ,
      });
    return delegate;
}

export async function getNFTBlunt(accountId:string) {
    const operationsDoc = `
    query MyQuery {
        mb_views_nft_tokens(
          where: {_and: {nft_contract_id: {_eq: "nft.bluntdao.near"}}, owner: {_eq: "${accountId}"}}
          limit: 30
          order_by: {last_transfer_timestamp: desc}
        ) {
          token_id
          nft_contract_id
          title
          description
          media
          last_transfer_receipt_id
        }
      }
      
  `;
    const result = await fetch(
      process.env.NEXT_PUBLIC_NETWORK_ID  == "mainnet" ? process.env.MINTBASE_GRAP_MAINNET as string : process.env.MINTBASE_GRAP_TESTNET as string,
        {
            headers: {
                "mb-api-key": "omni-site",
                "Content-Type": "application/json"
            },
          method: "POST",
          body: JSON.stringify({
            query: operationsDoc,
            variables: {},
            operationName: "MyQuery"
          })
        }
      );
  
  
  
  const nftOwnedList = await result.json();
  
  let nft:any = {};
  nftOwnedList.data.mb_views_nft_tokens.forEach((item:any)=> {
    
    if(nft[item.nft_contract_id]){
        nft[item.nft_contract_id].push(item);
    }else{
        nft[item.nft_contract_id]=[];
        nft[item.nft_contract_id].push(item);
    }
    
  });
    
  
    return {data:{nft}};
}


export async function mintBlunt(accountId: string, seriesId:string) {
    const keyStore = new InMemoryKeyStore();
  
    await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID , process.env.BLUNT_MAINNET, KeyPair.fromString(process.env.BLUNT_PRIVATE_KEY_MAINNET ));
  
    const signerAccount = await connects(process.env.BLUNT_MAINNET as string, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID );
   
  
    const gas = "300000000000000";
    const deposit = "10000000000000000000000";
    
     const args  = {
      receiver_id: accountId,
              id: seriesId +"",
        }
        
  
  try {
    const action = actionCreators.functionCall(
      "nft_mint",
      args,
      new BN(gas),
      new BN(deposit)
    );
  
    const delegate = await signerAccount.signedDelegate({
      actions: [action],
      blockHeightTtl: 600,
      receiverId: process.env.NEXT_PUBLIC_NETWORK_ID == "mainnet" ? process.env.BLUNT_MAINNET: process.env.BLUNT_TESTNET,
    });
  
    return delegate;
  } catch (error) {
    console.log(error)
    return {error}
  }
}

export async function addBlunt(accountId:string, seriesId:string ,privateKey:string , nonce:string) {
    const keyStore = new InMemoryKeyStore();
  
    await keyStore.setKey( process.env.NEXT_PUBLIC_NETWORK_ID , accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore,  process.env.NEXT_PUBLIC_NETWORK_ID );
  
    const gas = "300000000000000";
    const deposit = "10000000000000000000000";
  
     const args = {
      proposal: {
        description: `https://near.social/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${nonce}`,
        kind: {
          AddMemberToRole: {
          member_id: accountId,
            role: seriesId
          }
        }
      }
    }
        
    const action = actionCreators.functionCall(
        "add_proposal",
        args,
        new BN(gas),
        new BN(deposit)
      );
  
      const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 60,
        receiverId: process.env.NEXT_PUBLIC_NETWORK_ID == "mainnet" ? process.env.BLUNT_SPUTNIK_DAO_MAINNET : process.env.BLUNT_SPUTNIK_DAO_TESTNET ,
      });
    return delegate;
}  

export async function followBlunt(accountId:string,privateKey:string) {
    const keyStore = new InMemoryKeyStore();
  
    await keyStore.setKey( process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
    const signerAccount = await connects(accountId, keyStore,  process.env.NEXT_PUBLIC_NETWORK_ID);
  
    const gas = "300000000000000";
    const deposit = "20000000000000000000000";
  
    const args ={
      data:{
          [accountId]: {
              graph: {
                follow: {
                  "bluntdao.near": ""
                }
              },
              index: {
                graph: {key:"follow",value:{type:"follow",accountId:"bluntdao.near"}},
                notify: {key:"bluntdao.near",value:{type:"follow"}}
              }
            }
      } 
    }
  
    const action = actionCreators.functionCall(
        "set",
        args,
        new BN(gas),
        new BN(deposit)
      );
  
      const delegate = await signerAccount.signedDelegate({
        actions: [action],
        blockHeightTtl: 600,
        receiverId:  process.env.NEXT_PUBLIC_NETWORK_ID  =="mainnet" ? process.env.SOCIAL_NEAR_MAINNET : process.env.SOCIAL_NEAR_TESTNET,
      });
      return delegate;
}

export async function transferNFT(privateKey:string, accountId :string,receiverId:string , tokenId:string ,nftContractId:string){
  const keyStore = new InMemoryKeyStore();

  await keyStore.setKey(process.env.NEXT_PUBLIC_NETWORK_ID, accountId, KeyPair.fromString(privateKey));
  const signerAccount = await connects(accountId, keyStore, process.env.NEXT_PUBLIC_NETWORK_ID);
  

  const gas = "200000000000000";
  const deposit = "1";

   const args  = {
        token_id: tokenId,
        receiver_id: receiverId,
      }
  const action = actionCreators.functionCall(
      "nft_transfer",
      args,
      new BN(gas),
      new BN(deposit)
    );

    const delegate = await signerAccount.signedDelegate({
      actions: [action],
      blockHeightTtl: 60,
      receiverId: nftContractId,
    });

  return delegate;
}

