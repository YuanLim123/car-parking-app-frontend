import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useProfile = defineStore('profile', () => {
  const errors = reactive({});
  const status = ref('');
  const loading = ref(false);
  const form = reactive({
    email: '',
    password: '',
    remember: false,
    url: '',
  });

  function resetForm() {
    form.email = '';
    form.password = '';
    form.remember = false;
    form.url = '';

    errors.value = {};
    status.value = '';
  }

  async function fetchProfile() {
    return window.axios.get('profile').then((response) => {
      form.name = response.data.name;
      form.email = response.data.email;
      form.url = response.data.url;
    });
  }

  async function updateProfile() {
    loading.value = true;
    errors.value = {};
    status.value = '';

    return window.axios
      .put('profile', form)
      .then((response) => {
        form.name = response.data.name;
        form.email = response.data.email;
        status.value = 'Profile has been updated';
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  return { form, errors, loading, status, resetForm, fetchProfile, updateProfile };
});
