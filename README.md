# React Height Transition

Animate height when children mount and unmount.

https://jossmac.github.io/react-height-transition

```jsx
import HeightTransition from 'react-height-transition';

const AnimatedAlert = ({ isOpen, ...rest }) => (
  <HeightTransition initial={0} duration={400} easing="ease-in-out">
    {isOpen ? <Alert {...rest} /> : null}
  </HeightTransition>
);
```

## Alternatives

This component is intentionally simple. For more sophisticated alternatives that react to changing content height, checkout:

- https://github.com/souporserious/react-fluid-container
- https://github.com/Stanko/react-animate-height
- https://github.com/nkbt/react-collapse
