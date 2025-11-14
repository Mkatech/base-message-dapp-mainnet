# Base Message DApp (Mainnet Ready)

A simple on-chain message board built for the **Base** blockchain using **Hardhat + Ethers.js + HTML frontend**.
Supports both **Base Sepolia (testnet)** and **Base mainnet**.

## 1. Install dependencies

```bash
npm install
npx hardhat compile
```

## 2. Configure environment (.env)

Create a `.env` file in the project root (you can copy from `.env.example`):

```env
PRIVATE_KEY=0xyourprivatekeyhere
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASE_MAINNET_RPC=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key_here
```

- `PRIVATE_KEY` = deployer wallet (must have ETH on Base mainnet to deploy there)
- Never commit `.env` to GitHub.

## 3. Deploy to Base Sepolia (optional test)

```bash
npm run deploy:baseSepolia
```

## 4. Deploy to Base Mainnet

```bash
npm run deploy:base
```

Copy the address printed like:

```text
MessageBoard deployed to: 0xYourMainnetContractAddress
```

Then open `frontend/app.js` and set:

```js
const CONTRACT_ADDRESS = "0xYourMainnetContractAddress";
```

## 5. Use the frontend

1. Open `frontend/index.html` in your browser (or host it somewhere).
2. In MetaMask, use the **Base** network:
   - RPC: `https://mainnet.base.org`
   - Chain ID: `8453`
   - Explorer: `https://basescan.org`
3. Connect wallet and send a message.

## 6. Commit & Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Base Message DApp (mainnet ready)"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Replace `<your-username>` and `<your-repo>` with your actual GitHub username and repository name.
# Guild verification update
