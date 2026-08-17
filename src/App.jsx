import { useState, useEffect, useMemo } from 'react'
import { PackagePlus, ShoppingCart, Share2, Search, Sparkles } from 'lucide-react'
import Header from './components/Header'
import Controls from './components/Controls'
import ItemRow from './components/ItemRow'

const CATEGORIAS = {
  todos: { label: 'Todos', emoji: '📋', color: 'bg-gray-100 text-gray-800 border-gray-200', ordem: 0 },
  hortifruti: { label: 'Hortifruti', emoji: '🥬', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', ordem: 1 },
  carnes: { label: 'Açougue & Peixes', emoji: '🥩', color: 'bg-rose-50 text-rose-800 border-rose-200', ordem: 2 },
  mercearia: { label: 'Mercearia', emoji: '🍚', color: 'bg-amber-50 text-amber-800 border-amber-200', ordem: 3 },
  frios: { label: 'Frios & Laticínios', emoji: '🧀', color: 'bg-orange-50 text-orange-800 border-orange-200', ordem: 4 },
  padaria: { label: 'Padaria & Matinais', emoji: '🍞', color: 'bg-yellow-50 text-yellow-800 border-yellow-200', ordem: 5 },
  congelados: { label: 'Congelados', emoji: '❄️', color: 'bg-indigo-50 text-indigo-800 border-indigo-200', ordem: 6 },
  higiene: { label: 'Higiene Pessoal', emoji: '🧴', color: 'bg-purple-50 text-purple-800 border-purple-200', ordem: 7 },
  limpeza: { label: 'Limpeza & Casa', emoji: '🧹', color: 'bg-sky-50 text-sky-800 border-sky-200', ordem: 8 },
  bebidas: { label: 'Bebidas', emoji: '🥤', color: 'bg-cyan-50 text-cyan-800 border-cyan-200', ordem: 9 },
  pet: { label: 'Pet Shop', emoji: '🐾', color: 'bg-teal-50 text-teal-800 border-teal-200', ordem: 10 },
  bazar: { label: 'Bazar & Utilidades', emoji: '💡', color: 'bg-stone-50 text-stone-800 border-stone-200', ordem: 11 },
}

const LISTA_MESTRA = [
  // --- HORTIFRUTI (35 itens) ---
  { nome: 'Batata Inglesa', qtd: 1, cat: 'hortifruti' },
  { nome: 'Batata Doce', qtd: 1, cat: 'hortifruti' },
  { nome: 'Cebola Branca', qtd: 1, cat: 'hortifruti' },
  { nome: 'Cebola Roxa', qtd: 1, cat: 'hortifruti' },
  { nome: 'Tomate Italiano', qtd: 1, cat: 'hortifruti' },
  { nome: 'Tomate Cereja', qtd: 1, cat: 'hortifruti' },
  { nome: 'Alho (Cabeça/Pacote)', qtd: 1, cat: 'hortifruti' },
  { nome: 'Cenoura', qtd: 1, cat: 'hortifruti' },
  { nome: 'Banana Prata / Nanica', qtd: 1, cat: 'hortifruti' },
  { nome: 'Maçã Gala / Fuji', qtd: 1, cat: 'hortifruti' },
  { nome: 'Limão Taiti', qtd: 1, cat: 'hortifruti' },
  { nome: 'Laranja Pêra', qtd: 1, cat: 'hortifruti' },
  { nome: 'Mamão Papaia / Formosa', qtd: 1, cat: 'hortifruti' },
  { nome: 'Melancia', qtd: 1, cat: 'hortifruti' },
  { nome: 'Melão', qtd: 1, cat: 'hortifruti' },
  { nome: 'Abacaxi Pérola', qtd: 1, cat: 'hortifruti' },
  { nome: 'Abacate', qtd: 1, cat: 'hortifruti' },
  { nome: 'Manga Tommy / Palmer', qtd: 1, cat: 'hortifruti' },
  { nome: 'Uva sem Semente', qtd: 1, cat: 'hortifruti' },
  { nome: 'Morango (Bandeja)', qtd: 1, cat: 'hortifruti' },
  { nome: 'Maracujá', qtd: 1, cat: 'hortifruti' },
  { nome: 'Pêra', qtd: 1, cat: 'hortifruti' },
  { nome: 'Alface Americana / Crespa', qtd: 1, cat: 'hortifruti' },
  { nome: 'Cheiro Verde (Salsa/Cebolinha)', qtd: 1, cat: 'hortifruti' },
  { nome: 'Couve Manteiga Fatiada', qtd: 1, cat: 'hortifruti' },
  { nome: 'Rúcula / Agrião', qtd: 1, cat: 'hortifruti' },
  { nome: 'Espinafre', qtd: 1, cat: 'hortifruti' },
  { nome: 'Brócolis Ninja / Comum', qtd: 1, cat: 'hortifruti' },
  { nome: 'Couve-Flor', qtd: 1, cat: 'hortifruti' },
  { nome: 'Pimentão Verde / Vermelho', qtd: 1, cat: 'hortifruti' },
  { nome: 'Chuchu', qtd: 1, cat: 'hortifruti' },
  { nome: 'Abobrinha Italiana', qtd: 1, cat: 'hortifruti' },
  { nome: 'Beterraba', qtd: 1, cat: 'hortifruti' },
  { nome: 'Pepino Japonês', qtd: 1, cat: 'hortifruti' },
  { nome: 'Ovos Brancos / Vermelhos (Dúzia)', qtd: 1, cat: 'hortifruti' },

  // --- AÇOUGUE E PEIXARIA (24 itens) ---
  { nome: 'Carne Moída (Patinho/Acém)', qtd: 1, cat: 'carnes' },
  { nome: 'Filé de Peito de Frango', qtd: 1, cat: 'carnes' },
  { nome: 'Sobrecoxa de Frango', qtd: 1, cat: 'carnes' },
  { nome: 'Coxinha da Asa (Tulipa)', qtd: 1, cat: 'carnes' },
  { nome: 'Frango a Passarinho', qtd: 1, cat: 'carnes' },
  { nome: 'Coração de Frango', qtd: 1, cat: 'carnes' },
  { nome: 'Bife Bovino (Alcatra / Contrafilé)', qtd: 1, cat: 'carnes' },
  { nome: 'Carne de Panela (Músculo / Coxão Duro)', qtd: 1, cat: 'carnes' },
  { nome: 'Picanha Bovina', qtd: 1, cat: 'carnes' },
  { nome: 'Costela Bovina', qtd: 1, cat: 'carnes' },
  { nome: 'Fraldinha Bovina', qtd: 1, cat: 'carnes' },
  { nome: 'Linguiça Toscana para Churrasco', qtd: 1, cat: 'carnes' },
  { nome: 'Linguiça Calabresa Defumada', qtd: 1, cat: 'carnes' },
  { nome: 'Bacon em Fatias / Cubos', qtd: 1, cat: 'carnes' },
  { nome: 'Costelinha Suína', qtd: 1, cat: 'carnes' },
  { nome: 'Bisteca Suína', qtd: 1, cat: 'carnes' },
  { nome: 'Lombo Suíno', qtd: 1, cat: 'carnes' },
  { nome: 'Hambúrguer Bovino Artesanal', qtd: 1, cat: 'carnes' },
  { nome: 'Salsicha para Hot Dog', qtd: 1, cat: 'carnes' },
  { nome: 'Filé de Tilápia Fresco/Congelado', qtd: 1, cat: 'carnes' },
  { nome: 'Filé de Merluza / Pescada', qtd: 1, cat: 'carnes' },
  { nome: 'Salmão em Postas', qtd: 1, cat: 'carnes' },
  { nome: 'Camarão Limpo', qtd: 1, cat: 'carnes' },
  { nome: 'Sardinha Fresca Limpa', qtd: 1, cat: 'carnes' },

  // --- MERCEARIA E DESPENSA (44 itens) ---
  { nome: 'Arroz Branco (5kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Arroz Integral (1kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Feijão Carioca (1kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Feijão Preto (1kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Grão de Bico / Lentilha', qtd: 1, cat: 'mercearia' },
  { nome: 'Açúcar Refinado (1kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Açúcar Cristal / Mascavo', qtd: 1, cat: 'mercearia' },
  { nome: 'Adoçante Líquido / Sachê', qtd: 1, cat: 'mercearia' },
  { nome: 'Sal Refinado', qtd: 1, cat: 'mercearia' },
  { nome: 'Sal Grosso para Churrasco', qtd: 1, cat: 'mercearia' },
  { nome: 'Óleo de Soja (900ml)', qtd: 1, cat: 'mercearia' },
  { nome: 'Óleo de Girassol / Canola', qtd: 1, cat: 'mercearia' },
  { nome: 'Azeite de Oliva Extra Virgem', qtd: 1, cat: 'mercearia' },
  { nome: 'Vinagre de Álcool / Maçã', qtd: 1, cat: 'mercearia' },
  { nome: 'Molho de Soja (Shoyu)', qtd: 1, cat: 'mercearia' },
  { nome: 'Café Torrado e Moído (500g)', qtd: 1, cat: 'mercearia' },
  { nome: 'Café em Cápsula', qtd: 1, cat: 'mercearia' },
  { nome: 'Café Solúvel', qtd: 1, cat: 'mercearia' },
  { nome: 'Chá em Saquinhos (Camomila/Hortelã)', qtd: 1, cat: 'mercearia' },
  { nome: 'Macarrão Espaguete nº 8', qtd: 2, cat: 'mercearia' },
  { nome: 'Macarrão Parafuso / Penne', qtd: 2, cat: 'mercearia' },
  { nome: 'Macarrão Instantâneo (Miojo)', qtd: 3, cat: 'mercearia' },
  { nome: 'Molho de Tomate Tradicional (Sachê)', qtd: 3, cat: 'mercearia' },
  { nome: 'Extrato de Tomate em Lata', qtd: 1, cat: 'mercearia' },
  { nome: 'Farinha de Trigo Tradicional (1kg)', qtd: 1, cat: 'mercearia' },
  { nome: 'Farinha de Mandioca / Farofa Pronta', qtd: 1, cat: 'mercearia' },
  { nome: 'Polvilho Doce / Azedo', qtd: 1, cat: 'mercearia' },
  { nome: 'Amido de Milho (Maizena)', qtd: 1, cat: 'mercearia' },
  { nome: 'Aveia em Flocos / Granola', qtd: 1, cat: 'mercearia' },
  { nome: 'Cereal Matinal (Sucrilhos/Corn Flakes)', qtd: 1, cat: 'mercearia' },
  { nome: 'Maionese Tradicional', qtd: 1, cat: 'mercearia' },
  { nome: 'Ketchup / Mostarda', qtd: 1, cat: 'mercearia' },
  { nome: 'Molho Barbecue', qtd: 1, cat: 'mercearia' },
  { nome: 'Atum em Lata (em óleo/água)', qtd: 2, cat: 'mercearia' },
  { nome: 'Sardinha em Lata', qtd: 2, cat: 'mercearia' },
  { nome: 'Milho Verde em Conserva', qtd: 2, cat: 'mercearia' },
  { nome: 'Ervilha em Conserva', qtd: 2, cat: 'mercearia' },
  { nome: 'Azeitona Verde / Preta em Conserva', qtd: 1, cat: 'mercearia' },
  { nome: 'Palmito em Conserva', qtd: 1, cat: 'mercearia' },
  { nome: 'Creme de Leite (Caixinha)', qtd: 2, cat: 'mercearia' },
  { nome: 'Leite Condensado (Caixinha/Lata)', qtd: 1, cat: 'mercearia' },
  { nome: 'Fermento em Pó Químico', qtd: 1, cat: 'mercearia' },
  { nome: 'Bolacha Recheada / Biscoito Maisena', qtd: 2, cat: 'mercearia' },
  { nome: 'Biscoito Cream Cracker', qtd: 1, cat: 'mercearia' },
  { nome: 'Pipoca de Micro-ondas / Panela', qtd: 1, cat: 'mercearia' },
  { nome: 'Achocolatado em Pó (Nescau/Toddy)', qtd: 1, cat: 'mercearia' },
  { nome: 'Chocolate em Barra (Meio Amargo/Ao Leite)', qtd: 1, cat: 'mercearia' },
  { nome: 'Gelatina em Pó Sabores', qtd: 2, cat: 'mercearia' },
  { nome: 'Orégano / Pimenta do Reino / Chimichurri', qtd: 1, cat: 'mercearia' },

  // --- FRIOS E LATICÍNIOS (18 itens) ---
  { nome: 'Queijo Mussarela Fatiado', qtd: 1, cat: 'frios' },
  { nome: 'Queijo Prato Fatiado', qtd: 1, cat: 'frios' },
  { nome: 'Queijo Parmesão Ralado / Cunha', qtd: 1, cat: 'frios' },
  { nome: 'Queijo Minas Frescal', qtd: 1, cat: 'frios' },
  { nome: 'Queijo Provolone / Gorgonzola', qtd: 1, cat: 'frios' },
  { nome: 'Presunto Cozido Fatiado', qtd: 1, cat: 'frios' },
  { nome: 'Peito de Peru Fatiado', qtd: 1, cat: 'frios' },
  { nome: 'Salame Fatiado / Inteiro', qtd: 1, cat: 'frios' },
  { nome: 'Requeijão Cremoso Tradicional', qtd: 1, cat: 'frios' },
  { nome: 'Cream Cheese', qtd: 1, cat: 'frios' },
  { nome: 'Ricota Fresca / Creme de Ricota', qtd: 1, cat: 'frios' },
  { nome: 'Manteiga com Sal / Sem Sal', qtd: 1, cat: 'frios' },
  { nome: 'Margarina com Sal', qtd: 1, cat: 'frios' },
  { nome: 'Iogurte Natural Integral / Desnatado', qtd: 2, cat: 'frios' },
  { nome: 'Iogurte de Frutas (Morango/Coco)', qtd: 2, cat: 'frios' },
  { nome: 'Iogurte Grego', qtd: 2, cat: 'frios' },
  { nome: 'Leite Fermentado (Yakult / Chamyto)', qtd: 1, cat: 'frios' },
  { nome: 'Nata / Creme de Leite Fresco', qtd: 1, cat: 'frios' },

  // --- PADARIA E MATINAIS (16 itens) ---
  { nome: 'Pão Francês Fresquinho', qtd: 6, cat: 'padaria' },
  { nome: 'Pão de Forma Tradicional', qtd: 1, cat: 'padaria' },
  { nome: 'Pão de Forma Integral / 12 Grãos', qtd: 1, cat: 'padaria' },
  { nome: 'Pão de Hambúrguer com Gergelim', qtd: 1, cat: 'padaria' },
  { nome: 'Pão de Hot Dog', qtd: 1, cat: 'padaria' },
  { nome: 'Pão Sírio / Rap10', qtd: 1, cat: 'padaria' },
  { nome: 'Bisnaguinha Infantil', qtd: 1, cat: 'padaria' },
  { nome: 'Torrada Tradicional / Integral', qtd: 1, cat: 'padaria' },
  { nome: 'Bolo Pronto (Cenoura/Chocolate/Fubá)', qtd: 1, cat: 'padaria' },
  { nome: 'Croissant / Pão Doce', qtd: 2, cat: 'padaria' },
  { nome: 'Geleia de Morango / Uva / Damasco', qtd: 1, cat: 'padaria' },
  { nome: 'Mel Puro de Abelha', qtd: 1, cat: 'padaria' },
  { nome: 'Doce de Leite / Goiabada', qtd: 1, cat: 'padaria' },
  { nome: 'Leite Integral (Caixa 1L)', qtd: 6, cat: 'padaria' },
  { nome: 'Leite Desnatado / Semi (Caixa 1L)', qtd: 4, cat: 'padaria' },
  { nome: 'Leite Zero Lactose (Caixa 1L)', qtd: 2, cat: 'padaria' },

  // --- CONGELADOS (14 itens) ---
  { nome: 'Pão de Queijo Congelado Tradicional', qtd: 1, cat: 'congelados' },
  { nome: 'Batata Palito Congelada (1kg)', qtd: 1, cat: 'congelados' },
  { nome: 'Lasanha Bolonhesa / 4 Queijos', qtd: 1, cat: 'congelados' },
  { nome: 'Nuggets / Empanados de Frango', qtd: 1, cat: 'congelados' },
  { nome: 'Pizza Congelada (Calabresa/Mussarela)', qtd: 1, cat: 'congelados' },
  { nome: 'Sorvete de Pote (2L)', qtd: 1, cat: 'congelados' },
  { nome: 'Picolés de Fruta / Chocolate', qtd: 4, cat: 'congelados' },
  { nome: 'Açaí Congelado em Pote', qtd: 1, cat: 'congelados' },
  { nome: 'Vegetais Congelados (Seleta / Brócolis)', qtd: 1, cat: 'congelados' },
  { nome: 'Hambúrguer Congelado em Caixa', qtd: 1, cat: 'congelados' },
  { nome: 'Coxinha / Salgadinhos para Festa', qtd: 1, cat: 'congelados' },
  { nome: 'Massa Folhada Congelada', qtd: 1, cat: 'congelados' },
  { nome: 'Pão de Alho Congelado para Churrasco', qtd: 1, cat: 'congelados' },
  { nome: 'Polpa de Frutas Congelada (Maracujá/Acerola)', qtd: 2, cat: 'congelados' },

  // --- HIGIENE PESSOAL (24 itens) ---
  { nome: 'Papel Higiênico (Folha Dupla 12 rolos)', qtd: 1, cat: 'higiene' },
  { nome: 'Creme Dental / Pasta de Dente', qtd: 2, cat: 'higiene' },
  { nome: 'Escova de Dente (Macio/Médio)', qtd: 1, cat: 'higiene' },
  { nome: 'Fio Dental com Flúor', qtd: 1, cat: 'higiene' },
  { nome: 'Enxaguante Bucal Antisséptico', qtd: 1, cat: 'higiene' },
  { nome: 'Sabonete em Barra Hidratante', qtd: 4, cat: 'higiene' },
  { nome: 'Sabonete Líquido para Mãos', qtd: 1, cat: 'higiene' },
  { nome: 'Shampoo para Cabelos', qtd: 1, cat: 'higiene' },
  { nome: 'Condicionador para Cabelos', qtd: 1, cat: 'higiene' },
  { nome: 'Máscara / Creme de Tratamento Capilar', qtd: 1, cat: 'higiene' },
  { nome: 'Desodorante Aerosol / Roll-on', qtd: 1, cat: 'higiene' },
  { nome: 'Cotonetes (Hastes Flexíveis)', qtd: 1, cat: 'higiene' },
  { nome: 'Algodão em Discos / Bolas', qtd: 1, cat: 'higiene' },
  { nome: 'Absorvente com Abas / Noturno', qtd: 1, cat: 'higiene' },
  { nome: 'Protetor Diário', qtd: 1, cat: 'higiene' },
  { nome: 'Aparelho de Barbear Descartável', qtd: 1, cat: 'higiene' },
  { nome: 'Espuma / Gel de Barbear', qtd: 1, cat: 'higiene' },
  { nome: 'Hidratante Corporal', qtd: 1, cat: 'higiene' },
  { nome: 'Protetor Solar Facial / Corporal FPS 50', qtd: 1, cat: 'higiene' },
  { nome: 'Lenço Umedecido', qtd: 1, cat: 'higiene' },
  { nome: 'Álcool em Gel 70%', qtd: 1, cat: 'higiene' },
  { nome: 'Curativo Adesivo (Band-aid)', qtd: 1, cat: 'higiene' },
  { nome: 'Acetona / Removedor de Esmalte', qtd: 1, cat: 'higiene' },
  { nome: 'Lâmina / Cortador de Unha', qtd: 1, cat: 'higiene' },

  // --- LIMPEZA E CASA (22 itens) ---
  { nome: 'Detergente Líquido de Louça (500ml)', qtd: 2, cat: 'limpeza' },
  { nome: 'Esponja de Louça Dupla Face', qtd: 1, cat: 'limpeza' },
  { nome: 'Sabão em Pó para Roupas (1kg/2kg)', qtd: 1, cat: 'limpeza' },
  { nome: 'Sabão Líquido Concentrado para Roupas', qtd: 1, cat: 'limpeza' },
  { nome: 'Amaciante Concentrado para Roupas', qtd: 1, cat: 'limpeza' },
  { nome: 'Água Sanitária / Cloro (1L/2L)', qtd: 1, cat: 'limpeza' },
  { nome: 'Desinfetante Perfumado para Piso', qtd: 1, cat: 'limpeza' },
  { nome: 'Desengordurante de Cozinha', qtd: 1, cat: 'limpeza' },
  { nome: 'Limpa-Vidros em Spray', qtd: 1, cat: 'limpeza' },
  { nome: 'Lã de Aço (Bombril/Assolan)', qtd: 1, cat: 'limpeza' },
  { nome: 'Saco de Lixo para Pia/Banheiro (15L/30L)', qtd: 1, cat: 'limpeza' },
  { nome: 'Saco de Lixo Reforçado (50L / 100L)', qtd: 1, cat: 'limpeza' },
  { nome: 'Papel Toalha de Cozinha (2 rolos)', qtd: 1, cat: 'limpeza' },
  { nome: 'Papel Alumínio para Forno', qtd: 1, cat: 'limpeza' },
  { nome: 'Filme Plástico Transparente (PVC)', qtd: 1, cat: 'limpeza' },
  { nome: 'Álcool 70% Líquido', qtd: 1, cat: 'limpeza' },
  { nome: 'Lustra-Móveis Perfumado', qtd: 1, cat: 'limpeza' },
  { nome: 'Pano de Chão Alvejado', qtd: 2, cat: 'limpeza' },
  { nome: 'Pano de Microfibra Multiuso', qtd: 2, cat: 'limpeza' },
  { nome: 'Pedra Sanitária para Vaso', qtd: 1, cat: 'limpeza' },
  { nome: 'Rodo / Vassoura de Cerdas Macias', qtd: 1, cat: 'limpeza' },
  { nome: 'Balde Plástico com Alça', qtd: 1, cat: 'limpeza' },

  // --- BEBIDAS (14 itens) ---
  { nome: 'Água Mineral sem Gás (1.5L / 5L)', qtd: 2, cat: 'bebidas' },
  { nome: 'Água Mineral com Gás (500ml / 1.5L)', qtd: 2, cat: 'bebidas' },
  { nome: 'Suco de Uva Integral (1L)', qtd: 1, cat: 'bebidas' },
  { nome: 'Suco de Laranja Natural / Néctar', qtd: 1, cat: 'bebidas' },
  { nome: 'Refrigerante Coca-Cola / Guaraná (2L)', qtd: 1, cat: 'bebidas' },
  { nome: 'Refrigerante Zero Açúcar (2L)', qtd: 1, cat: 'bebidas' },
  { nome: 'Cerveja Pilsen / Puro Malte (Pack/Lata)', qtd: 6, cat: 'bebidas' },
  { nome: 'Cerveja Artesanal / IPA / Trigo', qtd: 2, cat: 'bebidas' },
  { nome: 'Vinho Tinto Fino Seco / Suave', qtd: 1, cat: 'bebidas' },
  { nome: 'Vinho Branco / Espumante', qtd: 1, cat: 'bebidas' },
  { nome: 'Energético (Red Bull/Monster)', qtd: 2, cat: 'bebidas' },
  { nome: 'Água de Coco (Caixinha 1L)', qtd: 1, cat: 'bebidas' },
  { nome: 'Água Tônica (Lata)', qtd: 2, cat: 'bebidas' },
  { nome: 'Bebida Isotônica (Gatorade/Powerade)', qtd: 1, cat: 'bebidas' },

  // --- PET SHOP (8 itens) ---
  { nome: 'Ração Seca para Cães Adultos (Pacote)', qtd: 1, cat: 'pet' },
  { nome: 'Ração para Cães Filhotes', qtd: 1, cat: 'pet' },
  { nome: 'Ração Seca para Gatos Castrados', qtd: 1, cat: 'pet' },
  { nome: 'Sachê de Carne / Frango para Cães', qtd: 3, cat: 'pet' },
  { nome: 'Sachê Úmido para Gatos (Whiskas/Friskies)', qtd: 3, cat: 'pet' },
  { nome: 'Petiscos / Bifinhos Caninos', qtd: 1, cat: 'pet' },
  { nome: 'Areia Sanitária para Gatos (4kg)', qtd: 1, cat: 'pet' },
  { nome: 'Tapete Higiênico Descartável para Cães', qtd: 1, cat: 'pet' },

  // --- BAZAR E UTILIDADES (9 itens) ---
  { nome: 'Pilhas Alcalinas AA (Pequena)', qtd: 1, cat: 'bazar' },
  { nome: 'Pilhas Alcalinas AAA (Palito)', qtd: 1, cat: 'bazar' },
  { nome: 'Fósforo de Madeira / Isqueiro', qtd: 1, cat: 'bazar' },
  { nome: 'Guardanapo de Papel', qtd: 1, cat: 'bazar' },
  { nome: 'Lâmpada LED (9W / 12W)', qtd: 1, cat: 'bazar' },
  { nome: 'Prendedor de Roupas', qtd: 1, cat: 'bazar' },
  { nome: 'Sacos Herméticos Ziploc para Alimentos', qtd: 1, cat: 'bazar' },
  { nome: 'Fita Adesiva / Crepe', qtd: 1, cat: 'bazar' },
  { nome: 'Copos Descartáveis (200ml)', qtd: 1, cat: 'bazar' },
]

function App() {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('minha-lista-mercado')
        return saved ? JSON.parse(saved) : []
      } catch {
        return []
      }
    }
    return []
  })
  
  const [termoBusca, setTermoBusca] = useState('')
  const [quantidadeInput, setQuantidadeInput] = useState(1)
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [abaAtiva, setAbaAtiva] = useState('pendentes')

  useEffect(() => {
    try {
      localStorage.setItem('minha-lista-mercado', JSON.stringify(items))
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e)
    }
  }, [items])

  const resetarLista = () => {
    if (window.confirm("Deseja iniciar uma nova compra? Isso apagará todos os itens da lista atual.")) {
      setItems([])
      setAbaAtiva('pendentes')
      setTermoBusca('')
    }
  }

  const limparCarrinho = () => {
    if (window.confirm("Deseja remover da lista todos os itens que já foram colocados no carrinho?")) {
      setItems(items.filter(i => !i.peguei))
      setAbaAtiva('pendentes')
    }
  }

  const carregarTemplate = () => {
    if (items.length > 0 && !window.confirm("Adicionar os itens da Lista Mestra à sua lista atual?")) return
    const novos = LISTA_MESTRA.map((m, i) => ({ 
      id: Date.now() + i, 
      nome: m.nome, 
      quantidade: m.qtd, 
      categoria: m.cat, 
      peguei: false 
    }))
    setItems(prev => [...prev, ...novos])
    setAbaAtiva('pendentes')
    setCategoriaAtiva('todos')
  }

  // Identificação inteligente de categoria com busca fuzzy por palavras-chave
  const detectarCategoriaInteligente = (nome) => {
    const termo = nome.trim().toLowerCase()
    
    // Palavras-chave diretas
    if (/batata|cebola|tomate|alho|cenoura|banana|maca|limao|laranja|mamao|melancia|melao|abacaxi|abacate|manga|uva|morango|maracuja|pera|alface|couve|brocolis|rucula|agriao|espinafre|couve-flor|pimentao|chuchu|abobrinha|beterraba|pepino|fruta|legume|verdura|ovo/.test(termo)) return 'hortifruti'
    if (/carne|frango|bife|peixe|tilapia|merluza|salmao|camarao|sardinha|bacon|linguica|hamburguer|costela|porco|sobrecoxa|tulipa|coracao|fradinha|picanha|bisteca|lombo|salsicha/.test(termo)) return 'carnes'
    if (/arroz|feijao|grao|lentilha|acucar|sal|oleo|azeite|vinagre|shoyu|cafe|cha|macarrao|miojo|molho|tomate|extrato|farinha|polvilho|amido|maizena|aveia|granola|cereal|maionese|ketchup|mostarda|barbecue|atum|sardinha|milho|ervilha|azeitona|palmito|leite condensado|creme de leite|fermento|biscoito|bolacha|cracker|pipoca|achocolatado|nescau|toddy|chocolate|gelatina|tempero|oregano|pimenta/.test(termo)) return 'mercearia'
    if (/queijo|mussarela|prato|parmesao|provolone|gorgonzola|presunto|peito de peru|salame|requeijao|cream cheese|ricota|manteiga|margarina|iogurte|grego|yakult|chamyto|nata|laticinio/.test(termo)) return 'frios'
    if (/pao|frances|forma|hamburguer|hot dog|sirio|rap10|bisnaga|torrada|bolo|croissant|geleia|mel|doce de leite|goiabada|leite/.test(termo)) return 'padaria'
    if (/congelad|pao de queijo|lasanha|nugget|pizza|sorvete|picole|acai|vegetais congelados|coxinha|massa folhada|pao de alho|polpa/.test(termo)) return 'congelados'
    if (/papel higienico|creme dental|pasta de dente|escova|fio dental|enxaguante|sabonete|shampoo|condicionador|mascara capilar|desodorante|cotonete|algodao|absorvente|barbeador|espuma de barbear|hidratante|solar|lenco|alcool em gel|curativo|band-aid|acetona|esmalte/.test(termo)) return 'higiene'
    if (/detergente|esponja|sabao|amaciante|agua sanitaria|cloro|desinfetante|desengordurante|limpa-vidro|bombril|assolan|saco de lixo|papel toalha|aluminio|filme|pvc|alcool|lustra|pano|rodo|vassoura|balde|pedra sanitaria/.test(termo)) return 'limpeza'
    if (/agua|mineral|suco|refrigerante|coca|guarana|cerveja|pilsen|artesanal|ipa|vinho|tinto|espumante|energetico|red bull|monster|coco|tonica|gatorade|isotonico/.test(termo)) return 'bebidas'
    if (/racao|gato|cao|cachorro|pet|petisco|bifinho|sache|areia|tapete higienico/.test(termo)) return 'pet'
    if (/pilha|fosforo|isqueiro|guardanapo|lampada|prendedor|ziploc|fita|copo descartavel|bazar/.test(termo)) return 'bazar'

    const itemEncontrado = LISTA_MESTRA.find(m => 
      m.nome.toLowerCase() === termo || 
      m.nome.toLowerCase().includes(termo) || 
      termo.includes(m.nome.toLowerCase())
    )
    return itemEncontrado ? itemEncontrado.cat : 'mercearia'
  }

  const adicionarOuBuscar = (e) => {
    e.preventDefault()
    if (!termoBusca.trim()) return
    
    const cat = categoriaAtiva === 'todos' 
      ? detectarCategoriaInteligente(termoBusca) 
      : categoriaAtiva

    setItems([
      { 
        id: Date.now(), 
        nome: termoBusca.trim(), 
        quantidade: quantidadeInput, 
        categoria: cat, 
        peguei: false 
      }, 
      ...items
    ])
    
    setTermoBusca('')
    setQuantidadeInput(1)
  }

  const toggleItem = (id) => setItems(items.map(i => i.id === id ? { ...i, peguei: !i.peguei } : i))
  const deletarItem = (id, noCarrinho) => noCarrinho ? toggleItem(id) : setItems(items.filter(i => i.id !== id))
  const alterarQtd = (id, delta) => setItems(items.map(i => i.id === id ? { ...i, quantidade: Math.max(1, i.quantidade + delta) } : i))

  const enviarWhatsapp = () => {
    const faltam = items.filter(i => !i.peguei)
    if (!faltam.length) return

    // Agrupa por setor na mensagem do WhatsApp
    const porSetor = {}
    faltam.forEach(item => {
      const cat = item.categoria || 'mercearia'
      if (!porSetor[cat]) porSetor[cat] = []
      porSetor[cat].push(item)
    })

    let texto = `*🛒 LISTA DE COMPRAS (${faltam.length} itens):*\n`
    Object.entries(porSetor).forEach(([catKey, itensDoSetor]) => {
      const info = CATEGORIAS[catKey] || CATEGORIAS['mercearia']
      texto += `\n*${info.emoji} ${info.label}:*\n`
      itensDoSetor.forEach(i => {
        texto += `◻️ ${i.quantidade}x ${i.nome}\n`
      })
    })

    texto += `\n_Organizado pelo Lista de Mercado PWA_`
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank')
  }

  const pendentes = items.filter(i => !i.peguei)
  const carrinho = items.filter(i => i.peguei)
  const totalVolumes = items.reduce((acc, curr) => acc + (curr.quantidade || 1), 0)

  // Ordenação lógica por setor nos corredores do supermercado
  const visiveis = useMemo(() => {
    let base = abaAtiva === 'pendentes' ? pendentes : carrinho
    if (categoriaAtiva !== 'todos') {
      base = base.filter(i => (i.categoria || 'mercearia') === categoriaAtiva)
    }
    if (termoBusca.trim()) {
      base = base.filter(i => i.nome.toLowerCase().includes(termoBusca.toLowerCase()))
    }
    
    // Se estiver em 'todos', ordena logicamente por setor do mercado
    if (categoriaAtiva === 'todos') {
      return [...base].sort((a, b) => {
        const ordemA = (CATEGORIAS[a.categoria]?.ordem ?? 99)
        const ordemB = (CATEGORIAS[b.categoria]?.ordem ?? 99)
        return ordemA - ordemB
      })
    }

    return base
  }, [abaAtiva, pendentes, carrinho, categoriaAtiva, termoBusca])

  const trocarAba = (novaAba) => {
    setAbaAtiva(novaAba)
    setTermoBusca('')
    // Se a categoria ativa não tiver nenhum item na nova aba, volta para 'todos'
    const itensNaNovaAba = novaAba === 'pendentes' ? pendentes : carrinho
    const temItensNaCategoria = itensNaNovaAba.some(i => (i.categoria || 'mercearia') === categoriaAtiva)
    if (!temItensNaCategoria) {
      setCategoriaAtiva('todos')
    }
  }

  return (
    <div className="h-[100dvh] w-full flex justify-center bg-slate-100 sm:p-4 font-sans overflow-hidden antialiased">
      {/* Container Principal Mobile-First */}
      <div className="w-full max-w-lg bg-white sm:rounded-2xl shadow-xl h-full flex flex-col relative overflow-hidden border border-slate-200/80">
        
        {/* 1. Header com Progresso */}
        <Header 
          itemsCount={items.length} 
          pendentesCount={pendentes.length} 
          carrinhoCount={carrinho.length} 
          totalVolumes={totalVolumes}
          abaAtiva={abaAtiva} 
          setAbaAtiva={trocarAba} 
          onReset={resetarLista}
          onLimparCarrinho={limparCarrinho}
          onPreencher={carregarTemplate}
        />

        {/* 2. Controles de Categoria e Adição */}
        <Controls 
          categorias={CATEGORIAS} 
          categoriaAtiva={categoriaAtiva} 
          setCategoriaAtiva={setCategoriaAtiva}
          termoBusca={termoBusca} 
          setTermoBusca={setTermoBusca}
          qtd={quantidadeInput} 
          setQtd={setQuantidadeInput}
          onAdicionar={adicionarOuBuscar}
          abaAtiva={abaAtiva}
        />

        {/* 3. Lista de Itens com Scroll */}
        <div className="flex-1 overflow-y-auto p-3 bg-slate-50/60 scroll-smooth">
          {visiveis.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-6 py-12">
               {termoBusca ? (
                 <>
                   <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                     <Search size={24} />
                   </div>
                   <p className="text-sm font-semibold text-slate-600">Nenhum item encontrado</p>
                   <p className="text-xs text-slate-400 mt-1">
                     {abaAtiva === 'pendentes' 
                       ? `Pressione Enter ou clique em + para adicionar "${termoBusca}"` 
                       : `Nenhum item correspondente no carrinho`}
                   </p>
                 </>
               ) : categoriaAtiva !== 'todos' ? (
                 <>
                   <div className="h-14 w-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                     <ShoppingCart size={28} />
                   </div>
                   <p className="text-sm font-semibold text-slate-600">
                     Nenhum item de {CATEGORIAS[categoriaAtiva]?.label} {abaAtiva === 'pendentes' ? 'pendente' : 'no carrinho'}
                   </p>
                   <button 
                     type="button"
                     onClick={() => setCategoriaAtiva('todos')} 
                     className="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-emerald-200"
                   >
                     Ver todos os {abaAtiva === 'pendentes' ? pendentes.length : carrinho.length} itens ({abaAtiva === 'pendentes' ? 'Pendentes' : 'No Carrinho'})
                   </button>
                 </>
               ) : abaAtiva === 'carrinho' && carrinho.length === 0 ? (
                 <>
                   <div className="h-14 w-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                     <ShoppingCart size={28} />
                   </div>
                   <h3 className="text-base font-bold text-slate-700">Seu carrinho está vazio</h3>
                   <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                     Marque os itens na aba Pendentes conforme for pegando nas prateleiras para acompanhar suas compras.
                   </p>
                   <button 
                     type="button"
                     onClick={() => trocarAba('pendentes')} 
                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                   >
                     Ver {pendentes.length} itens pendentes
                   </button>
                 </>
               ) : abaAtiva === 'pendentes' && pendentes.length === 0 && items.length > 0 ? (
                 <>
                   <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                     <ShoppingCart size={28} />
                   </div>
                   <h3 className="text-base font-bold text-slate-700">Tudo no carrinho! 🎉</h3>
                   <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                     Você já marcou todos os {items.length} itens da sua lista de compras.
                   </p>
                   <button 
                     type="button"
                     onClick={() => trocarAba('carrinho')} 
                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                   >
                     Conferir Carrinho ({carrinho.length} itens)
                   </button>
                 </>
               ) : abaAtiva === 'pendentes' && items.length === 0 ? (
                 <>
                   <div className="h-16 w-16 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
                     <PackagePlus size={32} />
                   </div>
                   <h3 className="text-base font-bold text-slate-700">Sua lista está vazia</h3>
                   <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                     Adicione produtos manualmente ou carregue a lista essencial com mais de 220 itens pré-organizados por setor.
                   </p>
                   <button 
                     type="button"
                     onClick={carregarTemplate} 
                     className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                   >
                     <Sparkles size={16} />
                     <span>Carregar Lista Mestra ({LISTA_MESTRA.length} itens)</span>
                   </button>
                 </>
               ) : (
                 <>
                   <div className="h-14 w-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                     <ShoppingCart size={28} />
                   </div>
                   <p className="text-sm font-semibold text-slate-600">Nenhum item nesta visualização</p>
                   <p className="text-xs text-slate-400 mt-1">Marque itens como pegos para acompanhá-los no carrinho</p>
                 </>
               )}
            </div>
          ) : (
            visiveis.map(item => (
              <ItemRow 
                key={item.id} 
                item={item} 
                categorias={CATEGORIAS} 
                onToggle={toggleItem} 
                onQtdChange={alterarQtd} 
                onDelete={deletarItem} 
                showCategoryLabel={categoriaAtiva === 'todos'} 
              />
            ))
          )}
          <div className="h-4" /> 
        </div>

        {/* 4. Rodapé Fixo com Compartilhamento WhatsApp */}
        {abaAtiva === 'pendentes' && pendentes.length > 0 && (
          <div className="p-3 bg-white border-t border-slate-200 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
              type="button"
              onClick={enviarWhatsapp} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer text-xs uppercase tracking-wide"
            >
              <Share2 size={16} /> 
              <span>Compartilhar Lista no WhatsApp ({pendentes.length} itens)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default App

