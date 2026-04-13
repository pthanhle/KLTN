import asyncHandler from "express-async-handler";
import Inventory from "../../../models/inventoryModel.js";
import Part from "../../../models/partModel.js";
import Category from "../../../models/categoryModel.js";

export const getInventoryList = asyncHandler(async (req, res) => {
  const inventory = await Inventory.find()
    .populate({
      path: "product_id",
      select: "name price images category type inventory"
    });

  res.status(200).json(inventory);
});



export const addInventory = asyncHandler(async (req, res) => {
  const { product_id, quantity_available } = req.body;

  if (quantity_available < 0)
    return res.status(400).json({ message: "Số lượng không hợp lệ" });

  const product = await Part.findById(product_id);
  if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });

  const existed = await Inventory.findOne({ product_id });
  if (existed)
    return res.status(400).json({ message: "Sản phẩm đã có trong kho" });

  const newInventory = await Inventory.create({
    product_id,
    quantity_available,
    last_updated: Date.now(),
  });

  res.status(201).json({
    message: "Thêm sản phẩm vào kho thành công",
    inventory: newInventory,
  });
});



export const addInventoryByName = asyncHandler(async (req, res) => {
  const { product_name, category_name, price, images, quantity_available } = req.body;

  if (price < 0 || quantity_available < 0) {
    res.status(400)
    throw new Error('Giá bán và Số lượng nhập kho phải lớn hơn hoặc bằng 0')
  }

  if (!product_name || !category_name) {
    return res.status(400).json({ message: "Tên sản phẩm và tên danh mục là bắt buộc" });
  }

  if (quantity_available < 0) {
    return res.status(400).json({ message: "Số lượng không hợp lệ" });
  }

  const category = await Category.findOne({ category_name });
  if (!category) {
    return res.status(404).json({ message: "Danh mục không tồn tại. Hãy tạo danh mục trước." });
  }

  let product = await Part.findOne({ name: product_name });

  if (!product) {
    product = await Part.create({
      name: product_name,
      price: price || 0,
      images: images || [],
      category: category_name,
      type: "product",
      "inventory.warehouse": 0
    });
  } else {
    const existedInventory = await Inventory.findOne({ product_id: product._id });
    if (existedInventory) {
      return res.status(400).json({ message: "Sản phẩm đã có trong kho" });
    }
  }

  const newInventory = await Inventory.create({
    product_id: product._id,
    quantity_available,
    last_updated: Date.now(),
  });


  res.status(201).json({
    message: "Thêm sản phẩm vào kho thành công (theo tên)",
    inventory: newInventory,
  });
});



export const updateInventory = asyncHandler(async (req, res) => {
  const { quantity_available } = req.body;
  if (quantity_available < 0)
    return res.status(400).json({ message: "Số lượng không hợp lệ" });

  const inventory = await Inventory.findById(req.params.id);
  if (!inventory)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm kho" });

  inventory.quantity_available = quantity_available;
  inventory.last_updated = new Date();
  await inventory.save();


  res.status(200).json({
    message: "Cập nhật số lượng sản phẩm kho thành công",
    inventory,
  });
});



export const deleteInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);
  if (!inventory)
    return res.status(404).json({ message: "Không tìm thấy mục kho" });

  await Part.findByIdAndUpdate(inventory.product_id, { "inventory.warehouse": 0 });

  await inventory.deleteOne();
  res.status(200).json({ message: "Xoá sản phẩm khỏi kho thành công" });
});
