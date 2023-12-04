<template>
    <div class="container">
        <div class="section">
            <div v-if="todos.length === 0">
                No todos available.
            </div>
            <div v-else>
                <div v-for="todo in todos" :key="todo._id">
                    <div class="card  mb-4">
                        <header class="card-header">
                            <p class="card-header-title">{{ todo.title }}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">{{ todo.description }}</div>
                        </div>
                        <footer class="card-footer">
                            <a :href="`/todos/${todo._id}`" class="card-footer-item">View</a>
                            <a :href="`/todos/edit/${todo._id}`" class="card-footer-item">Edit</a>
                            <a @click="deleteNote(todo._id)" class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const todos = ref([]);

const fetchNotes = async () => {
    try {
        const response = await fetch('http://localhost:8000/todos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message !== 'Unauthorized: No token provided') {
            todos.value = data;
        }
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

onMounted(fetchNotes);

const status = ref('');

const deleteNote = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            todos.value = todos.value.filter(todo => todo._id !== id);
        } else {
            console.error('Failed to delete todo. Server response:', response);
        }
    } catch (error) {
        console.error('Error deleting todos:', error);
    }
};
</script>

<style scoped>
.card {
    min-width: 2rem;
}
</style>