<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <!-- Ajout de la section Stories -->
                <div class="mb-4">
                    <StoriesRow 
                        :stories="stories" 
                        @story-created="handleStoryCreated"
                        @open-story="openStoriesViewer" 
                    />
                </div>

                <div id="Posts" class="px-4 max-w-[600px] mx-auto">
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
                    <div v-if="posts.length > 0" v-for="post in posts" :key="post.id" class="mb-4">
                        <Post 
                            :post="post" 
                            @isDeleted="removePost"
                            @isUpdated="updatePost"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Viewer de stories -->
        <StoriesViewer 
            v-if="showStoriesViewer"
            :stories="stories"
            :initial-index="currentStoryIndex"
            @close="closeStoriesViewer"
            @delete-story="deleteStory"
        />
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import Post from '~/components/Post.vue';
import StoriesRow from '~/components/StoriesRow.vue';
import StoriesViewer from '~/components/StoriesViewer.vue';
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

// États
const posts = ref([]);
const isLoading = ref(true);
const stories = ref([]);
const showStoriesViewer = ref(false);
const currentStoryIndex = ref(0);

// Gestion des posts
const removePost = (postId) => {
    posts.value = posts.value.filter(post => post.id !== postId);
    if (process.client) {
        localStorage.setItem('posts', JSON.stringify(posts.value));
    }
};

const updatePost = (updatedPost) => {
    const index = posts.value.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
        posts.value[index] = { ...updatedPost };
        posts.value = [...posts.value];
        if (process.client) {
            localStorage.setItem('posts', JSON.stringify(posts.value));
        }
    }
};

// Gestion des stories
const handleStoryCreated = (newStory) => {
    stories.value.unshift(newStory);
    if (process.client) {
        localStorage.setItem('stories', JSON.stringify(stories.value));
    }
};

const openStoriesViewer = (index) => {
    currentStoryIndex.value = index;
    showStoriesViewer.value = true;
};

const closeStoriesViewer = () => {
    showStoriesViewer.value = false;
};

const deleteStory = (storyId) => {
    if (confirm('Voulez-vous vraiment supprimer cette story ?')) {
        stories.value = stories.value.filter(story => story.id !== storyId);
        if (process.client) {
            localStorage.setItem('stories', JSON.stringify(stories.value));
        }
        showStoriesViewer.value = false;
    }
};

// Nettoyage des stories expirées
const cleanupExpiredStories = () => {
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();

    stories.value = stories.value.filter(story => {
        const storyTime = new Date(story.items[0].timestamp).getTime();
        return now - storyTime < twentyFourHours;
    });

    if (process.client) {
        localStorage.setItem('stories', JSON.stringify(stories.value));
    }
};

// Initialisation
onMounted(() => {
    if (process.client) {
        // Chargement des posts
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.value = storedPosts;

        // Chargement des stories
        const storedStories = JSON.parse(localStorage.getItem('stories')) || [
            {
                id: 1,
                userName: "Asmaa Bourass",
                userImage: "https://randomuser.me/api/portraits/women/1.jpg",
                seen: false,
                items: [
                    {
                        id: 1,
                        type: 'image',
                        media: "https://source.unsplash.com/random/1080x1920?portrait",
                        timestamp: new Date().toISOString()
                    }
                ]
            },
            {
                id: 2,
                userName: "Sarah varn",
                userImage: "https://randomuser.me/api/portraits/women/2.jpg",
                seen: false,
                items: [
                    {
                        id: 2,
                        type: 'image',
                        media: "https://source.unsplash.com/random/1080x1920?nature",
                        timestamp: new Date().toISOString()
                    }
                ]
            }
        ];
        stories.value = storedStories;
        isLoading.value = false;

        // Démarrer le nettoyage périodique des stories
        setInterval(cleanupExpiredStories, 60 * 60 * 1000);
    }
});
</script>

<style scoped>
.stories-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.stories-container::-webkit-scrollbar {
    display: none;
}
</style>