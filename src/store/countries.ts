import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { Country } from '@/types/Country';

const API_URL = 'https://restfulcountries.com/api/v1';
const API_KEY = '1126|6m3aSP4FjBMjZLWu352H6fYFaqhpeTJ6Ip768Ery';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useCountriesStore = defineStore('countries', () => {
  const allCountries = ref<Country[]>([]);
  const favoriteCountries = ref<Country[]>(loadFavorites());
  const filteredCountries = ref<Country[]>([]);
  const homepageCountries = ref<Country[]>([]);
  const searchResults = ref<Country[]>([]);
  const currencies = ref<string[]>([]);
  const isLoading = ref(false);
  const totalCountries = ref(0);
  const currentPage = ref(1);
  const countryDetail = ref<Country[]>([])
  const countriesSimilarToContinent = ref<Country[]>([])

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  };

  const fetchAllCountries = async () => {
    isLoading.value = true;
    let page = 1;
    const perPage = 100;
    try {
      allCountries.value = [];
      let hasMore = true;
      while (hasMore) {
        await delay(500);

        const response = await axios.get(`${API_URL}/countries`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          },
          params: {
            page,
            per_page: perPage
          }
        });

        allCountries.value.push(...response.data.data);

        hasMore = allCountries.value.length < response.data.meta.total;
        page += 1;
      }
      extractCurrencies();
      totalCountries.value = allCountries.value.length;
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchHomepageCountries = async (page = 1, perPage = 9) => {
    isLoading.value = true;
    try {
      if (allCountries.value.length === 0) {
        await fetchAllCountries();
      }
      const shuffled = [...allCountries.value].sort(() => 0.5 - Math.random());
      const countries = shuffled.slice((page - 1) * perPage, page * perPage);
      if (page === 1) {
        homepageCountries.value = countries;
      } else {
        homepageCountries.value.push(...countries);
      }
      currentPage.value = page;
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCountriesByCurrency = async (currency: string) => {
    isLoading.value = true;
    try {
      if (allCountries.value.length === 0) {
        await fetchAllCountries();
      }

      filteredCountries.value = allCountries.value.filter((country: Country) => {
        return country.currency === currency;
      });

      totalCountries.value = filteredCountries.value.length;
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const searchCountryDetail = async (name: string) => {
    isLoading.value = true;
    try {
      if (allCountries.value.length === 0) {
        await fetchAllCountries();
      }

      countryDetail.value = allCountries.value.filter((c: Country) => {
        return c.name.toLowerCase() === name.toLowerCase();
      });

    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  }

  const fetchCountriesSimilarToContinent = async (continent: string) => {
    isLoading.value = true;
    try {
      if (allCountries.value.length === 0) {
        await fetchAllCountries();
      }

      countriesSimilarToContinent.value = allCountries.value.filter((c: Country) => {
        return c.continent && c.continent.toLowerCase() === continent.toLowerCase();
      });

    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  }


  const searchCountries = async (query: string) => {
    isLoading.value = true;
    try {
      if (allCountries.value.length === 0) {
        await fetchAllCountries();
      }

      const lowerCaseQuery = query.toLowerCase();
      const uniqueCountries = new Set<string>();
      searchResults.value = allCountries.value.filter((country: Country) => {
        if (country.name.toLowerCase().includes(lowerCaseQuery)) {
          if (!uniqueCountries.has(country.name)) {
            uniqueCountries.add(country.name);
            return true;
          }
        }
        return false;
      });

      isLoading.value = false;
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const extractCurrencies = () => {
    const currencySet = new Set<string>();
    allCountries.value.forEach((country) => {
      currencySet.add(country.currency);
    });
    currencies.value = Array.from(currencySet);
  };

  const toggleFavorite = (country: Country) => {
    const index = favoriteCountries.value.findIndex(fav => fav.name === country.name);
    if (index >= 0) {
      favoriteCountries.value.splice(index, 1); // Remove from favorites
    } else {
      favoriteCountries.value.push(country); // Add to favorites
    }
    saveFavorites();
    favoriteCountries.value = Array.from(new Set(favoriteCountries.value.map(c => JSON.stringify(c)))).map(c => JSON.parse(c));
  };


  const isFavorite = (country: Country) => {
    return favoriteCountries.value.some(fav => fav.name === country.name);
  };

  function saveFavorites() {
    localStorage.setItem(
        "favoriteCountries",
        JSON.stringify(favoriteCountries.value)
    );
  }

  function loadFavorites() {
    const savedFavorites = localStorage.getItem("favoriteCountries");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  return {
    allCountries,
    favoriteCountries,
    filteredCountries,
    homepageCountries,
    searchResults,
    currencies,
    isLoading,
    totalCountries,
    currentPage,
    fetchAllCountries,
    fetchHomepageCountries,
    fetchCountriesByCurrency,
    searchCountries,
    toggleFavorite,
    isFavorite,
    searchCountryDetail,
    loadFavorites,
    countryDetail,
    fetchCountriesSimilarToContinent,
    countriesSimilarToContinent,
    handleError
  };
});
