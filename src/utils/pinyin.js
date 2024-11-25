import { pinyin } from 'pinyin-pro'

// 将汉字转换为拼音
export const convertToPinyin = (text) => {
  try {
    // 使用 pinyin-pro 将汉字转换为拼音，保留声调
    return pinyin(text, {
      toneType: 'symbol', // 使用声调符号
      type: 'array',      // 返回数组格式
      nonZh: 'consecutive' // 保留非汉字字符
    }).join(' ')
  } catch (error) {
    console.error('Error converting to pinyin:', error)
    return text // 如果转换失败，返回原文本
  }
}

export function generatePoemSlug(poem) {
  const titlePinyin = convertToPinyin(poem.title)
  return `${poem.id}-${titlePinyin}`
}