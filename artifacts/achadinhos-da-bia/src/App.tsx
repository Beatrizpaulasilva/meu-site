import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  BadgePercent,
  BedDouble,
  Check,
  ChevronDown,
  CookingPot,
  Heart,
  House,
  Menu,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
declare global {
interface Window {
fbq?: (...args: any[]) => void;
}
}

type Product = {
  id: string;
  name: string;
  price: string;
  discount?: string;
  installment?: string;
  category: string;
  image: string;
  url: string;
  colors?: string[];
  variants?: { name: string; image: string }[];
};

const products: Product[] = [
  {
    id: 'panelas',
    name: 'Conjunto de panelas antiaderente 10 peças Coffee Cappuccino Imperial',
    price: 'R$ 219,98',
    discount: '15% OFF',
    installment: '6x R$ 36,66',
    category: 'Cozinha',
    image: '/product-images/panelas.webp',
    url: 'https://meli.la/1g6hx5y',
  },
  {
    id: 'utensilios',
    name: 'Kit com 12 Utensílios de Cozinha Silicone Cabo Madeira',
    price: 'R$ 39,99',
    discount: '33% OFF',
    category: 'Cozinha',
    image: '/product-images/utensilios-silicone.webp',
    url: 'https://meli.la/29iLn4D',
    colors: ['cinza', 'preto', 'rosa', 'rosa-pink', 'vermelho'],
  },
  {
    id: 'faqueiro',
    name: 'Faqueiro Tramontina Búzios em Aço Inox com Detalhe 24 Peças',
    price: 'R$ 69,75',
    discount: '36% OFF',
    category: 'Cozinha',
    image: '/product-images/faqueiro-tramontina.webp',
    url: 'https://meli.la/2fGCEHS',
  },
  {
    id: 'panos',
    name: 'Kit 10 Panos de Prato Liso Nova Era Resistente 100% Algodão',
    price: 'R$ 25,74',
    discount: '14% OFF',
    category: 'Cozinha',
    image: '/product-images/panos-de-prato.webp',
    url: 'https://meli.la/163zG4M',
  },
  {
    id: 'espelho',
    name: 'Espelho de Chão Corpo Inteiro com Moldura e Suporte Dourado',
    price: 'R$ 161,00',
    installment: '12x R$ 15,91',
    category: 'Decoração',
    image: '/product-images/espelho.webp',
    url: 'https://meli.la/2EogWh9',
  },
  {
    id: 'lencol',
    name: 'Jogo de Lençol Casal Padrão 3 Pçs 400 Fios com Elástico',
    price: 'A partir de R$ 29,08',
    discount: 'Até 43% OFF',
    category: 'Quarto',
    image: '/product-images/lencol-bege.jpg',
    url: 'https://meli.la/2KHy9Bn',
    variants: [
      { name: 'Azul-marinho', image: '/product-images/lencol-azul.jpg' },
      { name: 'Bege floral', image: '/product-images/lencol-bege.jpg' },
      { name: 'Cinza flora', image: '/product-images/lencol-cinza.jpg' },
      { name: 'Vermelho floral', image: '/product-images/lencol-vermelho.jpg' },
    ],
  },
  {
    id: 'manta',
    name: 'Cobertor Manta Casal Aveludada Canelada Super Macia Luxo',
    price: 'R$ 32,95',
    discount: '56% OFF',
    category: 'Quarto',
    image: '/product-images/manta-canelada.jpeg',
    url: 'https://meli.la/2NPtX7Z',
    colors: ['Azul-celeste', 'Azul-petróleo', 'Bege', 'Cinza-escuro', 'Preto', 'Rosa-pálido'],
  },

  {
    id: 'escorredor',
    name: 'Escorredor de Louças Rack Aço Carbono para Bancada',
    price: 'R$ 76,62',
    discount: '48% OFF',
    installment: '12x de R$ 7,55',
    category: 'Cozinha',
    image: '/product-images/escorredor-loucas.jpg.jpeg',
    url: 'https://meli.la/2YAkKAn',
    colors: ['Preto'],
  },
  {
    id: 'organizador-gavetas',
    name: 'Organizador de Gavetas Porta Talheres Bambu 4 Divisórias',
    price: 'R$ 32,99',
    discount: '33% OFF',
    category: 'Cozinha',
    image: '/product-images/organizador-gavetas-bambu.jpg.jpeg',
    url: 'https://meli.la/31mmoTB',
    colors: ['Bambu'],
  },
  {
    id: 'organizadores-geladeira',
    name: 'Kit 3 Organizadores de Geladeira com Tampas',
    price: 'R$ 38,00',
    discount: '22% OFF',
    category: 'Cozinha',
    image: '/product-images/organizadores-geladeira.jpg.jpeg',
    url: 'https://meli.la/11dhaUA',
    colors: ['Branco'],
  },
  {
    id: 'potes-hermeticos',
    name: 'Potes Herméticos de Vidro 640ml - Kit com 6',
    price: 'R$ 58,00',
    discount: '40% OFF',
    installment: '12x de R$ 5,71',
    category: 'Cozinha',
    image: '/product-images/potes-hermeticos-vidro.jpg.jpeg',
    url: 'https://meli.la/2po95Uj',
    colors: ['Transparente'],
  },
  {
    id: 'cabides',
    name: 'Vittak Kit 50 Cabides Slim de Veludo',
    price: 'R$ 66,40',
    discount: '46% OFF no Pix',
    category: 'Quarto',
    image: '/product-images/cabides-veludo.jpg.jpeg',
    url: 'https://meli.la/2YixLAZ',
    colors: ['Preto'],
  },
];

