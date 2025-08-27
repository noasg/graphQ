import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      capital
      currency
      continent {
        name
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCode, setSelectedCode] = useState(null);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error: {error.message}</p>
    );

  const visibleCountries = data.countries.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Countries for Adina11({data.countries.length})
      </h1>

      <ul className="space-y-2 w-full max-w-md">
        {visibleCountries.map((c) => {
          const isSelected = selectedCode === c.code;
          return (
            <li
              key={c.code}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={
                () => setSelectedCode(isSelected ? null : c.code) // toggle details
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{c.emoji}</span>
                <span className="font-medium text-gray-700">{c.name}</span>
              </div>

              {/* Expand details when selected */}
              {isSelected && (
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Code:</span> {c.code}
                  </p>
                  <p>
                    <span className="font-semibold">Capital:</span>{" "}
                    {c.capital || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Currency:</span>{" "}
                    {c.currency || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Continent:</span>{" "}
                    {c.continent.name}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {visibleCount < data.countries.length && (
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setVisibleCount((count) => count + 5)}
        >
          Load!! More ⬇️
        </button>
      )}
    </div>
  );
}
