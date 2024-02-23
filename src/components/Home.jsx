function Home(){
  const submit = ev => {
    ev.preventDefault();
    submit({ email, password });
  };
    return(
      <div>
        <h3>Add Login / Register</h3>

        <form onSubmit= { submit }>
        <input
        placeholder="Email" />
        <input
        placeholder="Password" />
        <button>Login</button>
      </form>
      <form>
        <input 
        placeholder="email"/>
        <input
        placeholder="Password" />
        <button>Register</button>
      </form>
      </div>
    )
  }

  export default Home;