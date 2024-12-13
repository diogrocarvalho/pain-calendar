import { Pain } from '@/types/pain'
import { Rating } from '@smastrom/react-rating'
import dayjs from 'dayjs'
import { LucideTrash2 } from 'lucide-react'

export const PainCard = ({
  pain,
  handleDelete,
}: {
  pain: Pain
  handleDelete: (pain: Pain) => void
}): JSX.Element => {
  return (
    <div className=" w-full border my-2 py-2 px-4 shadow-md rounded-lg text-lg font-bold">
      <div className="flex justify-between">
        <span className="flex flex-col">
          <span className="mb-1">Nível de dor</span>
          <Rating readOnly style={{ maxWidth: 100 }} value={pain.rating} />
        </span>
        <span>{dayjs(pain.time).format('DD/MM/YYYY - HH:mm')}</span>
      </div>
      {!!pain.notes?.trim().length && (
        <section className="mt-4">
          <span className="">Notas</span>
          <p className="font-normal">{pain.notes}</p>
        </section>
      )}
      <section className="flex justify-end">
        <div data-testid="remove-button" onClick={() => handleDelete(pain)}>
          <LucideTrash2 />
        </div>
      </section>
    </div>
  )
}
