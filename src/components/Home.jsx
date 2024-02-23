function Home(){
  const submit = ev => {
    ev.preventDefault();
    console.log('login');
  };
    return(
      <div>
        <h3>Add Login / Register</h3>

        <form onSubmit= { submit }>
        <input />
        <input />
        <button>Login</button>
      </form>
      <form>
        <input />
        <input />
        <button>Register</button>
      </form>
      </div>
    )
  }

  export default Home;