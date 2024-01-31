import { Suspense, createContext, useState } from 'react';
import Layout from '../../layout';
import Vanslist from './VanList';
import VanTypeFilterList from './VanTypeFilterList';
import { VanFilterContextType } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';

const VanFilterContext = createContext<VanFilterContextType>({} as VanFilterContextType);

export default function Vans() {
  const [vanFilter, setVanFilter] = useState<VanFilterEnum[]>([]);
  return (
    <Layout>
      <div className='vans-page'>
        <h1>Explore our van options</h1>
        <VanFilterContext.Provider value={{ vanFilter, setVanFilter }}>
          <VanTypeFilterList />
          <Suspense fallback={<Loading />}>
            <Vanslist />
          </Suspense>
        </VanFilterContext.Provider>
      </div>
    </Layout>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
export { VanFilterContext };
