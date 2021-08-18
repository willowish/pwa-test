import { Box, ChakraProvider, Grid, theme, } from '@chakra-ui/react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ImagesList } from './components/imagesList/imagesList';
import { Navbar } from './components/navbar/navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh">
            <Navbar />
            <ImagesList />
          </Grid>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
