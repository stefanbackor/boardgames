export interface ScriptFolder {
  id: string
  name: string
  collapsed: boolean
}

/** Library metadata never enters script content, URLs, or exports. */
export interface FolderLibrary {
  folders: Record<string, ScriptFolder>
  membership: Record<string, string>
}

export const emptyFolderLibrary = (): FolderLibrary => ({
  folders: {},
  membership: {},
})

const alphabet = new Intl.Collator('en', { sensitivity: 'base', numeric: true })
export const compareNames = (
  a: { name: string; id: string },
  b: { name: string; id: string },
) => alphabet.compare(a.name, b.name) || a.id.localeCompare(b.id)

export function validateFolderName(
  library: FolderLibrary,
  value: string,
  exceptId?: string,
): string {
  const name = value.trim()
  if (!name) throw new Error('Enter a folder name.')
  if (
    Object.values(library.folders).some(
      (folder) =>
        folder.id !== exceptId &&
        folder.name.toLowerCase() === name.toLowerCase(),
    )
  )
    throw new Error('A folder with this name already exists.')
  return name
}
