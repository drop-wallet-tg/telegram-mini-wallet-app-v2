/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_NETWORK_ID: "mainnet",
        RPC_MAINNET: "https://rpc.mainnet.near.org",
        JWT_PINATA_CLOUD:process.env.JWT_PINATA_CLOUD,
        NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET: process.env.NEXT_PUBLIC_RELAYER_ACCOUNT_ID_NEAR_MAINNET,
        RELAYER_PRIVATE_KEY_NEAR_MAINNET: process.env.RELAYER_PRIVATE_KEY_NEAR_MAINNET,
        KITWALLET_MAINNET: process.env.KITWALLET_MAINNET,
        REFFINANCE_MAINNET: process.env.REFFINANCE_MAINNET,
        SOCIAL_NEAR_MAINNET: process.env.SOCIAL_NEAR_MAINNET,
        MINTBASE_API_MAINNET: process.env.MINTBASE_API_MAINNET,
        MINTBASE_GRAP_MAINNET: process.env.MINTBASE_GRAP_MAINNET,
        GENADROP_MAINNET: process.env.GENADROP_MAINNET,
        BLUNT_MAINNET:process.env.BLUNT_MAINNET,
        BLUNT_PRIVATE_KEY_MAINNET:process.env.BLUNT_PRIVATE_KEY_MAINNET,
        BLUNT_SPUTNIK_DAO_MAINNET:process.env.BLUNT_SPUTNIK_DAO_MAINNET,
        PROXY_ADDRESS:process.env.PROXY_ADDRESS,
        CONTRACT_ADDRESS:process.env.CONTRACT_ADDRESS
    },
};

export default nextConfig;
