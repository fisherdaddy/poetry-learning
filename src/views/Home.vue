<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <span class="text-2xl text-white font-bold font-kai">诗</span>
            </div>
            <span class="text-2xl font-kai font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              诗词启蒙
            </span>
          </div>
        
          <!-- Navigation Links - Desktop -->
          <div class="hidden md:flex items-center ml-16 space-x-8">
            <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group py-2">
              唐诗
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group py-2">
              宋词
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group py-2">
              元曲
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group py-2">
              论语
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
            <a href="#" class="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group py-2">
              诗经
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </a>
          </div>

          <!-- 右侧空白占位，保持导航居中 -->
          <div class="flex-1"></div>
        
          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu (Hidden by default) -->
      <div class="md:hidden hidden bg-white border-t border-gray-100">
        <div class="container mx-auto px-4 py-2">
          <div class="flex flex-col gap-2">
            <a href="#" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">唐诗</a>
            <a href="#" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">宋词</a>
            <a href="#" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">元曲</a>
            <a href="#" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">论语</a>
            <a href="#" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">诗经</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-32 pb-20 lg:min-h-[90vh] flex items-center bg-gradient-to-br from-blue-100 to-cyan-50">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <!-- 左侧内容 -->
            <div class="text-center lg:text-left space-y-8">
              <div class="space-y-6">
                <h1 class="text-4xl sm:text-5xl lg:text-7xl font-kai tracking-wide leading-tight text-gray-800">
                  让诗词之美 
                  <br/>
                  <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    照亮孩子的未来
                  </span>
                </h1>
                <p class="text-xl lg:text-2xl text-gray-600 font-song max-w-2xl mx-auto lg:mx-0">
                  专为2-18岁儿童设计的诗词学习平台
                  <br/>
                  让传统文化的种子在年轻心灵中生根发芽
                </p>
              </div>
              
              <div class="flex flex-wrap justify-center lg:justify-start gap-6">
                <button 
                  @click="scrollToLevels"
                  class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-medium shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">开启学习之旅</span>
                    <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </div>
                </button>
                <button 
                  @click="goToFeatures"
                  class="px-8 py-4 border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg font-medium"
                >
                  了解教学方法
                </button>
              </div>

              <!-- 数据统计 -->
              <div class="grid grid-cols-3 gap-8 pt-12 border-t border-blue-100">
                <div class="text-center">
                  <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">4级</div>
                  <div class="text-sm text-gray-600 font-medium">难度等级</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">300+</div>
                  <div class="text-sm text-gray-600 font-medium">精选诗词</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">10万+</div>
                  <div class="text-sm text-gray-600 font-medium">学习人数</div>
                </div>
              </div>
            </div>

            <!-- 右侧装饰 -->
            <div class="hidden lg:block relative">
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"></div>
              <div class="relative">
                <div class="aspect-square w-full rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-8 backdrop-blur-sm border border-blue-100">
                  <div class="h-full rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden group">
                    <div class="text-[12rem] font-kai text-blue-900/20 transform group-hover:scale-110 transition-transform duration-500">诗</div>
                    <!-- 装饰圆环 -->
                    <div class="absolute inset-0 border-4 border-blue-200/30 rounded-xl"></div>
                    <div class="absolute -inset-1 border border-blue-200/20 rounded-xl transform rotate-6"></div>
                    <div class="absolute -inset-1 border border-blue-200/20 rounded-xl transform -rotate-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gradient-to-br from-white to-blue-50/50">
      <div class="container mx-auto px-4">
        <div class="max-w-7xl mx-auto">
          <!-- 标题部分 -->
          <div class="text-center mb-16">
            <h2 class="text-4xl font-kai mb-4 text-gray-900">学习特色</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">专业的教学设计，让孩子轻松掌握诗词之美</p>
          </div>
          
          <!-- 特色卡片 -->
          <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                📚
              </div>
              <h3 class="text-xl font-kai mb-4 text-gray-900">分级学习</h3>
              <p class="text-gray-600 leading-relaxed">根据年龄特点精心设计课程内容，让孩子循序渐进地感受诗词魅力</p>
            </div>
            
            <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                🎯
              </div>
              <h3 class="text-xl font-kai mb-4 text-gray-900">趣味互动</h3>
              <p class="text-gray-600 leading-relaxed">通过游戏化的学习方式，激发孩子对古诗词的兴趣和热爱</p>
            </div>
            
            <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                🌟
              </div>
              <h3 class="text-xl font-kai mb-4 text-gray-900">文化传承</h3>
              <p class="text-gray-600 leading-relaxed">深入浅出地讲解诗词背后的文化内涵，培养文化自信</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Level Cards Section -->
    <section id="levels" class="py-12 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-16">
      <div class="container mx-auto px-4">
        <div class="max-w-7xl mx-auto">
          <!-- 标题部分 -->
          <div class="text-center mb-12">
            <h2 class="text-4xl font-kai mb-4 text-gray-900">选择适合的级别</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">根据年龄和学习能力，为每个阶段的孩子提供合适的学习内容</p>
          </div>
          
          <!-- 级别卡片 -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="level in levels" 
                 :key="level.id" 
                 class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
                 @click="goToLevel(level.id)">
              <!-- 卡片顶部装饰 -->
              <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              
              <!-- 内容区域 -->
              <div class="p-8">
                <!-- 图标 -->
                <div class="w-16 h-16 mb-6 relative">
                  <div class="absolute inset-0 bg-blue-500/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <img :src="level.image" :alt="level.name" class="w-8 h-8 object-contain">
                  </div>
                </div>
                
                <!-- 文字内容 -->
                <h3 class="text-xl font-kai text-gray-900 mb-3">{{ level.name }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ level.description }}</p>
                
                <!-- 标签信息 -->
                <div class="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <span class="text-blue-500">👶</span>
                    {{ level.ageRange }}
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="text-blue-500">📚</span>
                    {{ level.poemCount }}首
                  </span>
                </div>
                
                <!-- 悬浮时显示的箭头 -->
                <div class="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 lg:py-24 relative overflow-hidden">
      <!-- 渐变背景 - 使用更丰富的渐变色 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"></div>
      
      <!-- 装饰元素 -->
      <div class="absolute inset-0">
        <!-- 更现代的网格背景 -->
        <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        
        <!-- 更大更柔和的发光效果 -->
        <div class="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-300/20 rounded-full blur-[80px]"></div>
        
        <!-- 动态装饰线条 -->
        <div class="absolute inset-0">
          <div class="absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div class="absolute bottom-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <h2 class="text-4xl lg:text-6xl font-kai mb-8 lg:mb-10 text-white">开启诗词学习之旅</h2>
        <p class="text-xl lg:text-2xl text-white/90 mb-10 lg:mb-14 font-light">让我们一起探索中国诗词的无穷魅力</p>
        <button @click="goToLevel(1)" 
                class="px-10 py-4 bg-white/95 text-blue-600 rounded-2xl text-lg font-medium 
                       hover:bg-white hover:scale-105 
                       transition-all duration-300 
                       shadow-xl shadow-blue-500/20 
                       backdrop-blur-xl">
          立即开始
        </button>
      </div>
    </section>

    <!-- Footer - 修改背景色和相关样式 -->
    <footer class="bg-gradient-to-br from-blue-100 to-cyan-50 py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-16">
          <div>
            <h3 class="font-kai text-xl lg:text-2xl mb-4 text-gray-800">关于我们</h3>
            <p class="text-gray-600">致力于让中国诗词文化在新时代焕发新的生机</p>
          </div>
          <div>
            <h3 class="font-kai text-xl lg:text-2xl mb-4 text-gray-800">联系方式</h3>
            <p class="text-gray-600">邮箱：fisherai100001@gmail.com</p>
          </div>
          <div>
            <h3 class="font-kai text-xl lg:text-2xl mb-4 text-gray-800">关注我们</h3>
            <div class="flex gap-4">
              <a href="https://x.com/fun000001" target="_blank" rel="noopener noreferrer" 
                 class="text-gray-600 hover:text-blue-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://fisherdaddy.com/" target="_blank" rel="noopener noreferrer"
                 class="text-gray-600 hover:text-blue-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </a>
              <a href="https://fishersama.com/" target="_blank" rel="noopener noreferrer"
                 class="text-gray-600 hover:text-blue-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="text-center text-gray-600 mt-8 pt-8 border-t border-gray-200">
          <p>传承文化，诗意人生 © 2024</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()

