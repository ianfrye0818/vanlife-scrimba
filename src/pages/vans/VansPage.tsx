//library imports
import { createContext, useState } from 'react';

//componet imports
import Layout from '../../layout';
import Vanslist from './VanList';
import VanTypeFilterList from './VanTypeFilterList';

//type imports
import { VanFilterContextType } from '../../types/VanInterfaces';
import { VanFilterEnum } from '../../types/VanEnums';

//create context for the filter so that it can be used in the filter list and the van list
export const VanFilterContext = createContext<VanFilterContextType>({} as VanFilterContextType);

export default function Vans() {
  const [vanFilter, setVanFilter] = useState<VanFilterEnum[]>([]);
  return (
    <Layout>
      <div className='container'>
        <h1 className='w-8/12 text-3xl lg:text-6xl font-bold md:w-full'>Explore Our Van Options</h1>
        <VanFilterContext.Provider value={{ vanFilter, setVanFilter }}>
          <VanTypeFilterList />
          <Vanslist />
        </VanFilterContext.Provider>
      </div>
    </Layout>
  );
}
