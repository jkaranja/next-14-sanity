import React from "react";
import { client } from "./client";

const fetcher = async <T>(
  query: string,
  variables: Record<string, any>
): Promise<T> => {

    //await client.fetch<Post>(query, {slug,});
  const response = await client.fetch(query, variables);

  return response;
};

export default fetcher;
