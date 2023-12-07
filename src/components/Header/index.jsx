import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import abi from "../../contracts/abi.json";
import { ethers } from "ethers";
import { useWeb3Modal } from "@web3modal/react";
import { shortAdd } from "../../utils";
import logo from "../../Assets/logo.svg";

const Header = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  const connectWallet = () => {
    console.log(chain?.id);

    try {
      switchNetwork?.(5);

      open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full flex justify-center bg-[#C1B8B1]">
      <div className="px-[30px] h-[60px] max-w-screen-2xl w-full flex items-center justify-between">
        <h1>
          <img
            src={logo}
            alt=""
            className="h-[50px]"
          />
        </h1>

        <div className="flex justify-center items-center font-normal gap-[30px] uppercase text-[24px] text-[#151515]">
          <span>Buy</span>
          <span>About</span>

          {isConnected ? (
            <span className="rounded-md border-2 border-[#151515] px-2 flex justify-center items-center text-[18px]">
              {shortAdd(address)}
            </span>
          ) : (
            <button onClick={connectWallet}>LOGIN</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
