const { SigningCosmWasmClient } = require('secretjs');
export async function connectWallet() {
    const chainId = process.env.VUE_APP_CHAIN_ID;
    const coinDenom = process.env.VUE_APP_DENOM;
    const coinMinimalDenom = process.env.VUE_APP_COIN_MINIMAL_DENOM;
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    } else {
        if (window.keplr.experimentalSuggestChain) {
            try {
                // Setup Secret Testnet (not needed on mainnet)
                // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
                // cosmoshub-3 is integrated to Keplr so the code should return without errors.
                // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
                // If the user approves, the chain will be added to the user's Keplr extension.
                // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
                // If the same chain id is already registered, it will resolve and not require the user interactions.
                await window.keplr.experimentalSuggestChain({
                    chainId: chainId,
                    chainName: 'Secret Testnet',
                    rpc: process.env.VUE_APP_RPC,
                    rest: process.env.VUE_APP_REST,
                    bip44: {
                        coinType: 529,
                    },
                    coinType: 529,
                    stakeCurrency: {
                        coinDenom: coinDenom,
                        coinMinimalDenom: coinMinimalDenom,
                        coinDecimals: 6,
                    },
                    bech32Config: {
                        bech32PrefixAccAddr: 'secret',
                        bech32PrefixAccPub: 'secretpub',
                        bech32PrefixValAddr: 'secretvaloper',
                        bech32PrefixValPub: 'secretvaloperpub',
                        bech32PrefixConsAddr: 'secretvalcons',
                        bech32PrefixConsPub: 'secretvalconspub',
                    },
                    currencies: [
                        {
                            coinDenom: coinDenom,
                            coinMinimalDenom: coinMinimalDenom,
                            coinDecimals: 6,
                        },
                    ],
                    feeCurrencies: [
                        {
                            coinDenom: coinDenom,
                            coinMinimalDenom: coinMinimalDenom,
                            coinDecimals: 6,
                        },
                    ],
                    gasPriceStep: {
                        low: 0.1,
                        average: 0.25,
                        high: 0.4,
                    },
                    features: ['secretwasm'],
                });

                // This method will ask the user whether or not to allow access if they haven't visited this website.
                // Also, it will request user to unlock the wallet if the wallet is locked.
                // If you don't request enabling before usage, there is no guarantee that other methods will work.
                await window.keplr.enable(chainId);

                // @ts-ignore
                const keplrOfflineSigner = window.getOfflineSigner(chainId);
                const accounts = await keplrOfflineSigner.getAccounts();
                
                const address = accounts[0].address;
                setAddress(address);
                return address
            } catch (error) {
                console.error(error)
            }
        } else {
            alert("Please use the recent version of keplr extension");
        }
    }
}

export function getAddress() {
    return localStorage.getItem("address", "");
}

export function setAddress(address) {
    return localStorage.setItem("address", address);
}

export async function getContract(){
    const client = await getClient();
    return await client.getContract(process.env.VUE_APP_CONSTRACT_ADDRESS);
}

export function getClient(){
    const chainId = process.env.VUE_APP_CHAIN_ID;
    const keplrOfflineSigner = window.getOfflineSigner(chainId);
    const client = new SigningCosmWasmClient(
                    process.env.VUE_APP_REST,
                    getAddress(),
                    keplrOfflineSigner,
                    window.getEnigmaUtils(chainId),
                );
    return client
}

export async function mintNft(data) {
    const client = getClient();
    let response = await client.execute(process.env.VUE_APP_CONSTRACT_ADDRESS, data);
    return response
}

export async function getNumOfTokens() {
    const client = getClient();
    let response = await client.queryContractSmart(process.env.VUE_APP_CONSTRACT_ADDRESS, { "num_tokens": {}})
    return response
}

export async function getAllTokens(param) {
    const client = getClient();
    let response = await client.queryContractSmart(process.env.VUE_APP_CONSTRACT_ADDRESS, param)
    return response
}

export async function getNftDetail(tokenID) {
    const client = getClient();
    let response = await client.queryContractSmart(process.env.VUE_APP_CONSTRACT_ADDRESS, { "nft_dossier": {"token_id": tokenID}})
    return response
}

export async function getRandomID() {
    return Math.floor(Math.random() * 100)
}

export async function makeOffer(offerId, offerorTokenId, offereeTokenId, hands = [], point) {
    const client = getClient();
    const NFT_CONTRACT_ADDRESS = process.env.VUE_APP_CONSTRACT_ADDRESS
    const NFT_CONTRACT_CODE_HASH = process.env.VUE_APP_CONSTRACT_CODE_HASH
    console.log(NFT_CONTRACT_CODE_HASH)
    const param = {
        id: offerId,
        offeree: getAddress(),
        offeror_nft_contract: NFT_CONTRACT_ADDRESS,
        offeror_nft: offerorTokenId,
        offeror_code_hash: NFT_CONTRACT_CODE_HASH,
        offeree_nft_contract: NFT_CONTRACT_ADDRESS,
        offeree_nft: offereeTokenId,
        offeree_code_hash: NFT_CONTRACT_CODE_HASH,
        offeror_hands: hands,
        offeror_draw_point:  point
    }
    const response = await client.execute(process.env.VUE_APP_JANKEN_CONTRACT, { "make_offer": param })
    return response
}

export async function acceptOffer(offerId, hands = []) {
    const client = getClient();
    const param = {
        id: offerId,
        offeree_hands: hands,
    }
    const response = await client.execute(process.env.VUE_APP_JANKEN_CONTRACT, { "accept_offer": param })
    return response
}

export async function declineOffer(offerId) {
    const client = getClient();
    const handleMsg = {
        decline_offer: {
          id: offerId
        }
      }
    const response = await client.execute(process.env.VUE_APP_JANKEN_CONTRACT, handleMsg)
    return response
}


export async function appoveToken(tokenId) {
    const client = getClient();
    const queryParam = {
        approve: {
            spender: getAddress(),
            token_id: tokenId
          }
    }
    console.log(queryParam)
    const response = await client.execute(process.env.VUE_APP_CONSTRACT_ADDRESS, queryParam)
    return response
}
