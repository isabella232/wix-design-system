import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {stylable} from 'wix-react-tools';
import styles from './TooltipContent.st.css';

@stylable(styles)
export default class TooltipContent extends Component {

  static propTypes = {
    textAlign: PropTypes.string,

    maxWidth: PropTypes.string,
    /**
     * Tooltip content to be rendered
     */
    children: PropTypes.node.isRequired,

    /**
     * Specifies tooltip theme
     */
    theme: PropTypes.oneOf(['light', 'dark', 'error']),

    /**
     * Specifies on which side the arrow should be shown
     */
    arrowPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Custom CSS style object (used to allow setting arrow position)
     */
    arrowStyle: PropTypes.object,

    /**
     * Custom CSS style object (used to allow setting the position)
     */
    style: PropTypes.object,

    /**
     * Custom padding (not part of style since it is to the internal component)
     */
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback triggered when mouse enters the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseEnter: PropTypes.func,

    /**
     * Callback triggered when mouse leaves the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseLeave: PropTypes.func,

    /**
     * Specifies if tooltip content should use bouncing animation.
     */
    bounce: PropTypes.bool,
    size: PropTypes.oneOf(['normal', 'large']),

    /**
     * Specifies the font color of the content of the tooltip
     */
    color: PropTypes.string,
    lineHeight: PropTypes.string,
  };

  static defaultProps = {
    theme: 'light',
    arrowPlacement: 'bottom',
    maxWidth: '378px',
    size: 'normal',
    textAlign: 'center',
  };

  render() {

    const {
      children,
      theme,
      arrowPlacement,
      arrowStyle,
      style,
      onMouseEnter,
      onMouseLeave,
      bounce,
      size,
      textAlign,
      maxWidth,
      padding,
      color,
      lineHeight,
    } = this.props;

    if (color) {
      styles[theme].color = color;
    }

    if (lineHeight) {
      styles[theme].lineHeight = lineHeight;
    }

    return (
      <div style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="fadeIn">
          <div className={bounce ? `bounce-on-${arrowPlacement}` : ''}>
            <div ref={ref => this.tooltip = ref} className={`tooltip ${theme} ${size}`} style={{maxWidth, textAlign, padding}}>
              <div>{children}</div>
              <div className={`arrow ${arrowPlacement}`} style={arrowStyle}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
