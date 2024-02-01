import { useContext } from 'react';
import { VanFilterContext } from './VansPage';
import { VanFilterEnum } from '../../types/VanEnums';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function VanTypeFilterList() {
  const { vanFilter, setVanFilter } = useContext(VanFilterContext);

  const handleChange = (event: SelectChangeEvent<typeof vanFilter>) => {
    const {
      target: { value },
    } = event;
    setVanFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? (value.split(',') as VanFilterEnum[]) : value
    );
  };

  const values = [VanFilterEnum.rugged, VanFilterEnum.simple, VanFilterEnum.luxury];
  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          multiple
          displayEmpty
          value={vanFilter}
          onChange={(e) => handleChange(e)}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Filter By Type</em>;
            }

            return selected.join(', ');
          }}
        >
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button
        className='clear-filter-button'
        onClick={() => setVanFilter([])}
      >
        Clear Filters
      </button>
    </div>
  );
}
