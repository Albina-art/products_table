import { useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { Product } from '@/types/product';

import { useProductStore } from './useProductStore';

interface ProductFormProps {
  initialProduct?: Product;
  onSuccess: () => void;
}

export function ProductForm({ initialProduct, onSuccess }: ProductFormProps) {
  const [title, setTitle] = useState(initialProduct?.title ?? '');
  const [price, setPrice] = useState(
    initialProduct ? String(initialProduct.price) : ''
  );
  const [vendor, setVendor] = useState(
    initialProduct?.brand ?? initialProduct?.vendor ?? ''
  );
  const [sku, setSku] = useState(initialProduct?.sku ?? '');

  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...(initialProduct ?? {
        id: Date.now(),
        description: '',
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        category: '',
        thumbnail: '',
        images: [],
      }),
      id: initialProduct?.id ?? Date.now(),
      title: title.trim(),
      price: Number(price) || 0,
      brand: vendor.trim(),
      vendor: vendor.trim(),
      sku: sku.trim(),
      isLocal: initialProduct ? initialProduct.isLocal : true,
    };
    if (initialProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Наименование"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        label="Цена"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Вендор"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />
      <Input
        label="Артикул"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      <Button type="submit">{initialProduct ? 'Сохранить' : 'Добавить'}</Button>
    </form>
  );
}
