import React from 'react';
import RecommendationWizard from './components/RecommendationWizard/RecommendationWizard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center py-8 px-2">
      <header className="w-full max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
          Recomendador de Produtos RD Station
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Encontre a solução ideal da RD Station para o seu negócio! Siga o
          passo a passo e receba recomendações personalizadas de produtos.
        </p>
      </header>
      <main className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <RecommendationWizard />
      </main>
    </div>
  );
}

export default App;
