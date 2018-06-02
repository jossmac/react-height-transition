# React Height Transition

Animate height when children mount/unmount.

```jsx
import HeightTransition from 'react-height-transition';

const AnimatedAlert = ({ isOpen, ...rest }) => (
  <HeightTransition initial={0}>
    {isOpen ? <Alert {...rest} /> : null}
  </HeightTransition>
);
```
