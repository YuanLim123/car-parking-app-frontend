<script setup>
import { onBeforeUnmount } from 'vue';
import { useChangePassword } from '@/stores/changePassword';

const store = useChangePassword();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <form @submit.prevent="store.updatePassword">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Change Password</h1>
      <div class="alert alert-success mb-4" v-show="store.status">
        {{ store.status }}
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="current_password" class="required">Current Password</label>
        <input
          v-model="store.form.current_password"
          id="current_password"
          name="current_password"
          type="password"
          class="form-input"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="current_password" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required"> Password </label>
        <input
          v-model="store.form.password"
          id="password"
          name="password"
          type="password"
          class="form-input"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required"> Confirm new password </label>
        <input
          v-model="store.form.password_confirmation"
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          class="form-input"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password_confirmation" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="store.loading">
        <IconSpinner class="animate-spin" v-show="store.loading" />
        Update password
      </button>
    </div>
  </form>
</template>
