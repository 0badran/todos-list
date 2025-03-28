interface Argument { url: string, method: string, body?: FormData }

export default async function fetchHelper({ url, method, body }: Argument) {
   return await fetch(`${process.env.API_ENDPOINT}${url}`, {
      method,
      headers: {
         'Accept': 'application/json'
      },
      body
   });
}