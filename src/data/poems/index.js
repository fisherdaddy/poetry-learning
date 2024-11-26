import level1Basic from './level1/basic.json'
import level1Advanced from './level1/advanced.json'
import level2Basic from './level2/basic.json'
import level2Advanced from './level2/advanced.json'
import level3Basic from './level3/basic.json'
import level3Advanced from './level3/advanced.json'
import level4Basic from './level4/basic.json'
import level4Advanced from './level4/advanced.json'
import { convertToPinyin } from '../../utils/pinyin'

// 处理诗词数据，添加必要的字段
const processPoems = (poems) => {
  return poems.map(poem => ({
    ...poem,
    slug: `${poem.id}-${convertToPinyin(poem.title)}`
  }))
}

// 整理所有诗词数据
export const poemsData = {
  '1': processPoems([...level1Basic, ...level1Advanced]),
  '2': processPoems([...level2Basic, ...level2Advanced]),
  '3': processPoems([...level3Basic, ...level3Advanced]),
  '4': processPoems([...level4Basic, ...level4Advanced])
}

// 获取单个诗词的函数
export const getPoem = (level, id) => {
  const levelPoems = poemsData[level]
  return levelPoems?.find(poem => poem.id === id)
}

// 获取所有诗词的函数
export const getAllPoems = () => {
  return Object.values(poemsData).flat()
}

// 根据ID获取诗词的函数
export const getPoemById = (id) => {
  const [level, number] = id.split('-')
  if (!level || !number) return null
  
  const levelPoems = poemsData[level]
  if (!levelPoems) return null
  
  return levelPoems.find(poem => poem.id === id)
} 