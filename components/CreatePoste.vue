<template>
    <div id="CreatePost" class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
      <div class="bg-black h-full w-full text-white overflow-auto">
        <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
          <button 
            @click="
              userStore.isMenuOverlay = false;
              clearData();
            "
            class="rounded-full px-2"
          >
            <Icon name="mdi:close" size="25"/>
          </button>
          <div class="text-[16px] font-semibold">New Thread</div>
        </div>
  
        <div id="Post" class="z-40 bottom-0 max-h-[100vh-200px] w-full px-3 max-w-[500px] mx-auto">
          <div class="py-2 w-full">
            <div class="flex items-center">
              <div class="flex items-center text-white">
                <img class="rounded-full h-[35px]" src="/karima.png" alt="Karima LACENE">
                <div class="ml-2 font-semibold text-[18px]">Karima LACENE</div>
              </div>
            </div>
            <div class="relative flex items-center w-full">
              <div class="w-[42px] mx-auto">
                <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
              </div>
              <div class="bg-black rounded-lg w-[calc(100%-50px)] text w-full font-light">
                <div class="pt-2 text-gray-300 bg-black w-full">
                  <textarea
                    v-model="text" 
                    style="resize: none;" 
                    placeholder="Start a thread..." 
                    id="textarea" 
                    @input="adjustTextareaHeight()" 
                    class="w-full bg-black outline-none"
                  ></textarea>
                </div>
                <div class="w-full">
                  <div class="flex flex-col gap-2 py-1">
                    <div v-if="fileDisplay">
                      <img class="mx-auto w-full mt-2 mr-2 rounded-lg" :src="fileDisplay" alt="Preview" />
                    </div>
                    <label for="fileInput">
                      <Icon name="clarity:paperclip-line" color="#ffffff" size="25" />
                      <input 
                        ref="file" 
                        type="file" 
                        id="fileInput"
                        @input="onChange" 
                        hidden 
                        accept=".jpg,.jpeg,.png" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="fileDisplay" class="mt-16"></div>
        <button 
          v-if="text" 
          :disabled="isLoading"
          @click="createPost"
          class="fixed bottom-0 font-bold text-lg w-full p-2 bg-black inline-block float-right p-4 border-t border-t-gray-700"
          :class="isLoading ? 'text-gray-600' : 'text-blue-600'"
        >
          <div v-if="!isLoading">Post</div>
          <div v-else class="flex items-center gap-2 justify-center">
            <Icon name="eos-icons:bubble-loading" size="25" /> 
            Please wait...
          </div>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  import { useUserStore } from '~/stores/user';
  
  const userStore = useUserStore();
  
  let text = ref('');
  let fileDisplay = ref(null);
  
  const adjustTextareaHeight = () => {
    const textarea = document.getElementById('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };
  
  const clearData = () => {
    text.value = '';
    fileDisplay.value = null;
  };
  
  const onChange = (event) => {
    const fileObj = event.target.files[0];
    if (fileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        fileDisplay.value = reader.result; // Convert the image to Base64
      };
      reader.readAsDataURL(fileObj);
    }
  };
  
  const createPost = () => {
    if (!text.value || !fileDisplay.value) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    const newPost = {
      id: uuidv4(),
      name: 'Karima LACENE',
      image: '/karima.png',
      text: text.value,
      picture: fileDisplay.value,
    };
  
    // Store the post locally
    if (process.client) {
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      storedPosts.unshift(newPost);
      localStorage.setItem('posts', JSON.stringify(storedPosts));
    }
  
    userStore.isMenuOverlay = false;
    clearData();
  };
  </script>
  