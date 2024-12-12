<template>
    <div v-if="post" class="z-50 bottom-0 h-full w-full">
<<<<<<< HEAD
        <!-- Système de notifications -->
        <div class="fixed top-4 right-4 z-50">
            <TransitionGroup name="notification">
                <div v-for="notification in notifications" :key="notification.id"
                    :class="[
                        'mb-2 p-4 rounded-lg shadow-lg min-w-[300px] flex items-center gap-2',
                        notification.type === 'success' ? 'bg-green-600' : 
                        notification.type === 'error' ? 'bg-red-600' : 
                        'bg-blue-600'
                    ]"
                >
                    <Icon :name="getNotificationIcon(notification.type)" color="#ffffff" size="20"/>
                    <span class="text-white">{{ notification.message }}</span>
                </div>
            </TransitionGroup>
        </div>

        <div class="py-2 w-full">
            <!-- En-tête du post -->
=======
        <div class="py-2 w-full">
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
            <div class="flex items-center justify-between">
                <div class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="post.image" alt="User Image">
                    <div class="ml-2 font-semibold text-[18px]">{{ post.name }}</div>
                </div>
<<<<<<< HEAD
=======
                <!-- Bouton pour afficher le menu des trois points -->
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
                <div @click="isMenu = !isMenu" class="relative">
                    <button 
                        :disabled="isDeleting"
                        class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer" 
                        :class="isMenu ? 'bg-gray-800' : ''"
                    >
                        <Icon v-if="!isDeleting" name="bi:three-dots" color="#ffffff" size="18" />
                        <Icon v-else name="eos-icons:bubble-loading" color="#ffffff" size="18" />
                    </button>
<<<<<<< HEAD
                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded bg-black">
                        <button 
                            @click="startEditing" 
                            class="flex items-center rounded gap-2 text-white justify-between w-full pl-4 pr-3 py-2 hover:bg-gray-900"
                        >
                            <div>Modifier</div>
                            <Icon name="mdi:pencil" size="20" />
                        </button>
                        <button 
                            @click="showDeleteConfirm" 
                            class="flex items-center rounded gap-2 text-red-500 justify-between w-full pl-4 pr-3 py-2 hover:bg-gray-900"
                        >
                            <div>Supprimer</div>
=======
                    <!-- Menu déroulant pour supprimer -->
                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button 
                            @click="deletePost(post.id)" 
                            class="flex items-center rounded gap-2 text-red-500 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900"
                        >
                            <div>Delete</div>
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
                            <Icon name="solar:trash-bin-trash-broken" size="20" />
                        </button>
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            <!-- Corps du post -->
=======
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
            <div class="relative flex items-center w-full">
                <div class="w-[42px] mx-auto">
                    <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full"></div>
                </div>
                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm w-full font-light">
<<<<<<< HEAD
                    <!-- Mode édition -->
                    <div v-if="isEditing" class="py-2">
                        <textarea
                            v-model="editedText"
                            class="w-full bg-neutral-800 text-white rounded-lg p-3 min-h-[100px] resize-none"
                            placeholder="Modifier votre message..."
                        ></textarea>
                        <div class="flex justify-end gap-2 mt-2">
                            <button 
                                @click="cancelEdit"
                                class="px-4 py-2 text-gray-400 hover:text-white"
                            >
                                Annuler
                            </button>
                            <button 
                                @click="saveEdit"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>

                    <!-- Affichage normal -->
                    <div v-else>
                        <div class="py-2 text-gray-300">{{ post.text }}</div>
                        <img 
                            v-if="post.picture"
                            class="mx-auto w-full mt-2 pr-2 rounded" 
                            :src="post.picture" 
                            alt="Post Image"
                        />
                    </div>

                    <!-- Boutons d'interaction -->
                    <div class="flex items-center gap-6 mt-4 ml-2">
=======
                    <div class="py-2 text-gray-300">{{ post.text }}</div>
                    <img 
                        v-if="post.picture"
                        class="mx-auto w-full mt-2 pr-2 rounded" 
                        :src="post.picture" 
                        alt="Post Image"
                    />
                    <div class="absolute mt-2 w-full ml-2">
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
                        <button 
                            :disabled="isLike"
                            @click="toggleLike" 
                            class="flex items-center gap-1"
                        >
                            <Icon 
                                v-if="!hasLikedComputed"
                                class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer" 
                                name="mdi:cards-heart-outline" 
                                size="28"
                            />
                            <Icon 
                                v-else
                                class="p-1 text-red-500 hover:bg-gray-800 rounded-full cursor-pointer" 
                                name="mdi:cards-heart" 
                                size="28"
                            />
