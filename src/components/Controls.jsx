import { Search, Plus, X } from 'lucide-react'

export default function Controls({ 
  categorias, categoriaAtiva, setCategoriaAtiva, 
  termoBusca, setTermoBusca, 
  qtd, setQtd, 
  onAdicionar,
  abaAtiva
}) {
  return (
    <div className="bg-white border-b border-gray-100 flex-none z-10 flex flex-col shadow-xs">
      {/* Pílulas de Filtro de Categorias */}
      <div className="flex overflow-x-auto p-2.5 gap-1.5 scrollbar-none border-b border-gray-100/80 bg-gray-50/50">
        {Object.entries(categorias).map(([key, info]) => {
          const isAtivo = categoriaAtiva === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setCategoriaAtiva(key)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs font-semibold cursor-pointer border
                ${isAtivo 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'}
              `}
            >
              <span>{info.emoji}</span>
              <span>{info.label}</span>
            </button>
          )
        })}
      </div>

      {/* Barra de Busca / Adição */}
      <div className="p-3">
        {abaAtiva === 'pendentes' ? (
          <form onSubmit={onAdicionar} className="flex gap-2 items-center">
            {/* Quantidade Stepper */}
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shrink-0">
              <input 
                type="number" 
                min="1" 
                max="99"
                value={qtd}
                onChange={(e) => setQtd(Math.max(1, Number(e.target.value)))}
                className="w-11 p-2 text-center text-xs font-bold text-gray-800 bg-transparent focus:outline-none"
                aria-label="Quantidade do item"
              />
            </div>
            
            {/* Input de Nome do Item */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                value={termoBusca} 
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar ou adicionar item..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {termoBusca && (
                <button 
                  type="button" 
                  onClick={() => setTermoBusca('')} 
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                  title="Limpar busca"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Botão Adicionar */}
            <button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 font-bold text-xs cursor-pointer shrink-0"
              title="Adicionar item à lista"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </form>
        ) : (
          /* Busca no Carrinho */
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              value={termoBusca} 
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Buscar item no carrinho..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {termoBusca && (
              <button 
                type="button" 
                onClick={() => setTermoBusca('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                title="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}