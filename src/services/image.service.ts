const BASE_URL = 'http://localhost:3001/'


export const ImageService = {
  fetchImages: (): Promise<Response> => {
    return fetch(`${BASE_URL}images`);
  }
}
