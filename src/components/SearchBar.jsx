export default function SearchBar({
  search,
  setSearch,
}) {

  return (
    <div className="mb-6">

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-4 rounded-2xl"
      />

    </div>
  )
}