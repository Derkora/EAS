<template>
    <div class="login-container">
      <h3 class="login-heading">Sign In</h3>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" name="email" type="email" id="email" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" name="password" type="password" id="password" />
        </div>
        <div class="form-actions">
          <button type="submit" class="login-button">Sign In</button>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .login-heading {
    margin-left: 16px;
  }
  
  .login-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-actions {
    text-align: center;
  }
  
  .login-button {
    padding: 10px 20px;
    background-color: #00bd7e;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/Sender/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
  
      if (!resp.ok) {
        const errorMsg = (await resp.json())?.errors[0].message;
        throw new Error(errorMsg);
      }
      const user = await resp.json();
      console.log(user);
  
      // Redirect to the 'channel' route after successful login
      router.push("/channel");
  
    } catch (error) {
      alert("Sign In Error " + error.message);
    }
  };
  </script>