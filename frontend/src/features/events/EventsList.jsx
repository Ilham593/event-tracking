import { useGetEventsQuery } from "../../services/eventsApi";

function EventsList() {
  const { data: events, error, isLoading } = useGetEventsQuery();
  if (isLoading) return <p>loading...</p>;

  if (error) return <p>error </p>;
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  );
}


export default EventsList