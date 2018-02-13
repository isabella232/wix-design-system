import React from 'react';
import DropdownLayout from '../DropdownLayout';
import {bool} from 'prop-types';
import {Autocomplete} from 'wix-ui-backoffice/Autocomplete';

const transformOptions = options => {
  return (options || [])
    .map(x =>
      x.value === '-' ?
      Autocomplete.createDivider() :
      Autocomplete.createOption(x.id, !!x.disabled, true, x.value, () => x.value));
};

const AutoComplete = ({options, disabled}) => {
  return (
    <Autocomplete
      disabled={disabled}
      options={transformOptions(options)}
      />);
};

AutoComplete.propTypes = {
  options: DropdownLayout.propTypes.options,
  disabled: bool
};

export default AutoComplete;
