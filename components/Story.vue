<template>
    <div class="w-full bg-black text-white py-4 border-b border-gray-800">
        <!-- Barre de progression en haut -->
        <div class="flex gap-1 px-4 mb-4">
            <div v-for="(item, index) in story.items" :key="index" class="h-[2px] flex-grow">
                <div 
                    :class="[
                        'h-full bg-gray-500 transition-all duration-100',
                        currentIndex > index ? 'w-full' : 
                        currentIndex === index ? 'animate-progress' : 
                        'w-0'
                    ]"
                ></div>
            </div>
        </div>

        <!-- En-tête -->
       <div class="flex items-center justify-between px-4 mb-2">
    <div class="flex items-center gap-2">
        <img :src="story.userImage" class="w-8 h-8 rounded-full" />
        <span class="font-semibold">{{ story.userName }}</span>
        <span class="text-gray-400 text-sm">{{ formatTime(story.items[currentIndex].timestamp) }}</span>
    </div>
    <div class="flex gap-4">
        <!-- Ajout du bouton supprimer -->
        <button 
            v-if="story.userName === 'Asmaa Bourass'" 
            @click="$emit('delete-story')" 
            class="text-red-500 hover:text-red-400"
        >
            <Icon name="mdi:delete" size="24" />
        </button>
        <button @click="$emit('close')" class="text-white">
            <Icon name="mdi:close" size="24" />
        </button>
    </div>
</div>


        <!-- Contenu de la story -->
        <div class="relative h-[calc(100vh-150px)]">
            <img 
                :src="story.items[currentIndex].media" 
                class="w-full h-full object-contain"
                @click="handleClick"
            />
            
            <!-- Navigation -->
            <button 
                @click="previousStory" 
                class="absolute left-0 top-0 w-1/2 h-full opacity-0"
            />
            <button 
                @click="nextStory" 
                class="absolute right-0 top-0 w-1/2 h-full opacity-0"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    story: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close', 'next', 'previous']);

const currentIndex = ref(0);
let timer;

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

const startTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        nextStory();
    }, 5000); // Chaque story dure 5 secondes
};

const nextStory = () => {
    if (currentIndex.value < props.story.items.length - 1) {
        currentIndex.value++;
        startTimer();
    } else {
        emit('next');
    }
};

const previousStory = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        startTimer();
    } else {
        emit('previous');
    }
};

const handleClick = (event) => {
    const { clientX } = event;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;
    
    if (clickPosition < width / 2) {
        previousStory();
    } else {
        nextStory();
    }
};

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearTimeout(timer);
});
</script>

<style scoped>
@keyframes progress {
    from { width: 0; }
    to { width: 100%; }
}

.animate-progress {
    animation: progress 5s linear;
    width: 100%;
}
</style>