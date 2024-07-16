import { useRouter } from 'next/navigation'

import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import ConfirmationDialog from '../../../../shared/components/confirmation-dialog'

interface IActivity {
  id: string
  name: string
  completed: boolean
}

export const ActivitiesList = ({ initialActivities = [] }: { initialActivities?: IActivity[] }) => {
  const [activities, setActivities] = useState<IActivity[]>(initialActivities)
  const [activityName, setActivityName] = useState('')
  const router = useRouter()

  const addActivity = () => {
    if (activityName.trim() !== '') {
      setActivities([...activities, { id: uuidv4(), name: activityName, completed: false }])
      setActivityName('')
    }
  }

  const toggleActivityCompletion = (id: string) => {
    setActivities(
      activities.map((activity) => (activity.id === id ? { ...activity, completed: !activity.completed } : activity)),
    )
  }

  const removeActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const finalizeActivities = () => {
    console.log('Actividades finalizadas:', activities)
    router.back()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">Actividades</h2>
      <div className="flex items-center gap-4">
        <Input
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Ingresa una actividad"
          className="flex-2"
        />
        <Button type="button" onClick={addActivity} className="flex-1">
          Agregar
        </Button>
      </div>

      <ScrollArea className="flex flex-col gap-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="relative mt-3 flex items-center gap-4 p-4">
            <Checkbox checked={activity.completed} onCheckedChange={() => toggleActivityCompletion(activity.id)} />
            <span className="flex-1">{activity.name}</span>
            <Button variant="outline" size={'icon'} onClick={() => removeActivity(activity.id)}>
              <Trash size={20} />
            </Button>
          </Card>
        ))}
      </ScrollArea>

      <div className="mt-4 flex gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Regresar
        </Button>
        <ConfirmationDialog
          onConfirm={finalizeActivities}
          title="Confirmar finalización"
          description="Una vez marcadas como finalizadas, las actividades no podrán ser editadas. ¿Deseas continuar?"
          triggerLabel="Finalizar"
        />
      </div>
    </div>
  )
}

export default ActivitiesList
