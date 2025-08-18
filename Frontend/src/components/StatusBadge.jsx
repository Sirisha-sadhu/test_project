export default function StatusBadge({ value = "Pending" }) {
  const styles = {
    Pending:  "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  }[value] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles}`}>
      {value}
    </span>
  );
}
