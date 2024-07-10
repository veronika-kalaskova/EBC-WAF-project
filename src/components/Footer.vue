<template>
  <footer class="footer bg-primary mt-5">
    <div class="footer-content">
      <div class="footer-left">
        <router-link to="/" class="footer-logo">
          <v-img src="@/assets/globe_white.svg" height="40" width="40" class="mr-2"></v-img>
        </router-link>
        <span class="footer-title">Countries</span>
      </div>
      <div class="footer-right">
        <div class="footer-navigation">
          <router-link to="/" class="footer-link">Úvod</router-link>
          <router-link to="/favourites" class="footer-link">Oblíbené země</router-link>
          <router-link to="/currency-filter" class="footer-link">Vyhledávání podle měny</router-link>
        </div>
        <div class="footer-info">
          <span class="font-weight-bold">© 2024 Countries</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 1.5rem 0;
  width: 100%;
  background-color: var(--primary);
  color: white;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 2rem;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.footer-navigation {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-weight: 400;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-info {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-right {
    align-items: center;
    margin-top: 1rem;
  }

  .footer-navigation {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