useHead({
  title: '诗词启蒙 - 儿童古诗词学习平台',
  meta: [
    {
      name: 'description',
      content: '专为2-18岁儿童设计的古诗词学习平台，提供六个难度等级的诗词内容，让孩子轻松学习中国传统文化。'
    },
    {
      name: 'keywords',
      content: '儿童古诗,古诗词学习,中国传统文化,诗词教育,儿童教育'
    }
  ]
})

const levels = ref([
  {
    id: 1,
    name: '启蒙级（2-6岁）',
    description: '精选经典短小的古诗，如《静夜思》《登鹳雀楼》《咏鹅》《春晓》《悯农》等，让孩子自然亲近古诗之美。',
    ageRange: '2-6岁',
    image: '/images/level1.svg',
    features: [
      '字数精简，朗朗上口',
      '意境优美，贴近生活',
      '耳熟能详，易于记忆'
    ],
    poemCount: 100
  },
  {
    id: 2,
    name: '小学级（7-12岁）',
    description: '进阶学习较长篇幅的诗词，如《游子吟》《江南春》《望天门山》等，加深对诗词的理解。',
    ageRange: '7-12岁',
    image: '/images/level2.svg',
    features: [
      '篇幅适中，内容丰富',
      '意境深远，情感真挚',
      '重点讲解，理解诗意'
    ],
    poemCount: 100
  },
  {
    id: 3,
    name: '初中级（13-15岁）',
    description: '学习格律诗词，如《山居秋暝》《琵琶行》《水调歌头》等，感受诗词的艺术魅力。',
    ageRange: '13-15岁',
    image: '/images/level3.svg',
    features: [
      '格律严谨，韵律优美',
      '意境高远，情感丰富',
      '深入赏析，品味诗词'
    ],
    poemCount: 100
  },
  {
    id: 4,
    name: '高中级（16-18岁）',
    description: '研习思想深邃的诗词，如《蜀道难》《念奴娇·赤壁怀古》《登高》等，提升文化素养。',
    ageRange: '16-18岁',
    image: '/images/level4.svg',
    features: [
      '思想深刻，境界开阔',
      '艺术精湛，意境深远',
      '系统赏析，文化传承'
    ],
    poemCount: 100
  }
])

const goToLevel = (level) => {
  router.push(`/level/${level}`)
}

const scrollToLevels = () => {
  const element = document.getElementById('levels')
  const offset = 80 // 设置一个偏移量，避免被导航栏遮挡
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  })
}

const goToFeatures = () => {
  const element = document.getElementById('features')
  const offset = 80 // 设置一个偏移量，避免被导航栏遮挡
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  })
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

  :root {
    --ink-100: #f0f2f5;
    --ink-200: #e6f7ff;
    --ink-300: #bae7ff;
    --ink-400: #87ceeb;
    --ink-500: #4682b4;
    --ink-600: #2f4f7f;
    --ink-700: #1a3d69;
    --ink-800: #0a2351;
    --ink-900: #030b1a;
    --primary-light: #f0f7ff;
    --primary: #3b82f6;
    --primary-dark: #1d4ed8;
    --gray-light: #f3f4f6;
    --gray: #6b7280;
    --gray-dark: #1f2937;
  }

  body {
    font-family: 'Noto Sans SC', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f9f9f9;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Serif SC', serif;
    font-weight: 700;
    color: #333;
  }

  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300;
  }

  .btn-outline {
    @apply border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-300;
  }

  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
</style>
