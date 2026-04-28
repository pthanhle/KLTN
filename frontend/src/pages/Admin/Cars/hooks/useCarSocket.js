import { useEffect } from 'react';
import { socket } from '../../../../services/socket';

export const useCarSocket = (onUpdate) => {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const handleUpdate = () => {
            if (onUpdate) onUpdate();
        };

        socket.on('product_data_updated', handleUpdate);
        socket.on('product_image_updated', handleUpdate);

        return () => {
            socket.off('product_data_updated', handleUpdate);
            socket.off('product_image_updated', handleUpdate);
        };
    }, [onUpdate]);
};
