import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  Anchor,
  Code,
  Container,
  Footer,
  Header,
  Icon,
  Repo,
  Title,
} from './styled';
import './index.css';
import HeightTransition from '../../src';

// data
// ------------------------------

const paragraphArray = [
  'Cupcake ipsum dolor sit. Amet soufflé carrot cake tootsie roll jelly-o chocolate cake.',
  'Chocolate bar gummies sweet roll macaroon powder sweet tart croissant. Pastry ice cream bear claw cupcake topping caramels jelly beans chocolate cheesecake. Candy canes pastry cake tart powder.',
  'Tootsie roll bear claw sesame snaps candy cheesecake caramels cookie. Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake. Lemon drops pastry apple pie biscuit tart tootsie roll.',
  'Brownie icing chupa chups cake cookie halvah gummi bears halvah. Sesame snaps donut gingerbread marshmallow topping powder. Biscuit chocolate cheesecake pudding candy canes tart halvah sweet. Sugar plum cake candy carrot cake.',
  'Ice cream marzipan liquorice candy canes sesame snaps danish soufflé lollipop candy canes. Lemon drops cotton candy pudding.',
  'Pie cake soufflé cupcake jujubes sugar plum. Liquorice lollipop oat cake.',
];

function getRandom() {
  const index = Math.floor(Math.random() * paragraphArray.length);
  return paragraphArray[index];
}

// example
// ------------------------------

class App extends Component {
  state = { paragraph: null };
  toggle = () => {
    const paragraph = getRandom();
    this.setState(state => ({ paragraph: state.paragraph ? null : paragraph }));
  };
  update = () => {
    const paragraph = getRandom();
    this.setState({ paragraph });
  };
  render() {
    const { paragraph } = this.state;
    return (
      <Container>
        <div>
          <Header>
            <Icon role="img" className="animate-dropin">
              📏
            </Icon>
            <Title>
              Animate height when children update with{' '}
              <Repo href="https://github.com/jossmac/react-height-transition">
                react-height-transition
              </Repo>
            </Title>
          </Header>

          <p>
            <button onClick={this.toggle} autoFocus>
              Toggle
            </button>
            {/* <button onClick={this.update} autoFocus>
              Update
            </button> */}
          </p>
          <div style={{ paddingBottom: '1em' }}>
            <HeightTransition>
              {paragraph ? <div key={paragraph}>{paragraph}</div> : null}
            </HeightTransition>
          </div>

          <Footer>
            <span> by </span>
            <a href="https://twitter.com/jossmackison" target="_blank">
              @jossmac
            </a>{' '}
            &middot; paragraphs from{' '}
            <a href="http://www.cupcakeipsum.com" target="_blank">
              Cupcake Ipsum
            </a>
          </Footer>
        </div>
      </Container>
    );
  }
}

// render
// ------------------------------

render(<App />, document.getElementById('root'));
