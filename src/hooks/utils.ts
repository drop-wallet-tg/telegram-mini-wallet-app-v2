export enum TransactionSuccessEnum {
  MINT = "mint",
}

interface CallbackArgs {
  contractAddress: string;
  amount: number;
  ref: string;
}

export const callbackUrl = (
  hash: string,
  transactionType: TransactionSuccessEnum,
  args: CallbackArgs
) =>
  `${window.location.origin}/wallet/nfts/mint/success?signMeta=${encodeURIComponent(
    JSON.stringify({
      type: transactionType,
      args: args,
    })
  )}`;

export const cbUrl = (hash: string, callbackArgs: CallbackArgs) =>
  callbackUrl(hash, TransactionSuccessEnum.MINT, callbackArgs);

