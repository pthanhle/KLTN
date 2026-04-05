import Favorite from '../../models/favoriteModel.js'
import Product from '../../models/productModel.js'
import asyncHandler from 'express-async-handler'


export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user_id: req.user._id })
    .populate({
      path: 'product_id',
      select: 'product_name price images image category_id type stock_quantity brandName',
      populate: { path: 'category_id', select: 'category_name' }
    })
    .sort({ createdAt: -1 })

  // Lọc bỏ các sản phẩm đã bị xóa khỏi DB nhưng vẫn còn trong favorite
  const validFavorites = favorites.filter(fav => fav.product_id !== null)

  res.json(validFavorites)
})


export const toggleFavorite = asyncHandler(async (req, res) => {
  const { product_id } = req.body

  if (!product_id) {
    res.status(400)
    throw new Error('Vui lòng cung cấp product_id')
  }

  const product = await Product.findById(product_id)
  if (!product) {
    res.status(404)
    throw new Error('Sản phẩm không tồn tại')
  }

  const existingFavorite = await Favorite.findOne({
    user_id: req.user._id,
    product_id: product_id
  })

  if (existingFavorite) {
    await Favorite.findByIdAndDelete(existingFavorite._id)
    res.json({ message: 'Đã xóa khỏi danh sách yêu thích', isFavorite: false })
  } else {
    await Favorite.create({
      user_id: req.user._id,
      product_id: product_id
    })
    res.status(201).json({ message: 'Đã thêm vào danh sách yêu thích', isFavorite: true })
  }
})


export const removeFavorite = asyncHandler(async (req, res) => {
  const { product_id } = req.params

  const favorite = await Favorite.findOne({
    user_id: req.user._id,
    product_id: product_id
  })

  if (!favorite) {
    res.status(404)
    throw new Error('Sản phẩm không có trong danh sách yêu thích')
  }

  await favorite.deleteOne()
  res.json({ message: 'Đã xóa sản phẩm khỏi danh sách yêu thích' })
})
