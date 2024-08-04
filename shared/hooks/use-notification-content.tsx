import { notificationStyles } from '../constants/notification-styles'

const useNotificationContent = (title: string, body: string) => {
  const parts = body ? body.split(' - ') : []

  const NotificationContent = () => (
    <div style={notificationStyles.container}>
      <div style={notificationStyles.title}>{title}</div>
      {parts.length === 2 && (
        <>
          <div style={notificationStyles.item}>{parts[0]}</div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>Fecha:</span>
            <span>{parts[1]}</span>
          </div>
        </>
      )}
      {parts.length === 3 && (
        <>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>{parts[0].split(':')[0]}:</span>
            {parts[0].split(':')[1]}
          </div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>{parts[1].split(':')[0]}:</span>
            {parts[1].split(':')[1]}
          </div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>Fecha:</span>
            <span>{parts[2]}</span>
          </div>
        </>
      )}
    </div>
  )

  return NotificationContent
}

export default useNotificationContent
