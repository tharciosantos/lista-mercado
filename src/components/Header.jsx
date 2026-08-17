import { ShoppingCart, RotateCcw, Sparkles, CheckCircle2, Trash2 } from 'lucide-react'

export default function Header({ 
  itemsCount, 
  pendentesCount, 
  carrinhoCount, 
  totalVolumes,
  abaAtiva, 
  setAbaAtiva, 
  onReset, 
  onLimparCarrinho,
  onPreencher 
}) {
  const percentual = itemsCount > 0 ? Math.round((carrinhoCount / itemsCount) * 100) : 0

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 pt-3.5 pb-2 text-white flex-none shadow-md z-20">
      {/* Barra Superior */}
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <ShoppingCart size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight flex items-center gap-1.5 leading-tight">
              Lista de Mercado
            </h1>
            <p className="text-[10px] text-emerald-100 font-medium">
              {itemsCount === 0 ? 'PWA Offline Ready' : `${itemsCount} produtos · ${totalVolumes} volumes`}
            </p>
          </div>
        </div>
        
        {/* Ações Rápidas do Topo */}
        <div className="flex items-center gap-1.5">
          {itemsCount < 5 && (
            <button 
              onClick={onPreencher} 
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-[11px] font-bold tracking-wide transition-colors cursor-pointer"
              title="Carregar lista completa com itens essenciais"
            >
              <Sparkles size={13} />
              <span>Sugerir</span>
            </button>
          )}

          {carrinhoCount > 0 && (
            <button 
              onClick={onLimparCarrinho} 
              className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-800/60 hover:bg-emerald-800 rounded-lg text-emerald-100 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Limpar apenas itens que já foram colocados no carrinho"
            >
              <CheckCircle2 size={13} />
              <span className="hidden sm:inline">Limpar Carrinho</span>
            </button>
          )}

          {itemsCount > 0 && (
            <button 
              onClick={onReset} 
              className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500/30 hover:bg-red-500 rounded-lg text-white text-[11px] font-semibold transition-colors cursor-pointer"
              title="Reiniciar lista para uma nova compra"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Nova Compra</span>
            </button>
          )}
        </div>
      </div>

      {/* Barra de Progresso da Compra */}
      {itemsCount > 0 && (
        <div className="mb-2.5 space-y-1">
          <div className="flex justify-between items-center text-[11px] text-emerald-100 font-semibold">
            <span>Progresso da compra</span>
            <span>{carrinhoCount} de {itemsCount} itens ({percentual}%)</span>
          </div>
          <div className="h-1.5 w-full bg-emerald-950/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${percentual}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Abas Principais (Faltam vs No Carrinho) */}
      <div className="flex p-1 bg-emerald-900/40 rounded-xl">
        <button 
          onClick={() => setAbaAtiva('pendentes')} 
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            abaAtiva === 'pendentes' 
              ? 'bg-white text-emerald-800 shadow-sm' 
              : 'text-emerald-100 hover:text-white'
          }`}
        >
          <span>Pendentes</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            abaAtiva === 'pendentes' ? 'bg-emerald-100 text-emerald-800' : 'bg-white/20 text-white'
          }`}>
            {pendentesCount}
          </span>
        </button>

        <button 
          onClick={() => setAbaAtiva('carrinho')} 
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            abaAtiva === 'carrinho' 
              ? 'bg-white text-emerald-800 shadow-sm' 
              : 'text-emerald-100 hover:text-white'
          }`}
        >
          <span>No Carrinho</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            abaAtiva === 'carrinho' ? 'bg-emerald-100 text-emerald-800' : 'bg-white/20 text-white'
          }`}>
            {carrinhoCount}
          </span>
        </button>
      </div>
    </header>
  )
}