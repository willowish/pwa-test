import React from 'react';

import { Grid, Text, Wrap, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const GridBox = styled(Grid)`
  width: 100%;
  padding: 16px;
  align-items: center;
  justify-items: center;
  height: 72px;
`;

export const Navbar: React.FC = () => {
  const color = useColorModeValue('white', 'gray.800');

  return (
    <GridBox
      gridTemplateAreas={{
        base: `'header . . . . createMenu'`,
      }}
      backgroundColor={color}
      boxShadow="md"
    >
      <Text cursor="pointer" fontWeight="bolder">
        PWA-TEST
      </Text>
      <Wrap gridArea="createMenu">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Wrap>
    </GridBox>
  );
};
