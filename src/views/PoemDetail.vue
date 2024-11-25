<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- 顶部导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <button 
              @click="goBack"
              class="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span class="font-medium">返回列表</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div v-if="poem" class="pt-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <!-- 标题区域 -->
          <div class="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 sm:p-8 text-center">
            <div class="flex flex-col items-center">
              <!-- 修改标题布局，使其在移动端自动换行 -->
              <div class="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-full px-4">
                <div v-for="(char, charIndex) in titleWithPinyin"
                     :key="charIndex"
                     class="flex flex-col items-center"
                     :class="{ 'hidden': char.isPunctuation }">
                  <span class="text-xs sm:text-sm text-white/80 font-sans mb-1">
                    {{ char.pinyin }}
                  </span>
                  <span class="text-2xl sm:text-3xl md:text-4xl font-kai">
                    {{ char.char }}
                  </span>
                </div>
                <!-- 单独处理标点符号 -->
                <div v-for="(char, charIndex) in titleWithPinyin"
                     :key="`punct-${charIndex}`"
                     class="flex items-end"
                     :class="{ 'hidden': !char.isPunctuation }">
                  <span class="text-2xl sm:text-3xl md:text-4xl font-kai mb-[0.2em]">
                    {{ char.char }}
                  </span>
                </div>
              </div>
              <p class="text-white/80 mt-4 text-sm sm:text-base">{{ poem.dynasty }} · {{ poem.author }}</p>
            </div>
          </div>

          <div class="p-4 sm:p-6 md:p-8">
            <!-- 诗词内容 -->
            <div class="text-center space-y-6 sm:space-y-8 mb-8">
              <div v-for="(line, lineIndex) in poemWithPinyin" 
                   :key="lineIndex" 
                   class="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
                <div v-for="(char, charIndex) in line" 
                     :key="charIndex"
                     class="flex flex-col items-center"
                     :class="[
                       { 'w-6 sm:w-8': !char.isPunctuation },
                       char.isPunctuation ? 'self-end ml-[-0.5em] mb-[0.2em]' : ''
                     ]">
                  <span v-if="!char.isPunctuation" 
                        class="text-[10px] sm:text-xs text-gray-500 font-sans mb-1">
                    {{ char.pinyin }}
                  </span>
                  <span class="text-base sm:text-lg md:text-xl text-gray-800 font-song"
                        :class="{ 'mt-[1em]': char.isPunctuation }">
                    {{ char.char }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 justify-center mb-8">
              <span v-for="tag in poem.tags" 
                    :key="tag"
                    class="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                {{ tag }}
              </span>
            </div>

            <!-- 注释和赏析 -->
            <div class="space-y-6">
              <!-- 主旨含义部分 -->
              <div v-if="poem.theme" class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h2 class="text-lg font-medium text-blue-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  主旨含义
                </h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.theme }}</p>
              </div>

              <!-- 写作背景部分 -->
              <div v-if="poem.background" class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h2 class="text-lg font-medium text-blue-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  写作背景
                </h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.background }}</p>
              </div>

              <!-- 白话解释部分 -->
              <div v-if="poem.explanation" class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h2 class="text-lg font-medium text-blue-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  白话解释
                </h2>
                <div class="space-y-3">
                  <div v-for="(line, index) in poemWithExplanation" 
                       :key="index" 
                       class="flex flex-col sm:flex-row sm:items-start gap-4 pb-3"
                       :class="{'border-b border-blue-100/60': index !== poemWithExplanation.length - 1}">
                    <div class="text-gray-800 font-song sm:w-1/3 text-lg">{{ line.original }}</div>
                    <div class="text-gray-600 sm:w-2/3 sm:pl-4 sm:border-l border-blue-100">{{ line.explanation }}</div>
                  </div>
                </div>
              </div>

              <div v-if="poem.translation" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">译文</h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.translation }}</p>
              </div>

              <div v-if="poem.appreciation" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">赏析</h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.appreciation }}</p>
              </div>

              <div v-if="poem.annotation" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">注释</h2>
                <div class="space-y-3">
                  <div v-for="(item, index) in poem.annotation" 
                       :key="index" 
                       class="text-gray-600">
                    <strong class="text-gray-900">{{ item.line }}：</strong>
                    <span>{{ item.note }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="pt-24 container mx-auto px-4 py-6 text-center text-gray-500">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllPoems } from '../data/poems/index'
import { getPoemLinePinyin } from '../utils/pinyin'

const route = useRoute()
const router = useRouter()
const poem = ref(null)

// 修改拼音处理逻辑，添加标点符号判断
const isPunctuation = (char) => {
  const punctuationRegex = /[\u3000-\u303F\uFF00-\uFFEF""'']/
  return punctuationRegex.test(char)
}

// 更新标题拼音计算属性
const titleWithPinyin = computed(() => {
  if (!poem.value) return []
  return getPoemLinePinyin(poem.value.title).map(char => ({
    ...char,
    isPunctuation: isPunctuation(char.char)
  }))
})

// 更新诗词内容拼音计算属性
const poemWithPinyin = computed(() => {
  if (!poem.value) return []
  return poem.value.content.map(line => 
    getPoemLinePinyin(line).map(char => ({
      ...char,
      isPunctuation: isPunctuation(char.char)
    }))
  )
})

const poemWithExplanation = computed(() => {
  if (!poem.value || !poem.value.explanation) return []
  return poem.value.content.map((line, index) => ({
    original: line,
    explanation: poem.value.explanation[index]
  }))
})

const goBack = () => {
  const level = route.params.id.split('-')[0]
  router.push(`/level/${level}`)
}

onMounted(() => {
  const poemId = route.params.id
  const poemData = getAllPoems().find(p => p.slug === poemId)
  
  if (poemData) {
    poem.value = poemData
  } else {
    console.error('Poem not found:', poemId)
    router.push('/')
  }
})
</script>

<style scoped>
/* 添加一些辅助样式 */
.title-char {
  @apply flex flex-col items-center;
  min-width: 1.5em; /* 确保每个字符有最小宽度 */
}

.pinyin-text {
  @apply text-xs sm:text-sm text-white/80 font-sans mb-1;
  word-break: keep-all; /* 防止拼音换行 */
}

.char-text {
  @apply text-2xl sm:text-3xl md:text-4xl font-kai;
  line-height: 1.2;
}
</style>
