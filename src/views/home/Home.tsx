function Home() {

  const test = fetch('http://localhost:3000/characters').then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
    

  return (
    <div className="character">
      <h1>Liste des persos</h1>

    </div>
  )
}

export default Home
