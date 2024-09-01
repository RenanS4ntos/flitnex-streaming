export function useMovies() {
  const toLocalDate = (date) => {
    let day = date?.split('-')[2]
    let month = date?.split('-')[1]
    let year = date?.split('-')[0]

    return `${day}/${month}/${year}`
  }

  return { toLocalDate }
}