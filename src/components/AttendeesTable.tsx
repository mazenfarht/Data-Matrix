import { useState } from "react";
import { attendees } from "../data/mockData";

export default function AttendeesTable() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    minScore: "",
  });
  const filterSearch = attendees.filter((attendee) => {
    const matchesName = attendee.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesEmail = attendee.email
      .toLowerCase()
      .includes(filters.email.toLowerCase());
    const matchesScore =
      !filters.minScore || attendee.score >= Number(filters.minScore);

    const attendeeDate = new Date(attendee.joinDate);

    const matchesStartDate =
      !filters.startDate || attendeeDate >= new Date(filters.startDate);

    const matchesEndDate =
      !filters.endDate || attendeeDate <= new Date(filters.endDate);
    return (
      matchesName &&
      matchesEmail &&
      matchesScore &&
      matchesStartDate &&
      matchesEndDate
    );
  });
  return (
    <>
      <div className="rounded-lg shadow p-6 bg-white">
        <h2 className="font-bold text-2xl mb-4">Attendes</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Score</th>
            </tr>
            <tr className="bg-gray-50">
              <th className="p-2">
                <input
                  type="search"
                  placeholder="Search Name"
                  className="border rounded px-2 py-1 w-full"
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      name: e.target.value,
                    })
                  }
                />
              </th>

              <th className="p-2">
                <input
                  type="search"
                  placeholder="Search Email"
                  className="border rounded px-2 py-1 w-full"
                  value={filters.email}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      email: e.target.value,
                    })
                  }
                />
              </th>

              <th className="p-2">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      startDate: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      endDate: e.target.value,
                    })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </th>

              <th className="p-2">
                <input
                  type="number"
                  placeholder="Min Score"
                  className="border rounded px-2 py-1 w-full"
                  value={filters.minScore}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minScore: e.target.value,
                    })
                  }
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filterSearch.map((attendee) => (
              <tr key={attendee.id} className="border-b">
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
