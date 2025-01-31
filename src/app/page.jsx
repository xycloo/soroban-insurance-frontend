import Image from "next/image";
import { DepositOrWithdraw } from "./components/DepositOrWithdrawForm";
import { fetchPools } from "./soroban/zephyrForwarder";

export default async function Home() {
  // let pools = await fetchPools();
  // console.log("pools:", pools);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
    </main>
  );
}
