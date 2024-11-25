import { getPoemById } from '../data/poems/index'

const PoemDetail = ({ id }) => {
  const poem = getPoemById(id)
  
  if (!poem) {
    return <div>诗词未找到</div>
  }

  return (
    <div>
      <h1>{poem.title}</h1>
      <h2>{poem.dynasty} · {poem.author}</h2>
      
      {/* 诗词内容 */}
      <div className="poem-content">
        {poem.content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* 翻译 */}
      {poem.translation && (
        <div className="poem-translation">
          <h3>译文</h3>
          <p>{poem.translation}</p>
        </div>
      )}

      {/* 赏析 */}
      {poem.appreciation && (
        <div className="poem-appreciation">
          <h3>赏析</h3>
          <p>{poem.appreciation}</p>
        </div>
      )}

      {/* 注释 */}
      {poem.annotation && poem.annotation.length > 0 && (
        <div className="poem-annotation">
          <h3>注释</h3>
          {poem.annotation.map((item, index) => (
            <div key={index}>
              <strong>{item.line}：</strong>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      )}

      {/* 创作背景 */}
      {poem.background && (
        <div className="poem-background">
          <h3>创作背景</h3>
          <p>{poem.background}</p>
        </div>
      )}

      {/* 标签 */}
      <div className="poem-tags">
        {poem.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default PoemDetail 