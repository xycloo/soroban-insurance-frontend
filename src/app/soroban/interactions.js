'use client'

import { WalletNetwork } from '@creit.tech/stellar-wallets-kit';
import { ProxyPOST } from './zephyrForwarder';
var StellarSdk = require('@stellar/stellar-sdk');

async function createTransaction(mode, from, amount) {
    const res = await ProxyPOST(JSON.stringify({ mode: { "Function": { fname: "simulate", arguments: JSON.stringify({ [mode]: { from, amount } }) } } }));
    return res;
}

// add a try catch flow
export async function handleTransaction(kit, from, mode, params) {
    // document.getElementById(elementId).innerText = "pending";

    const res = await createTransaction(mode, from, params);
    const { result } = await kit.signTx({ xdr: res.tx, publicKeys: [from], network: WalletNetwork.TESTNET });
    const signedTx = StellarSdk.xdr.TransactionEnvelope.fromXDR(result, "base64");
    const tx = new StellarSdk.Transaction(signedTx, WalletNetwork.TESTNET);

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    console.log("sending")
    const sendResponse = await server.submitTransaction(tx);

    if (sendResponse.successful) {
        // document.getElementById(elementId).innerText = "Successful";
        // document.location.reload(true);
        console.log("successful")
    } else {
        // document.getElementById(elementId).innerText = sendResponse.errorResultXdr;
        console.log("error:", sendResponse.errorResultXdr)

    }
}