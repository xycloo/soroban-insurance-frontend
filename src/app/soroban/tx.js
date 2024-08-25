/*
import { xdr, TransactionBuilder, Transaction, Networks, BASE_FEE, SorobanRpc, Horizon } from '@stellar/stellar-sdk'
import { ProxyPOST } from './zephyrForwarder';
import {
    StellarWalletsKit,
    WalletNetwork,
    allowAllModules,
    XBULL_ID,
    ISupportedWallet
} from '@creit.tech/stellar-wallets-kit';

const kitConfig = {
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
};

export async function handleTransaction(kit, from, mode, params, elementId) {

    console.log("pending...")
    const res = await createTransaction(mode, from, params);
    const { result } = await kit.signTx({ xdr: res.tx, publicKeys: [from], network: WalletNetwork.TESTNET });
    const signedTx = StellarSdk.xdr.TransactionEnvelope.fromXDR(result, "base64");
    const tx = new StellarSdk.Transaction(signedTx, WalletNetwork.TESTNET);

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const sendResponse = await server.submitTransaction(tx);

    if (sendResponse.successful) {
        // document.getElementById(elementId).innerText = "Successful";
        console.log("successful")
        // document.location.reload(true);
    } else {
        // document.getElementById(elementId).innerText = sendResponse.errorResultXdr;
        console.log("error:", sendResponse.errorResultXdr);
    }
}

async function createTransaction(mode, from, amount) {
    const res = await ProxyPOST(JSON.stringify({ mode: { "Function": { fname: "simulate", arguments: JSON.stringify({ [mode]: { from, amount } }) } } }));
    return res;
}

/*
export const publishTx = async (mode, from, params) => {

    return new Promise(async (resolve, reject) => {
        try {
            const res = await createTransaction(mode, from, params);

            // const unsignedXdr = preparedTransaction.toXDR()

            const simpleSignerUrl = process.env.NEXT_PUBLIC_SIGNER_URL;

            async function openSignWindow(xdr) {
                const signWindow = window.open(
                    `${simpleSignerUrl}/sign/?xdr=${res.tx}`,
                    'Sign_Window',
                    'width=360, height=700',
                );

                window.addEventListener('message', (e) => {
                    if (e.origin !== simpleSignerUrl) {
                        return;
                    } else if (signWindow && e.data.type === 'onReady') {
                        signWindow.postMessage(
                            { xdr },
                            simpleSignerUrl,
                        );
                    }
                });

                return signWindow;
            }

            console.log(res.tx)
            openSignWindow(res.tx)

            async function handleMessage(e) {

                if (
                    e.origin === simpleSignerUrl &&
                    e.data.type === 'onSign' &&
                    e.data.page === 'sign'
                ) {
                    const eventMessage = e.data;

                    const signedXdr = eventMessage.message.signedXDR;
                    console.log("signed xdr", signedXdr)
                    // Validate the XDR, this is just good practice.
                    if (
                        xdr.TransactionEnvelope.validateXDR(
                            signedXdr,
                            'base64',
                        )
                    ) {
                        console.log("sending tx")
                        let signed_tx = xdr.TransactionEnvelope.fromXDR(signedXdr, "base64");
                        let tx = new Transaction(signed_tx, 'Test SDF Network ; September 2015');

                        const server = new Horizon.Server('https://horizon-testnet.stellar.org');
                        const sendResponse = await server.submitTransaction(tx);

                        if (sendResponse.successful) {
                            resolve("Transaction successful");
                        } else {
                            reject(`Transaction failed: ${sendResponse}`)
                        }
                    } else {
                        console.log("XDR not valid, try again")
                        reject ("XDR not valid, try again")
                    }
                }
            }
            window.addEventListener('message', handleMessage);
        } catch (err) {
            console.log("Sending transaction failed");
            console.log(JSON.stringify(err));
            reject(err)
        }
    })
}
*/