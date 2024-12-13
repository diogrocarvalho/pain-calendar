import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../ui/button'
import { DialogFooter, DialogHeader } from '../ui/dialog'
import { Label } from '../ui/label'

import { Rating } from '@smastrom/react-rating'
import React from 'react'
import { Pain } from '@/types/pain'

export const PainFormDialog = ({
  handleSave,
}: {
  handleSave: (pain: Pain) => void
}) => {
  const [rating, setRating] = React.useState(0)
  const [notes, setNotes] = React.useState('')
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setRating(0)
    setNotes('')
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Registrar dor de cabeça</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar dor de cabeça</DialogTitle>
          <DialogDescription>
            Diga o nível de dor de cabeça que você tem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid justify-center items-center gap-4">
            <Rating
              halfFillMode="svg"
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="col-span-3 text-md bold">
              Notas
            </Label>
            <Textarea
              id="notes"
              className="col-span-5"
              value={notes}
              onChange={(el) => setNotes(el.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              handleSave({ rating, notes })
              setOpen(false)
            }}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
