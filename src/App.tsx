import '@smastrom/react-rating/style.css'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import './App.css'
import { PainFormDialog } from './components/pain-form-dialog/pain-form-dialog.component'
import { PainList } from './components/pain-list/pain-list.component'
import { Calendar } from './components/ui/calendar'
import { Home } from './pages/home.page'
import { Pain } from './types/pain'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

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

    const date = dayjs(selectedDate)
    const now = dayjs()
    const updatedDate = date
      .set('hour', now.hour())
      .set('minute', now.minute())
      .set('second', now.second())

    const newPain = {
      ...pain,
      time: updatedDate.toDate(),
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

  const getBookedDays = React.useCallback(() => {
    const storagedData = JSON.parse(localStorage.getItem('pains') || '{}')
    const bookedDays = Object.entries(storagedData)
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0
        }
        return false
      })
      .map(([value]) => dayjs(value, 'DD-MM-YYYY').toDate())

    return bookedDays
  }, [])

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
          modifiers={{ booked: getBookedDays() }}
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