const categories = [
  { title: 'Cozinha', id: 'cozinha', note: 'Pequenos detalhes, grandes momentos', icon: CookingPot, filter: 'Cozinha' },
  { title: 'Casa', id: 'casa', note: 'Ideias para viver melhor', icon: House, filter: 'Casa' },
  { title: 'Quarto', id: 'quarto', note: 'Conforto para desacelerar', icon: BedDouble, filter: 'Quarto' },
  { title: 'Decoração', id: 'decoracao', note: 'Um toque só seu', icon: Sparkles, filter: 'Decoração' },
];


function trackProductClick(product: Product, placement: string) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'CliqueProduto', {
      product_id: product.id,
      product_name: product.name,
      placement,
    });
  }
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {

 
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[1]?.name ?? '');

  return (
    <article className={`product-card${featured ? ' product-card-featured' : ''}`} data-testid={`card-product-${product.id}`}>
      <div className="product-image-wrap">
        {product.discount && <span className="discount-badge"><BadgePercent size={14} /> {product.discount}</span>}
        <img
          className={`product-image${product.id === 'manta' ? ' product-image--manta' : ''}`}
          src={selectedImage}
          alt={product.name}
          width="800"
          height="800"
          loading="eager"
        />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        {product.variants && (
          <div className="variant-row" aria-label="Variações disponíveis">
            {product.variants.map((variant) => (
              <button
                className={`variant-chip${selectedVariant === variant.name ? ' selected' : ''}`}
                key={variant.name}
                type="button"
                aria-pressed={selectedVariant === variant.name}
                onClick={() => {
                  setSelectedVariant(variant.name);
                  setSelectedImage(variant.image);
                }}
                data-testid={`button-variant-${product.id}-${variant.name.toLowerCase().replaceAll(' ', '-')}`}
              >
                {selectedVariant === variant.name && <Check size={12} />}
                {variant.name}
              </button>
            ))}
          </div>
        )}
        {product.colors && (
          <p className="color-options"><span>Cores:</span> {product.colors.join(', ')}</p>
        )}
        <div className="product-bottom">
          <div className="product-pricing">
            <p className="product-price" data-testid={`text-price-${product.id}`}>{product.price}</p>
            {product.installment && <p className="product-installment">{product.installment}</p>}
          </div>
          <a
            className="product-cta"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProductClick(product, 'catalogo')}
            data-testid={`link-product-${product.id}`}
          >
            🛒 Ver produto <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const textMatch = product.name.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR'));
    return textMatch && (category === 'Todas' || product.category === category);
  }), [query, category]);

  const selectCategory = (next: string) => {
    setCategory(next);
    setMobileOpen(false);
  };

  const navLinks = [
    { title: 'Início', href: '#inicio', filter: 'Todas' },
    { title: 'Cozinha', href: '#cozinha', filter: 'Cozinha' },
    { title: 'Casa', href: '#casa', filter: 'Casa' },
    { title: 'Quarto', href: '#quarto', filter: 'Quarto' },
    { title: 'Ofertas', href: '#ofertas', filter: 'Todas' },
  ];

  return (
    <div className="site-shell">
      <div className="announcement">Curadoria de achadinhos para uma casa com a sua cara</div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Achadinhos da Bia, início" onClick={() => selectCategory('Todas')}>
          <span className="brand-mark">b.</span>
          <span className="brand-copy"><strong>Achadinhos da Bia</strong><small>casa, com carinho</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => selectCategory(link.filter)}
              className={link.title === 'Ofertas' ? 'nav-offers' : ''}
              data-testid={`link-nav-${link.title.toLowerCase()}`}
            >
              {link.title}
            </a>
          ))}
        </nav>
        <a className="header-discover" href="#catalogo" onClick={() => selectCategory('Todas')}>
          Explorar <ArrowDownRight size={16} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {navLinks.map((link) => (
              <a key={link.title} href={link.href} onClick={() => selectCategory(link.filter)}>{link.title}<ArrowRight size={16} /></a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> UMA CASA MAIS SUA</p>
            <h1>Os achadinhos que você estava procurando <span>✨</span></h1>
            <p className="hero-subtitle">Produtos selecionados para deixar sua casa mais bonita, prática e organizada.</p>
            <a className="hero-button" href="#catalogo" onClick={() => selectCategory('Todas')}>Ver achadinhos <ArrowRight size={17} /></a>
            <p className="hero-footnote"><Heart size={14} /> Escolhas feitas com cuidado, para a vida real.</p>
          </div>
          <div className="hero-art" aria-label="Seleção de produtos para casa">
            <div className="hero-art-orbit orbit-one" />
            <div className="hero-art-orbit orbit-two" />
            <div className="hero-image-frame">
              <img src="/product-images/panelas.webp" alt="Conjunto de panelas em tons cappuccino" width="800" height="800" fetchPriority="high" />
            </div>
            <div className="hero-note"><span className="hero-note-icon"><Sparkles size={17} /></span><span><strong>O detalhe certo</strong><small>muda o dia a dia</small></span></div>
            <span className="hero-index">01 <i /> CURADORIA DA BIA</span>
          </div>
          <a className="scroll-cue" href="#categorias">DESCUBRA A SELEÇÃO <ChevronDown size={14} /></a>
        </section>

        <section className="category-section section-wrap" id="categorias">
          <div className="section-heading category-heading">
            <div><p className="eyebrow">PASSEIE PELA CASA</p><h2>Um cantinho para cada ideia.</h2></div>
            <p>Escolha uma categoria e encontre peças que fazem sentido para o seu lar.</p>
          </div>
          <div className="category-grid">
            {categories.map(({ title, id, note, icon: Icon, filter }, index) => (
              <a
                id={id}
                className={`category-tile category-tile-${index + 1}${category === filter ? ' active' : ''}`}
                href="#catalogo"
                key={title}
                onClick={() => selectCategory(filter)}
                data-testid={`link-category-${id}`}
              >
                <span className="category-icon"><Icon size={22} strokeWidth={1.5} /></span>
                <span className="category-tile-copy"><strong>{title}</strong><small>{note}</small></span>
                <ArrowDownRight className="category-arrow" size={17} />
              </a>
            ))}
          </div>
        </section>

        <section className="offer-section" id="ofertas">
          <div className="offer-inner">
            <div className="offer-intro">
              <p className="eyebrow">BONS ACHADOS, MELHORES PREÇOS</p>
              <h2>🔥 Ofertas em destaque</h2>
              <p>Ofertas em destaque para aproveitar enquanto estão disponíveis.</p>
              <a href="#catalogo" className="text-link" onClick={() => selectCategory('Todas')}>Ver todos os achadinhos <ArrowRight size={16} /></a>
            </div>
            <div className="offer-picks">
              {['manta', 'lencol', 'faqueiro', 'utensilios', 'panelas'].map((id, index) => {
                const product = products.find((item) => item.id === id)!;
                return (
                  <div className={`offer-pick offer-pick-${index + 1}`} key={id}>
                    <span className="offer-rank">0{index + 1}</span>
                    <img src={product.image} alt={product.name} width="400" height="400" loading="eager" />
                    <div>
                      <small>{product.discount}</small>
                      <strong>{product.name}</strong>
                      <span className="offer-price">{product.price}</span>
                      {product.installment && <span className="offer-installment">{product.installment}</span>}
                    </div>
                    <a href={product.url} target="_blank" rel="noopener noreferrer" onClick={() => trackProductClick(product, 'destaques')} aria-label={`🛒 Ver produto: ${product.name}`}>🛒 Ver produto</a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="catalog-section section-wrap" id="catalogo">
          <div className="section-heading catalog-heading">
            <div><p className="eyebrow">A SELEÇÃO DA BIA</p><h2>Achadinhos para chamar de seus.</h2></div>
            <p>Sem complicação: coisas bonitas e úteis para o dia a dia.</p>
          </div>
          <div className="catalog-tools">
            <div className="search-box">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar um produto..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Buscar produto pelo nome"
                data-testid="input-search-products"
              />
              {query && <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')}><X size={16} /></button>}
            </div>
            <div className="filter-list" role="group" aria-label="Filtrar por categoria">
              {['Todas', 'Cozinha', 'Casa', 'Quarto', 'Decoração'].map((item) => (
                <button
                  type="button"
                  className={category === item ? 'filter-chip selected' : 'filter-chip'}
                  onClick={() => selectCategory(item)}
                  aria-pressed={category === item}
                  key={item}
                  data-testid={`button-filter-${item.toLowerCase()}`}
                >{item}</button>
              ))}
            </div>
          </div>
          <div className="results-line"><span>{filteredProducts.length} {filteredProducts.length === 1 ? 'achadinho' : 'achadinhos'}</span><span>Seleção atualizada com cuidado</span></div>
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span><Search size={25} /></span>
              <h3>Nenhum achadinho por aqui</h3>
              <p>{category === 'Casa' ? 'Ainda não há produtos nesta categoria. Experimente outra seleção.' : 'Tente buscar por outro nome ou escolha uma categoria diferente.'}</p>
              <button type="button" onClick={() => { setQuery(''); setCategory('Todas'); }}>Ver todos os produtos</button>
            </div>
          )}
        </section>

        <section className="closing-note">
          <div className="closing-flower" aria-hidden="true">b.</div>
          <p>Casa bonita não precisa ser complicada.</p>
          <h2>O melhor achado é se sentir em casa.</h2>
          <a href="#inicio">Voltar ao começo <ArrowRight size={16} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#inicio" onClick={() => selectCategory('Todas')}>
            <span className="brand-mark">b.</span>
            <span className="brand-copy"><strong>Achadinhos da Bia</strong><small>casa, com carinho</small></span>
          </a>
          <p>Produtos selecionados do Mercado Livre.</p>
          <a className="back-top" href="#inicio" aria-label="Voltar ao início">↑</a>
        </div>
        <div className="footer-disclosure">
          <p>Os preços e condições podem sofrer alterações conforme o Mercado Livre.</p>
          <p>Este site participa de programa de afiliados. Podemos receber comissão por compras realizadas através dos nossos links.</p>
        </div>
        <div className="footer-bottom"><span>Achadinhos da Bia</span><span>Uma curadoria para deixar a casa mais sua.</span></div>
      </footer>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
