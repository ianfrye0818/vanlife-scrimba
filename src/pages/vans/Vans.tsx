import { useState } from 'react';
import Layout from '../../layout';
import Vanslist from './vanslist';

export default function Vans() {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  const handleFilterClick = (index: number) => {
    if (activeFilters.includes(index)) {
      // If the filter is already active, remove it
      setActiveFilters(activeFilters.filter((filter) => filter !== index));
    } else {
      setActiveFilters([...activeFilters, index]);
    }
  };

  const isFilterActive = (index: number) => activeFilters.includes(index);

  return (
    <Layout>
      <h1>Explore our van options</h1>
      <div className='filter-options-container'>
        <button
          className={`van-card-type filter-options ${isFilterActive(0) && 'active'}`}
          onClick={() => handleFilterClick(0)}
        >
          Rugged
        </button>
        <button
          className={`van-card-type filter-options ${isFilterActive(1) && 'active'}`}
          onClick={() => handleFilterClick(1)}
        >
          Simple
        </button>
        <button
          className={`van-card-type filter-options ${isFilterActive(2) && 'active'}`}
          onClick={() => handleFilterClick(2)}
        >
          Luxury
        </button>
        <div>
          <button onClick={() => setActiveFilters([])}>Clear filters</button>
        </div>
      </div>
      <Vanslist />
    </Layout>
  );
}
