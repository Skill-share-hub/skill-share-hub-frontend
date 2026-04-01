interface Props {
  status: "draft" | "published" | "pending"
}

const StatusBadge = ({ status }: Props) => {
  const styles = {
    draft: "bg-gray-200 text-gray-700",
    published: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700"
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  )
}

export default StatusBadge