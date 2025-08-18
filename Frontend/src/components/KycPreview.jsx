export default function KycPreview({ label, url }) {
  const isPdf = typeof url === "string" && url.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="w-full h-56 border rounded-lg overflow-hidden bg-gray-50">
        {isPdf ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
            <span className="text-4xl">📄</span>
            <span className="mt-1 text-xs">PDF Document</span>
          </div>
        ) : (
          <img
            src={url}
            alt={label}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs text-blue-600 hover:underline"
        >
          Open in new tab
        </a>
      )}
    </div>
  );
}
