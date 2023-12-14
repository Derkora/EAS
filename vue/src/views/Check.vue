<template>
  <div class="channel-container">
    <h2>Check</h2>
    <ul>
      <button
        v-for="channel in Channels"
        :key="channel.id"
        @click="goToChannel(channel.id)"
        class="channel-button"
      >
        {{ channel.nama }}
      </button>
    </ul>

    <!-- Add the logout button -->
    <button @click="handleLogout" class="logout-button">Logout</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const Channels = ref([])
    const router = useRouter()

    const fetchChannels = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Channel', {
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
        Channels.value = data.docs
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengambil data Channel.')
      }
    }

    const goToChannel = (channelId) => {
      router.push({ name: 'channelname', params: { id: channelId } })
    }

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Sender/logout', {
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
      fetchChannels();
    })

    return { Channels, goToChannel, handleLogout }
  },
}
</script>

<style scoped>
/* Your existing styles */
</style>


<style scoped>
.channel-container {
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

.channel-button {
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

.channel-button:hover {
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


