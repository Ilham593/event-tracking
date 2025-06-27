import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../eventApi";
function EventDetail() {
  const { id } = useParams();
  const { data: event, isLoading, error } = useGetEventByIdQuery(id);

  if (isLoading) return <p className="text-center mt-20 text-blue-500 animate-pulse">Loading detail event...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Gagal memuat detail event.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
        {/* Gambar */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover transition duration-500 hover:scale-105"
        />

        {/* Konten */}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>
          <p className="text-gray-700 text-sm">{event.description}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-semibold">📅 Tanggal:</span> {new Date(event.date).toLocaleString()}</p>
            <p><span className="font-semibold">📍 Lokasi:</span> {event.location}</p>
            <p><span className="font-semibold">💳 Harga:</span> Rp {event.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
