export type APIParams = {
  tz?: string;
  lang?: string;
}

export type APIResponse = {
  timezone: string;
  date: string;
  shouldideploy: boolean;
  message: string;
}

export async function makeRequest({ tz = 'UTC', lang = 'en' }: APIParams): Promise<APIResponse | null> {
  const url = new URL("https://shouldideploy.today/api");
  url.searchParams.set("tz", tz);
  url.searchParams.set("lang", lang);

  try {
    const response = await fetch(url.toString());

    if (response.ok)
      return await response.json();


    return null;
  } catch (err: any) {
    throw new Error(err.message);
  }

}