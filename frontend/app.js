// IMPORTANT: After deployment, replace this with your *mainnet* contract address
const CONTRACT_ADDRESS = "0x63C3c369c8f5538765306f9eA3cF6f43FF288069";

const ABI = [
  "function postMessage(string _text) external",
  "function getAllMessages() external view returns (tuple(address sender,string text,uint256 timestamp)[])"
];

let provider;
let signer;
let contract;

const connectBtn = document.getElementById("connectBtn");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");
const txStatus = document.getElementById("txStatus");
const networkStatus = document.getElementById("networkStatus");

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install MetaMask.");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();

  networkStatus.textContent = `Connected to chainId: ${network.chainId}`;

  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  connectBtn.textContent = "Wallet Connected";
  connectBtn.disabled = true;
  sendBtn.disabled = false;

  await loadMessages();
}

async function loadMessages() {
  messagesDiv.innerHTML = "Loading messages...";

  try {
    const msgs = await contract.getAllMessages();
    if (!msgs.length) {
      messagesDiv.innerHTML = "<p class='small'>No messages yet. Be the first!</p>";
      return;
    }

    messagesDiv.innerHTML = "";
    msgs
      .slice()
      .reverse()
      .forEach((m) => {
        const div = document.createElement("div");
        div.className = "msg";
        const dt = new Date(Number(m.timestamp) * 1000);
        div.innerHTML = `
          <div>${m.text}</div>
          <div class="small">From: ${m.sender.slice(0, 6)}...${m.sender.slice(-4)} • ${dt.toLocaleString()}</div>
        `;
        messagesDiv.appendChild(div);
      });
  } catch (e) {
    console.error(e);
    messagesDiv.innerHTML = "<p class='small'>Error loading messages (check console).</p>";
  }
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) {
    alert("Enter a message first.");
    return;
  }

  try {
    txStatus.textContent = "Sending transaction...";
    const tx = await contract.postMessage(text);
    txStatus.textContent = "Waiting for confirmation...";
    await tx.wait();
    txStatus.textContent = "Message posted ✅";

    messageInput.value = "";
    await loadMessages();
  } catch (e) {
    console.error(e);
    txStatus.textContent = "Error sending transaction (see console).";
  }
}

connectBtn.addEventListener("click", connectWallet);
sendBtn.addEventListener("click", sendMessage);
