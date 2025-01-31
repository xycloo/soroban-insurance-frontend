"use client";

import { xdr, Contract, Address } from "@stellar/stellar-sdk";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { getAssetId } from '@/helpers/aggregation';
import { handleTransaction, publishTx } from "./interactions";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

const kitConfig = {
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: allowAllModules(),
};

export default function Withdraw(props) {
  const [period, setPeriod] = useState("");
  const contractAddress = props.contractId;
  const publicKey = props.publicKey;

  const router = useRouter();

  async function handleWithdraw(e) {
    e.preventDefault();

    // const assetId = getAssetId(contractAddress)
    // const dialogProps = `Deposited ${quantity} ${assetId} into pool: ${contractAddress}`;
    // const loadingDialogProps = `Depositing ${quantity} ${assetId} into pool: ${contractAddress}`

    // const dialogProps = `Deposited ${quantity} into pool: ${contractAddress}`;
    // const loadingDialogProps = `Depositing ${quantity} into pool: ${contractAddress}`;

    // router.push(`?show=${loadingDialogProps}`)
    console.log(`Withdrawing from pool: ${contractAddress}`);
    const kit = new StellarWalletsKit(kitConfig);
    await kit.openModal({
      onWalletSelected: async (option) => {
        kit.setWallet(option.id);
        const publicKey = await kit.getPublicKey();
        await handleTransaction(
          kit,
          "Withdraw",
          { contract: contractAddress, from: publicKey, period },
          publicKey,
        );
      },
    });
  }
  return (
    <div>
      <div className="flex justify-center mr-12">
        <p className="font-light text-xs my-auto ml-1">
          Express quantity in units
        </p>
      </div>
      <form
        className="bg-white mx-auto py-0 !px-0 my-2"
        onSubmit={handleWithdraw}
      >
        <label className="flex justify-center">
          <input
            className="bg-gray-50 border border-gray-200 focus:outline-none focus:border-yellow-100 text-gray-900 text-sm rounded-lg transition duration-300 block w-2/3 mx-1"
            required
            type="number"
            placeholder="Period"
            onChange={(e) => setPeriod(e.target.value)}
            value={period}
          ></input>
          <button className="rounded-lg m-auto w-24 bg-gradient-to-r from-[#6366f1] to-[#9333ea] hover:bg-gradient-to-r hover:from-[#4f46e5] hover:to-[#7e22ce] transition duration-900 ease-in-out text-white mx-1 shadow-md">
            <span className="text-sm">Withdraw</span>
          </button>
        </label>
      </form>
    </div>
  );
}
