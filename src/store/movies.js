import { defineStore } from "pinia"
import axios from "axios"
import { ref, toRaw } from "vue"

export const useMoviesStore = defineStore('movies', () => {
  const MOVIES_DB_KEY = import.meta.env.VITE_TMDB_SECRET
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
  const POSTER_URL = import.meta.env.VITE_TMDB_POSTER_URL
  const db = ref(null)
  const errors = ref([])
  const loading = ref(true)
  const movies = ref(null)
  const movies_top_rated = ref(null)
  const movies_popular = ref(null)
  const series = ref(null)
  // const genres = ref(null)
  // const people = ref(null)
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${MOVIES_DB_KEY}`,
    },
  }

  const openDataBase = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('moviesdb', 1)

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // if (!db.objectStoreNames.contains('genres')) {
        //   db.createObjectStore('genres', { keyPath: 'id' })
        // }

        if (!db.objectStoreNames.contains('movies')) {
          db.createObjectStore('movies', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('movies_top_rated')) {
          db.createObjectStore('movies_top_rated', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('movies_popular')) {
          db.createObjectStore('movies_popular', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('series')) {
          db.createObjectStore('series', { keyPath: 'id' })
        }

        // if (!db.objectStoreNames.contains('people')) {
        //   db.createObjectStore('people', { keyPath: 'id' })
        // }

        if (!db.objectStoreNames.contains('manager')) {
          const managerStore = db.createObjectStore('manager', { keyPath: 'id' })
          managerStore.createIndex('table', 'table', { unique: true })
        }
      }

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        errors.value.push('Erro ao carregar dados!')
        reject('Error ao abrir o banco de dados: ' + event.target.error)
      }
    })
  }

  const checkAndUpdateTable = (
    tableName, 
    fetchApi, 
    stateRef, 
    queryType, 
    additionalParams,
  ) => {
    return new Promise((resolve, reject) => {
        const transaction = db.value.transaction(['manager'], 'readwrite')
        const managerStore = transaction.objectStore('manager')
        const request = managerStore.index('table').get(tableName)

        request.onsuccess = async function(event){
            const record = event.target.result
            const now = Math.floor(Date.now() / 1000) // unix timestamp em sec

            if(!record || now - record.last_updated > 60 ){
                await fetchApi(db, tableName, queryType, additionalParams)
                const newRecord = {
                    id: record ? record.id : crypto.randomUUID(),
                    table: tableName,
                    last_updated: now
                }

                managerStore.put(newRecord)
            }else{
                stateRef.value = await fetchFromTable(tableName)
            }
            resolve()
        }

        request.onerror = function (event){
            errors.value.push('Erro ao carregar dados')
            reject('Error ao verificar a table manger: ',  + event.target.errorCode)
        }
    })
  }

  const fetchFromTable = (tableName) => {
    return new Promise((resolve, reject) => {
      const transaction = db.value.transaction([tableName], 'readonly')
      const store = transaction.objectStore(tableName)

      if( tableName === 'genres'){
        const request = store.getAll()
        request.onsuccess = (event) => {
          resolve(event.target.result)
        }
        request.onerror = (event) => {
          errors.value.push('Erro ao buscar gêneros')
          reject('Error ao carregar gêneros: ',  + event.target)
        }
      } else {
        const request = store.openCursor()
     
        request.onsuccess = (event) => {
          const cursor = event.target.result
          if (cursor) {
            resolve(cursor.value)
          } else {
            resolve(null)
          }
        }

        request.onerror = (event) => {
          errors.value.push(`Erro ao buscar ${tableName}`)
          reject(`Error ao carregar dados da tabela ${tableName}: `,  + event.target.errorCode)
        }
      }
    })
  }

  // const fetchGenres = async () => {
  //   axios.get(`${BASE_URL}genre/movie/list?language=pt-BR`, options)
  //     .then(response => {
  //       genres.value = response.data.genres
  //       const transaction = db.value.transaction([ 'genres'], 'readwrite')
  //       const store = transaction.objectStore('genres')
  //       toRaw(genres.value).forEach(genre => store.put(genre))
  //     })
  // }

  const fetchMovies = async (db, tableName, queryType, additionalParams = '') => {
    axios.get(`${BASE_URL}${queryType}?${additionalParams}`, options)
      .then(response => {
        movies.value = response.data
        const transaction = db.value.transaction([tableName], 'readwrite')
        const store = transaction.objectStore(tableName)
        movies.value.id = crypto.randomUUID()
        store.put(toRaw(movies.value))
      })
  }

  const fetchTrendingSeries = async () => {
    axios.get(`${BASE_URL}trending/tv/day?language=pt-BR`, options)
      .then(response => {
        series.value = response.data
        const transaction = db.value.transaction(['series'], 'readwrite')
        const store = transaction.objectStore('series')
        series.value.id = crypto.randomUUID()
        store.put(toRaw(series.value))
      })
  }

  const init = async () => {
    loading.value = true
    db.value = await openDataBase()

    // await checkAndUpdateTable('genres', fetchGenres, genres)
    await checkAndUpdateTable(
      'movies', 
      fetchMovies,
      movies,
      'trending/movie/week', 
      'language=pt-BR'
    )
    await checkAndUpdateTable(
      'movies_top_rated', 
      fetchMovies, 
      movies_top_rated,
      'movie/top_rated',
      'language=pt-BR'
    )
    await checkAndUpdateTable(
      'movies_popular', 
      fetchMovies, 
      movies_popular,
      'movie/popular', 
      'language=pt-BR'
    )
    await checkAndUpdateTable('series', fetchTrendingSeries, series)

    loading.value = false
  }

  return {
    errors,
    init,
    movies,
    movies_top_rated,
    movies_popular,
    series
    // genres,
    // people,
  }
})