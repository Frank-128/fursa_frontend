'use client';

import Loading from '@/app/(fursa)/loading';
import { globalStore } from '@/context/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect, useState } from 'react';

export default function ReactQueryProvider({ children }:{children:React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading,setLoading] = useState(true)
  const setUser = globalStore(state=>state.setUser)
  const logout = globalStore(state=>state.logout)

  useEffect(()=>{

    setUser()
    setLoading(false)
    // return ()=>logout()
  },[])

  return (
    <QueryClientProvider client={queryClient}>
     {
      loading ? <Loading /> : children
     }
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
