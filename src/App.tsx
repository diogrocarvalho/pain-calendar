import '@smastrom/react-rating/style.css'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import './App.css'
import { PainFormDialog } from './components/pain-form-dialog/pain-form-dialog.component'
import { PainList } from './components/pain-list/pain-list.component'
import { Calendar } from './components/ui/calendar'
import { Home } from './pages/home.page'
import { Pain } from './types/pain'

function App() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    () => new Date()
  )
  const [currentPains, setCurrentPains] = React.useState<
    { time: string; rating: number; description?: string }[]
  >([])

  function addNewPain(pain: Pain) {
    const storagedData = JSON.parse(localStorage.getItem('pains') || '{}')
    const currentPains =
      storagedData[dayjs(selectedDate).format('DD-MM-YYYY')] || []
    const newPain = {
      ...pain,
      time: dayjs().toDate(),
      id: new Date().getTime(),
    }
    currentPains.push(newPain)
    storagedData[dayjs(selectedDate).format('DD-MM-YYYY')] = currentPains
    localStorage.setItem('pains', JSON.stringify(storagedData))
    setCurrentPains(currentPains)
  }
  function deletePain(pain: Pain) {
    const storagedData = JSON.parse(localStorage.getItem('pains') || '{}')
    const currentPains =
      storagedData[dayjs(selectedDate).format('DD-MM-YYYY')] || []
    const newPains = currentPains.filter((p: Pain) => p.id !== pain.id)
    storagedData[dayjs(selectedDate).format('DD-MM-YYYY')] = newPains
    localStorage.setItem('pains', JSON.stringify(storagedData))
    setCurrentPains(newPains)
  }

  useEffect(() => {
    const storagedData = JSON.parse(localStorage.getItem('pains') || '{}')
    setCurrentPains(
      storagedData[dayjs(selectedDate).format('DD-MM-YYYY')] || []
    )
  }, [selectedDate])

  return (
    <Home>
      <h1 className="text-2xl mb-4">Olá, Raquel!</h1>
      <div className="w-full flex flex-col items-center my-4">
        <Calendar
          className="max-w-64 rounded-lg border"
          mode="single"
          onSelect={setSelectedDate}
        />
      </div>
      <PainFormDialog handleSave={addNewPain} />
      <PainList handleDelete={deletePain} pains={currentPains} />
    </Home>
  )
}

export default App
