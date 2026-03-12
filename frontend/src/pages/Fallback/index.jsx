import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Fallback = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
            <Result
                status="404"
                title={<span className="text-5xl font-bold">404</span>}
                subTitle={<span className="text-gray-500 text-lg">Xin lỗi, trang bạn truy cập không tồn tại.</span>}
                extra={
                    <Button type="primary" size="large" onClick={() => navigate('/', { replace: true })}>
                        Về trang chủ
                    </Button>
                }
            />
        </div>
    );
};

export default Fallback;
