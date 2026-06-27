import { useState } from "react";
import { attendees } from "../data/mockData";
import { useAttendeeFilter } from "../hooks/useAttendeeFilter";
import { useAttendeeSort } from "../hooks/useAttendeeSort";
import type { Filters, Attendee, SortConfig } from "../types/attendee";

export default function AttendeesTable() {
  const [data, setData] = useState<Attendee[]>(attendees);

  const [filters, setFilters] = useState<Filters>({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    minScore: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const filteredData = useAttendeeFilter(data, filters);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useAttendeeSort(filteredData, sortConfig);

  const handleEdit = (
    id: number,
    field: keyof Attendee,
    value: string | number
  ) => {
    setData((prev) =>
      prev.map((attendee) =>
        attendee.id === id
          ? {
              ...attendee,
              [field]: value,
            }
          : attendee
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Attendees Management
        </h2>

        <span className="text-sm text-gray-500">
          {sortedData.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortConfig?.key === "email" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("joinDate")}
              >
                Date{" "}
                {sortConfig?.key === "joinDate" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("score")}
              >
                Score{" "}
                {sortConfig?.key === "score" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>

            <tr className="bg-gray-50">
              <th className="p-2">
                <input
                  type="search"
                  placeholder="Search Name"
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </th>

              <th className="p-2">
                <input
                  type="search"
                  placeholder="Search Email"
                  value={filters.email}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </th>

              <th className="p-2">
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-2 py-2"
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
                    className="w-full rounded-lg border border-gray-300 px-2 py-2"
                  />
                </div>
              </th>

              <th className="p-2">
                <input
                  type="number"
                  placeholder="Min Score"
                  value={filters.minScore}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minScore: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((attendee) => (
              <tr
                key={attendee.id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="p-4">
                  <input
                    value={attendee.name}
                    onChange={(e) =>
                      handleEdit(attendee.id, "name", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </td>{" "}
                <td className="p-4">
                  <input
                    value={attendee.email}
                    onChange={(e) =>
                      handleEdit(attendee.id, "email", e.target.value)
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </td>{" "}
                <td className="p-4">
                  <input
                    type="date"
                    value={attendee.joinDate}
                    onChange={(e) =>
                      handleEdit(attendee.id, "joinDate", e.target.value)
                    }
                  />
                </td>{" "}
                <td className="p-4">
                  <input
                    type="number"
                    value={attendee.score}
                    onChange={(e) =>
                      handleEdit(attendee.id, "score", Number(e.target.value))
                    }
                    className="w-20 border rounded px-2 py-1"
                  />
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
