<template>
  <div class="channel-container">
    <h2>Registrasi</h2>
    <form @submit.prevent="registForm">
      <label for="nama">Nama:</label><br>
      <input type="text" id="nama" v-model="nama" required><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="email" required><br>
      <label for="password">password:</label><br>
      <input type="password" id="password" v-model="password" required><br>
      <label for="asalSekolah">Asal Sekolah:</label><br>
      <input type="text" id="asalSekolah" v-model="asalSekolah" required><br>
      <input type="submit" value="Submit">
    </form> 
   
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {


    const registForm = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/peserta', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nama: nama.value, email: email.value, asalSekolah: asalSekolah.value }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        alert('Registrasi berhasil')
        nama.value = ''
        email.value = ''
        password.value = ''
        asalSekolah.value = ''
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan.')
      }
    }
    const fetchPeserta = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/peserta',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengambil data peserta.')
      }
    }
    
    onMounted(() => {
      fetchPeserta()
    })

    return { registForm }
  },
}
</script>