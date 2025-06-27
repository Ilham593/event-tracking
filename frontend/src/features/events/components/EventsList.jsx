import { useGetEventsQuery } from "../eventApi";

function EventsList() {
  const { data: events, error, isLoading, isFetching } = useGetEventsQuery();

  if (isLoading) return <p>loading events</p>;
  if (error) return <p>error loading events</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Daftar Events
      </h1>

      {isFetching && (
        <p className="text-sm text-blue-500 mb-4 animate-pulse">
          Sedang memperbarui data...
        </p>
      )}

      {events.length > 0 ? (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white rounded-lg shadow-md border border-gray-100 p-4 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Kuota: {event.quota}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <a
                  href={`/event/${event._id}`}
                  className="flex-1 bg-blue-500 text-white text-sm text-center py-2 rounded hover:bg-blue-600 transition"
                >
                  Detail
                </a>
                <button
                  onClick={() => alert("Beli tiket untuk: " + event.title)}
                  className="flex-1 bg-green-500 text-white text-sm py-2 rounded hover:bg-green-600 transition"
                >
                  Beli
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Tidak ada event tersedia.</p>
      )}
    </div>
  );
}

export default EventsList;
