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
          <div class="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-8 text-center">
            <div class="flex flex-col items-center">
              <div class="flex justify-center gap-8">
                <div v-for="(char, charIndex) in titleWithPinyin"
                     :key="charIndex"
                     class="flex flex-col items-center">
                  <span class="text-sm text-white/80 font-sans mb-1">
                    {{ char.pinyin }}
                  </span>
                  <span class="text-3xl md:text-4xl font-kai">
                    {{ char.char }}
                  </span>
                </div>
              </div>
              <p class="text-white/80 mt-3">{{ poem.dynasty }} · {{ poem.author }}</p>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <!-- 诗词内容 -->
            <div class="text-center space-y-8 mb-8">
              <div v-for="(line, lineIndex) in poemWithPinyin" 
                   :key="lineIndex" 
                   class="flex justify-center gap-6">
                <div v-for="(char, charIndex) in line" 
                     :key="charIndex"
                     class="flex flex-col items-center"
                     :class="[
                       { 'w-8': !char.isPunctuation },
                       char.isPunctuation ? 'self-end ml-[-0.5em] mb-[0.2em]' : ''
                     ]">
                  <span v-if="!char.isPunctuation" class="text-xs text-gray-500 font-sans mb-1">
                    {{ char.pinyin }}
                  </span>
                  <span class="text-lg md:text-xl text-gray-800 font-song"
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
              <div v-if="poem.translation" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">译文</h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.translation }}</p>
              </div>

              <div v-if="poem.appreciation" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">赏析</h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.appreciation }}</p>
              </div>

              <div v-if="poem.background" class="bg-gray-50/50 rounded-xl p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-3">创作背景</h2>
                <p class="text-gray-600 leading-relaxed">{{ poem.background }}</p>
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

// 计算带拼音的诗词内容
const poemWithPinyin = computed(() => {
  if (!poem.value) return []
  return poem.value.content.map(line => getPoemLinePinyin(line))
})

// 添加标题拼音计算属性
const titleWithPinyin = computed(() => {
  if (!poem.value) return []
  return getPoemLinePinyin(poem.value.title)
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
/* 可以添加自定义样式来微调拼音和汉字的对齐 */
</style>
