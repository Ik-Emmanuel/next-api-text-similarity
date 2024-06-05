import { CreateApiData } from '@/types/api/key'

export async function createApiKey() {
  console.log("we here")
  const res = await fetch('/api/api-key/create')
  console.log(res)
  const data = (await res.json()) as CreateApiData

  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(', '))
    }
    throw new Error(data.error ?? 'Something went wrong')
  }

  return data.createdApiKey.key
}
