const getUrl = (name) => `http://api.tianapi.com/txapi/${name}?key=45fa3cbde8554285c1677e2ecc3168fd`

export const ncovUrl = getUrl('ncov')
export const ncovCityUrl = getUrl('ncovcity')
export const rumourUrl = getUrl('rumour')