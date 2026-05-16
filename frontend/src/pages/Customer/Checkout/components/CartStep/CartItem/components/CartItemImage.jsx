import { Image, Checkbox } from 'antd';

const CartItemImage = ({ item, isOutOfStock, toggleItemCheck }) => {
    return (
        <>
            <Checkbox
                checked={item.checked}
                onChange={() => toggleItemCheck(item.id)}
                disabled={isOutOfStock}
                className="[&_.ant-checkbox-inner]:border-slate-300 dark:[&_.ant-checkbox-inner]:border-white/20 [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-yellow-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-yellow-500"
            />

            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 flex-shrink-0 flex items-center justify-center">
                <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
                    rootClassName="w-full h-full flex items-center justify-center"
                    preview={true}
                />
            </div>
        </>
    );
};

export default CartItemImage;
