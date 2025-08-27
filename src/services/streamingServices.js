
const STREAMING_SERVICES = {
  netflix: {
    name: 'Netflix',
    searchUrl: 'https://www.netflix.com/search?q=',
    icon: '🎬'
  },
  amazon: {
    name: 'Amazon Prime Video',
    searchUrl: 'https://www.amazon.com/s?k=',
    icon: '📺'
  },
  hulu: {
    name: 'Hulu',
    searchUrl: 'https://www.hulu.com/search?q=',
    icon: '🟢'
  },
  disney: {
    name: 'Disney+',
    searchUrl: 'https://www.disneyplus.com/search?q=',
    icon: '🏰'
  },
  hbo: {
    name: 'HBO Max',
    searchUrl: 'https://www.hbomax.com/search?q=',
    icon: '🎭'
  },
  youtube: {
    name: 'YouTube Movies',
    searchUrl: 'https://www.youtube.com/results?search_query=',
    icon: '📹'
  },
  apple: {
    name: 'Apple TV+',
    searchUrl: 'https://tv.apple.com/search?term=',
    icon: '🍎'
  }
}


export const getStreamingLinks = (title, year) => {
  const searchQuery = `${title} ${year}`

  return Object.entries(STREAMING_SERVICES).map(([key, service]) => ({
    id: key,
    name: service.name,
    icon: service.icon,
    url: service.searchUrl + encodeURIComponent(searchQuery),
    type: 'streaming'
  }))
}


export const getDownloadLinks = (title, year) => {
  const searchQuery = `${title} ${year}`


  return [
    {
      id: 'archive',
      name: 'Internet Archive',
      icon: '📚',
      url: `https://archive.org/search.php?query=${encodeURIComponent(searchQuery)}`,
      type: 'download',
      description: 'Free and legal content archive'
    },
    {
      id: 'youtube',
      name: 'YouTube (Free Movies)',
      icon: '🆓',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + ' full movie free')}`,
      type: 'download',
      description: 'Free movies on YouTube'
    },
    {
      id: 'imdb',
      name: 'IMDb TV',
      icon: '🎬',
      url: `https://www.imdb.com/find?q=${encodeURIComponent(searchQuery)}`,
      type: 'download',
      description: 'Free movies and shows'
    }
  ]
}


export const getAllLinks = (title, year) => {
  return {
    streaming: getStreamingLinks(title, year),
    download: getDownloadLinks(title, year)
  }
}


export const getIMDbLink = (imdbId) => {
  return `https://www.imdb.com/title/${imdbId}/`
}


export const getTrailerLink = (title, year) => {
  const searchQuery = `${title} ${year} trailer`
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`
}

