import React from 'react';
import PropTypes from 'prop-types';

import {getMonths, getYears} from '../LocaleUtils';

import DatePickerDropdown from './DatePickerDropdown';

import styles from './styles.scss';


const caption = text =>
  <div className={styles.staticCaption}>
    {text}
  </div>;


const DatePickerHead = ({
  date,
  showYearDropdown,
  showMonthDropdown,
  locale,
  onDateChange
}) =>
  <div className={styles.dropdownCaptionContainer}>
    { showMonthDropdown ?
      <DatePickerDropdown
        dataHook="datepicker-year-dropdown"
        value={date.getMonth()}
        caption={date.getMonth()}
        options={getMonths()}
        onChange={({value}) =>
          onDateChange(new Date(value, date.getMonth()))
        }
        /> :

      caption(date.getMonth())
    }

    { showYearDropdown ?
      <DatePickerDropdown
        dataHook="datepicker-month-dropdown"
        value={date.getFullYear()}
        caption={date.getFullYear()}
        options={getYears()}
        onChange={({id}) =>
          onDateChange(new Date(date.getFullYear(), id))
        }
        /> :

      caption(date.getFullYear())
    }
  </div>;


DatePickerHead.propTypes = {
  date: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  showMonthDropdown: PropTypes.bool.isRequired,
  showYearDropdown: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired
};


export default DatePickerHead;
