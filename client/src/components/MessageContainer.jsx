const MessageContainer = ({ role, message }) => {
  return (
    <div
      role={role}
      className={`px-4 py-2 mb-4 rounded-2xl ${
        role === 'alert'
          ? 'text-red-600 bg-red-100'
          : 'text-green-700 bg-green-100'
      }`}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
    >
      <p>{message}</p>
    </div>
  )
}

export default MessageContainer
