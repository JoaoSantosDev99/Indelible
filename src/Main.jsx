import { ethers } from "ethers";
import abi from "./contracts/abi.json";
import { useAccount, useSigner } from "wagmi";
import { useState } from "react";
import { fromBn } from "./utils";
import { isAddress } from "ethers/lib/utils.js";

const Main = () => {
  const [inputAdd, setInputAdd] = useState("");
  const [viewRoyalties, setViewRoyalties] = useState(false);
  const [viweClaimed, setViewClaimed] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  let amount = 0;

  const goerliProv = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const indeAdd = "0x9baC80118ae432DBD5456490870a235ec9c07fE2";

  const IndelibleCont = new ethers.Contract(indeAdd, abi, goerliProv);

  const checkAdd = async () => {
    if (!isConnected) return alert("Not Connected");
    if (!isAddress(inputAdd)) {
      alert("Not a valid Address");
      return setInputAdd("");
    }

    try {
      const checked = await IndelibleCont.royalties(inputAdd);
      amount = fromBn(checked);

      setViewRoyalties(true);
      setTimeout(() => {
        setViewRoyalties(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const claim = async () => {
    if (!isConnected) return alert("Not Connected");

    const IndelibleCont = new ethers.Contract(indeAdd, abi, signer);

    try {
      const claim = await IndelibleCont.claim(address);
      await claim.wait();

      setViewClaimed(true);

      setTimeout(() => {
        setViewClaimed(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      alert("Account has no claimable royalty.");
    }
  };

  const handleInputChange = (e) => {
    setInputAdd(e.target.value);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="h-screen flex-col gap-3 w-full text-[50px] text-white items-center max-w-screen-2xl flex justify-center">
        {/* Card */}
        <div className="shadow-xl flex pt-[32px] pb-[40px] px-[24px] gap-[32px] flex-col items-center max-w-[400px] rounded-[16px] w-full bg-[#212224] opacity-90">
          <h2 className="text-[48px] uppercase">Check & Claim Royalty</h2>

          <div>
            <h3 className="text-[16px] font-medium">Enter Wallet</h3>
            <input
              onChange={handleInputChange}
              value={inputAdd}
              type="text"
              min={0}
              placeholder="0xkadknfsdf"
              className="lowercase border border-[#5E6065] mb-[40px] h-[37px] max-w-[280px] placeholder:text-[16px] rounded-[8px] px-[16px] placeholder:text-[#5E6065] py-[8px] w-full outline-none flex items-center text-xl justify-center gap-2 bg-[#111111] text-gray-200"
            />

            <div className="flex gap-[20px] text-[#151515] text-[20px] tex flex-col items-center">
              <button
                onClick={checkAdd}
                className="h-[48px] w-[280px] rounded-[8px] bg-[#C1B8B1]"
              >
                Check
              </button>
              <button
                onClick={claim}
                className="h-[48px] w-[280px] rounded-[8px] bg-[#C1B8B1]"
              >
                Claim
              </button>
            </div>
          </div>
        </div>

        {viweClaimed && (
          <div className="bg-[#36B37E] text-[24px] p-1 text-center max-w-[400px] w-full rounded-[16px]">
            Successfully claimed!
          </div>
        )}

        {viewRoyalties && (
          <div className="bg-[#636363] text-[24px] p-1 text-center max-w-[400px] w-full rounded-[16px]">
            Royalties: {amount}
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;
