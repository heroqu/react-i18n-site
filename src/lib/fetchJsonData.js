export const fetchJsonData = async path => {
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  return await response.json()
}

export default fetchJsonData
