import { useEffect, useState } from 'react';
import { supabase, Scenario, ScenarioStep } from './lib/supabase';
import { ScenarioList } from './components/ScenarioList';
import { ScenarioDetail } from './components/ScenarioDetail';
import { FileText } from 'lucide-react';

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [steps, setSteps] = useState<ScenarioStep[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenarios();
  }, []);

  useEffect(() => {
    filterScenarios();
  }, [scenarios, searchTerm, filterMethod]);

  useEffect(() => {
    if (selectedScenario) {
      fetchSteps(selectedScenario.id);
    }
  }, [selectedScenario]);

  async function fetchScenarios() {
    const { data, error } = await supabase
      .from('scenarios')
      .select('*')
      .order('payment_method', { ascending: true })
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching scenarios:', error);
    } else if (data) {
      setScenarios(data);
      if (data.length > 0 && !selectedScenario) {
        setSelectedScenario(data[0]);
      }
    }
    setLoading(false);
  }

  async function fetchSteps(scenarioId: string) {
    const { data, error } = await supabase
      .from('scenario_steps')
      .select('*')
      .eq('scenario_id', scenarioId)
      .order('step_number', { ascending: true });

    if (error) {
      console.error('Error fetching steps:', error);
    } else if (data) {
      setSteps(data);
    }
  }

  function filterScenarios() {
    let filtered = scenarios;

    if (filterMethod !== 'all') {
      filtered = filtered.filter((s) => s.payment_method === filterMethod);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.category.toLowerCase().includes(term) ||
          s.name.toLowerCase().includes(term) ||
          s.description?.toLowerCase().includes(term)
      );
    }

    setFilteredScenarios(filtered);
  }

  function handleSelectScenario(id: string) {
    const scenario = scenarios.find((s) => s.id === id);
    if (scenario) {
      setSelectedScenario(scenario);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading knowledge base...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ScenarioList
        scenarios={filteredScenarios}
        selectedId={selectedScenario?.id || null}
        onSelect={handleSelectScenario}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterMethod={filterMethod}
        onFilterMethodChange={setFilterMethod}
      />

      {selectedScenario ? (
        <ScenarioDetail scenario={selectedScenario} steps={steps} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <FileText className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg">Select a scenario to view details</p>
        </div>
      )}
    </div>
  );
}

export default App;
