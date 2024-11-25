<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- 主要内容区域 -->
    <div v-if="poem">
      <!-- 诗词内容 -->
      <main class="pt-6 pb-12 px-4">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <!-- 标题区域 -->
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 md:p-8 text-center">
              <h1 class="text-3xl md:text-4xl font-bold mb-3">{{ poem.title }}</h1>
              <p class="text-white/90">{{ poem.dynasty }} · {{ poem.author }}</p>
            </div>

            <div class="p-6 md:p-8">
              <!-- 诗词内容 -->
              <div class="text-center space-y-4 mb-8">
                <div v-for="(line, index) in poem.content" 
                     :key="index" 
                     class="text-lg md:text-xl text-gray-800 font-song leading-relaxed">
                  {{ line }}
                </div>
              </div>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-2 justify-center mb-8">
                <span v-for="tag in poem.tags" 
                      :key="tag"
                      class="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                  {{ tag }}
                </span>
              </div>

              <!-- 注释和赏析 -->
              <div class="space-y-6 border-t pt-6">
                <div v-if="poem.translation" class="bg-gray-50 rounded-lg p-6">
                  <h2 class="text-lg font-bold text-gray-900 mb-3">译文</h2>
                  <p class="text-gray-700">{{ poem.translation }}</p>
                </div>

                <div v-if="poem.appreciation" class="bg-gray-50 rounded-lg p-6">
                  <h2 class="text-lg font-bold text-gray-900 mb-3">赏析</h2>
                  <p class="text-gray-700">{{ poem.appreciation }}</p>
                </div>

                <div v-if="poem.background" class="bg-gray-50 rounded-lg p-6">
                  <h2 class="text-lg font-bold text-gray-900 mb-3">创作背景</h2>
                  <p class="text-gray-700">{{ poem.background }}</p>
                </div>

                <div v-if="poem.annotation" class="bg-gray-50 rounded-lg p-6">
                  <h2 class="text-lg font-bold text-gray-900 mb-3">注释</h2>
                  <div class="space-y-2">
                    <div v-for="(item, index) in poem.annotation" :key="index" class="text-gray-700">
                      <strong>{{ item.line }}：</strong>
                      <span>{{ item.note }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 返回按钮 -->
            <div class="text-center mt-6">
              <button 
                @click="goBack"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19l-7-7 7-7v14z"/>
                </svg>
                返回
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>

    <!-- 加载状态 -->
    <div v-else class="pt-24 container mx-auto px-4 py-6 text-center text-gray-500">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllPoems } from '../data/poems/index'

const route = useRoute()
const router = useRouter()
const poem = ref(null)

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
