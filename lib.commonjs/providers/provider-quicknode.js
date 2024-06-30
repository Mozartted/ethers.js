"use strict";
/**
 *  [[link-quicknode]] provides a third-party service for connecting to
 *  various blockchains over JSON-RPC.
 *
 *  **Supported Networks**
 *
 *  - Ethereum Mainnet (``mainnet``)
 *  - Goerli Testnet (``goerli``)
 *  - Sepolia Testnet (``sepolia``)
 *  - Holesky Testnet (``holesky``)
 *  - Arbitrum (``arbitrum``)
 *  - Arbitrum Goerli Testnet (``arbitrum-goerli``)
 *  - Arbitrum Sepolia Testnet (``arbitrum-sepolia``)
 *  - Base Mainnet (``base``);
 *  - Base Goerli Testnet (``base-goerli``);
 *  - Base Sepolia Testnet (``base-sepolia``);
 *  - BNB Smart Chain Mainnet (``bnb``)
 *  - BNB Smart Chain Testnet (``bnbt``)
 *  - Optimism (``optimism``)
 *  - Optimism Goerli Testnet (``optimism-goerli``)
 *  - Optimism Sepolia Testnet (``optimism-sepolia``)
 *  - Polygon (``matic``)
 *  - Polygon Mumbai Testnet (``matic-mumbai``)
 *
 *  @_subsection: api/providers/thirdparty:QuickNode  [providers-quicknode]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickNodeProvider = void 0;
const index_js_1 = require("../utils/index.js");
const community_js_1 = require("./community.js");
const network_js_1 = require("./network.js");
const provider_jsonrpc_js_1 = require("./provider-jsonrpc.js");
const defaultToken = "919b412a057b5e9c9b6dce193c5a60242d6efadb";
function getHost(name, prefix) {
    const prefix_domain = prefix ? prefix : "ethers";
    switch (name) {
        case "mainnet":
            return `${prefix_domain}.quiknode.pro`;
        case "goerli":
            return `${prefix_domain}.ethereum-goerli.quiknode.pro`;
        case "sepolia":
            return `${prefix_domain}.ethereum-sepolia.quiknode.pro`;
        case "holesky":
            return `${prefix_domain}.ethereum-holesky.quiknode.pro`;
        case "arbitrum":
            return `${prefix_domain}.arbitrum-mainnet.quiknode.pro`;
        case "arbitrum-goerli":
            return `${prefix_domain}.arbitrum-goerli.quiknode.pro`;
        case "arbitrum-sepolia":
            return `${prefix_domain}.arbitrum-sepolia.quiknode.pro`;
        case "base":
            return `${prefix_domain}.base-mainnet.quiknode.pro`;
        case "base-goerli":
            return `${prefix_domain}.base-goerli.quiknode.pro`;
        case "base-spolia":
            return `${prefix_domain}.base-sepolia.quiknode.pro`;
        case "bnb":
            return `${prefix_domain}.bsc.quiknode.pro`;
        case "bnbt":
            return `${prefix_domain}.bsc-testnet.quiknode.pro`;
        case "matic":
            return `${prefix_domain}.matic.quiknode.pro`;
        case "matic-mumbai":
            return `${prefix_domain}.matic-testnet.quiknode.pro`;
        case "matic-amoy":
            return `${prefix_domain}.matic-amoy.quiknode.pro`;
        case "optimism":
            return `${prefix_domain}.optimism.quiknode.pro`;
        case "optimism-goerli":
            return `${prefix_domain}.optimism-goerli.quiknode.pro`;
        case "optimism-sepolia":
            return `${prefix_domain}.optimism-sepolia.quiknode.pro`;
        case "xdai":
            return `${prefix_domain}.xdai.quiknode.pro`;
        case "tron":
            return `${prefix_domain}.tron-mainnet.quiknode.pro`;
    }
    (0, index_js_1.assertArgument)(false, "unsupported network", "network", name);
}
/*
@TODO:
  These networks are not currently present in the Network
  default included networks. Research them and ensure they
  are EVM compatible and work with ethers

  http://ethers.avalanche-mainnet.quiknode.pro
  http://ethers.avalanche-testnet.quiknode.pro
  http://ethers.blast-sepolia.quiknode.pro
  http://ethers.celo-mainnet.quiknode.pro
  http://ethers.fantom.quiknode.pro
  http://ethers.imx-demo.quiknode.pro
  http://ethers.imx-mainnet.quiknode.pro
  http://ethers.imx-testnet.quiknode.pro
  http://ethers.near-mainnet.quiknode.pro
  http://ethers.near-testnet.quiknode.pro
  http://ethers.nova-mainnet.quiknode.pro
  http://ethers.scroll-mainnet.quiknode.pro
  http://ethers.scroll-testnet.quiknode.pro
  http://ethers.tron-mainnet.quiknode.pro
  http://ethers.zkevm-mainnet.quiknode.pro
  http://ethers.zkevm-testnet.quiknode.pro
  http://ethers.zksync-mainnet.quiknode.pro
  http://ethers.zksync-testnet.quiknode.pro
*/
/**
 *  The **QuickNodeProvider** connects to the [[link-quicknode]]
 *  JSON-RPC end-points.
 *
 *  By default, a highly-throttled API token is used, which is
 *  appropriate for quick prototypes and simple scripts. To
 *  gain access to an increased rate-limit, it is highly
 *  recommended to [sign up here](link-quicknode).
 */
class QuickNodeProvider extends provider_jsonrpc_js_1.JsonRpcProvider {
    /**
     *  The API token.
     */
    token;
    /**
     *  Creates a new **QuickNodeProvider**.
     */
    constructor(_network, token, prefix) {
        if (_network == null) {
            _network = "mainnet";
        }
        const network = network_js_1.Network.from(_network);
        if (token == null) {
            token = defaultToken;
        }
        const request = QuickNodeProvider.getRequest(network, token, prefix);
        super(request, network, { staticNetwork: network });
        (0, index_js_1.defineProperties)(this, { token });
    }
    _getProvider(chainId) {
        try {
            return new QuickNodeProvider(chainId, this.token);
        }
        catch (error) { }
        return super._getProvider(chainId);
    }
    isCommunityResource() {
        return this.token === defaultToken;
    }
    /**
     *  Returns a new request prepared for %%network%% and the
     *  %%token%%.
     */
    static getRequest(network, token, prefix) {
        if (token == null) {
            token = defaultToken;
        }
        const request = new index_js_1.FetchRequest(`https:/\/${getHost(network.name, prefix)}/${token}`);
        request.allowGzip = true;
        //if (projectSecret) { request.setCredentials("", projectSecret); }
        if (token === defaultToken) {
            request.retryFunc = async (request, response, attempt) => {
                (0, community_js_1.showThrottleMessage)("QuickNodeProvider");
                return true;
            };
        }
        return request;
    }
}
exports.QuickNodeProvider = QuickNodeProvider;
//# sourceMappingURL=provider-quicknode.js.map