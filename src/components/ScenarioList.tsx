import { Search, Filter } from 'lucide-react';
import { Scenario } from '../lib/supabase';

interface ScenarioListProps {
  scenarios: Scenario[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterMethod: string;
  onFilterMethodChange: (method: string) => void;
}

export function ScenarioList({
  scenarios,
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
  filterMethod,
  onFilterMethodChange,
}: ScenarioListProps) {
  return (
    <div className="w-96 border-r border-gray-200 bg-white flex flex-col h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Subscription KB
        </h1>
        <p className="text-sm text-gray-600">
          Authoritative state logic reference
        </p>
      </div>

      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-4 h-4" />
          <select
            value={filterMethod}
            onChange={(e) => onFilterMethodChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Payment Methods</option>
            <option value="ACH">ACH Only</option>
            <option value="Card">Card Only</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {scenarios.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No scenarios found
          </div>
        ) : (
          <div className="p-2">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onSelect(scenario.id)}
                className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                  selectedId === scenario.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      scenario.payment_method === 'ACH'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {scenario.payment_method}
                  </span>
                  <span className="text-xs text-gray-500">
                    {scenario.billing_frequency}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {scenario.category}
                </h3>
                {scenario.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {scenario.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
