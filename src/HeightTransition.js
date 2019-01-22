// @flow

import React, { cloneElement, Component, type Element } from 'react';
import NodeResolver from 'react-node-resolver';
import { Transition, TransitionGroup } from 'react-transition-group';

type Height = number | string;

type Props = {
  alpha: boolean,
  children: Element<*>,
  initial: Height,
  duration: number | string,
  easing: string,
  onChange?: Height => any,
  tag: string,
};

type State = { height: Height };

function uniqueId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export default class HeightTransition extends Component<Props, State> {
  childId = uniqueId();

  state = { height: this.props.initial };

  static defaultProps = {
    alpha: true,
    initial: 0,
    duration: 220,
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
    tag: 'div'
  };

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
    const { alpha, children, initial, duration, easing } = this.props;
    const { height } = this.state;
    const base = {
      transition: `height ${duration}ms ${easing}, opacity ${duration}ms`,
    };
    const opacity = alpha ? 0 : 1;
    const transition = {
      entering: { height, opacity },
      entered: { height, opacity: 1 },
      exiting: { height: initial, opacity },
      exited: { height: initial, opacity },
    };

    return (
      <TransitionGroup component={null}>
        {children ? (
          <Transition
            timeout={duration}
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
