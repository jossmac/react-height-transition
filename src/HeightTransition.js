// @flow

import React, { cloneElement, Component, type Element } from 'react';
import NodeResolver from 'react-node-resolver';
import { Transition, TransitionGroup } from 'react-transition-group';

type Height = number | string;
type Props = {
  alpha: boolean,
  children: Element<*>,
  initial: Height,
  onChange?: Height => any,
  tag: string,
};
type State = { height: Height };

function getStyle(element, key, parse) {
  const style = element.currentStyle || window.getComputedStyle(element);
  return key ? (parse ? parseInt(style[key]) : style[key]) : style;
}
function uniqueId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export default class HeightTransition extends Component<Props, State> {
  childId = uniqueId();
  state = { height: this.props.initial };
  static defaultProps = { alpha: true, initial: 0, tag: 'div' };
  getNode = (ref: HTMLElement) => {
    const { initial, onChange } = this.props;
    const height = ref ? ref.scrollHeight : initial;

    if (height !== this.state.height) {
      this.setState({ height }, () => {
        if (onChange) onChange(height);
      });
    }
  };
  render() {
    const { alpha, children, tag: Tag } = this.props;
    const { height } = this.state;
    const base = {
      transition: 'height 220ms cubic-bezier(0.2, 0, 0, 1), opacity 220ms',
    };
    const transition = {
      entering: { height, opacity: alpha ? 0 : 1 },
      entered: { height, opacity: 1 },
      exiting: { height: this.props.initial, opacity: alpha ? 0 : 1 },
      exited: { height: this.props.initial, opacity: alpha ? 0 : 1 },
    };

    return (
      <TransitionGroup component={null}>
        {children ? (
          <Transition
            timeout={220}
            appear
            mountOnEnter
            unmountOnExit
            key={this.childId}
          >
            {state => {
              const overflow = ['entering', 'exiting'].includes(state)
                ? 'hidden'
                : null;
              const style = { ...base, ...transition[state], overflow };

              return (
                <NodeResolver innerRef={this.getNode}>
                  {cloneElement(children, { style })}
                </NodeResolver>
              );
            }}
          </Transition>
        ) : null}
      </TransitionGroup>
    );
  }
}
