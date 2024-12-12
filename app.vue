<template>
  <div class="bg-black fixed w-[calc(100%+1px)] h-full">
    <NuxtPage />

    <CreatePoste
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
      ]"
    />
    <Modal 
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isLogoutOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isLogoutOverlay },
      ]"
    />
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
onMounted(() => {
  // Vérifie si l'utilisateur est authentifié
  if (!localStorage.getItem('credentials')) {
    router.push('/auth/login'); // Redirige vers la page de connexion
  }
});
</script>

