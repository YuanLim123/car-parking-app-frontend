import { reactive, ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { useAuth } from '@/stores/auth';

export const useRegister = defineStore('register', () => {
  const errors = reactive({});
  const loading = ref(false);
  const auth = useAuth();
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    file: '',
  });

  function resetForm() {
    form.name = '';
    form.email = '';
    form.password = '';
    form.password_confirmation = '';
    form.file = '';

    errors.value = {};
  }

  async function handleSubmit() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    const tempForm = { ...form };

    let serializedForm = new FormData();

    for (let key in tempForm) {
      if (Object.prototype.hasOwnProperty.call(tempForm, key)) {
        serializedForm.append(key, tempForm[key]);
      }
    }

    return window.axios
      .post('auth/register', serializedForm)
      .then((response) => {
        auth.login(response.data.access_token, 'register');
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.password = '';
        form.password_confirmation = '';
        loading.value = false;
      });
  }

  function handleImageUpload(file) {
    form.file = file;
  }
  return { form, errors, loading, resetForm, handleSubmit, handleImageUpload };
});