<<<<<<< HEAD
                            <span class="text-sm text-gray-400">{{ post.likes || 0 }}</span>
                        </button>

                        <button 
                            @click="showCommentInput = true"
                            class="flex items-center gap-1"
                        >
                            <Icon 
                                class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer" 
                                name="material-symbols:comment-outline" 
                                size="28"
                            />
                            <span class="text-sm text-gray-400">{{ comments.length }}</span>
                        </button>
                    </div>

                    <!-- Liste des commentaires -->
                    <div v-if="comments.length > 0" class="mt-4 space-y-2">
                        <div v-for="comment in comments" :key="comment.id" class="flex items-start gap-2 ml-2">
                            <img class="rounded-full h-[25px]" :src="comment.userImage" alt="User Image">
                            <div v-if="!comment.isEditing" class="bg-neutral-900 rounded-lg p-2 flex-1 relative group">
                                <div class="text-white text-sm font-semibold">{{ comment.userName }}</div>
                                <div class="text-gray-300 text-sm">{{ comment.text }}</div>
                                <div class="hidden group-hover:block absolute top-2 right-2">
                                    <button 
                                        @click="toggleCommentMenu(comment.id)"
                                        class="text-gray-400 hover:text-white p-1"
                                    >
                                        <Icon name="bi:three-dots-vertical" size="16" />
                                    </button>
                                    
                                    <div v-if="comment.showMenu" class="absolute right-0 top-6 bg-neutral-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                        <button 
                                            @click="editComment(comment)"
                                            class="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-neutral-700"
                                        >
                                            <Icon name="mdi:pencil" size="16" />
                                            Modifier
                                        </button>
                                        <button 
                                            @click="deleteComment(comment)"
                                            class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-neutral-700"
                                        >
                                            <Icon name="mdi:trash" size="16" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex-1">
                                <div class="flex items-center gap-2">
                                    <input 
                                        v-model="comment.editText"
                                        type="text"
                                        class="flex-1 bg-neutral-800 text-white rounded-full px-4 py-2 text-sm"
                                        @keyup.enter="saveCommentEdit(comment)"
                                    />
                                    <button 
                                        @click="saveCommentEdit(comment)"
                                        class="text-blue-500 hover:text-blue-400"
                                    >
                                        <Icon name="material-symbols:check" size="20" />
                                    </button>
                                    <button 
                                        @click="cancelCommentEdit(comment)"
                                        class="text-gray-500 hover:text-gray-400"
                                    >
                                        <Icon name="material-symbols:close" size="20" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input nouveau commentaire -->
                    <div v-if="showCommentInput" class="mt-4 flex items-center gap-2 ml-2 mb-4">
                        <img class="rounded-full h-[30px]" :src="post.image" alt="Current User">
                        <div class="flex-1 relative">
                            <input 
                                v-model="newComment"
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                class="w-full bg-neutral-800 text-white rounded-full px-4 py-2 text-sm"
                                @keyup.enter="addComment"
                            />
                            <button 
                                @click="addComment"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <Icon 
                                    name="material-symbols:send-rounded" 
                                    class="text-gray-400 hover:text-white"
                                    size="20" 
                                />
                            </button>
=======
                        </button>
                        <div class="relative text-sm text-gray-500">
                            <div> 
                                <span v-if="!isLike">{{ post.likes }}</span>
                                <span v-else>
                                    <Icon name="eos-icons:bubble-loading" color="#ffffff" size="13" />
                                </span>
                                likes
                            </div>
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
                        </div>
                    </div>
                </div>
            </div>
        </div>

<<<<<<< HEAD
        <!-- Modal de confirmation de suppression -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-xl text-white font-semibold mb-4">Supprimer le post ?</h3>
                <p class="text-gray-300 mb-6">Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce post ?</p>
                <div class="flex justify-end gap-3">
                    <button 
                        @click="showDeleteModal = false"
                        class="px-4 py-2 text-gray-400 hover:text-white"
                    >
                        Annuler
                    </button>
                    <button 
                        @click="confirmDelete"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
