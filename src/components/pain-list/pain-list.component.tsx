import { Pain } from '@/types/pain'
import { PainCard } from '../pain-card/pain-card.component'

export const PainList = ({
  pains,
  handleDelete,
}: {
  pains: Pain[]
  handleDelete: (pain: Pain) => void
}) => {
  return (
    <div className="mt-4">
      {pains?.length > 0 &&
        pains.map((pain) => (
          <PainCard handleDelete={handleDelete} key={pain.id} pain={pain} />
        ))}
      {!pains?.length && (
        <h1 className="my-4 text-lg text-center">Nenhuma dor registrada</h1>
      )}
    </div>
  )
}
