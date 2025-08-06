<template>
  <div class="login-container">
    <h1>Sudoku</h1>
    <p>Login to save your progress</p>
    <a href="/auth/google" class="btn">Login with Google</a>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
