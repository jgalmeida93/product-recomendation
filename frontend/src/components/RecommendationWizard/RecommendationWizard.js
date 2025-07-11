import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import RecommendationList from '../RecommendationList/RecommendationList';

const steps = [
  'Preferências',
  'Funcionalidades',
  'Tipo de Recomendação',
  'Resumo',
];

function RecommendationWizard() {
  const { preferences, features, products } = useProducts();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              1. Quais são suas preferências?
            </h2>
            <div className="flex flex-col gap-2">
              {preferences.map((pref, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedPreferences.includes(pref)}
                    onChange={() => {
                      const selected = formData.selectedPreferences.includes(
                        pref,
                      )
                        ? formData.selectedPreferences.filter((p) => p !== pref)
                        : [...formData.selectedPreferences, pref];
                      handleChange('selectedPreferences', selected);
                    }}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>{pref}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              2. Quais funcionalidades você busca?
            </h2>
            <div className="flex flex-col gap-2">
              {features.map((feature, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedFeatures.includes(feature)}
                    onChange={() => {
                      const selected = formData.selectedFeatures.includes(
                        feature,
                      )
                        ? formData.selectedFeatures.filter((f) => f !== feature)
                        : [...formData.selectedFeatures, feature];
                      handleChange('selectedFeatures', selected);
                    }}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              3. Como prefere receber recomendações?
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recommendationType"
                  value="SingleProduct"
                  checked={
                    formData.selectedRecommendationType === 'SingleProduct'
                  }
                  onChange={() =>
                    handleChange('selectedRecommendationType', 'SingleProduct')
                  }
                  className="accent-blue-600 w-4 h-4"
                />
                <span>Produto Único (a melhor opção para você)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recommendationType"
                  value="MultipleProducts"
                  checked={
                    formData.selectedRecommendationType === 'MultipleProducts'
                  }
                  onChange={() =>
                    handleChange(
                      'selectedRecommendationType',
                      'MultipleProducts',
                    )
                  }
                  className="accent-blue-600 w-4 h-4"
                />
                <span>
                  Múltiplos Produtos (veja todas as opções compatíveis)
                </span>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              Resumo das escolhas
            </h2>
            <div className="mb-4">
              <div className="mb-2">
                <span className="font-semibold text-blue-700">
                  Preferências:
                </span>{' '}
                {formData.selectedPreferences.join(', ') || 'Nenhuma'}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-700">
                  Funcionalidades:
                </span>{' '}
                {formData.selectedFeatures.join(', ') || 'Nenhuma'}
              </div>
              <div>
                <span className="font-semibold text-blue-700">Tipo:</span>{' '}
                {formData.selectedRecommendationType === 'SingleProduct'
                  ? 'Produto Único'
                  : formData.selectedRecommendationType === 'MultipleProducts'
                    ? 'Múltiplos Produtos'
                    : 'Não selecionado'}
              </div>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => setShowRecommendations(true)}
              type="button"
            >
              Ver recomendações
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-8">{renderStep()}</div>

      <div className="flex justify-between gap-4">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          onClick={prevStep}
          disabled={currentStep === 0}
          type="button"
        >
          Voltar
        </button>
        {currentStep < steps.length - 1 && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={nextStep}
            type="button"
            disabled={
              (currentStep === 0 &&
                formData.selectedPreferences.length === 0) ||
              (currentStep === 1 && formData.selectedFeatures.length === 0) ||
              (currentStep === 2 && !formData.selectedRecommendationType)
            }
          >
            Próximo
          </button>
        )}
      </div>

      {showRecommendations && (
        <div className="mt-10">
          <RecommendationList
            recommendations={require('../../services/recommendation.service').default.getRecommendations(
              formData,
              products,
            )}
          />
        </div>
      )}
    </div>
  );
}

export default RecommendationWizard;
