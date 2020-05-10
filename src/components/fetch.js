

export const fetchAPI = () => {
    const url = 'https://covid19.mathdro.id/api'

    fetch(url)
        .then(response => response.json())
}