import { useContext } from 'react';
import { VanFilterContext } from './Vans';
import { VanFilterEnum } from '../../types/VanEnums';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
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
        <InputLabel id='VanFilters-label'>Filter By Type</InputLabel>
        <Select
          labelId='VanFilters-label'
          id='VanFilters'
          multiple
          value={vanFilter}
          onChange={(e) => handleChange(e)}
          input={<OutlinedInput label='VanFilters-label' />}
          renderValue={(selected) => (selected as VanFilterEnum[]).join(', ')}
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
