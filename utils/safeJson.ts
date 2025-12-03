export async function safeJson<T>(res: Response, endpoint: string): Promise<T> {
  try {
    return await res.json()
  } catch {
    const preview = await res.text().catch(() => 'Unknown body')

    const error = new Error('Failed to parse JSON') as Error & {
      hint?: string
      responsePreview?: string
      endpoint?: string
    }

    error.hint = 'error.invalid_json'
    error.responsePreview = preview
    error.endpoint = endpoint

    throw error
  }
}
