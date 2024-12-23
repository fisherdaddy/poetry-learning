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
              <p v-if="poem.dynasty || poem.author" class="text-white/80 mt-4 text-sm sm:text-base">
                {{ [poem.dynasty, poem.author].filter(Boolean).join(' · ') }}
              </p>
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

              <!-- 新增视频展示区域 -->
              <div v-if="poem.video" class="mt-12 mb-12">
                <div class="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6">
                  <!-- 视频标题和描述 -->
                  <div class="mb-6 text-center">
                    <h3 class="text-lg font-medium text-blue-900 mb-2 flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      诗词意境
                    </h3>
                    <p class="text-gray-600 text-sm">沉浸式体验诗词意境</p>
                  </div>

                  <!-- 视频播放器容器 -->
                  <div class="relative aspect-video rounded-lg overflow-hidden group">
                    <!-- 视频播放器 -->
                    <video
                      ref="videoPlayer"
                      :src="poem.video"
                      class="w-full h-full object-cover"
                      :class="{ 'cursor-pointer': !isPlaying }"
                      @click="toggleVideo"
                      :poster="poem.image"
                      preload="metadata"
                    ></video>

                    <!-- 视频控制层 -->
                    <div 
                      class="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300"
                      :class="{ 'opacity-0': isPlaying && !isHoveringVideo, 'group-hover:opacity-100': true }"
                      @mouseenter="isHoveringVideo = true"
                      @mouseleave="isHoveringVideo = false"
                    >
                      <!-- 播放/暂停按钮 -->
                      <button 
                        class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110"
                        @click="toggleVideo"
                      >
                        <svg 
                          v-if="!isPlaying"
                          class="w-8 h-8 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg 
                          v-else
                          class="w-8 h-8 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- 视频进度条 -->
                  <div class="mt-4 px-2">
                    <div class="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
                        :style="{ width: `${videoProgress}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 修改图片展示区域的条件 -->
            <div v-if="poem.image && !poem.video" class="mb-8">
              <div class="max-w-2xl mx-auto overflow-hidden rounded-xl shadow-lg">
                <div class="relative group">
                  <img 
                    :src="poem.image" 
                    :alt="poem.title"
                    class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    @click="showFullImage = true"
                  />
                  <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
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

    <!-- 添加全屏图片预览模态框 -->
    <div v-if="showFullImage && poem.image" 
         class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
         @click="showFullImage = false">
      <img 
        :src="poem.image" 
        :alt="poem.title"
        class="max-w-full max-h-full object-contain p-4"
      />
      <button 
        class="absolute top-4 right-4 text-white/80 hover:text-white"
        @click="showFullImage = false"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPoemLinePinyin } from '../utils/pinyin'
import { poemsData } from '../data/poems/index'

const route = useRoute()
const router = useRouter()
const poem = ref(null)

// 添加图片预览状态控制
const showFullImage = ref(false)

// 在 script setup 中添加以下代码
const videoPlayer = ref(null)
const isPlaying = ref(false)
const isHoveringVideo = ref(false)
const videoProgress = ref(0)

// 视频控制函数
const toggleVideo = () => {
  if (!videoPlayer.value) return
  
  if (videoPlayer.value.paused) {
    videoPlayer.value.play()
    isPlaying.value = true
  } else {
    videoPlayer.value.pause()
    isPlaying.value = false
  }
}

// 监听视频进度
const updateVideoProgress = () => {
  if (!videoPlayer.value) return
  const progress = (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
  videoProgress.value = progress
}

// 在组件挂载时添加视频事件监听
onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.addEventListener('timeupdate', updateVideoProgress)
    videoPlayer.value.addEventListener('ended', () => {
      isPlaying.value = false
      videoProgress.value = 0
    })
  }
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.removeEventListener('timeupdate', updateVideoProgress)
  }
})

// 动态导入数据的函数
const getDataByType = async (type) => {
  try {
    switch (type) {
      case 'tangshi':
        return (await import('../data/all/tangshi.json')).default
      case 'songci':
        return (await import('../data/all/songci.json')).default
      case 'yuanqu':
        return (await import('../data/all/yuanqu.json')).default
      case 'shijing':
        return (await import('../data/all/shijing.json')).default
      case 'lunyu':
        return (await import('../data/all/lunyu.json')).default
      default:
        return null
    }
  } catch (error) {
    console.error('Error loading poem data:', error)
    return null
  }
}

// 获取诗词数据
const getPoem = async () => {
  const poemId = route.params.id
  const [prefix, ...rest] = poemId.split('-')
  
  try {
    if (prefix === 'level') {
      // 处理来自 level 页面的诗词
      const levelId = rest[0]
      const poemIndex = parseInt(rest[1])
      const levelPoems = poemsData[levelId] || []
      const poemData = levelPoems[poemIndex]
      
      if (poemData) {
        return {
          ...poemData,
          slug: poemId,
          theme: poemData.theme || null,
          background: poemData.background || null,
          translation: poemData.translation || null,
          appreciation: poemData.appreciation || null,
          annotation: poemData.annotation || null,
          explanation: poemData.explanation || null
        }
      }
    } else {
      // 处理其他来源的诗词（原有的逻辑）
      const data = await getDataByType(prefix)
      if (!data) {
        console.error('Invalid poem type:', prefix)
        router.push('/')
        return
      }

      const index = parseInt(rest[0])
      const poemData = data[index]
      
      if (poemData) {
        return {
          ...poemData,
          slug: poemId,
          theme: poemData.theme || null,
          background: poemData.background || null,
          translation: poemData.translation || null,
          appreciation: poemData.appreciation || null,
          annotation: poemData.annotation || null,
          explanation: poemData.explanation || null
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting poem:', error)
    return null
  }
}

onMounted(async () => {
  // 将页面滚动到顶部
  window.scrollTo(0, 0)
  
  try {
    const poemData = await getPoem()
    if (poemData) {
      poem.value = poemData
    } else {
      console.error('Poem not found:', route.params.id)
      router.push('/')
    }
  } catch (error) {
    console.error('Error loading poem:', error)
    router.push('/')
  }
})

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

// 修改返回上一页的逻辑
const goBack = () => {
  const fromPath = route.query.from
  if (fromPath) {
    // 检查是否来自 level 页面
    if (fromPath.startsWith('level/')) {
      router.push(`/${fromPath}`)
    } else {
      router.push(`/${fromPath}`)
    }
  } else {
    router.push('/')
  }
}
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
