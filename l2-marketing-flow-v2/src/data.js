// src/data.js

export const unifiedFlowData = [
  {
    step: 1,
    title: "Step 1: Transaction Initiation",
    interactionPoint: 'dApp',
    isUserFacing: true,
    technicalExplanation: "User interacts with dApp frontend (e.g., **Balmy** on **Mode/Plume/Ink**). Event handlers construct Tx object (`to`, `value`, `data`, gas params). No blockchain interaction yet.",
    userExperience: "Clicking buttons/forms in dApp UI (e.g., Balmy's swap interface).",
    marketingOpportunities: [
      "**Targeted Content:** 'Securing Your DeFi on **Mode/Plume/Ink** with FORTA Firewall'. Highlight risks specific to protocols like **Balmy**.",
      "**Developer Docs (Mode/Plume/Ink):** Ensure FORTA Firewall is featured in official security sections/tutorials for devs building on these chains.",
      "**Co-Marketing (Balmy):** Joint blog posts/Twitter Spaces on 'Safe Trading with Balmy & FORTA Firewall'.",
    ],
    bestOpportunity: "**Direct dApp Integration & Co-Marketing (Balmy).** Show value directly within the user's workflow.",
    limitations: "Visibility outside partner dApps relies on user's external checks.",
    partnershipOpportunities: [
      "**Balmy UI Integration:** **Priority #1.** Balmy frontend calls FORTA API pre-transaction, displaying a clear risk score/icon *directly* in the swap/LP interface near the confirmation button.",
      "**Mode/Plume/Ink - Explorer Default:** Work with chains to feature FORTA analysis *prominently* on their official block explorers (see Step 7).",
      "**RaaS Integration (Conduit/Gelato/Caldera):** Offer FORTA Firewall as a *native security monitoring add-on* for new L2s deploying via these platforms. Target chain deployers first.",
      "**RaaS Chains Promotion:** Chains like **Mode/Plume/Ink** (if deployed via partners) can list 'FORTA Firewall Secured' as a key feature.",
    ],
    tokenRewardIdeas: [
      "**FORTA Scan via Balmy:** Small FORTA reward for users initiating a Firewall check *from within Balmy's UI* (if feature built).",
      "**Secure Usage on Balmy:** Reward users maintaining a low-risk score across multiple transactions on Balmy (as verified by integrated FORTA).",
    ],
  },
  {
    step: 2,
    title: "Step 2: Wallet Interaction & Authorization",
    interactionPoint: 'Wallet',
    isUserFacing: true,
    technicalExplanation: "dApp (e.g., **Balmy**) uses wallet provider (`window.ethereum`) to call `eth_sendTransaction`. Wallet intercepts, parses, potentially simulates, presents UI for approval.",
    userExperience: "Wallet pop-up appears. User reviews Tx details (recipient, gas, etc.) *before* signing. Focus shifts entirely to wallet.",
    marketingOpportunities: [
        "**Educational Content:** 'Decoding Wallet Signatures on **Mode/Plume/Ink**'. Emphasize verifying the 'To' address against known **Balmy** contracts or checking on FORTA *before* confirming.",
        "**Contextual Links (via Partner dApp):** **Balmy** could include a 'Verify Address with FORTA' link *near* the button that triggers the wallet, opening Firewall in a new tab.",
    ],
    bestOpportunity: "**Leverage Partner dApp (Balmy):** Encourage verification *before* the wallet is even opened via clear links/prompts within Balmy.",
    limitations: "**Cannot directly influence wallet UI.** Wallet partnerships are complex and long-term plays.",
    partnershipOpportunities: [
        "**Balmy Pre-Wallet Verification:** Balmy UI provides address verification link/button *before* `eth_sendTransaction` is called.",
        "**Long-Term Wallet Strategy:** Continue discussions with wallet providers, using successful dApp/chain integrations (Balmy, Mode) as case studies.",
    ],
    tokenRewardIdeas: [
        "**Verified Address Click (Balmy):** Tiny reward for clicking the 'Verify Address with FORTA' link within Balmy before proceeding.",
    ],
  },
    {
    step: 3,
    title: "Step 3: Cryptographic Signing",
    interactionPoint: 'Wallet', // Internal Wallet Op
    isUserFacing: true, // User trigger, but process invisible
    technicalExplanation: "User confirms in Wallet. Wallet uses private key securely to apply ECDSA signature to Tx hash (RLP-encoded Tx + Chain ID for **Mode/Plume/Ink**). Produces `v,r,s`.",
    userExperience: "Brief 'Signing...' indicator in Wallet.",
    marketingOpportunities: [
        "**Technical Explainers:** Content on private key security, signing mechanisms. Reassures users FORTA complements, doesn't replace, key management.",
    ],
    bestOpportunity: "**Educational Content:** Build trust adjacent to core product.",
    limitations: "Internal cryptographic process.",
    partnershipOpportunities: [], tokenRewardIdeas: [],
  },
  {
    step: 4,
    title: "Step 4: Transaction Propagation (RPC)",
    interactionPoint: 'Backend',
    isUserFacing: false,
    technicalExplanation: "Wallet sends signed Tx payload via `eth_sendRawTransaction` to configured RPC endpoint (e.g., **Mode/Plume/Ink** public node, or potentially nodes run by **Conduit/Gelato/Caldera**).",
    userExperience: "Invisible. Wallet may show 'Submitting...'.",
    marketingOpportunities: [
        "**Joint RPC Monitoring:** If Firewall monitors RPCs, potentially publish joint reports with **Mode/Plume/Ink** or RaaS partners on network health/security.",
    ],
    bestOpportunity: "**None** for direct end-user marketing at this stage.",
    limitations: "Backend network comms.",
    partnershipOpportunities: [
        "**RaaS RPC Security:** Explore offering FORTA checks (e.g., known malicious destinations) at the RPC level for chains deployed via **Conduit/Gelato/Caldera**.",
    ],
    tokenRewardIdeas: [],
  },
  {
    step: 5,
    title: "Step 5: L2 Sequencer Mempool & Ordering",
    interactionPoint: 'Backend',
    isUserFacing: false,
    technicalExplanation: "RPC node forwards Tx to the **Mode/Plume/Ink** Sequencer. Tx enters mempool. Sequencer orders Txs (FIFO, potentially MEV-aware) for next L2 block/batch.",
    userExperience: "Invisible. 'Pending' status.",
     marketingOpportunities: [
        "**Transparency Reports:** Work with **Mode/Plume/Ink** to publish sequencer uptime/performance reports, potentially including FORTA security insights.",
    ],
    bestOpportunity: "**None** for direct marketing.",
    limitations: "Core L2 infrastructure.",
    partnershipOpportunities: [], tokenRewardIdeas: [],
  },
  {
    step: 6,
    title: "Step 6: L2 Block Execution & State Commit",
    interactionPoint: 'Backend',
    isUserFacing: false,
    technicalExplanation: "**Mode/Plume/Ink** nodes execute ordered Txs against current L2 state. EVM computes state changes. New L2 state root hash generated.",
    userExperience: "Invisible. Still 'Pending'.",
     marketingOpportunities: [
        "**Technical Content:** Deep dives into execution on specific partner chains (**Mode/Plume/Ink**).",
    ],
    bestOpportunity: "**None** for direct marketing.",
    limitations: "Core L2 logic.",
    partnershipOpportunities: [], tokenRewardIdeas: [],
  },
  {
    step: 7,
    title: "Step 7: L2 Confirmation & Receipt",
    interactionPoint: 'Explorer', // Primarily Explorer after Wallet confirmation
    isUserFacing: true,
    technicalExplanation: "L2 block with Tx produced. Tx confirmed on L2. RPC notifies Wallet/dApp (**Balmy**). Tx receipt generated (status, gas, logs).",
    userExperience: "Wallet/dApp shows 'Confirmed'. **User often clicks Tx Hash link, navigating to Mode/Plume/Ink official Block Explorer to verify.**",
    marketingOpportunities: [
        "**Explorer Integration (Mode/Plume/Ink):** **Priority #2.** Ensure FORTA risk scores/badges are *highly visible* and easy to understand on the official explorers for these chains.",
        "**FORTA Standalone Tool:** Promote pasting Tx Hashes from **Mode/Plume/Ink** into the Firewall tool for deeper analysis.",
        "**Targeted SEM:** Keywords like '**Mode** transaction check', '**Plume** block explorer', '**Ink** tx safe'.",
    ],
    bestOpportunity: "**Official Block Explorer Integration (Mode/Plume/Ink):** Non-intrusive, high-value touchpoint at the moment users seek verification.",
    limitations: "Effectiveness depends on quality & prominence of explorer integration.",
     partnershipOpportunities: [
        "**Deep Explorer Integration:** Work with **Mode/Plume/Ink** teams for native, clear display of FORTA scores, potentially with explanations/links back to Firewall.",
        "**Balmy Post-Tx Link:** Balmy confirmation includes 'View Security Analysis on FORTA Firewall' link.",
    ],
    tokenRewardIdeas: [
        "**Report Issue (via Explorer):** Reward for reporting verified malicious activity found via **Mode/Plume/Ink** explorers, using FORTA data.",
    ],
  },
    {
    step: 8,
    title: "Step 8: L1 Data Posting / Proof Submission",
    interactionPoint: 'Backend',
    isUserFacing: false,
    technicalExplanation: "L2 (**Mode/Plume/Ink**) Sequencer/Proposer aggregates data/proofs. Posts to designated L1 contract (Optimistic data or ZK proof). Anchors L2 activity.",
    userExperience: "Invisible background process.",
    marketingOpportunities: [
        "**Technical Deep Dives:** Explain L1 posting mechanisms specifically for **Mode/Plume/Ink** (are they Optimistic/ZK? Which specific method?).",
    ],
    bestOpportunity: "**Educational content** on partner chain specifics.",
    limitations: "Core L2-L1 interaction.",
    partnershipOpportunities: [], tokenRewardIdeas: [],
  },
  {
    step: 9,
    title: "Step 9: L1 Finality",
    interactionPoint: 'Backend',
    isUserFacing: false,
    technicalExplanation: "L1 contract processes data/proof. **Optimistic:** Challenge period elapses. **ZK:** Proof verified. **Mode/Plume/Ink** L2 state achieves L1 finality.",
    userExperience: "Invisible unless withdrawing natively to L1.",
    marketingOpportunities: [
        "**Content:** Explain finality specific to **Mode/Plume/Ink** architecture & security guarantees. Emphasize real-time L2 risk detection with FORTA.",
    ],
    bestOpportunity: "**Educational content** on partner chain finality.",
    limitations: "Delayed backend security process.",
    partnershipOpportunities: [
        "**Challenge Monitoring (if Optimistic):** Partner with services monitoring challenge periods on **Mode/Plume/Ink**, potentially using FORTA data.",
    ],
    tokenRewardIdeas: [
        "**Educational Quiz (Partner Chains):** Reward for understanding **Mode/Plume/Ink** finality mechanisms.",
    ],
  },
];