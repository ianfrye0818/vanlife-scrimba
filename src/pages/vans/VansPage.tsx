import Layout from '../../layout';
import Vanslist from './VanList';
import VanTypeFilterList from './VanTypeFilterList';
import { VanFilterContextType } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';
import { createContext, useState } from 'react';

export const VanFilterContext = createContext<VanFilterContextType>({} as VanFilterContextType);

export default function Vans() {
  const [vanFilter, setVanFilter] = useState<VanFilterEnum[]>([]);
  return (
    <Layout>
      <div className='vans-page'>
        <h1 className='w-8/12 text-3xl lg:text-6xl font-bold md:w-full'>Explore Our Van Options</h1>
        <VanFilterContext.Provider value={{ vanFilter, setVanFilter }}>
          <VanTypeFilterList />
          <Vanslist />
        </VanFilterContext.Provider>
      </div>
    </Layout>
  );
}
