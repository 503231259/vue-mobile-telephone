// 封装localStorage

const USER_KEY = 'user'

export const getUser = function () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export const setUser = function (data) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUser = function () {
  window.localStorage.removeItem(USER_KEY)
}
