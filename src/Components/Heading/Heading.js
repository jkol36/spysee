import React, { Children } from 'react';

import { Container, HeadingText } from './styles';

const Heading = ({children}) => {
  return (
    <Container>
      <HeadingText>{children}</HeadingText>
    </Container>
  )
}


export default Heading;
