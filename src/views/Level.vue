<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- 顶部导航栏 - 调整移动端padding和按钮大小 -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center">
            <button 
              @click="router.push('/')"
              class="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span class="text-sm sm:text-base font-medium">返回首页</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 - 调整移动端间距 -->
    <div class="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- 页面标题 - 调整移动端文字大小和间距 -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{{ levelInfo.name }}</h1>
          <p class="text-sm sm:text-base text-gray-600">
            适合{{ levelInfo.ageRange }} · {{ poems.length }}首诗词
          </p>
        </div>
        
        <!-- 诗词列表 - 优化移动端网格布局 -->
        <div v-if="poems.length > 0" 
             class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="poem in poems"
               :key="poem.id"
               class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-gray-100"
               @click="goToPoemDetail(poem)">
            <!-- 封面区域 - 调整移动端高度和内容大小 -->
            <div class="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 sm:p-6" 
                 style="min-height: 140px; sm:min-height: 160px;">
              <div class="flex flex-col items-center justify-center text-white h-full">
                <h3 class="text-xl sm:text-2xl font-kai mb-1 sm:mb-2">{{ poem.title }}</h3>
                <p class="text-white/80 text-xs sm:text-sm">{{ poem.dynasty }} · {{ poem.author }}</p>
              </div>
            </div>
            
            <!-- 内容预览 - 调整移动端padding和文字大小 -->
            <div class="p-3 sm:p-4">
              <div class="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 font-song">
                <p class="mb-0.5 sm:mb-1">{{ poem.content[0] }}</p>
                <p>{{ poem.content[1] }}</p>
              </div>
              
              <!-- 标签 - 优化移动端标签样式 -->
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span v-for="tag in poem.tags" 
                      :key="tag"
                      class="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-blue-50 text-blue-600">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 - 调整移动端间距 -->
        <div v-else class="text-center py-16 sm:py-20">
          <div class="text-gray-500">
            <div class="text-lg sm:text-xl mb-1 sm:mb-2">暂无诗词</div>
            <div class="text-xs sm:text-sm">该级别下还没有添加诗词内容</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { poemsData } from '../data/poems/index'
import { trackEvent } from '../utils/analytics'

const route = useRoute()
const router = useRouter()

// 从路由参数中获取 level
const level = computed(() => route.params.id)

// 添加级别信息映射
const levelInfoMap = {
  '1': {
    name: '启蒙级',
    ageRange: '2-6岁',
    description: '精选经典短小的古诗'
  },
  '2': {
    name: '小学级',
    ageRange: '7-12岁',
    description: '进阶学习较长篇幅的诗词'
  },
  '3': {
    name: '初中级',
    ageRange: '13-15岁',
    description: '学习格律诗词'
  },
  '4': {
    name: '高中级',
    ageRange: '16-18岁',
    description: '研习思想深邃的诗词'
  }
}

// 计算当前级别信息
const levelInfo = computed(() => {
  return levelInfoMap[level.value] || {
    name: '诗词列表',
    ageRange: '',
    description: ''
  }
})

// 计算当前级别的诗词列表
const poems = computed(() => {
  const levelPoems = poemsData[level.value] || []
  return levelPoems.map((poem, index) => ({
    ...poem,
    id: index,
    // 添加诗词类型标识
    type: poem.type || 'level'  // 使用 poem 中的 type 字段，如果没有则默认为 'level'
  }))
})

const goToPoemDetail = (poem) => {
  trackEvent('poem_click', {
    poem_id: poem.id,
    poem_title: poem.title,
    level: level.value
  })
  
  // 使用 level 作为类型前缀
  const prefix = 'level'
  
  router.push({
    path: `/poem/${prefix}-${level.value}-${poem.id}`,
    query: { 
      from: `level/${level.value}`,
      type: 'level'
    }
  })
}

onMounted(() => {
  // 将页面滚动到顶部
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* 可以添加任何需要的自定义样式 */
</style>
