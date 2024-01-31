import { useContext } from 'react';
import { VanFilterContext } from './Vans';
import { VanFilterEnum } from '../../types/VanEnums';

export default function VanTypeFilterList() {
  const { vanFilter, setVanFilter } = useContext(VanFilterContext);

  function handleFilterClick(filter: VanFilterEnum) {
    if (vanFilter.includes(filter)) {
      setVanFilter(vanFilter.filter((f: VanFilterEnum) => f !== filter));
    } else {
      setVanFilter([...vanFilter, filter]);
    }
  }

  const isFilterActive = (filter: VanFilterEnum) => vanFilter.includes(filter);

  return (
    <div className='filter-options-container'>
      <label
        className={`van-card-type filter-options ${
          isFilterActive(VanFilterEnum.rugged) && 'active'
        }`}
      >
        <input
          type='checkbox'
          checked={isFilterActive(VanFilterEnum.rugged)}
          onChange={() => handleFilterClick(VanFilterEnum.rugged)}
        />
        Rugged
      </label>
      <label
        className={`van-card-type filter-options ${
          isFilterActive(VanFilterEnum.simple) && 'active'
        }`}
      >
        <input
          type='checkbox'
          checked={isFilterActive(VanFilterEnum.simple)}
          onChange={() => handleFilterClick(VanFilterEnum.simple)}
        />
        Simple
      </label>
      <label
        className={`van-card-type filter-options ${
          isFilterActive(VanFilterEnum.luxury) && 'active'
        }`}
      >
        <input
          type='checkbox'
          checked={isFilterActive(VanFilterEnum.luxury)}
          onChange={() => handleFilterClick(VanFilterEnum.luxury)}
        />
        Luxury
      </label>
      <div>
        <button
          className='clear-filter-button'
          onClick={() => setVanFilter([])}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
