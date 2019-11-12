import store from '../store'
const locales = [
  { 'ru-RU': 'профиль', 'en-US': 'profile' },
  { 'ru-RU': 'имя', 'en-US': 'name' },
  { 'ru-RU': 'обновить', 'en-US': 'update' }
]
export default function localizeFilter (key) {
  key = key.toLowerCase()
  const locale = store.getters.info.locale || 'ru-RU'
  let searchedLocale = locales.find(v => v['ru-RU'].toLowerCase() === key)
  return searchedLocale[locale].capitalize() || `[Localize error]: key '${key}' not found`
}
