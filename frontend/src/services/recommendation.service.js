const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products,
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  if (
    (!selectedPreferences || selectedPreferences.length === 0) &&
    (!selectedFeatures || selectedFeatures.length === 0)
  ) {
    return [];
  }

  const productsWithScores = products.map((product) => {
    let preferenceScore = 0;
    let featureScore = 0;

    if (selectedPreferences && selectedPreferences.length > 0) {
      const matchingPreferences = selectedPreferences.filter((pref) =>
        product.preferences.includes(pref),
      );
      preferenceScore = matchingPreferences.length;
    }

    if (selectedFeatures && selectedFeatures.length > 0) {
      const matchingFeatures = selectedFeatures.filter((feature) =>
        product.features.includes(feature),
      );
      featureScore = matchingFeatures.length;
    }

    const totalScore = preferenceScore + featureScore;

    return {
      ...product,
      score: totalScore,
      preferenceScore,
      featureScore,
    };
  });

  const matchingProducts = productsWithScores.filter(
    (product) => product.score > 0,
  );

  matchingProducts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return 0;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    return matchingProducts.length > 0
      ? [matchingProducts[matchingProducts.length - 1]]
      : [];
  } else {
    return matchingProducts;
  }
};

export default { getRecommendations };
