<template>
    <MainLayout>
      <div id="IndexPage" class="w-full overflow-auto">
        <div class="mx-auto max-w-[500px] overflow-hidden">
          <div id="Posts" class="px-4 max-w-[600px] mx-auto">
            <div v-if="posts.length > 0" v-for="post in posts" :key="post.id" class="mb-4">
              <div class="bg-black text-white p-4 rounded-lg shadow-md">
                <div class="flex items-center mb-2">
                  <img :src="post.image" alt="Profile" class="rounded-full h-[35px] mr-2">
                  <div class="font-semibold text-[16px]">{{ post.name }}</div>
                </div>
                <div class="text-gray-300 mb-2">{{ post.text }}</div>
                <div v-if="post.picture">
                  <img :src="post.picture" alt="Post Image" class="rounded-lg w-full">
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-white text-center">Aucun post disponible pour le moment.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
  <script setup>
  import MainLayout from '~/layouts/MainLayout.vue';
  import { ref, onMounted } from 'vue';
  
  let posts = ref([]);
  
  onMounted(() => {
    // Récupérer les posts stockés localement
    if (process.client) {
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.value = storedPosts;
    }
  });
  </script>
  