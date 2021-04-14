export async function getAllCharacterIds() {
    const res = await fetch('https://www.swapi.tech/api/people?page=1&limit=82');
    const data = await res.json();
    return data.results.map(character => {
        return {
            params: {
                id: character.uid.toString()
            }
        }
    })
}

export async function getCharacterData(id) {
    const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
    const data = await res.json();
    console.log('hello from fetch single character', data)
    return {
        id,
        ...data
    }

}