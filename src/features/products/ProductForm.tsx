import { type SubmitEventHandler,useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { Product } from '@/types/product';

import { useProductStore } from './useProductStore';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ProductFormProps {
  initialProduct?: Product;
  onSuccess: () => void;
}

function validateProductForm(title: string, price: string, vendor: string, sku: string) {
  const titleError = !title.trim() ? 'Введите наименование' : undefined;

  const priceTrim = price.trim();
  let priceError: string | undefined;
  if (!priceTrim) {
    priceError = 'Введите цену';
  } else {
    const n = Number(price);
    if (!Number.isFinite(n) || n < 0) {
      priceError = 'Укажите корректную цену';
    }
  }

  const vendorError = !vendor.trim() ? 'Введите вендора' : undefined;
  const skuError = !sku.trim() ? 'Введите артикул' : undefined;

  return { titleError, priceError, vendorError, skuError };
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

  const [titleError, setTitleError] = useState<string | undefined>();
  const [priceError, setPriceError] = useState<string | undefined>();
  const [vendorError, setVendorError] = useState<string | undefined>();
  const [skuError, setSkuError] = useState<string | undefined>();

  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTitleError(undefined);
    setPriceError(undefined);
    setVendorError(undefined);
    setSkuError(undefined);

    const { titleError: currentTitleError, priceError: currentPriceError, vendorError: currentVendorError, skuError: currentSkuError } =
      validateProductForm(title, price, vendor, sku);

    if (currentTitleError) setTitleError(currentTitleError);
    if (currentPriceError) setPriceError(currentPriceError);
    if (currentVendorError) setVendorError(currentVendorError);
    if (currentSkuError) setSkuError(currentSkuError);

    if (currentTitleError || currentPriceError || currentVendorError || currentSkuError) {
      return;
    }

    const newProduct: Product = {
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
      updateProduct(newProduct);
    } else {
      addProduct(newProduct);
    }
    onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Input
        label="Наименование"
        value={title}
        error={titleError}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleError(undefined);
        }}
      />
      <Input
        label="Цена"
        type="number"
        min={0}
        step="any"
        value={price}
        error={priceError}
        onChange={(e) => {
          setPrice(e.target.value);
          setPriceError(undefined);
        }}
      />
      <Input
        label="Вендор"
        value={vendor}
        error={vendorError}
        onChange={(e) => {
          setVendor(e.target.value);
          setVendorError(undefined);
        }}
      />
      <Input
        label="Артикул"
        value={sku}
        error={skuError}
        onChange={(e) => {
          setSku(e.target.value);
          setSkuError(undefined);
        }}
      />
      <Button type="submit">{initialProduct ? 'Сохранить' : 'Добавить'}</Button>
    </Form>
  );
}
