import { pinyin } from 'pinyin-pro'

// 将单个汉字或标点转换为带声调的拼音
export const getCharacterPinyin = (char) => {
  try {
    // 扩展标点符号的判断范围，包含引号等
    if (/[，。！？；：、""''「」『』（）\(\)“”‘’·]/.test(char)) {
      return ''
    }
    return pinyin(char, {
      toneType: 'symbol',    // 使用声调符号
      type: 'array',
      nonZh: 'consecutive'
    })[0]
  } catch (error) {
    console.error('Error converting to pinyin:', error)
    return ''
  }
}

// 将一行诗句转换为带拼音的数组
export const getPoemLinePinyin = (line) => {
  return line.split('').map(char => ({
    char,
    // 使用相同的标点符号判断规则
    isPunctuation: /[，。！？；：、""''「」『』（）\(\)“”‘’·]/.test(char),
    pinyin: getCharacterPinyin(char)
  }))
}

// 将汉字转换为拼音（不带声调）
export const convertToPinyin = (text) => {
  try {
    // 使用 pinyin-pro 将汉字转换为拼音，不保留声调
    return pinyin(text, {
      toneType: 'none',    // 不使用声调
      type: 'array',       // 返回数组格式
      nonZh: 'consecutive', // 保留非汉字字符
      v: 'u'               // 将 ü 转换为 u
    }).join('')            // 直接连接，不加空格
  } catch (error) {
    console.error('Error converting to pinyin:', error)
    return text // 如果转换失败，返回原文本
  }
}

export function generatePoemSlug(poem) {
  const titlePinyin = convertToPinyin(poem.title)
    .toLowerCase()         // 转换为小写
    .replace(/\s+/g, '')  // 移除所有空格
    .replace(/[^a-z0-9]/g, '') // 只保留字母和数字
  return titlePinyin
}