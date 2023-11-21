<template>
    <nav>
      <ul>
        <li class="titoli">Form Presenze</li>
        <li style="font-weight: bold" class="titoli">{{ namepage }}</li>
        <li><a href="/">Sign In</a></li>
        <li><a href="/signupForm">Sign Up</a></li>
      </ul>
    </nav>
  </template>

  <script>
  export default {
  props: {
    namepage: {
      type: String,
      required: true,
    },
  },
};
</script>
  
<style>
.titoli{
  margin-right: auto;
  font-size: 30px;
}
nav {
  background-color: #f0f0f0;
  padding: 10px;
}

ul {
  list-style: none;
  display: flex;
  justify-content: flex-end; /* Posiziona gli elementi a destra */
  align-items: center; /* Centra verticalmente gli elementi */
  gap: 10px; /* Aggiunge spazio tra gli elementi */
  margin: 0; /* Rimuove il margine predefinito del body */
}

li {
  margin: 0;
}

a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px; /* Aggiunge spazio intorno ai link per rendere più facile il clic */
  border-radius: 5px; /* Aggiunge bordi arrotondati ai link */
  transition: background-color 0.2s; /* Aggiunge una transizione al cambio di colore di sfondo */
}

a:hover {
  background-color: #ddd; /* Cambia il colore di sfondo quando passi sopra i link */
}
</style>