//library imports
import { useContext } from 'react';

//component imports
import { VanFilterContext } from './VansPage';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//type imports
import { VanFilterEnum } from '../../types/VanEnums';

//TODO: refactor to use shadow ui for more consistent styling
export default function VanTypeFilterList() {
  //get the vanFilter and setVanFilter from the context
  const { vanFilter, setVanFilter } = useContext(VanFilterContext);

  //handle the change of the selected filter
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
    <div className='mt-5 flex gap-3 items-center'>
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
        className='border-none bg-transparent p-0 cursor-pointer underline'
        onClick={() => setVanFilter([])}
      >
        Clear Filters
      </button>
    </div>
  );
}
