import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';
import Popper from 'popper.js';

import DayPicker from 'react-day-picker/DayPicker';

import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';
import addYears from 'date-fns/add_years';
import subYears from 'date-fns/sub_years';
import parse from 'date-fns/parse';
import isSameDay from 'date-fns/is_same_day';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';
import CalendarIcon from '../Icons/dist/components/Calendar';
import DatePickerHead from './DatePickerHead';
import {formatDate} from './LocaleUtils';

import styles from './DatePicker.scss';

/**
 * DatePicker component
 *
 * ### Keyboard support
 * * `Left`: Move to the previous day.
 * * `Right`: Move to the next day.
 * * `Up`: Move to the previous week.
 * * `Down`: Move to the next week.
 * * `PgUp`: Move to the previous month.
 * * `PgDn`: Move to the next month.
 * * `Home`: Move to the previous year.
 * * `End`: Move to the next year.
 * * `Enter`/`Esc`/`Tab`: close the calendar. (`Enter` & `Esc` calls `preventDefault`)
 *
 */
export default class DatePicker extends WixComponent {
  static displayName = 'DatePicker';

  static propTypes = {
    /** Can provide Input with your custom props */
    customInput: PropTypes.node,
    dataHook: PropTypes.string,

    /** Custom date format */
    dateFormat: PropTypes.string,

    /** DatePicker instance locale */
    locale: PropTypes.string,

    /** Is the DatePicker disabled */
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,

    /** Past dates are unselectable */
    excludePastDates: PropTypes.bool,

    /** Only the truthy dates are selectable */
    filterDate: PropTypes.func,

    /** dataHook for the DatePicker's Input */
    inputDataHook: PropTypes.string,

    /** Called upon every value change */
    onChange: PropTypes.func.isRequired,
    onEnterPressed: PropTypes.func,

    /** placeholder of the Input */
    placeholderText: PropTypes.string,

    /** Icon for the DatePicker's Input */
    prefix: PropTypes.node,

    /** Is the input field readOnly */
    readOnly: PropTypes.bool,

    /** RTL mode */
    rtl: PropTypes.bool,

    /** Display a selectable yearDropdown */
    showYearDropdown: PropTypes.bool,

    /** Display a selectable monthDropdown */
    showMonthDropdown: PropTypes.bool,

    style: PropTypes.object,

    /** Theme of the Input */
    theme: PropTypes.string,

    /** The selected date */
    value: PropTypes.object,

    /** should the calendar close on day selection */
    shouldCloseOnSelect: PropTypes.bool,

    /** controls whether the calendar will be visible or not */
    isOpen: PropTypes.bool,

    /** called when calendar visibility changes */
    setOpen: PropTypes.func,

    /** When set to true, this input will have no rounded corners on its left */
    noLeftBorderRadius: PropTypes.string,

    /** When set to true, this input will have no rounded corners on its right */
    noRightBorderRadius: PropTypes.string
  };

  static defaultProps = {
    style: {
      width: 150
    },
    locale: 'en',
    dateFormat: 'MM/DD/YYYY',
    filterDate: () => true,
    shouldCloseOnSelect: true
  };

  constructor(props) {
    super(props);

    const initialValue = props.value || new Date();

    this.state = {
      isOpen: props.isOpen || false,
      value: initialValue,
      focusedValue: initialValue
    };
  }

  componentDidMount() {
    this._popper = new Popper(
      this.refs.input,
      this.refs.calendar
    );

    super.componentDidMount();
  }

  onClickOutside() {
    this._closeCalendar();
  }

  _openCalendar = () =>
    this.setState({isOpen: true}, this._popper.scheduleUpdate);

  _closeCalendar = () =>
    this.setState({focusedValue: this.state.value, isOpen: false});

  _setFocusedValue = focusedValue => this.setState({focusedValue})

