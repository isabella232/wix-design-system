import React from 'react';
import PropTypes from 'prop-types';

import DropdownLayout from '../../DropdownLayout';
import Button from '../../Button';
import {ArrowDownThin} from '../../Icons';
import styles from '../DatePicker.scss';

const DropdownPicker = ({
  value,
  caption,
  options,
  onChange,
  dataHook
}) =>
  <div className={styles.dropdownContainer}>
    <Button
      dataHook={`${dataHook}-button`}
      height="medium"
      suffixIcon={<ArrowDownThin/>}
      theme="dark-no-border"
      >
      {caption}
    </Button>

    <DropdownLayout
      dataHook={`${dataHook}-menu`}
      value={value}
      visible={isOpen}
      options={options}
      onSelect={onChange}
      onClickOutside={onClose}
      closeOnSelect
      />
  </div>;

DropdownPicker.propTypes = {
  dataHook: PropTypes.string,
  date: PropTypes.any,
  value: PropTypes.number,
  caption: PropTypes.node,
  options: PropTypes.array,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onSelect: PropTypes.func
};

export default DropdownPicker;
