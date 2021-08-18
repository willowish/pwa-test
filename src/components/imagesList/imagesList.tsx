import { Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImageService } from '../../services/image.service';


type ImageData = {src: string, id: string};


export const ImagesList: React.FC = () => {

  const [data, setData] = useState<ImageData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ImageService.fetchImages()
      .then(resp => resp
        .json()
        .then(setData).catch(setError))
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, []);


  if (isLoading) {
    return <>"Loading..."</>;
  }

  if (error || !data) {
    return <>"An error has occurred: "</>;
  }

  // eslint-disable-next-line no-console
  console.log(data);


  return (
    <Flex flexDirection={'column'} alignItems="center">
      {data
        ?.map(
          (d: ImageData) => <Image key={d.id}
                                   maxWidth={['100vw', '100vw', '800px']}
                                   src={d.src} />
        )}
    </Flex>
  );
};
