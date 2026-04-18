// Persists liked product IDs in localStorage so they survive page reloads
const STORAGE_KEY = 'empowerher_liked_products';

export const getLikedProducts = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const isProductLiked = (productId: string): boolean => {
  return getLikedProducts().includes(productId);
};

export const toggleLike = (productId: string): boolean => {
  const liked = getLikedProducts();
  const idx = liked.indexOf(productId);
  if (idx === -1) {
    liked.push(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(liked));
    return true;  // now liked
  } else {
    liked.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(liked));
    return false; // now unliked
  }
};
