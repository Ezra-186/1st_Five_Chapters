import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">Invoice not found</h2>
      <p className="text-sm text-gray-500">
        We could not find the requested invoice.
      </p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
      >
        Back to invoices
      </Link>
    </main>
  );
}