=======
        <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
            <div class="flex items-center">
                <div class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                    <div class="flex gap-0.5">
                        <img class="rounded-full h-[14px] mt-2" src="https://picsum.photos/id/202/50" alt="User 1">
                        <img class="rounded-full h-[17px]" src="https://picsum.photos/id/223/50" alt="User 2">
                    </div>
                    <div class="flex items-center">
                        <img class="rounded-full h-[11px] ml-4" src="https://picsum.photos/id/99/50" alt="User 3">
                    </div>
                </div>
            </div>
        </div>

        <div class="h-[1px] bg-gray-800 w-full mt-3"></div>
    </div>
    <div v-else>
        <p class="text-white">Chargement...</p>
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ post: Object });
<<<<<<< HEAD
const emit = defineEmits(['isDeleted', 'isUpdated']);

// États
const isMenu = ref(false);
const isDeleting = ref(false);
const isLike = ref(false);
const showCommentInput = ref(false);
const newComment = ref('');
const comments = ref([]);
const isEditing = ref(false);
const editedText = ref('');
const showDeleteModal = ref(false);
const notifications = ref([]);

// Computed
=======
const emit = defineEmits(['isDeleted']);

const isMenu = ref(false); // Gère l'état du menu des trois points
const isDeleting = ref(false);
const isLike = ref(false);

>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
const hasLikedComputed = computed(() => {
    return props.post.userHasLiked || false;
});

<<<<<<< HEAD
// Gestion des notifications
const addNotification = (message, type = 'info') => {
    const id = Date.now();
    notifications.value.push({ id, message, type });
    setTimeout(() => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    }, 3000);
};

const getNotificationIcon = (type) => {
    switch(type) {
        case 'success': return 'material-symbols:check-circle-outline';
        case 'error': return 'material-symbols:error-outline';
        default: return 'material-symbols:info-outline';
    }
};

// Gestion du post
const startEditing = () => {
    editedText.value = props.post.text;
    isEditing.value = true;
    isMenu.value = false;
};

const cancelEdit = () => {
    isEditing.value = false;
    editedText.value = '';
};

const saveEdit = () => {
    if (editedText.value.trim()) {
        emit('isUpdated', { ...props.post, text: editedText.value });
        isEditing.value = false;
        addNotification('Post modifié avec succès', 'success');
    }
};

const showDeleteConfirm = () => {
    showDeleteModal.value = true;
    isMenu.value = false;
};

const confirmDelete = () => {
    emit('isDeleted', props.post.id);
    showDeleteModal.value = false;
    addNotification('Post supprimé', 'success');
};

// Gestion des likes
=======
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
const toggleLike = () => {
    if (!props.post.likes) props.post.likes = 0;

    if (hasLikedComputed.value) {
        props.post.likes = Math.max(0, props.post.likes - 1);
        props.post.userHasLiked = false;
    } else {
        props.post.likes += 1;
        props.post.userHasLiked = true;
    }
};

<<<<<<< HEAD
// Gestion des commentaires
const toggleCommentMenu = (commentId) => {
    comments.value = comments.value.map(comment => ({
        ...comment,
        showMenu: comment.id === commentId ? !comment.showMenu : false
    }));
};

const editComment = (comment) => {
    comment.isEditing = true;
    comment.editText = comment.text;
    comment.showMenu = false;
};

const saveCommentEdit = (comment) => {
    if (comment.editText.trim()) {
        comment.text = comment.editText;
        comment.isEditing = false;
        addNotification('Commentaire modifié', 'success');
    }
};

const cancelCommentEdit = (comment) => {
    comment.isEditing = false;
    comment.showMenu = false;
};

const deleteComment = (comment) => {
    if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
        comments.value = comments.value.filter(c => c.id !== comment.id);
        addNotification('Commentaire supprimé', 'success');
    }
};

const addComment = () => {
    if (newComment.value.trim()) {
        comments.value.push({
            id: Date.now(),
            text: newComment.value,
            userName: props.post.name,
            userImage: props.post.image,
            timestamp: new Date(),
            isEditing: false,
            showMenu: false,
            editText: ''
        });
        newComment.value = '';
        showCommentInput.value = false;
        addNotification('Commentaire ajouté', 'success');
    }
};
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.group:hover .hidden {
    display: block;
}

input::placeholder,
textarea::placeholder {
    color: #6B7280;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #4B5563;
}
</style>
=======
const deletePost = (postId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) return;
    emit('isDeleted', postId);
};
</script>
>>>>>>> cde07d023fac7ddf59019db7e6779f9a12170fe6
