import { Calendar, Info } from 'lucide-react';
import { Scenario, ScenarioStep } from '../lib/supabase';

interface ScenarioDetailProps {
  scenario: Scenario;
  steps: ScenarioStep[];
}

export function ScenarioDetail({ scenario, steps }: ScenarioDetailProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {scenario.category}
              </h2>
              {scenario.description && (
                <p className="text-gray-600">{scenario.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  scenario.payment_method === 'ACH'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {scenario.payment_method}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                {scenario.billing_frequency}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {step.date}
                    </span>
                    <span className="text-gray-600">{step.event_type}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                        HighLevel Status
                      </div>
                      {step.hl_subscription_status && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Subscription
                          </span>
                          <span className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded">
                            {step.hl_subscription_status}
                          </span>
                        </div>
                      )}
                      {step.hl_transaction_status && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Transaction
                          </span>
                          <span className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded">
                            {step.hl_transaction_status}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                        Noomerik Status
                      </div>
                      {step.nmrk_subscription_status && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Subscription
                          </span>
                          <span className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded">
                            {step.nmrk_subscription_status}
                          </span>
                        </div>
                      )}
                      {step.nmrk_transaction_status && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Transaction
                          </span>
                          <span className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded">
                            {step.nmrk_transaction_status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {step.notes && (
                    <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">{step.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
