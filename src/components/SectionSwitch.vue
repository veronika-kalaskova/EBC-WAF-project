<template>
  <div class="switch">
    <ul>
      <li :class="{ selected: activeSection === 'tips' }" @click="navigateTo('tips')">Naše tipy</li>
      <li :class="{ selected: activeSection === 'currencyFilter' }" @click="navigateTo('currencyFilter')">Podle měny</li>
      <li :class="{ selected: activeSection === 'favourites' }" @click="navigateTo('favourites')">Oblíbené</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const activeSection = ref('');
const router = useRouter();
const route = useRoute();

const navigateTo = (section: string) => {
  activeSection.value = section;
  if (section === 'tips') {
    router.push({ name: 'homepage' });
  } else if (section === 'currencyFilter') {
    router.push({ name: 'currencyFilter' });
  } else if (section === 'favourites') {
    router.push({ name: 'favourites' });
  }
};

watch(
    () => route.name,
    (newRoute) => {
      activeSection.value = newRoute === 'homepage' ? 'tips' : (newRoute as string) || '';
    },
    { immediate: true }
);
</script>

<style scoped>
.switch {
  display: flex;
  justify-content: center;
}

.switch ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  background-color: #e4e4e4;
  padding: 0.5rem;
  border-radius: 99px;
  font-weight: 600;
  margin: 1rem;
}

.switch li {
  background-color: #ffffff;
  color: var(--primary);
  border-radius: 99px;
  padding: 0.5rem 2rem;
  cursor: pointer;
  text-align: center;
}

.switch .selected {
  color: #344e41;
  background-color: #a3b18a;
}

@media screen and (max-width: 600px) {
  .switch ul {
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: 10px;
  }
}
</style>
