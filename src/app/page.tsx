"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to School Management System</h1>
      <p className='text-lg text-gray-600'>Manage your school efficiently and effectively.</p>
      <button onClick={() => router.push('/login')} type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </div>
  );
}
