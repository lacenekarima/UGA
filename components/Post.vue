<template>
    <div v-if="post" class="z-50 bottom-0 h-full w-full">
        <div class="py-2 w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="post.image">
                    <div class="ml-2 font-semibold text-[18px]">{{ post.name }}</div>
                </div>
                <div @click="isMenu = !isMenu" class="relative">
                    <button 
                        :disabled="isDeleting"
                        class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer" 
                        :class="isMenu ? 'bg-gray-800' : ''"
                    >
                        <Icon v-if="!isDeleting" name="bi:three-dots" color="#ffffff" size="18"/>
                        <Icon v-else name="eos-icons:bubble-loading" color="#ffffff" size="18"/>
                    </button>
                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button  
                            @click="deletePost"
                            class="flex items-center rounded gap-2 text-red-500 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900"
                        >
                            <div>Delete</div>
                            <Icon name="solar:trash-bin-trash-broken" size="20"/>
                        </button>
                    </div>
                </div>
            </div>

            <div class="relative flex items-center w-full">
                <div class="w-[42px] mx-auto">
                    <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full" />
                </div>
                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm w-full font-light">
                    <div class="py-2 text-gray-300">{{ post.text }}</div>
                    <img 
                        v-if="post.picture"
                        class="mx-auto w-full mt-2 pr-2 rounded" 
                        :src="post.picture" 
                    />
                    <div class="mt-2">
                        <button class="flex items-center gap-1" @click="toggleLike">
                            <Icon 
                                :name="hasLikedComputed ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
                                :class="hasLikedComputed ? 'text-red-500' : 'text-white'"
                                class="p-1 hover:bg-gray-800 rounded-full cursor-pointer"
                                size="28"
                            />
                        </button>
                        <div class="text-sm text-gray-500">
                            <span>{{ post.likes }}</span> likes
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
            <div class="flex items-center">
                <div class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                    <div class="flex gap-0.5">
                        <img class="rounded-full h-[14px] mt-2" src="https://picsum.photos/id/202/50">
                        <img class="rounded-full h-[17px]" src="https://picsum.photos/id/223/50">
                    </div>
                    <div class="flex items-center">
                        <img class="rounded-full h-[11px] ml-4" src="https://picsum.photos/id/99/50">
                    </div>
                </div>
            </div>
        </div>

        <div class="h-[1px] bg-gray-800 w-full mt-3" />
    </div>
    <div v-else>
        <p class="text-white">Chargement...</p>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { ref, computed } from 'vue';

const userStore = useUserStore();
const props = defineProps({ post: Object });

onMounted(() => {
    if (!props.post.likes || isNaN(props.post.likes)) {
        props.post.likes = 0; // Par défaut, 0 likes
    }
});

const isLike = ref(false);

const hasLikedComputed = computed(() => {
    return props.post.userHasLiked || false;
});

const toggleLike = async () => {
    if (isLike.value) return; // Prevent spamming likes
    isLike.value = true;

    try {
        if (hasLikedComputed.value) {
            // Unlike
            props.post.likes = Math.max(0, props.post.likes - 1);
            props.post.userHasLiked = false;
            await $fetch(`/api/unlikePost/${props.post.id}`, { method: 'DELETE' });
        } else {
            // Like
            props.post.likes += 1;
            props.post.userHasLiked = true;
            await $fetch(`/api/likePost`, {
                method: 'POST',
                body: { postId: props.post.id, userId: userStore.user.id },
            });
        }
    } catch (error) {
        console.error("Erreur lors de l'interaction avec le post:", error);
    } finally {
        isLike.value = false;
    }
};
</script>
