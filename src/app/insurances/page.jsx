import Image from "next/image";
import { InsuranceCard } from "../components/InsuranceCard";
import { cookies } from 'next/headers'
import { DepositOrWithdraw } from "../components/DepositOrWithdrawForm";

export default function Home() {
  const cookiesStore = cookies()

  let publicKey
  if (cookiesStore.get("publicAddress")) {
    publicKey = cookiesStore.get("publicAddress").value
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <InsuranceCard />
        {publicKey &&
          <div className="sm:w-full md:w-1/2 lg:w-full mt-4 bg-white border border-gray-100 rounded-md">
            <div className="mt-6 mb-7 mx-auto px-8">
              {/*<DepositOrWithdraw contractId={params.id} publicKey={publicKey} />*/}
              <DepositOrWithdraw contractId='CAYRXB3BP4VPUTH6NFAI543HOVOD6AVN4KKASSIR3GALG23EV5DQT5G5' publicKey={publicKey} />
            </div>
          </div>}
      </div>
    </main>
  );
}
