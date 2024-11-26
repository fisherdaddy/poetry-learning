<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- 顶部导航栏 -->
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
          
          <!-- 搜索框 -->
          <div class="flex-1 max-w-xl mx-4">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索诗题、作者或内容..."
                class="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400
                       border border-gray-200 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                       hover:border-gray-300
                       transition-all duration-300"
              >
              <!-- 可选：添加搜索图标 -->
              <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div class="pt-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- 页面标题 -->
        <div class="mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ getTitle }}</h1>
          <p class="text-sm sm:text-base text-gray-600">
            <template v-if="!isLoading">
              共收录 {{ filteredPoems.length }} 首{{ getTitle.slice(0, 2) }}
            </template>
            <template v-else>
              <span class="inline-block w-24 h-4 bg-gray-200 rounded animate-pulse"></span>
            </template>
          </p>
        </div>
        
        <!-- 加载状态显示 -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="n in 8" :key="n" class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <!-- 骨架屏 -->
            <div class="bg-gray-100 p-4 sm:p-6">
              <div class="flex flex-col items-center space-y-2">
                <div class="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div class="p-4">
              <div class="space-y-2">
                <div class="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                <div class="w-2/3 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>
              <div class="mt-3 flex gap-2">
                <div class="w-12 h-6 bg-gray-100 rounded-full animate-pulse"></div>
                <div class="w-12 h-6 bg-gray-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 诗词列表 - 仅在加载完成后显示 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="poem in paginatedPoems"
               :key="poem.id"
               class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-gray-100"
               @click="goToPoemDetail(poem)">
            <!-- 封面区域 -->
            <div class="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 sm:p-6">
              <div class="flex flex-col items-center justify-center text-white">
                <h3 class="text-xl sm:text-2xl font-kai mb-2">{{ poem.title }}</h3>
                <p class="text-white/80 text-xs sm:text-sm">{{ poem.author }}</p>
              </div>
            </div>
            
            <!-- 内容预览 -->
            <div class="p-4">
              <div class="text-gray-600 text-sm mb-3 font-song line-clamp-2">
                {{ poem.content.join('，') }}
              </div>
              
              <!-- 标签 -->
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in poem.tags" 
                      :key="tag"
                      class="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页控件 - 仅在加载完成且有数据时显示 -->
        <div v-if="!isLoading && filteredPoems.length > 0" class="mt-8 flex justify-center">
          <div class="flex gap-2">
            <button 
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg bg-white text-blue-600 border border-blue-200 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     hover:bg-blue-50 hover:border-blue-300 
                     transition-all duration-300"
            >
              上一页
            </button>
            <span class="px-4 py-2 text-gray-600">{{ currentPage }} / {{ totalPages }}</span>
            <button 
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-lg bg-white text-blue-600 border border-blue-200 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     hover:bg-blue-50 hover:border-blue-300 
                     transition-all duration-300"
            >
              下一页
            </button>
          </div>
        </div>

        <!-- 无数据提示 -->
        <div v-if="!isLoading && filteredPoems.length === 0" 
             class="text-center py-12">
          <div class="text-gray-500">
            未找到相关诗词
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 1. 先初始化 router 和 route
const router = useRouter()
const route = useRoute()

// 2. 然后再定义其他变量和函数
const poemsData = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 20

const getCurrentData = computed(() => poemsData.value)

const loadData = async () => {
  isLoading.value = true
  try {
    // 创建一个延时 Promise
    const delay = new Promise(resolve => setTimeout(resolve, 500))
    
    let data
    if (route.path.includes('tangshi')) {
      data = await import('../data/all/tangshi.json')
    } else if (route.path.includes('songci')) {
      data = await import('../data/all/songci.json')
    } else if (route.path.includes('yuanqu')) {
      data = await import('../data/all/yuanqu.json')
    } else if (route.path.includes('shijing')) {
      data = await import('../data/all/shijing.json')
    } else if (route.path.includes('lunyu')) {
      data = await import('../data/all/lunyu.json')
    } else {
      data = await import('../data/all/tangshi.json')
    }
    
    // 等待数据加载和最小延时都完成
    await Promise.all([delay])
    poemsData.value = data.default
  } catch (error) {
    console.error('Failed to load data:', error)
    poemsData.value = []
  } finally {
    isLoading.value = false
  }
}

// 3. 最后设置 watch
watch(() => route.path, loadData, { immediate: true })

// 修改标题显示
const getTitle = computed(() => {
  if (route.path.includes('tangshi')) {
    return '唐诗全集'
  } else if (route.path.includes('songci')) {
    return '宋词全集'
  } else if (route.path.includes('yuanqu')) {
    return '元曲全集'
  } else if (route.path.includes('shijing')) {
    return '诗经全集'
  } else if (route.path.includes('lunyu')) {
    return '论语全集'
  }
  return '唐诗全集'
})

// 修改过滤诗词的计算属性
const filteredPoems = computed(() => {
  const data = getCurrentData.value
  if (!searchQuery.value) return data
  
  const query = searchQuery.value.toLowerCase()
  return data.filter(poem => 
    poem.title.toLowerCase().includes(query) ||
    poem.author?.toLowerCase().includes(query) ||
    poem.content.some(line => line.toLowerCase().includes(query))
  )
})

// 计算分页
const totalPages = computed(() => Math.ceil(filteredPoems.value.length / pageSize))

const paginatedPoems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPoems.value.slice(start, end)
})

// 修改跳转到诗词详情的函数
const goToPoemDetail = (poem) => {
  let prefix = ''
  
  // 根据不同的路径设置不同的前缀
  if (route.path.includes('tangshi')) {
    prefix = 'tangshi'
  } else if (route.path.includes('songci')) {
    prefix = 'songci'
  } else if (route.path.includes('yuanqu')) {
    prefix = 'yuanqu'
  } else if (route.path.includes('shijing')) {
    prefix = 'shijing'
  } else if (route.path.includes('lunyu')) {
    prefix = 'lunyu'
  }

  // 直接使用当前数据中的索引
  const index = poemsData.value.findIndex(p => p === poem)
  
  // 添加 query 参数来标识来源
  router.push({
    path: `/poem/${prefix}-${index}`,
    query: { from: prefix }
  })
}

// 监听搜索，重置页码
watch(searchQuery, () => {
  currentPage.value = 1
})
</script> 