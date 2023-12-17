import { ethers } from "ethers";
import abi from "./contracts/abi.json";
import { useAccount, useSigner } from "wagmi";
import { useContext, useState } from "react";
import { fromBn, toBn } from "./utils";
import { AppContext } from "./context/appContext";

const Main = () => {
  const [inputAdd, setInputAdd] = useState("");
  const [viewRoyalties, setViewRoyalties] = useState(false);
  const [viweClaimed, setViewClaimed] = useState(false);
  const [searchId, setSearchId] = useState(0);
  const [claimable, setClaimable] = useState(0);
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { successToast, errorToast } = useContext(AppContext);

  const sepoliaProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_sepolia"
  );

  const ethProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  const indelibleAddTestnet = "0x139B23E0ed37168809E338C34a72650353DD5Fae";
  const indelibleAddMainnet = "0x20CE73Dc7E504c65f34D05bdC016353376A94354";

  const IndelibleCont = new ethers.Contract(
    indelibleAddTestnet,
    abi,
    sepoliaProvider
  );

  const checkAdd = async () => {
    if (inputAdd.trim() === "") return errorToast("Invalid ID");

    try {
      const checked = await IndelibleCont.claimableAmount(inputAdd);
      setViewRoyalties(false);
      setSearchId(inputAdd);

      console.log(ethers.utils.formatUnits(checked, 0), "ethers");

      setClaimable(ethers.utils.formatUnits(checked, 0));

      setViewRoyalties(true);
      setTimeout(() => {
        setViewRoyalties(false);
      }, 10000);
    } catch (error) {
      console.log("test", error);
    }
  };

  const claim = async () => {
    if (!isConnected) return errorToast("Not Connected");
    if (inputAdd.trim() === "") return errorToast("Invalid ID");

    const IndelibleCont = new ethers.Contract(indelibleAddTestnet, abi, signer);

    try {
      const claim = await IndelibleCont.claim(toBn(inputAdd));
      await claim.wait();

      setSearchId(inputAdd);
      setViewClaimed(true);

      setTimeout(() => {
        setViewClaimed(false);
      }, 10000);

      successToast("Successful Claim");
    } catch (error) {
      console.log(error);
      errorToast("Account has no claimable royalty.");
    }
  };

  const handleInputChange = (e) => {
    setInputAdd(e.target.value);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="px-[10px] h-screen flex-col gap-3 w-full text-[50px] text-white items-center max-w-screen-2xl flex justify-center">
        {/* Card */}
        <div className="shadow-xl flex pt-[32px] pb-[40px] px-[24px] gap-[32px] flex-col items-center max-w-[400px] rounded-[16px] w-full bg-[#212224] opacity-90">
          <h2 className="sm:text-[48px] text-[40px] uppercase">
            Check & Claim Royalty
          </h2>

          <div>
            <h3 className="text-[16px] font-medium">Enter Wallet</h3>
            <input
              onChange={handleInputChange}
              value={inputAdd}
              type="number"
              min={0}
              placeholder="42069"
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
          <div className="bg-[#36B37E] text-[20px] p-1 text-center max-w-[400px] w-full rounded-[16px]">
            Successfully claimed rewards for ID {searchId}
          </div>
        )}

        {viewRoyalties && (
          <div className="bg-[#636363] text-[20px] p-1 text-center max-w-[400px] w-full rounded-[16px]">
            Royalties for ID {searchId}: {claimable}
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;
