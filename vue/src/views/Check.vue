<template>
  <div class="Peserta-container">
    <h2>Check</h2>
    <ul>
      <li v-for="peserta in pesertas" :key="peserta.id">
        <ol>nama: {{ peserta.nama }} </ol>
        <ol>email: {{ peserta.email }} </ol>
        <ol>asal sekolah: {{ peserta.asalSekolah }} </ol>
        <ol>status: {{ peserta.status }}</ol> 
        <h2>------------------------------------------</h2>
    </li>
    </ul>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const peserta = ref('')
    const pesertas = ref([])
    const router = useRouter()

    const fetchPesertas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/peserta', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        pesertas.value = data.docs
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengambil data Peserta.')
      }
    }

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/peserta/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMsg = (await response.json())?.errors[0].message;
          throw new Error(errorMsg);
        }

        // Redirect to the login page after successful logout
        router.push('/login');
      } catch (error) {
        alert('Sign out Error: ' + error.message);
      }
    };


    onMounted(() => {
      fetchPesertas();
    })

    return { peserta, pesertas, handleLogout }
  },
}
</script>



<style scoped>
.Peserta-container {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

ul {
  list-style: none;
  padding: 0;
}

.Peserta-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #00bd7e;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.Peserta-button:hover {
  background-color: #008e5f;
}

.logout-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #d04935;
}
</style>


