<template>
    <div class="w-full overflow-x-auto bg-black">
        <div class="flex gap-4 px-4 py-2">
            <!-- Bouton Ajouter une story -->
            <div class="flex flex-col items-center">
                <button 
                    @click="openStoryCreator"
                    class="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-500 relative overflow-hidden"
                >
                    <Icon name="mdi:plus" size="24" class="text-white" />
                </button>
                <span class="text-white text-xs mt-1">Ajouter</span>
            </div>

            <!-- Stories existantes -->
            <div 
                v-for="(story, index) in stories" 
                :key="story.id"
                class="flex flex-col items-center cursor-pointer"
                @click="openStory(index)"
            >
                <div 
                    class="w-16 h-16 rounded-full border-2 p-[2px] relative overflow-hidden"
                    :class="story.seen ? 'border-gray-500' : 'border-gradient-instagram'"
                >
                    <img 
                        :src="story.userImage" 
                        class="w-full h-full rounded-full object-cover"
                        :alt="story.userName"
                        @error="handleImageError"
                    />
                </div>
                <span class="text-white text-xs mt-1 truncate max-w-[64px]">{{ story.userName }}</span>
            </div>
        </div>

        <!-- Story Creator Modal -->
        <div v-if="showCreator" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div class="bg-neutral-900 rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-white text-xl">Créer une story</h3>
                    <button @click="closeCreator" class="text-white hover:text-gray-300">
                        <Icon name="mdi:close" size="24" />
                    </button>
                </div>

                <div class="space-y-4">
                    <!-- Aperçu de la caméra -->
                    <div v-if="showCamera" class="relative">
                        <video
                            ref="videoRef"
                            autoplay
                            playsinline
                            class="w-full h-[60vh] object-cover rounded-lg"
                        ></video>
                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                            <button 
                                @click="switchCamera"
                                class="bg-white/20 p-2 rounded-full hover:bg-white/30"
                            >
                                <Icon name="mdi:camera-flip" class="text-white" size="24" />
                            </button>
                            <button 
                                @click="takePhoto"
                                class="bg-white p-4 rounded-full hover:bg-gray-200"
                            >
                                <div class="w-4 h-4 rounded-full border-2 border-black"></div>
                            </button>
                        </div>
                    </div>

                    <!-- Prévisualisation de l'image -->
                    <div v-if="previewUrl && !showCamera" class="relative">
                        <img :src="previewUrl" class="w-full h-[60vh] object-cover rounded-lg" />
                        <button 
                            @click="clearSelectedFile"
                            class="absolute top-2 right-2 bg-black/50 p-1 rounded-full"
                        >
                            <Icon name="mdi:close" class="text-white" size="20" />
                        </button>
                    </div>

                    <!-- Options de création -->
                    <div v-if="!showCamera && !previewUrl" class="flex gap-4">
                        <!-- Option Caméra -->
                        <button 
                            @click="startCamera"
                            class="flex-1 flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-400"
                        >
                            <Icon name="mdi:camera" class="text-gray-400" size="32" />
                            <span class="text-gray-400">Caméra</span>
                        </button>

                        <!-- Option Galerie -->
                        <button 
                            @click="triggerFileInput"
                            class="flex-1 flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-400"
                        >
                            <input 
                                type="file" 
                                ref="fileInput" 
                                class="hidden" 
                                accept="image/*"
                                @change="handleFileSelect"
                            />
                            <Icon name="mdi:image" class="text-gray-400" size="32" />
                            <span class="text-gray-400">Galerie</span>
                        </button>
                    </div>

                    <!-- Bouton de publication -->
                    <button 
                        v-if="previewUrl"
                        @click="createStory"
                        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Publier la story
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
    stories: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['storyCreated', 'openStory']);

// Refs pour la gestion des fichiers et prévisualisation
const showCreator = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);

// Refs pour la caméra
const videoRef = ref(null);
const stream = ref(null);
const showCamera = ref(false);
const facingMode = ref('user');

// Gestion des images
const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/150';
};

const openStory = (index) => {
    emit('openStory', index);
};

const openStoryCreator = () => {
    showCreator.value = true;
};

// Gestion de la caméra
const startCamera = async () => {
    try {
        showCamera.value = true;
        const constraints = {
            video: { facingMode: facingMode.value }
        };
        stream.value = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.value) {
            videoRef.value.srcObject = stream.value;
        }
    } catch (error) {
        console.error('Erreur accès caméra:', error);
        alert('Impossible d\'accéder à la caméra');
    }
};

const switchCamera = async () => {
    if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
    }
    facingMode.value = facingMode.value === 'user' ? 'environment' : 'user';
    await startCamera();
};

const takePhoto = () => {
    if (!videoRef.value) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.value, 0, 0);
    previewUrl.value = canvas.toDataURL('image/jpeg');
    selectedFile.value = dataURLtoFile(previewUrl.value, 'camera-photo.jpg');
    stopCamera();
};

const stopCamera = () => {
    if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
    }
    showCamera.value = false;
};

// Gestion des fichiers
const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        previewUrl.value = URL.createObjectURL(file);
    }
};

const clearSelectedFile = () => {
    selectedFile.value = null;
    previewUrl.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const closeCreator = () => {
    stopCamera();
    clearSelectedFile();
    showCreator.value = false;
};

// Utilitaire pour convertir Data URL en File
const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const createStory = async () => {
    if (selectedFile.value) {
        const newStory = {
            id: Date.now(),
            userName: "Karima LACENE",
            userImage: "https://randomuser.me/api/portraits/women/1.jpg",
            seen: false,
            items: [
                {
                    id: Date.now(),
                    type: 'image',
                    media: previewUrl.value,
                    timestamp: new Date().toISOString()
                }
            ]
        };
        
        emit('storyCreated', newStory);
        closeCreator();
    }
};

// Nettoyage
onUnmounted(() => {
    stopCamera();
});
</script>

<style scoped>
.border-gradient-instagram {
    background: linear-gradient(white, white) padding-box,
                linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) border-box;
}

.stories-row {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.stories-row::-webkit-scrollbar {
    display: none;
}
</style>