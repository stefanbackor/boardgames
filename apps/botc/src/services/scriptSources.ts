/**
 * The I/O end of script intake: getting the text of a file or a remote URL to
 * readScript. Kept out of `/src/utils/`, which holds pure functions only, so
 * the validation itself stays testable without a File or a fetch.
 */

import {
  readScript,
  type IntakeError,
  type IntakeResult,
} from '@/utils/scriptIntake'

/** Wraps a rejection reason as a failed result */
const reject = (error: IntakeError): IntakeResult => ({ ok: false, error })

/** The file name without its extension */
const fileStem = (name: string) => name.replace(/\.[^/.]+$/, '')

/**
 * Reads a script from a file, named after the file when its metadata is not.
 *
 * @param file - The uploaded file
 * @param read - Reads the file as text; File#text unless a test says otherwise
 * @returns The script, or the reason it was rejected - `read-failed` when the
 *   file could not be read at all
 */
export async function readScriptFile(
  file: File,
  read: (file: File) => Promise<string> = (file) => file.text(),
): Promise<IntakeResult> {
  let text: string
  try {
    text = await read(file)
  } catch {
    return reject({ kind: 'read-failed' })
  }
  return readScript({ kind: 'text', text, nameHint: fileStem(file.name) })
}

/** How a remote URL delivered its script */
export type ScriptUrlKind = 'encoded_tool_url' | 'direct_json'

/**
 * Reads a script from a URL. A URL carrying a `script` parameter - the
 * official script tool, or anything using its link format - is decoded on the
 * spot; any other URL is fetched and its body read as JSON, named after the
 * file it points at when the metadata is not.
 *
 * @param url - The URL as the user gave it
 * @param fetchImpl - Fetches the URL; the global fetch unless a test says otherwise
 * @returns The result, and how the URL delivered it once it is known to be one
 */
export async function readScriptUrl(
  url: string,
  fetchImpl: typeof fetch = fetch,
): Promise<IntakeResult & { urlKind?: ScriptUrlKind }> {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return reject({ kind: 'invalid-url' })
  }

  const param = parsedUrl.searchParams.get('script')
  if (param) {
    return {
      ...readScript({ kind: 'encoded', param }),
      urlKind: 'encoded_tool_url',
    }
  }

  let text: string
  try {
    const response = await fetchImpl(url)
    if (!response.ok) {
      return {
        ...reject({ kind: 'fetch-failed', statusText: response.statusText }),
        urlKind: 'direct_json',
      }
    }
    text = await response.text()
  } catch (error) {
    return {
      ...reject({
        kind: 'network',
        message: error instanceof Error ? error.message : String(error),
      }),
      urlKind: 'direct_json',
    }
  }

  const nameHint = fileStem(url.split('/').pop() ?? '')
  return {
    ...readScript({ kind: 'text', text, nameHint }),
    urlKind: 'direct_json',
  }
}
