export const MOCK_PARTS = [
    {
        id: '1',
        sku: 'PRT-001',
        name: 'Bộ Piston Hiệu Năng Cao Audi R8',
        slug: 'bo-piston-hieu-nang-cao-audi-r8',
        landing_blocks: [
            { type: 'hero', title: 'Bộ Piston Đúc Từ Hợp Kim', subtitle: 'Genuine Part #A0-992-K. Tăng hiệu suất động cơ vượt trội, chịu nhiệt cao lên đến 1500 độ C.', image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', align: 'left', id: '1-hero' },
            { type: 'text', title: 'Sinh Ra Cho Đấu Trường Track', content: 'Được dập nguyên khối bằng công nghệ Forging tối tân của Đức, đảm bảo tuổi thọ lên tới hàng vạn Kilomet ngay cả trong môi trường khắc nghiệt. Phù hợp hoàn hảo cho những chặng đua sức bền hoặc các hệ thống tăng áp đòi hỏi độ chính xác tuyệt đối.', id: '1-text' },
            { type: 'feature_grid', title: 'Sức Mạnh Bền Bỉ', subtitle: 'Vững vàng trong mọi tình huống', id: '1-feat', features: [
                { title: 'Chịu nhiệt tới 1500°C', description: 'Hoạt động bền bỉ trong buồng đốt nhiệt cao.', icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' },
                { title: 'Trọng lượng nhẹ', description: 'Hợp kim nhôm Forged giảm áp lực vòng tua.', icon: 'https://cdn-icons-png.flaticon.com/512/2855/2855593.png' },
                { title: 'Tối Ưu Đốt Cháy', description: 'Thiết kế bề mặt tản nhiệt thông minh, tăng hiệu năng nổ.', icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082461.png' }
            ]},
            { type: 'gallery', title: 'Đỉnh Cao Cơ Khí Chế Tạo', id: '1-gal', images: [
                { url: 'https://images.unsplash.com/photo-1510526715421-ed811e549646?w=800' },
                { url: 'https://images.unsplash.com/photo-1628172906161-0b5c1fb98cfc?w=800' },
                { url: 'https://images.unsplash.com/photo-1549644061-6893630f57d6?w=800' }
            ]},
            { type: 'video', title: 'Hoạt Động Kép Hoàn Hảo', video_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', cover_image: 'https://images.unsplash.com/photo-1632788910403-1be66fbab6f2?w=800', id: '1-vid' }
        ],
        description: '', // Legacy
        original_price: 5000000,
        price: 4250000,
        category: 'engine',
        compatible_brands: ['Audi'],
        fitment_data: [
            { model: 'R8 V10', yearRange: '2015-2022' },
            { model: 'RS7 Sportback', yearRange: '2019-2023' }
        ],
        images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
        inventory: { warehouse: 24, showroom: 5 },
        stock: 29,
        specs: [
            { label: 'Chất liệu', value: 'Hợp kim nhôm Forged' },
            { label: 'Đường kính', value: '84.5mm' },
            { label: 'Tỉ số nén', value: '12.5:1' }
        ],
        options: [
            { type: 'Kích cỡ', choices: ['STD', '+0.25mm', '+0.50mm'] }
        ],
        seo_title: 'Piston Audi R8 V10 Chính Hãng Chịu Nhiệt',
        seo_description: 'Mua ngay bộ Piston Audi R8 V10 hiệu năng cao, tăng công suất. Giao hàng toàn quốc.',
        status: 'active'
    },
    {
        id: '2',
        sku: 'PRT-002',
        name: 'Đĩa Phanh Carbon Ceramic RS7',
        slug: 'dia-phanh-carbon-ceramic-rs7',
        landing_blocks: [
            { type: 'hero', title: 'Carbon Tech #RS-CB-12', subtitle: 'Phanh siêu nhạy, bền gấp 3 lần phanh thông thường. Thích hợp cho track day.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', align: 'right', id: '2-hero' },
            { type: 'text', title: 'Công Nghệ Hãm Phanh Hoàn Mỹ', content: 'Cấu trúc mâm gốm pha Carbon tạo ra lực hãm phanh tức thì, không gặp hiện tượng mất phanh do nhiệt độ cực cao (Brake Fade). Thử nghiệm thực tế trên đường đua khốc liệt nhất hành tinh chứng minh độ bám cực độ của bộ đĩa này.', id: '2-text' },
            { type: 'feature_grid', title: 'Tinh Tế Trong Từng Vòng Xoay', subtitle: 'Biến sức mạnh vô song thành sự phục tùng tuyệt đối', id: '2-feat', features: [
                { title: 'Tản Nhiệt 0.3s', description: 'Hệ thống lỗ tản khí siêu việt trên bề mặt đĩa phanh', icon: 'https://cdn-icons-png.flaticon.com/512/624/624094.png' },
                { title: 'Chống mài mòn', description: 'Đạt tuổi thọ vượt trội, bảo hành lên đến 3 năm.', icon: 'https://cdn-icons-png.flaticon.com/512/3241/3241160.png' },
                { title: 'Thẩm mỹ Carbon', description: 'Nước sơn vân Carbon nguyên thủy, tăng vẻ đẹp xe hơi.', icon: 'https://cdn-icons-png.flaticon.com/512/6573/6573356.png' }
            ]},
            { type: 'gallery', title: 'Hoàn Hảo Trên Từng Khúc Cua', id: '2-gal', images: [
                { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
                { url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800' },
                { url: 'https://images.unsplash.com/photo-1620883658252-09c0ecf3cb75?w=800' }
            ]},
            { type: 'video', title: 'Cảm Nhận Gia Tốc Ngược', video_url: 'https://www.youtube.com/watch?v=Fj2F1l_PkyA', cover_image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800', id: '2-vid' }
        ],
        description: '', // Legacy
        original_price: 15000000,
        price: 12000000,
        category: 'brake',
        compatible_brands: ['Audi'],
        fitment_data: [
            { model: 'RS7', yearRange: '2020-2024' },
            { model: 'RS6 Avant', yearRange: '2020-2024' }
        ],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        inventory: { warehouse: 2, showroom: 0 },
        stock: 2,
        specs: [
            { label: 'Kích thước đĩa', value: '420mm trước / 370mm sau' },
            { label: 'Chất liệu', value: 'Carbon Ceramic' }
        ],
        options: [],
        seo_title: 'Đĩa Phanh Carbon Ceramic Audi RS7',
        seo_description: 'Nâng cấp hệ thống phanh Carbon Ceramic cao cấp cho xe Audi RS7',
        status: 'active'
    },
    {
        id: '3',
        sku: 'PRT-003',
        name: 'Giảm Xóc Bilstein B16 Audi Q5',
        slug: 'giam-xoc-bilstein-b16-audi-q5',
        landing_blocks: [
            { type: 'hero', title: 'Giảm Xóc Bilstein B16', subtitle: 'Hệ thống treo hiệu năng cao B16 mang đến cảm giác lái thể thao và đầm chắc hoàn hảo, tùy chỉnh 16 cấp độ cứng mềm khác nhau phù hợp cho mọi mục đích từ đi phố nhẹ nhàng đến đua track khốc liệt.', image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', align: 'left', id: '3-hero' },
            { type: 'text', title: 'Tuyệt Tác Điều Hướng Thể Thao', content: 'Phuộc Bilstein B16 sinh ra đập vỡ mọi định kiến đối với xe gầm cao. Với việc hạ thấp trọng tâm xe, cảm giác thân xe chòng chành khi vào cua được hoàn toàn triệt tiêu, đem tới sự phấn khích tột độ sau vô lăng.', id: '3-text' },
            { type: 'feature_grid', title: 'Công Nghệ Vượt Trội B16', subtitle: 'Chi tiết tạo nên sự khác biệt giữa Bilstein và những hệ thống treo thông thường.', id: '3-feat', features: [
                { title: 'Chất thép mạ kẽm', description: 'Bề mặt thân nhún được mạ kẽm cao cấp, chống rỉ sét tuyệt đối trong mọi môi trường từ bùn cát đến muối biển.', icon: 'https://cdn-icons-png.flaticon.com/512/9133/9133036.png' },
                { title: 'Điều chỉnh 16 cấp', description: 'Xoay núm tinh chỉnh dễ dàng. Chuyển đổi trạng thái từ êm ái Daily Drive sang độ cứng Track Day trong tíc tắc.', icon: 'https://cdn-icons-png.flaticon.com/512/12301/12301328.png' },
                { title: 'Mono-tube', description: 'Ống dầu đơn kích thước lớn giúp tản nhiệt xuất sắc, chống hiện tượng nổi bọt khí dầu khi vận hành cường độ cao.', icon: 'https://cdn-icons-png.flaticon.com/512/10041/10041530.png' }
            ]},
            { type: 'gallery', title: 'Hình Ảnh Lắp Đặt Thực Tế', id: '3-gal', images: [
                { url: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c' },
                { url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341' },
                { url: 'https://images.unsplash.com/photo-1620883658252-09c0ecf3cb75' },
                { url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333' }
            ]},
            { type: 'video', title: 'Trải Nghiệm Track Day Cùng B16', video_url: 'https://www.youtube.com/watch?v=Fj2F1l_PkyA', cover_image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333', id: '3-vid' }
        ],
        description: '', // Legacy
        original_price: 10500000,
        price: 8900000,
        category: 'suspension',
        compatible_brands: ['Audi', 'BMW'],
        fitment_data: [
            { model: 'Q5', yearRange: '2018-2023' },
            { model: 'X3', yearRange: '2019-2023' }
        ],
        images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
        inventory: { warehouse: 5, showroom: 2 },
        stock: 7,
        specs: [
            { label: 'Kiểu treo', value: 'Coilover 16 nấc chỉnh' },
            { label: 'Bảo hành', value: '2 năm' }
        ],
        options: [],
        seo_title: 'Giảm xóc Bilstein B16 cho Audi Q5 và BMW X3',
        seo_description: 'Hàng chính hãng Đức, mang lại cảm giác lái thể thao và đầm chắc.',
        status: 'active'
    },
    {
        id: '4',
        sku: 'PRT-004',
        name: 'Lọc Gió K&N High-Flow 33-2990',
        slug: 'loc-gio-kn-high-flow-33-2990',
        landing_blocks: [
            { type: 'hero', title: 'Lọc Gió K&N High-Flow', subtitle: 'Tăng lưu lượng không khí 50%, giảm tiêu hao nhiên liệu. Có thể giặt và tái sử dụng (Washable).', image_url: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=800&q=80', align: 'left', id: '4-a' },
            { type: 'video', title: 'Kiểm tra lưu lượng không khí thực tế', video_url: 'https://www.youtube.com/watch?v=Fj2F1l_PkyA', cover_image: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=800&q=80', id: '4-b' }
        ],
        description: '', // Legacy
        original_price: 2100000,
        price: 1850000,
        category: 'filter',
        compatible_brands: [],
        fitment_data: [
            { model: 'Universal', yearRange: 'All Years' }
        ],
        images: ['https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=400&q=80',
        inventory: { warehouse: 40, showroom: 18 },
        stock: 58,
        specs: [
            { label: 'Loại lõi lọc', value: 'Cotton Gauge' },
            { label: 'Thiết kế', value: 'Panel' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '5',
        sku: 'PRT-005',
        name: 'Bugi NGK Laser Iridium Audi A4',
        slug: 'bugi-ngk-laser-iridium-audi-a4',
        landing_blocks: [
            { type: 'hero', title: 'Bugi NGK Laser Iridium', subtitle: 'Pack 4 items #NGK-944. Tia lửa cực mạnh, tuổi thọ lên tới 100,000 dặm.', image_url: 'https://images.unsplash.com/photo-1609592424823-e80c7a1b4a09?w=800&q=80', align: 'right', id: '5-a' }
        ],
        description: '',
        original_price: 1500000,
        price: 1200000,
        category: 'electrical',
        compatible_brands: ['Audi'],
        fitment_data: [
            { model: 'A4 B9', yearRange: '2016-2023' }
        ],
        images: ['https://images.unsplash.com/photo-1609592424823-e80c7a1b4a09?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1609592424823-e80c7a1b4a09?w=400&q=80',
        inventory: { warehouse: 50, showroom: 15 },
        stock: 65,
        specs: [
            { label: 'Điện cực', value: 'Iridium / Platinum' },
            { label: 'Nhiệt định mức', value: '7' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '6',
        sku: 'PRT-006',
        name: 'Ốp Chia Khóa Carbon Fiber',
        slug: 'op-chia-khoa-carbon-fiber',
        landing_blocks: [
            { type: 'hero', title: 'Ốp Chia Khóa Carbon', subtitle: 'Real Carbon #ACC-CB-09. Mỏng nhẹ, chống xước, mang phong cách thể thao.', image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', align: 'left', id: '6-a' }
        ],
        description: '',
        original_price: 850000,
        price: 650000,
        category: 'accessory',
        compatible_brands: [],
        fitment_data: [],
        images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
        inventory: { warehouse: 60, showroom: 20 },
        stock: 80,
        specs: [
            { label: 'Chất liệu', value: 'Sợi Carbon thật 100%' }
        ],
        options: [
            { type: 'Màu logo', choices: ['Đen', 'Đỏ'] }
        ],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '7',
        sku: 'PRT-007',
        name: 'Lốp Michelin Pilot Sport 4S 245/40R18',
        slug: 'lop-michelin-pilot-sport-4s',
        landing_blocks: [
            { type: 'hero', title: 'Lốp Michelin Pilot Sport 4S', subtitle: 'High Performance #MIC-HPS48. Bám đường bất chấp khô ướt.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', align: 'left', id: '7-a' }
        ],
        description: '',
        original_price: 5800000,
        price: 5400000,
        category: 'tires',
        compatible_brands: [],
        fitment_data: [],
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        inventory: { warehouse: 10, showroom: 4 },
        stock: 14,
        specs: [
            { label: 'Chỉ số', value: '97Y XL' },
            { label: 'Loại', value: 'Summer Tire' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '8',
        sku: 'PRT-008',
        name: 'Mặt Ga Lăng Audi RS6 Black Edition',
        slug: 'mat-ga-lang-audi-rs6-black-edition',
        landing_blocks: [
            { type: 'hero', title: 'Mặt Ga Lăng Audi RS6 Black Edition', subtitle: 'OEM Plus #RS6-G-BK. Sang trọng, cá tính.', image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=800&q=80', align: 'right', id: '8-a' }
        ],
        description: '',
        original_price: 8000000,
        price: 7200000,
        category: 'body',
        compatible_brands: ['Audi'],
        fitment_data: [
            { model: 'A6 C8', yearRange: '2019-2023' }
        ],
        images: ['https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=400&q=80',
        inventory: { warehouse: 5, showroom: 1 },
        stock: 6,
        specs: [
            { label: 'Màu', value: 'Đen bóng piano' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '9',
        sku: 'PRT-009',
        name: 'Dầu Nhớt Castrol Edge 5W-30 4L',
        slug: 'dau-nhot-castrol-edge-5w-30',
        landing_blocks: [
            { type: 'hero', title: 'Dầu Nhớt Castrol Edge', subtitle: 'Fully synthetic Formula RS. Bảo vệ siêu việt.', image_url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80', align: 'left', id: '9-a' }
        ],
        description: '',
        original_price: 650000,
        price: 520000,
        category: 'filter',
        compatible_brands: [],
        fitment_data: [],
        images: ['https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80',
        inventory: { warehouse: 200, showroom: 50 },
        stock: 250,
        specs: [
            { label: 'Gốc nhớt', value: 'Tổng hợp toàn phần' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '10',
        sku: 'PRT-0010',
        name: 'Camera 360 Omnivision Sony StarVis',
        slug: 'camera-360-omnivision-sony-starvis',
        landing_blocks: [
            { type: 'hero', title: 'Camera 360 Sony StarVis', subtitle: 'Full HD 1080p, quay rõ ban đêm.', image_url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80', align: 'right', id: '10-a' }
        ],
        description: '',
        original_price: 5500000,
        price: 4200000,
        category: 'accessory',
        compatible_brands: [],
        fitment_data: [],
        images: ['https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80',
        inventory: { warehouse: 10, showroom: 2 },
        stock: 12,
        specs: [
            { label: 'Độ phân giải', value: '1920x1080' },
            { label: 'Tính năng', value: 'Hiển thị vạch căn lề' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '11',
        sku: 'PRT-0011',
        name: 'Vành Mâm AMG 19 inch Mercedes C-Class',
        slug: 'vanh-mam-amg-19-inch-mercedes',
        landing_blocks: [
            { type: 'hero', title: 'Vành Mâm AMG 19 inch', subtitle: '#AMG-19-CC Chính Hãng.', image_url: 'https://images.unsplash.com/photo-1599912027611-484b9fc447af?w=800&q=80', align: 'left', id: '11-a' }
        ],
        description: '',
        original_price: 36000000,
        price: 32000000,
        category: 'tires',
        compatible_brands: ['Mercedes'],
        fitment_data: [
            { model: 'W205', yearRange: '2015-2021' }
        ],
        images: ['https://images.unsplash.com/photo-1599912027611-484b9fc447af?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1599912027611-484b9fc447af?w=400&q=80',
        inventory: { warehouse: 2, showroom: 0 },
        stock: 2,
        specs: [
            { label: 'Kích thước', value: '19x8.5 Trước / 19x9.5 Sau' }
        ],
        options: [],
        seo_title: '',
        seo_description: '',
        status: 'active'
    },
    {
        id: '12',
        sku: 'PRT-0012',
        name: 'Thảm Lót Sàn 3D TPE Cao Su',
        slug: 'tham-lot-san-3d-tpe',
        landing_blocks: [
            { type: 'hero', title: 'Thảm Lót Sàn 3D TPE', subtitle: 'Vật liệu an toàn, không mùi, dễ vệ sinh.', image_url: 'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?w=800&q=80', align: 'right', id: '12-a' }
        ],
        description: '',
        original_price: 1500000,
        price: 1200000,
        category: 'accessory',
        compatible_brands: [],
        fitment_data: [],
        images: ['https://images.unsplash.com/photo-1503376710349-41b8bc22839b?w=400&q=80'],
        image: 'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?w=400&q=80',
        inventory: { warehouse: 30, showroom: 10 },
        stock: 40,
        specs: [],
        options: [
            { type: 'Màu viền', choices: ['Đỏ', 'Bạc'] }
        ],
        seo_title: '',
        seo_description: '',
        status: 'active'
    }
];

export const MOCK_BRANDS = [
    { id: 'BMW', name: 'BMW', count: 24 },
    { id: 'Mercedes', name: 'Mercedes-Benz', count: 31 },
    { id: 'Audi', name: 'Audi', count: 18 },
    { id: 'Toyota', name: 'Toyota', count: 42 },
    { id: 'Lexus', name: 'Lexus', count: 15 },
    { id: 'KIA', name: 'KIA', count: 28 },
    { id: 'Hyundai', name: 'Hyundai', count: 19 },
];

export const MOCK_CATEGORIES = [
    { id: 'all' },
    { id: 'engine' },
    { id: 'brake' },
    { id: 'suspension' },
    { id: 'filter' },
    { id: 'electrical' },
    { id: 'tires' },
    { id: 'body' },
    { id: 'accessory' },
];
