<template>
    <Navbar :namepage="'Sign UP'"/>
    <form @submit.prevent="signUp">
      <input-text tipo="email" @input="setEmail"/>
      <input-text tipo="password" @input="setPassword"/>
  
      <button type="submit">Sign Up</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      setEmail(value){ //value è il valore @input, cioe event.target.value
          console.log("SetEmail2: ", value)
            this.email= value
        },
        setPassword(value){ //value è il valore @input, cioe event.target.value
          console.log("SetPassword2: ", value)
            this.password= value
        },
        async signUp() {
      try {
        const response = await axios.post('http://localhost:4000/auth/signup', {
          email: this.email,
          password: this.password,
        });
        console.log('Response: ', response);

        // Gestisci la risposta del server
        if (response.status === 201 && response.data) {
          // La registrazione è avvenuta con successo e il token è stato restituito dal server
          // Salviamo il token nei cookies con scadenza di 1 ora
          Cookies.set('access_token', response.data, { expires: 1 / 24 }); // Scadenza di 1 ora

          this.$router.push('/TabellaPresenze');
        } else {
          // La registrazione non è andata a buon fine
          alert('Errore');
        }
      } catch (error) {
        console.error(error);
        alert('Questo utente esiste gia');
      }
    },
  },
};
</script>