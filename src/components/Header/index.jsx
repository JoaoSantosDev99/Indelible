import { useAccount, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { shortAdd } from "../../utils";
import logo from "../../Assets/logo.svg";

const Header = () => {
  const { open } = useWeb3Modal();
  const { switchNetwork } = useSwitchNetwork();

  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    try {
      switchNetwork?.(11155111);
      // switchNetwork?.(1);

      open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full flex justify-center bg-[#C1B8B1]">
      <div className="px-[10px] sm:px-[30px] h-[60px] max-w-screen-2xl w-full flex items-center justify-between">
        <h1>
          <img
            src={logo}
            alt=""
            className="h-[50px]"
          />
        </h1>

        <div className="flex justify-center items-center font-normal gap-[10px] sm:gap-[30px] uppercase sm:text-[24px] text-[20px] text-[#151515]">
          <button>Buy</button>
          <button>About</button>

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
