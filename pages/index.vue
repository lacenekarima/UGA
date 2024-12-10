<template>
    <MainLayout>
      <div id="IndexPage" class="w-full overflow-auto">
        <div class="mx-auto max-w-[500px] overflow-hidden">
          <div id="Posts" class="px-4 max-w-[600px] mx-auto">
            <!-- Loading and Empty State -->
            <client-only>
              <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="eos-icons:bubble-loading" size="50" color="#ffffff" />
                  <div class="w-full mt-1">Loading...</div>
                </div>
              </div>
              <div v-if="!isLoading && posts.length === 0" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                  <div class="w-full">Make the first post!</div>
                </div>
              </div>
            </client-only>
  
            <!-- Posts Section -->
            <div v-if="posts.length > 0" v-for="post in posts" :key="post.id" class="mb-4">
              <Post :post="post" @isDeleted="refreshPosts" />
            </div>
  
            <!-- Fallback Message -->
            <div v-else-if="!isLoading && posts.length === 0">
              <p class="text-white text-center">Aucun post disponible pour le moment.</p>
            </div>
  
            <div class="mt-60"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
  <script setup>
  import MainLayout from '~/layouts/MainLayout.vue';
  import Post from '~/components/Post.vue';
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '~/stores/user';
  import { Icon } from '@iconify/vue';
  
  const posts = ref([]);
  const isLoading = ref(true);
  const userStore = useUserStore();
  
  const refreshPosts = () => {
    posts.value = userStore.getAllPosts();
  };
  
  onMounted(() => {
    // Simulate loading process
    setTimeout(() => {
      if (process.client) {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.value = storedPosts;
        isLoading.value = false;
      }
    }, 1000); // Adjust timeout as necessary
  });
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  