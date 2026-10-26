
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Check,
  Sparkles,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Air Runner X",
    category: "PREMIUM SNEAKERS",
    price: 4999,
    oldPrice: 5999,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    accent: "#ff5478",
    glow: "rgba(255,84,120,0.25)",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Studio Beats",
    category: "WIRELESS AUDIO",
    price: 3499,
    oldPrice: 4299,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    accent: "#9c7bff",
    glow: "rgba(156,123,255,0.25)",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Urban Explorer",
    category: "EVERYDAY ESSENTIALS",
    price: 2299,
    oldPrice: 2999,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    accent: "#35d6bc",
    glow: "rgba(53,214,188,0.23)",
    tag: "NEW",
  },
  {
    id: 4,
    name: "Timeless Gold",
    category: "CLASSIC WATCH",
    price: 5999,
    oldPrice: 7499,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    accent: "#ffc857",
    glow: "rgba(255,200,87,0.22)",
    tag: "LIMITED",
  },
];

const formatPrice = (price) =>
  `₹${price.toLocaleString("en-IN")}`;

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isCartOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 900);
  };

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b16] px-4 py-8 text-white sm:px-8 lg:px-12">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Compact heading + cart button */}
        <header className="mb-12 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-purple-300">
              
            </div>
            
          </div>

        
        </header>

        {/* Product cards */}
        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-cyan-300">
                THE COLLECTION
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Find your{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                  next favorite.
                </span>
              </h1>
            </div>

             <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 transition hover:bg-white/10"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">My Cart</span>

            <AnimatePresence mode="popLayout">
              <motion.span
                key={totalItems}
                initial={{ scale: 0.4, y: -5 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.4, y: 5 }}
                className="flex h-6 min-w-6 items-center justify-center rounded-full bg-purple-500 px-1.5 text-xs font-bold"
              >
                {totalItems}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => {
              const inCart = cart.find(
                (item) => item.id === product.id
              );

              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#131321] p-3"
                  style={{
                    boxShadow: `0 0 0 transparent`,
                  }}
                >
                  {/* Colored glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: product.glow,
                      opacity: 0.6,
                    }}
                  />

                  {/* Image */}
                  <div
                    className="relative mb-5 h-64 overflow-hidden rounded-[22px]"
                    style={{
                      background: `linear-gradient(145deg, ${product.glow}, #191827 75%)`,
                    }}
                  >
                    <span
                      className="absolute left-3 top-3 z-10 rounded-full px-3 py-1.5 text-[10px] font-black tracking-wider text-white"
                      style={{
                        backgroundColor: product.accent,
                        color: "#151522",
                      }}
                    >
                      {product.tag}
                    </span>

                    <span className="absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2.5 py-1.5 text-xs backdrop-blur-md">
                      ★ {product.rating}
                    </span>

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      whileHover={{
                        scale: 1.1,
                        rotate: -3,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="h-full w-full object-cover"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Product details */}
                  <div className="relative px-2 pb-2">
                    <p
                      className="mb-2 text-[10px] font-bold tracking-[0.18em]"
                      style={{ color: product.accent }}
                    >
                      {product.category}
                    </p>

                    <h2 className="text-xl font-bold">
                      {product.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-lg font-extrabold">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => addToCart(product)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-[#10101a] transition"
                      style={{
                        backgroundColor:
                          addedId === product.id
                            ? "#ffffff"
                            : product.accent,
                        boxShadow: `0 8px 30px ${product.glow}`,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {addedId === product.id ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Check size={17} />
                            Added to Cart
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart size={17} />
                            {inCart
                              ? `Add Another (${inCart.quantity})`
                              : "Add to Cart"}
                            <ArrowRight size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        
      </div>

      {/* Drawer backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close shopping cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/65 backdrop-blur-sm"
            />

            {/* Cart drawer */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 280,
              }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-md flex-col border-l border-white/10 bg-[#10101c] shadow-2xl shadow-black/50"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-purple-300">
                    YOUR SELECTION
                  </p>
                  <h2
                    id="cart-title"
                    className="text-2xl font-black"
                  >
                    Shopping Cart
                    <span className="ml-2 text-base font-medium text-gray-400">
                      ({totalItems})
                    </span>
                  </h2>
                </div>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 hover:bg-white/10"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Cart contents */}
              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full min-h-64 flex-col items-center justify-center text-center"
                  >
                    <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/10">
                      <ShoppingBag
                        size={38}
                        className="text-purple-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold">
                      Your cart is empty
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
                      Looks like you haven't added anything yet.
                      Explore the collection and find your favorite.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 font-bold text-white transition hover:bg-purple-400"
                    >
                      Explore Products <ArrowRight size={17} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0, x: 25 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: 50,
                            height: 0,
                            marginBottom: 0,
                          }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                            <div
                              className="h-28 w-24 shrink-0 overflow-hidden rounded-xl"
                              style={{
                                backgroundColor: item.glow,
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                              <div>
                                <p
                                  className="mb-1 text-[9px] font-bold tracking-wider"
                                  style={{ color: item.accent }}
                                >
                                  {item.category}
                                </p>
                                <h3 className="font-bold">
                                  {item.name}
                                </h3>
                                <p className="mt-1 text-sm font-semibold">
                                  {formatPrice(item.price)}
                                </p>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, -1)
                                    }
                                    className="rounded-md p-1.5 transition hover:bg-white/10"
                                    aria-label={`Decrease ${item.name} quantity`}
                                  >
                                    <Minus size={14} />
                                  </button>

                                  <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.3 }}
                                    animate={{ scale: 1 }}
                                    className="min-w-4 text-center text-sm font-bold"
                                  >
                                    {item.quantity}
                                  </motion.span>

                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, 1)
                                    }
                                    className="rounded-md p-1.5 transition hover:bg-white/10"
                                    aria-label={`Increase ${item.name} quantity`}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <button
                                  onClick={() =>
                                    removeFromCart(item.id)
                                  }
                                  aria-label={`Remove ${item.name}`}
                                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <p className="text-center text-xs text-gray-500">
                      {subtotal >= 3000
                        ? "✨ You've unlocked free shipping!"
                        : `Add ${formatPrice(
                            3000 - subtotal
                          )} more for free shipping.`}
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer totals */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 bg-[#131321] px-5 py-5 sm:px-7">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span
                        className={
                          shipping === 0
                            ? "font-semibold text-emerald-400"
                            : "text-white"
                        }
                      >
                        {shipping === 0
                          ? "FREE"
                          : formatPrice(shipping)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-black">
                      <span>Total</span>
                      <motion.span
                        key={total}
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                      >
                        {formatPrice(total)}
                      </motion.span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      alert(
                        "Demo project: connect a checkout flow to place an order."
                      )
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-4 font-bold text-white shadow-lg shadow-purple-500/20"
                  >
                    Continue to Checkout
                    <ArrowRight size={18} />
                  </motion.button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 w-full py-2 text-sm text-gray-400 transition hover:text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
