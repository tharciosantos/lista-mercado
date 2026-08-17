import { Check, Plus, Minus, Trash2, Undo2 } from 'lucide-react'

export default function ItemRow({ item, categorias, onToggle, onQtdChange, onDelete, showCategoryLabel }) {
  const catInfo = categorias[item.categoria] || categorias['todos']

  return (
    <div className={`flex items-center justify-between p-3 mb-2.5 rounded-xl border transition-all duration-200 ${
      item.peguei 
        ? 'opacity-65 bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-200/90 shadow-xs hover:border-emerald-300'
    }`}>
      {/* Área Clicável para Marcar/Desmarcar */}
      <div onClick={() => onToggle(item.id)} className="flex items-center gap-3 flex-1 cursor-pointer select-none">
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
          item.peguei 
            ? 'bg-emerald-600 border-emerald-600 shadow-xs' 
            : 'border-gray-300 hover:border-emerald-500 bg-white'
        }`}>
          {item.peguei && <Check size={14} className="text-white stroke-[3]" />}
        </div>
        
        <div className="overflow-hidden">
          <span className={`block text-sm font-semibold truncate transition-colors ${
            item.peguei 
              ? 'line-through text-gray-400 decoration-gray-400' 
              : 'text-gray-800'
          }`}>
            {item.nome}
          </span>
          {showCategoryLabel && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit mt-0.5 ${catInfo.color}`}>
              <span>{catInfo.emoji}</span>
              <span>{catInfo.label}</span>
            </span>
          )}
        </div>
      </div>

      {/* Controles de Quantidade e Exclusão */}
      <div className="flex items-center gap-2 pl-2">
        {!item.peguei && (
          <div className="flex items-center bg-gray-100 rounded-lg px-0.5 h-7 border border-gray-200">
            <button 
              type="button"
              onClick={() => onQtdChange(item.id, -1)} 
              className="w-7 h-full flex items-center justify-center text-gray-500 hover:text-red-500 rounded-l-lg cursor-pointer transition-colors"
              title="Diminuir quantidade"
            >
              <Minus size={12} />
            </button>
            <span className="text-xs font-bold w-5 text-center text-gray-800">{item.quantidade}</span>
            <button 
              type="button"
              onClick={() => onQtdChange(item.id, 1)} 
              className="w-7 h-full flex items-center justify-center text-emerald-700 hover:bg-white rounded-r-lg cursor-pointer transition-colors"
              title="Aumentar quantidade"
            >
              <Plus size={12} />
            </button>
          </div>
        )}
        
        <button 
          type="button"
          onClick={() => onDelete(item.id, item.peguei)} 
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title={item.peguei ? "Voltar para pendentes" : "Remover item"}
        >
          {item.peguei ? <Undo2 size={16} /> : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  )
}