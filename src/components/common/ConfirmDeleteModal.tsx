import { useEffect } from 'react'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

interface ConfirmDeleteModalProps {
  isOpen: boolean
  title: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmDeleteModal({
  isOpen,
  title,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCancel()
      }
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden
      />
      <div
        className="relative z-10 w-full max-w-md rounded-xl border border-[#DDD5CC] bg-[#F5F0E8] p-6 shadow-xl"
        style={{ fontFamily }}
      >
        <h2
          id="confirm-delete-title"
          className="text-[clamp(1.2rem,1.6vw+0.7rem,1.4rem)] font-bold text-[#292929]"
        >
          Delete post?
        </h2>
        <p className="mt-3 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#444]">
          “{title}” will be permanently removed. This cannot be undone.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-full border-2 border-[#292929] bg-transparent px-5 py-2.5 text-[clamp(0.9rem,1vw+0.45rem,1rem)] font-bold text-[#292929] transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-full bg-red-600 px-5 py-2.5 text-[clamp(0.9rem,1vw+0.45rem,1rem)] font-bold text-white transition-opacity hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
