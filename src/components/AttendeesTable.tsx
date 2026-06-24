import { attendees } from "../data/mockData";

export default function AttendeesTable() {
  return (
    <>
      <div className="rounded-lg shadow p-6 bg-white">
        <h2 className="font-bold text-2xl md-4">Attendes</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="border-b">
                <td className="p-3">{attendee.id}</td>
                <td className="p-3">{attendee.name}</td>
                <td className="p-3">{attendee.email}</td>
                <td className="p-3">{attendee.joinDate}</td>
                <td className="p-3">{attendee.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
