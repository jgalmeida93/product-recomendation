import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsUpdate }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);
    if (onRecommendationsUpdate) {
      onRecommendationsUpdate(dataRecommendations);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 bg-white rounded-xl shadow p-4 md:p-6 border border-blue-50"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-base font-semibold text-blue-800 mb-2">
          Preferências
        </label>
        <div className="bg-blue-50 rounded-lg p-3">
          <Preferences
            preferences={preferences}
            onPreferenceChange={(selected) =>
              handleChange('selectedPreferences', selected)
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-800 mb-2">
          Funcionalidades
        </label>
        <div className="bg-blue-50 rounded-lg p-3">
          <Features
            features={features}
            onFeatureChange={(selected) =>
              handleChange('selectedFeatures', selected)
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-800 mb-2">
          Tipo de Recomendação
        </label>
        <div className="bg-blue-50 rounded-lg p-3">
          <RecommendationType
            onRecommendationTypeChange={(selected) =>
              handleChange('selectedRecommendationType', selected)
            }
          />
        </div>
      </div>
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
