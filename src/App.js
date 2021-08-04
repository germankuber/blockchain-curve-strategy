import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  window.ethereum.enable();
  const [hisDai, setHisDai] = useState(0);
  const [myDai, setMyDai] = useState(0);
  const [amount, setAmount] = useState(0);
  const [myContractAddress, setMyContractAddress] = useState("");
  const [contractWithDai, setContractWithDai] = useState("");
  const [contractWithEth, setContractWithEth] = useState("");

  const addressWithDai = "0xf4684eb75659bec9c3c3b19f075a6fd5aba34b87";
  const contractAddress = "0x2f08140a727fA7165a1e65BAF01880637D701B25";
  const curveDao = "0xd061D61a4d941c39E5453435B6345Dc261C2fcE0";

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const erc20Abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ];
  const curveAbi = [
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "buyer",
          'type': "address"
        },
        {
          'indexed': false,
          'name': "sold_id",
          'type': "int128"
        },
        {
          'indexed': false,
          'name': "tokens_sold",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "bought_id",
          'type': "int128"
        },
        {
          'indexed': false,
          'name': "tokens_bought",
          'type': "uint256"
        }
      ],
      'name': "TokenExchange",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "provider",
          'type': "address"
        },
        {
          'indexed': false,
          'name': "token_amounts",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "fees",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "invariant",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "token_supply",
          'type': "uint256"
        }
      ],
      'name': "AddLiquidity",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "provider",
          'type': "address"
        },
        {
          'indexed': false,
          'name': "token_amounts",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "fees",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "token_supply",
          'type': "uint256"
        }
      ],
      'name': "RemoveLiquidity",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "provider",
          'type': "address"
        },
        {
          'indexed': false,
          'name': "token_amount",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "coin_amount",
          'type': "uint256"
        }
      ],
      'name': "RemoveLiquidityOne",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "provider",
          'type': "address"
        },
        {
          'indexed': false,
          'name': "token_amounts",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "fees",
          'type': "uint256[3]"
        },
        {
          'indexed': false,
          'name': "invariant",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "token_supply",
          'type': "uint256"
        }
      ],
      'name': "RemoveLiquidityImbalance",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "deadline",
          'type': "uint256"
        },
        {
          'indexed': true,
          'name': "admin",
          'type': "address"
        }
      ],
      'name': "CommitNewAdmin",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "admin",
          'type': "address"
        }
      ],
      'name': "NewAdmin",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': "deadline",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "fee",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "admin_fee",
          'type': "uint256"
        }
      ],
      'name': "CommitNewFee",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': "fee",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "admin_fee",
          'type': "uint256"
        }
      ],
      'name': "NewFee",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': "old_A",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "new_A",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "initial_time",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "future_time",
          'type': "uint256"
        }
      ],
      'name': "RampA",
      'type': "event"
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': "A",
          'type': "uint256"
        },
        {
          'indexed': false,
          'name': "t",
          'type': "uint256"
        }
      ],
      'name': "StopRampA",
      'type': "event"
    },
    {
      'inputs': [
        {
          'name': "_owner",
          'type': "address"
        },
        {
          'name': "_coins",
          'type': "address[3]"
        },
        {
          'name': "_pool_token",
          'type': "address"
        },
        {
          'name': "_A",
          'type': "uint256"
        },
        {
          'name': "_fee",
          'type': "uint256"
        },
        {
          'name': "_admin_fee",
          'type': "uint256"
        }
      ],
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "constructor"
    },
    {
      'gas': 5227,
      'inputs': [],
      'name': "A",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 1133537,
      'inputs': [],
      'name': "get_virtual_price",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 4508776,
      'inputs': [
        {
          'name': "amounts",
          'type': "uint256[3]"
        },
        {
          'name': "deposit",
          'type': "bool"
        }
      ],
      'name': "calc_token_amount",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 6954858,
      'inputs': [
        {
          'name': "amounts",
          'type': "uint256[3]"
        },
        {
          'name': "min_mint_amount",
          'type': "uint256"
        }
      ],
      'name': "add_liquidity",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 2673791,
      'inputs': [
        {
          'name': "i",
          'type': "int128"
        },
        {
          'name': "j",
          'type': "int128"
        },
        {
          'name': "dx",
          'type': "uint256"
        }
      ],
      'name': "get_dy",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2673474,
      'inputs': [
        {
          'name': "i",
          'type': "int128"
        },
        {
          'name': "j",
          'type': "int128"
        },
        {
          'name': "dx",
          'type': "uint256"
        }
      ],
      'name': "get_dy_underlying",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2818066,
      'inputs': [
        {
          'name': "i",
          'type': "int128"
        },
        {
          'name': "j",
          'type': "int128"
        },
        {
          'name': "dx",
          'type': "uint256"
        },
        {
          'name': "min_dy",
          'type': "uint256"
        }
      ],
      'name': "exchange",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 192846,
      'inputs': [
        {
          'name': "_amount",
          'type': "uint256"
        },
        {
          'name': "min_amounts",
          'type': "uint256[3]"
        }
      ],
      'name': "remove_liquidity",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 6951851,
      'inputs': [
        {
          'name': "amounts",
          'type': "uint256[3]"
        },
        {
          'name': "max_burn_amount",
          'type': "uint256"
        }
      ],
      'name': "remove_liquidity_imbalance",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 1102,
      'inputs': [
        {
          'name': "_token_amount",
          'type': "uint256"
        },
        {
          'name': "i",
          'type': "int128"
        }
      ],
      'name': "calc_withdraw_one_coin",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 4025523,
      'inputs': [
        {
          'name': "_token_amount",
          'type': "uint256"
        },
        {
          'name': "i",
          'type': "int128"
        },
        {
          'name': "min_amount",
          'type': "uint256"
        }
      ],
      'name': "remove_liquidity_one_coin",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 151919,
      'inputs': [
        {
          'name': "_future_A",
          'type': "uint256"
        },
        {
          'name': "_future_time",
          'type': "uint256"
        }
      ],
      'name': "ramp_A",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 148637,
      'inputs': [],
      'name': "stop_ramp_A",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 110461,
      'inputs': [
        {
          'name': "new_fee",
          'type': "uint256"
        },
        {
          'name': "new_admin_fee",
          'type': "uint256"
        }
      ],
      'name': "commit_new_fee",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 97242,
      'inputs': [],
      'name': "apply_new_fee",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 21895,
      'inputs': [],
      'name': "revert_new_parameters",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 74572,
      'inputs': [
        {
          'name': "_owner",
          'type': "address"
        }
      ],
      'name': "commit_transfer_ownership",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 60710,
      'inputs': [],
      'name': "apply_transfer_ownership",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 21985,
      'inputs': [],
      'name': "revert_transfer_ownership",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 3481,
      'inputs': [
        {
          'name': "i",
          'type': "uint256"
        }
      ],
      'name': "admin_balances",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 21502,
      'inputs': [],
      'name': "withdraw_admin_fees",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 111389,
      'inputs': [],
      'name': "donate_admin_fees",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 37998,
      'inputs': [],
      'name': "kill_me",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 22135,
      'inputs': [],
      'name': "unkill_me",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
    },
    {
      'gas': 2220,
      'inputs': [
        {
          'name': "arg0",
          'type': "uint256"
        }
      ],
      'name': "coins",
      'outputs': [
        {
          'name': "",
          'type': "address"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2250,
      'inputs': [
        {
          'name': "arg0",
          'type': "uint256"
        }
      ],
      'name': "balances",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2171,
      'inputs': [],
      'name': "fee",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2201,
      'inputs': [],
      'name': "admin_fee",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2231,
      'inputs': [],
      'name': "owner",
      'outputs': [
        {
          'name': "",
          'type': "address"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2261,
      'inputs': [],
      'name': "initial_A",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2291,
      'inputs': [],
      'name': "future_A",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2321,
      'inputs': [],
      'name': "initial_A_time",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2351,
      'inputs': [],
      'name': "future_A_time",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2381,
      'inputs': [],
      'name': "admin_actions_deadline",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2411,
      'inputs': [],
      'name': "transfer_ownership_deadline",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2441,
      'inputs': [],
      'name': "future_fee",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2471,
      'inputs': [],
      'name': "future_admin_fee",
      'outputs': [
        {
          'name': "",
          'type': "uint256"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    },
    {
      'gas': 2501,
      'inputs': [],
      'name': "future_owner",
      'outputs': [
        {
          'name': "",
          'type': "address"
        }
      ],
      'stateMutability': "view",
      'type': "function"
    }
  ];
  const curveStrategyAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "AddLiquidity",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "CantSwapToken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "msg",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "DataTest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "token",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DepositToken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MintCurveDao",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "name": "SwapToken",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "execute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "executeSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "msg",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "generateEvent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const curveDaoAbi = [{ "name": "Minted", "inputs": [{ "type": "address", "name": "recipient", "indexed": true }, { "type": "address", "name": "gauge", "indexed": false }, { "type": "uint256", "name": "minted", "indexed": false }], "anonymous": false, "type": "event" }, { "outputs": [], "inputs": [{ "type": "address", "name": "_token" }, { "type": "address", "name": "_controller" }], "stateMutability": "nonpayable", "type": "constructor" }, { "name": "mint", "outputs": [], "inputs": [{ "type": "address", "name": "gauge_addr" }], "stateMutability": "nonpayable", "type": "function", "gas": 100038 }, { "name": "mint_many", "outputs": [], "inputs": [{ "type": "address[8]", "name": "gauge_addrs" }], "stateMutability": "nonpayable", "type": "function", "gas": 408502 }, { "name": "mint_for", "outputs": [], "inputs": [{ "type": "address", "name": "gauge_addr" }, { "type": "address", "name": "_for" }], "stateMutability": "nonpayable", "type": "function", "gas": 101219 }, { "name": "toggle_approve_mint", "outputs": [], "inputs": [{ "type": "address", "name": "minting_user" }], "stateMutability": "nonpayable", "type": "function", "gas": 36726 }, { "name": "token", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 1301 }, { "name": "controller", "outputs": [{ "type": "address", "name": "" }], "inputs": [], "stateMutability": "view", "type": "function", "gas": 1331 }, { "name": "minted", "outputs": [{ "type": "uint256", "name": "" }], "inputs": [{ "type": "address", "name": "arg0" }, { "type": "address", "name": "arg1" }], "stateMutability": "view", "type": "function", "gas": 1669 }, { "name": "allowed_to_mint_for", "outputs": [{ "type": "bool", "name": "" }], "inputs": [{ "type": "address", "name": "arg0" }, { "type": "address", "name": "arg1" }], "stateMutability": "view", "type": "function", "gas": 1699 }];
  const daiContract = new ethers.Contract("0x6b175474e89094c44da98b954eedeac495271d0f", erc20Abi, signer);
  const curveFiToken = new ethers.Contract("0x6b175474e89094c44da98b954eedeac495271d0f", erc20Abi, provider);
  const curveCrvToken = new ethers.Contract("0xd533a949740bb3306d119cc777fa900ba034cd52", erc20Abi, provider);
  const curveDaoContract = new ethers.Contract(curveDao, curveDaoAbi, provider);

  const curveStrategyContract = new ethers.Contract(contractAddress, curveStrategyAbi, signer);

  useEffect(async () => {
    setHisDai(ethers.utils.formatEther(await daiContract.balanceOf(addressWithDai)));
    setMyDai(ethers.utils.formatEther(await daiContract.balanceOf(await signer.getAddress())));
    console.log(await signer.getAddress());
    console.log(ethers.utils.formatEther(await provider.getBalance(await signer.getAddress())));


    curveStrategyContract.on("DataTest", (to, amount, from) => {
      console.log(to, amount, from);
    });

    curveDaoContract.on("Minted", (recipient, gauge, minted) => {
      console.log("Minted : ", recipient, gauge, minted);
    });

    // provider.on(filter, (a, b, v, c, s) => {
    //   let abi = ["event DataTest(string msg, uint256 id);"];
    //   let iface = new ethers.utils.Interface(abi);

    //   console.log(events);
    //   console.log(a);
    // })
  }, [])

  const givePermissions = async (e) => {
    e.preventDefault();
    const myAddress = await signer.getAddress();
    await daiContract.approve(myContractAddress, +amount);

  }
  const configure = async (e) => {
    e.preventDefault();
    const myAddress = await signer.getAddress();
    await daiContract.approve(myContractAddress, +amount);

  }
  return (
    <>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Contract with DAI</label>
          <input type="text" class="form-control" value={contractWithDai} onChange={(e) => setContractWithDai(e.target.value)}></input>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Contract with ETH</label>
          <input type="text" class="form-control" value={contractWithEth} onChange={(e) => setContractWithEth(e.target.value)}></input>
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Amount to Invest</label>
          <input type="text" class="form-control" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">My Contract Address</label>
          <input type="text" class="form-control" value={myContractAddress} onChange={(e) => setMyContractAddress(e.target.value)}></input>
        </div>
      </form>
      <button type="button" class="btn btn-primary" onClick={givePermissions}>Give Permissions</button>
      <button type="button" class="btn btn-success" onClick={configure}>Configure</button>
    </>
  );
}

export default App;
