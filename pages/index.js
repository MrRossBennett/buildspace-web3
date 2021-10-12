import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from '../utils/AdventurePortal.json';
import { format } from 'date-fns';

export default function Home() {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  const [allSnippets, setAllSnippets] = useState([]);
  const [isMining, setIsMining] = useState(false);

  /**
   * Create a variable here that holds the contract address after you deploy!
   */
  const contractAddress = "0x159d9dfd0199C38d7d4CBb135d7c59072742586D";

  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        getAllSnippets()
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
 * Implement your connectWallet method here
 */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const createSnippet = async (event) => {
    event.preventDefault()

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const adventurePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await adventurePortalContract.getTotalSnippets();
        console.log("Retrieved total snippet count...", count.toNumber());

        const adventureTxn = await adventurePortalContract.createSnippet(event.target.snippet.value);
        setIsMining(true)
        console.log("Mining...", adventureTxn.hash);

        await adventureTxn.wait();
        setIsMining(false)
        event.target.reset();
        console.log("Mined -- ", adventureTxn.hash);

        count = await adventurePortalContract.getTotalSnippets();
        console.log("Retrieved total snippet count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllSnippets = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const adventurePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const snippets = await adventurePortalContract.getAllSnippets();

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let snippetsCleaned = [];
        snippets.forEach(snippet => {
          snippetsCleaned.push({
            address: snippet.waver,
            timestamp: new Date(snippet.timestamp * 1000),
            message: snippet.message
          });
        });

        const sortedSnippets = [...snippetsCleaned].sort((a, b) => b.timestamp - a.timestamp)

        /*
         * Store our data in React State
         */
        setAllSnippets(sortedSnippets)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div className="w-full bg-gradient-to-t from-gray-800 to-indigo-900 min-h-screen antialiased">
      <svg className="absolute w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1685.86 387.16"><polygon points="1683.97 0.5 1005.34 386.66 645.6 386.66 1.81 0.5 1683.97 0.5" fill="none" stroke="#1E3A8A"></polygon><path d="M282.17.5,705.55,386.66" fill="none" stroke="#1E3A8A"></path><path d="M562.53.5l203,386.16" fill="none" stroke="#1E3A8A"></path><path d="M842.89.5,825.47,386.66" fill="none" stroke="#1E3A8A"></path><path d="M1123.25.5,885.43,386.66" fill="none" stroke="#1E3A8A"></path><path d="M1403.61.5,945.39,386.66" fill="none" stroke="#1E3A8A"></path><path d="M1033.64,370.69h-414" fill="none" stroke="#1E3A8A"></path><path d="M1071.64,349.69h-488" fill="none" stroke="#1E3A8A"></path><path d="M1125.64,318.69h-593" fill="none" stroke="#1E3A8A"></path><path d="M1208.64,270.69h-756" fill="none" stroke="#1E3A8A"></path></svg>
      <Head>
        <title>Adventures in Ethereum</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Press+Start+2P&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-screen-xl mx-auto text-white flex flex-col justify-center py-24 px-6 font-body relative">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-display mb-6">Adventures in Ethereum</h1>
          <p className="text-xl tracking-wide">What happens next?</p>

          {/*
        * If there is no currentAccount render this button
        */}
          {!currentAccount && (
            <div className="mt-6">
              <button className="text-pink-500 text-sm hover:text-white hover:border-white text-lg leading-6 font-semibold py-3 px-6 border border-pink-500 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-600 focus:outline-none transition-colors duration-200 tracking-widest" onClick={connectWallet}>
                Connect Wallet
              </button>
            </div>
          )}
        </header>

        <div className="grid md:grid-cols-2 gap-12 md:divide-x md:divide-dashed">
          <div className="col-span-1">
            <h2 className="font-display">Create your snippet</h2>
            <form onSubmit={createSnippet}>
              <label className="block text-gray-700 my-8">
                <span className="sr-only">Snippet</span>
                <textarea name="snippet" className="mt-1 block w-full p-3 rounded-lg bg-indigo-900 resize-none text-white placeholder-indigo-200 border" rows="6" placeholder="Add snippet..."></textarea>
              </label>
              <div className="flex items-center">
                <button className="w-full sm:w-auto flex-none bg-pink-500 hover:bg-pink-600 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-600 focus:outline-none transition-colors duration-200 inline-flex items-center justify-center" type="submit">
                  <span className="mr-3">Let's go!</span>
                  {!isMining && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  )}
                  {isMining && (
                    <svg className="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-1 md:pl-12">
            <h2 className="font-display mb-8">Once upon a time...</h2>
            <ul className="text-white space-y-6">
              {isMining && (
                <li className="rounded-lg bg-indigo-900 p-6 relative">
                  <div className="animate-pulse flex">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-indigo-700 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-indigo-700 rounded"></div>
                        <div className="h-4 bg-indigo-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {allSnippets.map((snippet, index) => {
                return (
                  <li className="rounded-lg bg-indigo-900 p-6 relative" key={index}>
                    <div className="mb-4 flex justify-between text-indigo-200">
                      <p className="text-xs text-right truncate w-32">{snippet.address}</p>
                      <p className="text-xs text-right">{format(snippet.timestamp, 'dd MMM yyyy')}</p>
                    </div>
                    <article>
                      <p>{snippet.message}</p>
                    </article>
                    {index !== allSnippets.length - 1 && (
                      <div className="w-full absolute inset-x-0 -bottom-7 inline-flex justify-center z-40">
                        <div className="rounded-full bg-pink-500 shadow-lg p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </li>)
              })}
            </ul>
          </div>
        </div>
      </main>
    </div >
  )
}