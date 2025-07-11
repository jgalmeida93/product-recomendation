import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">
        Lista de Recomendações
      </h2>

      {recommendations.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m11.25 3v6.75A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75V12m16.5 0V9.75A2.25 2.25 0 0018.75 7.5h-1.5m3.75 4.5H3.75m0 0V9.75A2.25 2.25 0 015.25 7.5h1.5"
            />
          </svg>
          <span>
            Nenhuma recomendação encontrada.
            <br />
            Selecione preferências e funcionalidades.
          </span>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 transition hover:shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-blue-700">
                {recommendation.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700`}
              >
                {recommendation.category}
              </span>
            </div>
            {recommendation.score !== undefined && (
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-700 font-semibold text-sm">
                  Compatibilidade:
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded"
                    style={{
                      width: `${Math.min(recommendation.score * 25, 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {recommendation.score} ponto(s)
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <span className="font-medium text-gray-700">Preferências:</span>
                <ul className="ml-4 mt-1 list-disc text-xs text-gray-600">
                  {recommendation.preferences.map((pref, idx) => (
                    <li key={idx}>{pref}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Funcionalidades:
                </span>
                <ul className="ml-4 mt-1 list-disc text-xs text-gray-600">
                  {recommendation.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
