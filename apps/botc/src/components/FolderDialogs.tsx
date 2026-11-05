import { useState } from 'react'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { useSavedScriptsStore } from '@/stores/savedScriptsStore'
import { compareNames } from '@/stores/folderLibrary'

/** Both dialogs keep errors and pending writes visible without touching script edits. */
export function FolderDialog({
  scriptId,
  folderId,
  onClose,
}: {
  scriptId?: string
  folderId?: string
  onClose: () => void
}) {
  const { t } = useTranslation()
  const store = useSavedScriptsStore()
  const folder = folderId ? store.folderLibrary.folders[folderId] : undefined
  const [name, setName] = useState(folder?.name || '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const run = async (action: () => Promise<void>) => {
    setBusy(true)
    setError('')
    try {
      await action()
      onClose()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not update folders. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose()
      }}
    >
      <Dialog.Content maxWidth="440px" aria-describedby={undefined}>
        <Dialog.Title>
          {t(scriptId ? 'Select folder' : 'Edit folder')}
        </Dialog.Title>
        <Flex direction="column" gap="3">
          {scriptId && (
            <>
              <Button
                disabled={busy}
                variant="soft"
                onClick={() => run(() => store.moveScript(scriptId, null))}
              >
                {t('No folder')}
              </Button>
              {Object.values(store.folderLibrary.folders)
                .sort(compareNames)
                .map((option) => (
                  <Button
                    key={option.id}
                    disabled={busy}
                    variant="soft"
                    onClick={() =>
                      run(() => store.moveScript(scriptId, option.id))
                    }
                  >
                    {option.name}
                  </Button>
                ))}
            </>
          )}
          {!confirmDelete ? (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                void run(() =>
                  scriptId
                    ? store.createFolderAndMove(scriptId, name)
                    : store.renameFolder(folderId!, name),
                )
              }}
            >
              <Flex direction="column" gap="3">
                <Text as="label" htmlFor="folder-name">
                  {t('Folder name')}
                </Text>
                <TextField.Root
                  id="folder-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={busy}
                />
                <Button type="submit" disabled={busy}>
                  {t(scriptId ? 'Create folder and move' : 'Rename')}
                </Button>
                {!scriptId && (
                  <Button
                    type="button"
                    color="red"
                    variant="soft"
                    disabled={busy}
                    onClick={() => setConfirmDelete(true)}
                  >
                    {t('Delete')}
                  </Button>
                )}
              </Flex>
            </form>
          ) : (
            <>
              <Text>
                {t(
                  'Delete this folder? No scripts will be deleted or changed. They will simply become unfiled.',
                )}
              </Text>
              <Button
                color="red"
                disabled={busy}
                onClick={() => run(() => store.deleteFolder(folderId!))}
              >
                {t('Confirm delete folder')}
              </Button>
            </>
          )}
          {error && (
            <Text role="alert" color="red">
              {t(error)}
            </Text>
          )}
          <Button variant="soft" color="gray" disabled={busy} onClick={onClose}>
            {t('Cancel')}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export function ScriptFolderButton({ scriptId }: { scriptId: string }) {
  const { t } = useTranslation()
  const library = useSavedScriptsStore((state) => state.folderLibrary)
  const folder = library.folders[library.membership[scriptId]]
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="1" variant="soft" onClick={() => setOpen(true)}>
        {folder ? t('In {{folder}}', { folder: folder.name }) : t('Folder')}
      </Button>
      {open && (
        <FolderDialog scriptId={scriptId} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