  _createDayPickerProps() {
    const {
      locale,
      showMonthDropdown,
      showYearDropdown,
      showOutsideDays = true,
      filterDate,
      excludePastDates
    } = this.props;

    const {value, focusedValue} = this.state;

    return {
      disabledDays:
        excludePastDates ?
          [{before: new Date()}] : // todo adjust with tz
          date => !filterDate(date),

      initialMonth: value,
      initialYear: value,
      selectedDays: parse(value),
      month: focusedValue,
      year: focusedValue,
      firstDayOfWeek: 1,
      locale,
      showOutsideDays,
      modifiers: focusedValue ? {'keyboard-selected': focusedValue} : {},
      modifiersStyles: {'keyboard-selected': {}},
      onKeyDown: this._handleKeyDown,
      onDayClick: this._setNewValue,
      captionElement: (
        <DatePickerHead
          {...{
            date: value,
            showYearDropdown,
            showMonthDropdown,
            locale,
            onUpdateChange: this._setFocusedValue
          }}
          />
      )
    };
  }

  _createDayPickerInputProps() {
    const {
      dateFormat: format,
      disabled
    } = this.props;

    const dayPickerInputProps = {
      ref: dayPickerInput => this.dayPickerInput = dayPickerInput,
      format,
      formatDate,
      dayPickerProps: this._createDayPickerProps(),
      inputProps: this._createInputProps()
    };

    if (disabled) {
      dayPickerInputProps.overlayComponent = () => null;
    }

    return dayPickerInputProps;
  }

  _setNewValue = value =>
    this.setState(
      isSameDay(value, this.state.value || this.props.value) ?
        {} :
        {value, focusedValue: value},
      () => {
        this.props.onChange(value);
        this.props.shouldCloseOnSelect && this._closeCalendar();
      }
    );

  keyHandlers = {
    // enter
    13: value => {
      this._setNewValue(value);

      if (this.props.shouldCloseOnSelect) {
        this._closeCalendar();
      }
    },

    // escape
    27: this._closeCalendar,

    // page up
    33: value =>
      this._setFocusedValue(subMonths(this.state.focusedValue || value, 1)),

    // page down
    34: value =>
      this._setFocusedValue(addMonths(this.state.focusedValue || value, 1)),

    // end
    35: value =>
      this._setFocusedValue(addYears(this.state.focusedValue || value, 1)),

    // home
    36: value =>
      this._setFocusedValue(subYears(this.state.focusedValue || value, 1)),

    // left arrow
    37: value =>
      this._setFocusedValue(subDays(value, 1)),

    // up arrow
    38: value =>
      this._setFocusedValue(subDays(value, 7)),

    // right arrow
    39: value =>
      this._setFocusedValue(addDays(value, 1)),

    // down arrow
    40: value =>
      this._setFocusedValue(addDays(value, 7)),

    // tab
    9: this._closeCalendar
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    if (keyHandler) {
      event.preventDefault();

      if (!this.state.isOpen) {
        this._openCalendar();
      }

      keyHandler(this.state.focusedValue || this.props.value);
    }
  }

  _createInputProps() {
    return {
      onKeyDown: this._handleKeyDown,
      onClick: this._openCalendar,
      dataHook: this.props.inputDataHook,
      ...pick(this.props, [
        'rtl',
        'style',
        'theme',
        'prefix',
        'onEnterPressed',
        'error',
        'errorMessage',
        'customInput',
        'noLeftBorderRadius',
        'noRightBorderRadius',
        'disabled',
        'readOnly'
      ])
    };
  }

  render() {
    const {
      inputDataHook,
      noLeftBorderRadius,
      noRightBorderRadius,
      dateFormat,
      locale,
      placeholderText
    } = this.props;

    return (
      <div>
        <div ref="input">
          <Input
            placeholder={placeholderText}
            value={formatDate(this.state.value, dateFormat, locale)}
            onFocus={this._openCalendar}
            onInputClicked={this._openCalendar}
            onKeyDown={this._handleKeyDown}
            prefix={<CalendarIcon/>}
            />
        </div>

        <div
          data-hook={inputDataHook}
          className={classNames(styles.wrapper, noLeftBorderRadius, noRightBorderRadius)}
          ref="calendar"
          >
          { this.state.isOpen && <DayPicker {...this._createDayPickerProps()}/> }
        </div>
      </div>
    );
  }
}
