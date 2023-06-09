//Create a login page for solana wallet
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/img/logo-white.png";
import { connectToPhantomWallet } from '../../utils/SolanaFunctions';
import { Cookies } from "react-cookie";
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [error, setError] = useState<string>("");
  const cookies = new Cookies();
  const router = useRouter();
  const redirect = () => {
    const walletAddress = cookies.get('walletAddress');
    if (walletAddress) {
      router.push('/');
    }
  }
  const handleClick = async () => {
    redirect();
    try {
        const wallet = await connectToPhantomWallet();
        setError("");
        //Save wallet address in cookies
        cookies.set('walletAddress', wallet.publicKey.toString(), { path: '/' });
        cookies.set('balance', wallet.balance.toString(), { path: '/' });
        cookies.set("wallet", JSON.stringify(wallet.wallet), { path: '/' });
        //Navigate to dashboard
        window.location.href = '/';

    } catch (error: any) {
        console.error(error);
        setError(error.toString()); // Convert error object to string
    }
  };
  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
        <meta name="description" content="Inicia sesión en Phantom Wallet" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-[#330033]">
        <div className="absolute top-[15%] w-48 mb-10">
          <Image src={logo} alt="Logo" />
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 rounded-xl shadow-lg bg-gradient-to-tr from-violet-900 to-pink-900 shadow-violet-dark">
          <h1 className="mb-4 text-3xl font-bold text-center text-white">
            Conéctate a tu Phantom Wallet
          </h1>
          <p className="mb-8 text-gray-200 text-center">
            Da click en el botón de abajo para conectar tu wallet
          </p>
          <button className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg duration-300 hover:shadow-pink-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:animate-spin-slow" onClick={handleClick}>
            Conecta tu wallet
          </button>
          {
            error && <p className="mt-4 text-sm text-red-500">{error}</p>
          }
        </div>
      </div>
    </>
  );
}
