/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeiliSearch } from 'meilisearch';

export const meiliClient = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: 'wSzp24_XD2Sd5zRx_4D2sC5eFVT0rPPuT5na4xX_W2k',
});

export const addDocumentToIndex = <T extends Record<string, any>>(
  result: T[],
  indexName: string,
) => {
  meiliClient.index(indexName).addDocuments(result);
};
