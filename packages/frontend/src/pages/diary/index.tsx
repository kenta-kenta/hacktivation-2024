import { useAccount } from "wagmi";
import { MintTextNFT } from "../../components/MintTextNFT";
import DiaryHint from "../../components/DiaryHint";

const CreateDiary = () => {
  const { isConnected } = useAccount();
  return (
    <>
      <MintTextNFT />
      <DiaryHint />
    </>
  );
};

export default CreateDiary;
