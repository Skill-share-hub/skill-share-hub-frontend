import { useEffect, useState } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import handleError from "../../shared/services/handleError";
import { WalletBalance, WalletTransaction, BuyCredits, WithdrawCredits } from './components/index';
import api from "../../shared/services/axios";
import FullScreenLoader from "../../shared/components/FullScreenLoader";
import type { QueryType, Wallet } from "./wallet.types";


export default function Wallet() {
  const { user } = useAppSelector(state => state.user);
  const [data,setData] = useState<Wallet | null>(null);
  const [loading,setLoading] = useState(false);
    const [form, setForm] = useState<QueryType>({
    limit: 1,
    status: "",
    refresh : false
  });

  const fetchWallet = async () => {
    try{
      setLoading(true);
      const {data:walletData} = await api.get(`/wallet?limit=${form.limit * 3}&status=${form.status}`);
      setData(walletData.data);

    }catch(error){
      handleError(error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchWallet()
  },[form])

  if(!data)return <FullScreenLoader />

  return (
    <div className="bg-[#fcfdfd]">

      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {user?.name?.split(' ')[0]}'s <span className="text-[#164e33]">Wallet</span>
              </h1>
              <p className="text-gray-500 mt-1 text-sm">Manage your credits, earnings, and transaction history.</p>
            </div>
            <button className="w-fit px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-95">
              View Courses
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-10">
            <section>
              <WalletBalance 
               loading={loading} 
               wallet={data} 
               setForm={setForm}
              />
            </section>

            <section className="bg-white p-6 pb-0 rounded-3xl border border-gray-100 shadow-sm">
              <WalletTransaction 
                form={form} 
                loading={loading} 
                setForm={setForm} 
                transaction={data.transactions} 
              />
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              {['student', 'admin'].includes(user?.role || '') && (
                <BuyCredits fetchWallet={fetchWallet} creditConst={data.creditConst} />
              )}
              <WithdrawCredits />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}