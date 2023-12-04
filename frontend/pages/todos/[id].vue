<template>
    <div class="container">
        <div class="section">
            <div v-if="todo.length === 0">No todos available.</div>
            <div v-else>
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{ todo.title }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{ todo.description }}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a :href="`/todos/${todo._id}`" class="card-footer-item">View</a>
                        <a :href="`/todos/edit/${todo._id}`" class="card-footer-item">Edit</a>
                        <a @click="deleteTodo(todo._id)" class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const todo = ref('');
const router = useRouter();

const fetchTodo = async () => {
    try {
        const { id } = useRoute().params;
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message !== 'Unauthorized: No token provided') {
            todo.value = data;
        }
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

onMounted(fetchTodo);

const deleteTodo = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        router.push('/');
    } catch (error) {
        console.error('Error deleting todos:', error);
    }
};
</script>

<style lang="scss" scoped></style>