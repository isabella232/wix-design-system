import React from 'react';
import {Autocomplete} from 'wix-ui-backoffice/Autocomplete';
import DropdownLayout from '../DropdownLayout';

const transformOptions = options => {
  console.log(options);
  return (options || [])
    .map(x =>
      x.value === '-' ?
      Autocomplete.createDivider() :
      Autocomplete.createOption(x.id, !!x.disabled, true, x.value, () => x.value));
};

const AutoComplete = ({options}) => {
  return (<Autocomplete options={transformOptions(options)}/>);
};

AutoComplete.propTypes = {
  options: DropdownLayout.propTypes.options
};

export default AutoComplete;
