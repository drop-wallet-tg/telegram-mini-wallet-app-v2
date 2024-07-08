/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_NETWORK_ID: "mainnet",
        RPC_MAINNET: "https://rpc.mainnet.near.org",
        JWT_PINATA_CLOUD:process.env.JWT_PINATA_CLOUD,
        NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET: process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET,
        RELAYER_PRIVATE_KEY_NEAR_MAINNET: process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET,
        KITWALLET_MAINNET: "https://api3.nearblocks.io/v1/kitwallet",
        REFFINANCE_MAINNET: "https://api.ref.finance/list-token-price",
        SOCIAL_NEAR_MAINNET: "social.near",
        MINTBASE_API_MAINNET: "https://api.mintbase.xyz",
        MINTBASE_GRAP_MAINNET: "https://graph.mintbase.xyz/mainnet",
        GENADROP_MAINNET: "nft.genadrop.near",
        BLUNT_MAINNET:"nft.bluntdao.near",
        BLUNT_PRIVATE_KEY_MAINNET:process.env.BLUNT_PRIVATE_KEY_MAINNET,
        BLUNT_SPUTNIK_DAO_MAINNET: "blunt.sputnik-dao.near",
        PROXY_ADDRESS: "0.minsta.proxy.mintbase.near",
        CONTRACT_ADDRESS:process.env.CONTRACT_ADDRESS,
        JWT_TOKEN:process.env.JWT_TOKEN
    },
};

export default nextConfig;
