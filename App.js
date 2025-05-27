import { useEffect } from "react";
import AppNav from "./src/Navigation/AppNav";

import * as splashScreen  from "expo-splash-screen"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

splashScreen.preventAutoHideAsync()

const queryClient = new QueryClient();

export default function App() {

  useEffect(()=>{
    const prepare = async()=>{
      await new Promise (resolve => setTimeout(resolve,2000))
      await  splashScreen.hideAsync()
      
    }
    prepare()

  },[])

  return (
   <QueryClientProvider client={queryClient}>
   
        <AppNav/>

  </QueryClientProvider>
  );
}




