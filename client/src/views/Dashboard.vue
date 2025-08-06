<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.displayName }}</p>
    <router-link to="/game" class="btn">New Game</router-link>
    <button @click="loadGame" class="btn">Load Game</button>
    <a href="/auth/logout" class="btn">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async loadGame() {
      try {
        const res = await this.$http.get('/games/load');
        this.$router.push({ name: 'Game', params: { game: res.data.data } });
      } catch (err) {
        console.error(err);
      }
    },
    async fetchUser() {
      try {
        const res = await this.$http.get('/auth/user');
        this.user = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style scoped>
.dashboard-container {
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
