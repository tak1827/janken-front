# secret-janken-front

<div align="center">
  <a href="https://www.youtube.com/watch?v=-cEdzOsm0cY"><img src="https://img.youtube.com/vi/-cEdzOsm0cY/0.jpg" alt="IMAGE ALT TEXT" width=600></a>
</div>

The web ui of Secret Janken Game Dapps.

live: http://janken.games

Youtube Demo: https://www.youtube.com/watch?v=-cEdzOsm0cY

## Front Workflow

<p align="center">
  <img src="./imgs/front-workflow.png" width="800">
</p>


## How to Play
**Pre Requirements**
- Install [Keplr extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap) for browser
- Get some Secret Network Testnet token (`pulsar-1`) from [the official faucet site](https://faucet.secrettestnet.io/)

### BET NFT
Let's see how Bob and Alice play Betting NFT!

1. Create Your Own NFT

<p align="center">
  <img src="./imgs/bet_nft_1.png" width="400">
</p>

Bob creates his own NFT by uploading an image and adding a name and description.

2. Send Battle Request

<p align="center">
  <img src="./imgs/bet_nft_2.png" width="400">
</p>

Bob sends out a Janken Battle Request, betting his NFT that he just minted and the attractive NFT Alice has.

|  status  |  points |
| -------- | ------- |
|  win     |   1     |
|  draw    |   0     |
|  lose    |  -1     |

According to the win points rule, winner gets 1 point, loser gets -1 point, and draws get 0 points. He thinks Alice's NFT is more valuable and sets draw points as 2 in 3 fights. It means Bob needs to win 3 times in a row to get Alice's NFT!

3. Accept Battle Request/Decline Battle Request

<p align="center">
  <img src="./imgs/bet_nft_3.png" width="400">
</p>

Alice notices Bob sent her a Janken Battle Request. She can choose to accept or decline the request. She finds draw point is -2 and it means that she only need to win or draw once in 3 fights in order to prevent her own NFT from being taken. She accepts the fight considering it is a very winnable fight.

4. Check Result

<p align="center">
  <img src="./imgs/bet_nft_4.png" width="300">    <img src="./imgs/bet_nft_5.png" width="300">
</p>

Immediately after Alice accepts the battle request, Bob and Alice's hands are matched on the contract and the results are revealed. In this case, fortunately, Bob won against Alice all three times. He has now acquired her NFT. Congratulations, Bob!

### BET TOKEN
1. Decide Bet Amount
2. Decide Secure Entropy
3. Decide Your Hand

<p align="center">
  <img src="./imgs/bet_token_1.png" width="400">
</p>

A player submit a hand and an entropy with betting amount. The entropy is used for random number generation source.


4. Check Result

<p align="center">
  <img src="./imgs/bet_token_2.png" width="400">
</p>

The matches is processed automatically in the contract. If a player win, a player get “the betting amount - fee” equivalent amount of token. If the player is lost, a player is taken “the betting amount ” equivalent amount of token. If the match result is draw, a player just pay fee. Default fee is 3% of tokens a player sent.

## reference
- [secret-janken-contract](https://github.com/tak1827/secret-janken-contract) CosmWasm Janken contract for Secrete Netork.
- [secret-janken-api](https://github.com/tak1827/secret-janken-front) Helper backend service to improve UX for Secret Janken Game.
