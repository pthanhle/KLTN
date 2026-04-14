
export const apiMockUploadThreeSixtyBatch = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockArray = Array.from({ length: 36 }, (_, i) =>
                `https://placehold.co/1200x675/1e1e20/eab308/png?text=Angle+${(i * 10).toString().padStart(3, '0')}&font=Montserrat`
            );
            resolve(mockArray);
        }, 1500);
    });
};
