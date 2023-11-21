<template>
  <Navbar :namepage="'Sign IN'"/>
    <form @submit.prevent="signIn">
      <input-text tipo="email" @input="setEmail"/>
      <input-text tipo="password" @input="setPassword"/>
      <button type="submit">Sign In</button>
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
        async signIn() {
          try {
            const response = await axios.post('http://localhost:4000/auth/signin', {
              email: this.email,
              password: this.password,
            });
            console.log('Response: ', response);

            // Gestisci la risposta del server
            if (response.status === 201  && response.data ) {
              // L'autenticazione è avvenuta con successo e il token è stato restituito dal server
              // Salviamo il token nei cookies con scadenza di 1 ora
              Cookies.set('access_token', response.data, { expires: 1 / 24 }); // Scadenza di 1 ora

              this.$router.push('/TabellaPresenze');
            } else {
              // L'autenticazione non è andata a buon fine
              alert('Credenziali non valide.');
            }
          } catch (error) {
            console.error(error);
            alert('Si è verificato un errore durante l\'accesso.');
          }
        },
      },
    };
</script>

<style>
.signin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.signin-form {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.signin-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.signin-form input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.signin-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signin-form button:hover {
  background-color: #0056b3;
}
</style>