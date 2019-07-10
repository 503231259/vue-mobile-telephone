// 封装localStorage

const USER_KEY = 'user'

export const getItem = function () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export const setItem = function (data) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeItem = function () {
  window.localStorage.removeItem(USER_KEY)
}
